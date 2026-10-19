import 'package:flutter/material.dart';
import '../theme/app_colors.dart';
import '../data/sample_movies.dart';
import '../widgets/home_header.dart';
import '../widgets/featured_movie_banner.dart';
import '../widgets/movie_section_header.dart';
import '../widgets/horizontal_movie_poster_list.dart';
import '../widgets/continue_watching_section.dart';
import 'category_detail_screen.dart';

class HomeScreen extends StatelessWidget {
  const HomeScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.primaryBackground,
      body: SafeArea(
        top: true,
        bottom: false,
        child: SingleChildScrollView(
          physics: const BouncingScrollPhysics(),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              // 1. Top Header (Logo + Cast, Bell, Search)
              const HomeHeader(),
              
              // 2. Featured Cinematic Movie Banner
              const FeaturedMovieBanner(
                movie: SampleMovies.featuredMovie,
              ),

              const SizedBox(height: 18),

              // 3. Latest on Munowatch Section
              MovieSectionHeader(
                title: 'Latest on Munowatch',
                onArrowTap: () {
                  Navigator.push(
                    context,
                    MaterialPageRoute(
                      builder: (context) => const CategoryDetailScreen(
                        categoryTitle: 'Latest on Munowatch',
                        isVeejay: false,
                      ),
                    ),
                  );
                },
              ),
              const SizedBox(height: 10),
              const HorizontalMoviePosterList(
                movies: SampleMovies.latestOnMunowatch,
              ),

              const SizedBox(height: 22),

              // 4. Continue watching Section
              MovieSectionHeader(
                title: 'Continue watching',
                onArrowTap: () {},
              ),
              const SizedBox(height: 10),
              const ContinueWatchingSection(
                movies: SampleMovies.continueWatching,
              ),

              // Bottom padding so content scrolls freely above bottom bar
              const SizedBox(height: 32),
            ],
          ),
        ),
      ),
    );
  }
}
