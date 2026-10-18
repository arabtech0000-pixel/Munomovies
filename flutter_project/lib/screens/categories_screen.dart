import 'package:flutter/material.dart';
import '../theme/app_colors.dart';

class CategoriesScreen extends StatefulWidget {
  const CategoriesScreen({super.key});

  @override
  State<CategoriesScreen> createState() => _CategoriesScreenState();
}

class _CategoriesScreenState extends State<CategoriesScreen> {
  bool _isGenreSelected = true;

  final List<String> _genres = const [
    'Action', 'Horror', 'Series', 'Adventure', 'Love Story',
    'Comedy', 'Crime', 'Family', 'Sci FI', 'Romance',
    'Kungu Fu', 'Drama', 'Sport', 'Thriller', 'Animation'
  ];

  final List<String> _veejays = const [
    'Vj Junior', 'Vj Emmy', 'Vj Ice P', 'Vj Tom', 'Vj Ulio',
    'Vj Jingo', 'Vj Shao Khan', 'Vj Sammy', 'Vj Nelly', 'Vj Soul',
    'Vj Kevo', 'Vj Kevin', 'Vj Kriss Sweet', 'Vj Hd', 'Vj Dan De'
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: AppColors.primaryBackground,
      appBar: AppBar(
        leading: const Icon(Icons.arrow_back, color: Colors.white),
        title: const Text('Genres'),
        actions: const [
          Icon(Icons.cast, color: Colors.white),
          SizedBox(width: 16),
          Icon(Icons.notifications_none, color: Colors.white),
          SizedBox(width: 16),
          Icon(Icons.search, color: Colors.white),
          SizedBox(width: 16),
        ],
      ),
      body: Column(
        children: [
          // Subtabs: Genre vs Veejays
          Padding(
            padding: const EdgeInsets.symmetric(vertical: 12),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceEvenly,
              children: [
                GestureDetector(
                  onTap: () => setState(() => _isGenreSelected = true),
                  child: Row(
                    children: [
                      Icon(
                        _isGenreSelected ? Icons.check : Icons.filter_list,
                        color: _isGenreSelected ? AppColors.accentGreen : AppColors.textMuted,
                        size: 20,
                      ),
                      const SizedBox(width: 6),
                      Text(
                        'Genre',
                        style: TextStyle(
                          color: _isGenreSelected ? Colors.white : AppColors.textMuted,
                          fontWeight: FontWeight.w600,
                        ),
                      ),
                    ],
                  ),
                ),
                GestureDetector(
                  onTap: () => setState(() => _isGenreSelected = false),
                  child: Row(
                    children: [
                      Icon(
                        !_isGenreSelected ? Icons.check : Icons.filter_list,
                        color: !_isGenreSelected ? AppColors.accentGreen : AppColors.textMuted,
                        size: 20,
                      ),
                      const SizedBox(width: 6),
                      Text(
                        'Veejays',
                        style: TextStyle(
                          color: !_isGenreSelected ? Colors.white : AppColors.textMuted,
                          fontWeight: FontWeight.w600,
                        ),
                      ),
                    ],
                  ),
                ),
              ],
            ),
          ),
          Expanded(
            child: ListView.builder(
              itemCount: _isGenreSelected ? _genres.length : _veejays.length,
              itemBuilder: (context, index) {
                final item = _isGenreSelected ? _genres[index] : _veejays[index];
                return ListTile(
                  leading: Icon(
                    _isGenreSelected ? Icons.water_drop : Icons.account_circle,
                    color: AppColors.accentGreen,
                  ),
                  title: Text(
                    item,
                    style: const TextStyle(color: Colors.white, fontSize: 16),
                  ),
                  onTap: () {},
                );
              },
            ),
          ),
        ],
      ),
    );
  }
}
