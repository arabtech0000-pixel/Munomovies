import 'package:flutter/material.dart';
import '../theme/app_colors.dart';

class HomeHeader extends StatelessWidget {
  const HomeHeader({super.key});

  @override
  Widget build(BuildContext context) {
    return Container(
      height: 56,
      padding: const EdgeInsets.symmetric(horizontal: 16),
      color: AppColors.primaryBackground,
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          // Left: Stylized MN brand logo
          Row(
            children: [
              RichText(
                text: const TextSpan(
                  children: [
                    TextSpan(
                      text: 'M',
                      style: TextStyle(
                        color: Colors.white,
                        fontWeight: FontWeight.w900,
                        fontSize: 22,
                        letterSpacing: -1,
                      ),
                    ),
                    TextSpan(
                      text: 'W',
                      style: TextStyle(
                        color: AppColors.accentGreen,
                        fontWeight: FontWeight.w900,
                        fontSize: 22,
                        letterSpacing: -1,
                      ),
                    ),
                  ],
                ),
              ),
            ],
          ),

          // Right: Action Icons (Cast, Notification, Search)
          Row(
            children: [
              IconButton(
                icon: const Icon(Icons.cast, color: Colors.white, size: 22),
                onPressed: () {},
                splashRadius: 20,
              ),
              IconButton(
                icon: const Icon(Icons.notifications_none, color: Colors.white, size: 22),
                onPressed: () {},
                splashRadius: 20,
              ),
              IconButton(
                icon: const Icon(Icons.search, color: Colors.white, size: 22),
                onPressed: () {},
                splashRadius: 20,
              ),
            ],
          ),
        ],
      ),
    );
  }
}
