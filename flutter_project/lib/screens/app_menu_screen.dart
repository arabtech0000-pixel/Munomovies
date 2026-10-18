import 'package:flutter/material.dart';
import '../theme/app_colors.dart';

class AppMenuScreen extends StatelessWidget {
  const AppMenuScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final menuItems = [
      {'icon': Icons.home, 'label': 'HOME'},
      {'icon': Icons.movie_filter, 'label': 'SHOWS'},
      {'icon': Icons.bookmark_border, 'label': 'SAVED'},
      {'icon': Icons.history, 'label': 'RECENTLY WATCHED'},
      {'icon': Icons.arrow_circle_down, 'label': 'DOWNLOADS'},
      {'icon': Icons.settings, 'label': 'SETTINGS'},
      {'icon': Icons.account_circle, 'label': 'MY ACCOUNT'},
      {'icon': Icons.headset_mic, 'label': 'SUPPORT'},
      {'icon': Icons.power_settings_new, 'label': 'LOG OUT'},
    ];

    return Scaffold(
      backgroundColor: AppColors.primaryBackground,
      appBar: AppBar(
        leading: const Icon(Icons.close, color: Colors.white),
        centerTitle: true,
        title: const Text(
          'APP MENU',
          style: TextStyle(
            letterSpacing: 1.5,
            fontWeight: FontWeight.bold,
            fontSize: 16,
          ),
        ),
      ),
      body: ListView.builder(
        padding: const EdgeInsets.symmetric(vertical: 20, horizontal: 16),
        itemCount: menuItems.length,
        itemBuilder: (context, index) {
          final item = menuItems[index];
          return ListTile(
            leading: Icon(
              item['icon'] as IconData,
              color: Colors.white,
              size: 24,
            ),
            title: Text(
              item['label'] as String,
              style: const TextStyle(
                color: Colors.white,
                fontWeight: FontWeight.bold,
                fontSize: 15,
                letterSpacing: 1.1,
              ),
            ),
            onTap: () {},
          );
        },
      ),
    );
  }
}
