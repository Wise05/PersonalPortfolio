// Composable to retrieve and parse project markdown files dynamically

// Eagerly import all project markdown files under src/content/projects/ as raw text
const markdownFiles = import.meta.glob('/src/content/projects/*.md', {
  query: '?raw',
  import: 'default',
  eager: true
});

/**
 * Lightweight, client-safe frontmatter parser.
 * Avoids Node.js dependency issues in the browser.
 */
function parseFrontmatter(fileContent) {
  const lines = fileContent.split('\n');
  const meta = {};
  let content = '';

  if (lines[0] && lines[0].trim() === '---') {
    let i = 1;
    // Read lines until next '---' delimiter
    while (i < lines.length && lines[i].trim() !== '---') {
      const line = lines[i];
      const colonIdx = line.indexOf(':');
      if (colonIdx !== -1) {
        const key = line.slice(0, colonIdx).trim();
        let val = line.slice(colonIdx + 1).trim();

        // Strip surrounding quotes
        if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
          val = val.slice(1, -1);
        }

        // Parse boolean values
        if (val === 'true') {
          val = true;
        } else if (val === 'false') {
          val = false;
        }
        // Parse simple JSON arrays e.g., ["Vue", "Vite"]
        else if (val.startsWith('[') && val.endsWith(']')) {
          try {
            val = JSON.parse(val.replace(/'/g, '"'));
          } catch (e) {
            val = val.slice(1, -1).split(',').map(item => item.trim().replace(/^['"]|['"]$/g, ''));
          }
        }

        meta[key] = val;
      }
      i++;
    }
    // Content is everything after the closing '---'
    content = lines.slice(i + 1).join('\n');
  } else {
    content = fileContent;
  }

  return { data: meta, content };
}

export function useProjects() {
  /**
   * Parse and return all projects sorted by date descending.
   */
  const getProjects = () => {
    const projects = [];

    for (const path in markdownFiles) {
      const rawContent = markdownFiles[path];
      // Extract file slug from path (e.g. "/src/content/projects/my-slug.md" -> "my-slug")
      const slug = path.split('/').pop().replace(/\.md$/, '');

      try {
        const { data, content } = parseFrontmatter(rawContent);
        projects.push({
          slug,
          path,
          meta: {
            title: data.title || slug,
            description: data.description || '',
            date: data.date || '',
            tags: data.tags || [],
            featured: !!data.featured,
            ...data
          },
          content
        });
      } catch (err) {
        console.error(`Error processing markdown file at ${path}:`, err);
      }
    }

    // Sort by date (latest first)
    return projects.sort((a, b) => {
      const dateA = new Date(a.meta.date || 0);
      const dateB = new Date(b.meta.date || 0);
      return dateB - dateA;
    });
  };

  /**
   * Find a specific project by its slug.
   */
  const getProjectBySlug = (slug) => {
    const projects = getProjects();
    return projects.find(project => project.slug === slug) || null;
  };

  return {
    getProjects,
    getProjectBySlug
  };
}
