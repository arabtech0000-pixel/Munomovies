import 'package:flutter/material.dart';
import '../models/movie_model.dart';
import '../theme/app_colors.dart';
import '../widgets/movie_poster_card.dart';
import '../data/sample_movies.dart';

class CategoryDetailScreen extends StatefulWidget {
  final String categoryTitle;
  final bool isVeejay;

  const CategoryDetailScreen({
    super.key,
    required this.categoryTitle,
    this.isVeejay = false,
  });

  @override
  State<CategoryDetailScreen> createState() => _CategoryDetailScreenState();
}

class _CategoryDetailScreenState extends State<CategoryDetailScreen> {
  bool _isSearchActive = false;
  final TextEditingController _searchController = TextEditingController();
  late List<Movie> _movies;

  @override
  void initState() {
    super.initState();
    _movies = _generateCategoryMovies(widget.categoryTitle, widget.isVeejay);
  }

  @override
  void dispose() {
    _searchController.dispose();
    super.dispose();
  }

  List<Movie> _generateCategoryMovies(String title, bool isVj) {
    final basePool = [
      ...SampleMovies.latestOnMunowatch,
      ...SampleMovies.continueWatching,
      SampleMovies.featuredMovie,
    ];

    return List.generate(15, (index) {
      final base = basePool[index % basePool.length];
      return Movie(
        id: '${title.toLowerCase()}-$index',
        title: '${widget.categoryTitle} Release #${index + 1}',
        vj: isVj ? widget.categoryTitle : (index % 2 == 0 ? 'Vj Junior' : 'Vj Emmy'),
        genre: isVj ? 'Action / Drama' : widget.categoryTitle,
        duration: '01h 45m',
        fileSize: '1.45 GB',
        description: 'Exclusive Ugandan Luganda translated movie on MunoWatch.',
        posterUrl: base.posterUrl,
        isLocked: true,
      );
    });
  }

  List<Movie> get _filteredMovies {
    final q = _searchController.text.trim().toLowerCase();
    if (q.isEmpty) return _movies;
    return _movies.where((m) => m.title.toLowerCase().contains(q) || m.vj.toLowerCase().contains(q)).toList();
  }

  @override
  Widget build(BuildContext context) {
    final movies = _filteredMovies;

    return Scaffold(
      backgroundColor: AppColors.primaryBackground,
      appBar: AppBar(
        backgroundColor: AppColors.primaryBackground,
        elevation: 0,
        leading: IconButton(
          icon: const Icon(Icons.arrow_back, color: Colors.white),
          onPressed: () => Navigator.pop(context),
        ),
        title: Text(
          widget.categoryTitle,
          style: const TextStyle(
            color: Colors.white,
            fontSize: 19,
            fontWeight: FontWeight.bold,
          ),
        ),
        actions: [
          IconButton(
            icon: const Icon(Icons.cast, color: Colors.white),
            onPressed: () {
              ScaffoldMessenger.of(context).showSnackBar(
                const SnackBar(content: Text('Scanning for TV screens...')),
              );
            },
          ),
          IconButton(
            icon: const Icon(Icons.notifications_none, color: Colors.white),
            onPressed: () {},
          ),
          IconButton(
            icon: Icon(
              _isSearchActive ? Icons.close : Icons.search,
              color: _isSearchActive ? AppColors.accentGreen : Colors.white,
            ),
            onPressed: () {
              setState(() {
                _isSearchActive = !_isSearchActive;
                if (!_isSearchActive) _searchController.clear();
              });
            },
          ),
          const SizedBox(width: 8),
        ],
      ),
      body: Column(
        children: [
          if (_isSearchActive)
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
              child: TextField(
                controller: _searchController,
                autofocus: true,
                style: const TextStyle(color: Colors.white),
                decoration: InputDecoration(
                  hintText: 'Search in ${widget.categoryTitle}...',
                  hintStyle: const TextStyle(color: AppColors.textMuted),
                  prefixIcon: const Icon(Icons.search, color: AppColors.textMuted),
                  filled: true,
                  fillColor: AppColors.secondaryBackground,
                  contentPadding: const EdgeInsets.symmetric(vertical: 10),
                  border: OutlineInputBorder(
                    borderRadius: BorderRadius.circular(8),
                    borderSide: BorderSide.none,
                  ),
                ),
                onChanged: (_) => setState(() {}),
              ),
            ),
          Expanded(
            child: movies.isEmpty
                ? const Center(
                    child: Text(
                      'No movies found',
                      style: TextStyle(color: AppColors.textMuted),
                    ),
                  )
                : GridView.builder(
                    padding: const EdgeInsets.all(10),
                    gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
                      crossAxisCount: 3,
                      childAspectRatio: 2 / 3,
                      crossAxisSpacing: 8,
                      mainAxisSpacing: 8,
                    ),
                    itemCount: movies.length,
                    itemBuilder: (context, index) {
                      final movie = movies[index];
                      return MoviePosterCard(
                        movie: movie,
                        onTap: () {
                          ScaffoldMessenger.of(context).showSnackBar(
                            SnackBar(
                              content: Text('Selected ${movie.title} (${movie.vj})'),
                              duration: const Duration(seconds: 1),
                            ),
                          );
                        },
                      );
                    },
                  ),
          ),
        ],
      ),
    );
  }
}
