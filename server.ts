import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function startServer() {
  const app = express();
  app.use(express.json());

  // MunoWatch Server API Endpoints fulfilling https://mumowatch.ai.studio/ specification
  const mockServerCatalog = {
    heroMovies: [
      {
        id: 'omuzigo',
        title: 'Omuzigo',
        vj: 'Vj Junior',
        genre: 'Drama',
        duration: '01h 50m',
        fileSize: '1.20 GB',
        rating: '18+',
        narration: 'English to Luganda',
        uploadedTimeAgo: '1 day ago',
        punctuality: 'Daily 8PM Release',
        endpoint: '/watch?id=omuzigo',
        description: 'For James, Omuzigo is more than a place to live. It represents freedom, independence and uncertainty.',
        posterUrl: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=600&q=80',
        heroBannerUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80',
        isLocked: false,
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'
      },
      {
        id: 'under-water',
        title: 'Under Water',
        secondaryLabel: 'Junior',
        vj: 'Vj Junior',
        genre: 'Sci-Fi / Thriller',
        duration: '01h 35m',
        fileSize: '1.45 GB',
        rating: '16+',
        narration: 'English to Luganda',
        uploadedTimeAgo: '12 hrs ago',
        punctuality: 'Weekend Special Drop',
        endpoint: '/watch?id=under-water',
        description: 'A crew of oceanic researchers work to get to safety after a mysterious earthquake ravages their subterranean facility.',
        posterUrl: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=600&q=80',
        heroBannerUrl: 'https://images.unsplash.com/photo-1682687220063-4742bd7fd538?auto=format&fit=crop&w=1200&q=80',
        isLocked: false,
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4'
      }
    ],
    latestMovies: [
      {
        id: 'lilian-music',
        title: 'Lilian on Music, Loss AND HEALING',
        secondaryLabel: 'Special',
        vj: 'Vj Emmy',
        genre: 'Documentary',
        duration: '01h 15m',
        fileSize: '950 MB',
        rating: '13+',
        narration: 'English to Luganda',
        uploadedTimeAgo: '4 hrs ago',
        punctuality: 'Today 4PM',
        endpoint: '/watch?id=lilian-music',
        description: 'An intimate documentary delving into musical origins, grieving deep loss, and rediscovering light through sound.',
        posterUrl: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=600&q=80',
        isLocked: false,
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4'
      },
      {
        id: 'masterplan',
        title: 'Masterplan',
        secondaryLabel: 'Junior',
        vj: 'Vj Junior',
        genre: 'Crime / Heist',
        duration: '01h 41m',
        fileSize: '1.5 GB',
        rating: '16+',
        narration: 'English to Luganda',
        uploadedTimeAgo: '8 hrs ago',
        punctuality: 'Today 12PM',
        endpoint: '/watch?id=masterplan',
        description: 'A master thief enlists two strangers for an audacious Louvre heist targeting high-value royal artifacts.',
        posterUrl: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=600&q=80',
        isLocked: false,
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4'
      },
      {
        id: 'love-of-your-life',
        title: 'Love of Your Life',
        secondaryLabel: 'Junior',
        vj: 'Vj Junior',
        genre: 'Drama',
        duration: '01h 43m',
        fileSize: '1.54 GB',
        rating: '18+',
        narration: 'English to Luganda',
        uploadedTimeAgo: '16 hrs ago',
        punctuality: '16h ago (Punctual)',
        endpoint: '/watch?id=love-of-your-life',
        description: 'Maya, a smart nurse, is swept up in an immersive love that sets her life on a trajectory she never imagined.',
        posterUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80',
        heroBannerUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
        isLocked: false,
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4'
      },
      {
        id: 'sardar',
        title: 'Sardar 4',
        secondaryLabel: 'Ice P',
        vj: 'Vj Ice P',
        genre: 'Action / Spy',
        duration: '01h 27m',
        fileSize: '867.99 MB',
        rating: '16+',
        narration: 'English to Luganda',
        uploadedTimeAgo: '1 day ago',
        punctuality: '1 day ago',
        endpoint: '/watch?id=sardar',
        description: 'A spy, who is estranged from his family due to a classified mission, suddenly meets his upright police officer son.',
        posterUrl: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=600&q=80',
        isLocked: false,
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'
      },
      {
        id: 'matchbox',
        title: 'Matchbox: The Movie',
        secondaryLabel: 'Junior',
        vj: 'Vj Junior',
        genre: 'Action',
        duration: '01h 55m',
        fileSize: '1.65 GB',
        rating: '13+',
        narration: 'English to Luganda',
        uploadedTimeAgo: '2 days ago',
        punctuality: 'On Schedule',
        endpoint: '/watch?id=matchbox',
        description: 'High-octane desert warfare and modified armored transports clash in an all-or-nothing convoy rescue.',
        posterUrl: 'https://images.unsplash.com/photo-1533488765986-dfa2a9939acd?auto=format&fit=crop&w=600&q=80',
        isLocked: false,
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4'
      },
      {
        id: 'fall-2',
        title: 'Fall 2: Deadpoint',
        secondaryLabel: 'Junior',
        vj: 'Vj Junior',
        genre: 'Survival / Thriller',
        duration: '01h 48m',
        fileSize: '1.38 GB',
        rating: '16+',
        narration: 'English to Luganda',
        uploadedTimeAgo: '3 days ago',
        punctuality: 'On Schedule',
        endpoint: '/watch?id=fall-2',
        description: 'Trapped on an overhang 2,000 feet above the alpine clouds with failing carabiners.',
        posterUrl: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=600&q=80',
        isLocked: false,
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4'
      }
    ],
    categories: ['Action', 'Horror', 'Drama', 'Sci-Fi', 'Animation', 'Vj Junior']
  };

  app.get('/dashboard', async (req, res) => {
    try {
      const response = await fetch('https://mumowatch.ai.studio/dashboard');
      if (response.ok) {
        const data = await response.json();
        return res.json(data);
      }
    } catch (e) {
      // fallback to mockServerCatalog
    }
    res.json(mockServerCatalog);
  });

  app.get('/movie/:id', async (req, res) => {
    const { id } = req.params;
    try {
      const response = await fetch(`https://mumowatch.ai.studio/movie/${id}`);
      if (response.ok) {
        const movie = await response.json();
        return res.json({ ...movie, isLocked: false });
      }
    } catch (e) {}

    const allMovies = [...mockServerCatalog.heroMovies, ...mockServerCatalog.latestMovies];
    const movie = allMovies.find(m => m.id === id) || allMovies[0];
    res.json(movie);
  });

  app.get('/movie/:id/play', async (req, res) => {
    const { id } = req.params;
    try {
      const response = await fetch(`https://mumowatch.ai.studio/movie/${id}/play`);
      if (response.ok) {
        const data = await response.json();
        return res.json(data);
      }
    } catch (e) {}

    res.json({
      success: true,
      movieId: id,
      streamUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'
    });
  });

  app.get('/series/:seriesCode/movie/play', async (req, res) => {
    const { seriesCode } = req.params;
    try {
      const response = await fetch(`https://mumowatch.ai.studio/series/${seriesCode}/movie/play`);
      if (response.ok) {
        const data = await response.json();
        return res.json(data);
      }
    } catch (e) {}

    res.json({
      success: true,
      seriesCode,
      streamUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4'
    });
  });

  // Vite middleware for frontend development
  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: 'spa',
  });

  app.use(vite.middlewares);

  const PORT = 3000;
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`MunoWatch Server running on http://localhost:${PORT}`);
  });
}

startServer();
