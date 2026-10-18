class Movie {
  final String id;
  final String title;
  final String? secondaryLabel;
  final String vj;
  final String genre;
  final String duration;
  final String? fileSize;
  final String? rating;
  final String narration;
  final String description;
  final String posterUrl;
  final String? heroBannerUrl;
  final bool isLocked;
  final double? progressPercent;
  final String? punctuality;
  final String? endpoint;

  const Movie({
    required this.id,
    required this.title,
    this.secondaryLabel,
    required this.vj,
    required this.genre,
    required this.duration,
    this.fileSize,
    this.rating,
    this.narration = 'English to Luganda',
    required this.description,
    required this.posterUrl,
    this.heroBannerUrl,
    this.isLocked = true,
    this.progressPercent,
    this.punctuality,
    this.endpoint,
  });
}

class MovieCategory {
  final String id;
  final String title;
  final String punctuality;
  final String endpoint;
  final List<Movie> movies;

  const MovieCategory({
    required this.id,
    required this.title,
    required this.punctuality,
    required this.endpoint,
    required this.movies,
  });
}
