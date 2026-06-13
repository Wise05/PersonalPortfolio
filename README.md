# My Personal Portfolio

## Purpose 

## Layout 
src/
├── assets/          # Global styles, fonts, images
├── components/      # Reusable UI elements
│   ├── ui/          # Low-level primitives (Buttons, Cards, Modals)
│   ├── layout/      # Navbar, Footer, Sidebar
│   └── projects/    # Feature-specific components (ProjectCard, FilterBar)
├── composables/     # Shared, reactive logic (e.g., useTheme, useMarkdown)
├── router/          # Vue Router configurations
├── views/           # Page-level components (HomeView, ProjectsView, PostView)
├── content/         # Static markdown files for posts or project bios
├── App.vue          # Root component
└── main.js          # App initialization
