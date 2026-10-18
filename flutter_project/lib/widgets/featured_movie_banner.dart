import 'package:flutter/material.dart';
import '../models/movie_model.dart';
import '../theme/app_colors.dart';

class FeaturedMovieBanner extends StatelessWidget {
  final Movie movie;

  const FeaturedMovieBanner({
    super.key,
    required this.movie,
  });

  @override
  Widget build(BuildContext context) {
    final screenHeight = MediaQuery.of(context).size.height;

    return Stack(
      children: [
        // Cinematic background image
        SizedBox(
          height: screenHeight * 0.44,
          width: double.infinity,
          child: Image.network(
            movie.heroBannerUrl ?? movie.posterUrl,
            fit: BoxFit.cover,
            errorBuilder: (_, __, ___) => Container(
              color: AppColors.secondaryBackground,
            ),
          ),
        ),

        // Dark gradient overlays matching MunoWatch reference
        Positioned.fill(
          child: DecoratedBox(
            decoration: BoxDecoration(
              gradient: LinearGradient(
                begin: Alignment.topCenter,
                end: Alignment.bottomCenter,
                colors: [
                  AppColors.primaryBackground.withOpacity(0.4),
                  Colors.transparent,
                  AppColors.primaryBackground.withOpacity(0.85),
                  AppColors.primaryBackground,
                ],
                stops: const [0.0, 0.25, 0.75, 1.0],
              ),
            ),
          ),
        ),

        // Featured Content (Title, VJ label, Description, Watch Now Button)
        Positioned(
          left: 16,
          right: 20,
          bottom: 12,
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            mainAxisSize: MainAxisSize.min,
            children: [
              // Title and secondary VJ tag
              Row(
                crossAxisAlignment: CrossAxisAlignment.baseline,
                textBaseline: TextBaseline.alphabetic,
                children: [
                  Text(
                    '${movie.title} :',
                    style: const TextStyle(
                      color: AppColors.textPrimary,
                      fontSize: 24,
                      fontWeight: FontWeight.bold,
                      letterSpacing: -0.5,
                    ),
                  ),
                  if (movie.secondaryLabel != null) ...[
                    const SizedBox(width: 8),
                    Text(
                      movie.secondaryLabel!,
                      style: const TextStyle(
                        color: AppColors.accentGreen,
                        fontSize: 20,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                  ],
                ],
              ),

              const SizedBox(height: 6),

              // Description
              Text(
                movie.description,
                maxLines: 3,
                overflow: TextOverflow.ellipsis,
                style: const TextStyle(
                  color: AppColors.textSecondary,
                  fontSize: 13,
                  height: 1.35,
                ),
              ),

              const SizedBox(height: 14),

              // Watch Now action row with large green play circle
              InkWell(
                onTap: () {},
                borderRadius: BorderRadius.circular(30),
                child: Row(
                  mainAxisSize: MainAxisSize.min,
                  children: [
                    // Green circular play button
                    Container(
                      width: 54,
                      height: 54,
                      decoration: const BoxDecoration(
                        color: AppColors.accentGreen,
                        shape: BoxShape.circle,
                        boxShadow: [
                          BoxShadow(
                            color: Color(0x5500D522),
                            blurRadius: 16,
                            offset: Offset(0, 4),
                          ),
                        ],
                      ),
                      child: const Center(
                        child: Icon(
                          Icons.play_arrow,
                          color: Colors.white,
                          size: 32,
                        ),
                      ),
                    ),
                    const SizedBox(width: 14),
                    const Text(
                      'Watch Now',
                      style: TextStyle(
                        color: AppColors.textPrimary,
                        fontSize: 16,
                        fontWeight: FontWeight.w600,
                      ),
                    ),
                  ],
                ),
              ),
            ],
          ),
        ),
      ],
    );
  }
}
