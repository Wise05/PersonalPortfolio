export default async function handler(req, res) {
  const API_KEY = process.env.YOUTUBE_API_KEY;
  const PLAYLIST_ID = "PLRrVoOIYPkMc0YftrGh9sGwOmUlZskKNy";

  try {
    const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=5&playlistId=${PLAYLIST_ID}&key=${API_KEY}`;
    const response = await fetch(url);
    const data = await response.json();

    const cleanSongs = data.items.map(item => ({
      title: item.snippet.title,
      artist: item.snippet.videoOwnerChannelTitle || "Unknown Artist",
      thumbnail: item.snippet.thumbnails.medium.url,
      link: `https://music.youtube.com/watch?v=${item.snippet.resourceId.videoId}`
    }));

    // Vercel caching updates every hour
    res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate');

    res.status(200).json(cleanSongs);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch songs" });
  }
}
