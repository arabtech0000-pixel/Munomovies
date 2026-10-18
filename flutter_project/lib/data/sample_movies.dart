import '../models/movie_model.dart';

class SampleMovies {
  static const Movie featuredMovie = Movie(
    id: 'under-water',
    title: 'Under Water',
    secondaryLabel: 'Junior',
    vj: 'Vj Junior',
    genre: 'Sci-Fi / Thriller',
    duration: '01h 35m',
    fileSize: '1.45 GB',
    rating: '16+',
    description:
        'A crew of oceanic researchers working for a deep-sea drilling company try to get to safety after a mysterious earthquake ravages their subterranean facility.',
    posterUrl: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800',
    heroBannerUrl: 'https://images.unsplash.com/photo-1682687220063-4742bd7fd538?w=1200',
    isLocked: true,
  );

  static const List<Movie> latestOnMunowatch = [
    Movie(
      id: 'lilian',
      title: 'Lilian on Music, Loss AND HEALING',
      vj: 'Vj Emmy',
      genre: 'Documentary',
      duration: '01h 15m',
      description: 'Intimate conversation on grief, healing, and music.',
      posterUrl: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=600',
      isLocked: false,
    ),
    Movie(
      id: 'masterplan',
      title: 'Masterplan',
      secondaryLabel: 'Junior',
      vj: 'Vj Junior',
      genre: 'Crime / Heist',
      duration: '01h 41m',
      description: 'A master thief enlists two strangers for a Louvre heist.',
      posterUrl: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=600',
      isLocked: true,
    ),
    Movie(
      id: 'love-of-your-life',
      title: 'Love of Your Life',
      secondaryLabel: 'Junior',
      vj: 'Vj Junior',
      genre: 'Drama',
      duration: '01h 43m',
      description: 'Maya, a smart, wry nurse, is swept up in an immersive love.',
      posterUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600',
      isLocked: true,
    ),
    Movie(
      id: 'sardar',
      title: 'Sardar 4',
      secondaryLabel: 'Ice P',
      vj: 'Vj Ice P',
      genre: 'Action',
      duration: '01h 27m',
      description: 'A spy estranged from his family meets his police officer son.',
      posterUrl: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=600',
      isLocked: true,
    ),
  ];

  static const List<Movie> continueWatching = [
    Movie(
      id: 'nirvana',
      title: 'Love of Nirvana',
      vj: 'Vj Junior',
      genre: 'Historical',
      duration: '45m / ep',
      description: 'Xiao Wuxia endures humiliation to uncover the family truth.',
      posterUrl: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=600',
      progressPercent: 0.68,
      isLocked: true,
    ),
    Movie(
      id: 'fallout',
      title: 'Fallout',
      vj: 'Vj Junior',
      genre: 'Sci-Fi',
      duration: '58m / ep',
      description: 'Survivors in underground vault face the surface wasteland.',
      posterUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=600',
      progressPercent: 0.35,
      isLocked: true,
    ),
    Movie(
      id: 'snow-eagle',
      title: 'Snow Eagle Lord',
      vj: 'Vj Emmy',
      genre: 'Fantasy',
      duration: '42m / ep',
      description: 'Legendary martial arts journey across snow peaks.',
      posterUrl: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=600',
      progressPercent: 0.82,
      isLocked: true,
    ),
  ];
}
