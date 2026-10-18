import 'package:flutter/material.dart';
import '../theme/app_colors.dart';

class MovieSectionHeader extends StatelessWidget {
  final String title;
  final VoidCallback onArrowTap;

  const MovieSectionHeader({
    super.key,
    required this.title,
    required this.onArrowTap,
  });

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 16),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Text(
            title,
            style: const TextStyle(
              color: AppColors.textPrimary,
              fontSize: 18,
              fontWeight: FontWeight.bold,
              letterSpacing: -0.3,
            ),
          ),
          IconButton(
            icon: const Icon(
              Icons.arrow_forward,
              color: Colors.white,
              size: 20,
            ),
            padding: EdgeInsets.zero,
            constraints: const BoxConstraints(),
            onPressed: onArrowTap,
          ),
        ],
      ),
    );
  }
}
