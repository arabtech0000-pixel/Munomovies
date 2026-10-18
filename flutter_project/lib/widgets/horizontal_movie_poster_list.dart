import 'package:flutter/material.dart';
import '../models/movie_model.dart';
import 'movie_poster_card.dart';

class HorizontalMoviePosterList extends StatelessWidget {
  final List<Movie> movies;

  const HorizontalMoviePosterList({
    super.key,
    required this.movies,
  });

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      height: 210,
      child: ListView.separated(
        padding: const EdgeInsets.symmetric(horizontal: 16),
        scrollDirection: Axis.horizontal,
        physics: const BouncingScrollPhysics(),
        itemCount: movies.length,
        separatorBuilder: (_, __) => const SizedBox(width: 10),
        itemBuilder: (context, index) {
          final movie = movies[index];
          return MoviePosterCard(
            movie: movie,
            width: 140,
            height: 210,
          );
        },
      ),
    );
  }
}
