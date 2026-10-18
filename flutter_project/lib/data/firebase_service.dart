import 'package:firebase_auth/firebase_auth.dart';
import 'package:firebase_database/firebase_database.dart';

class FirebaseService {
  final FirebaseAuth _auth = FirebaseAuth.instance;
  final DatabaseReference _dbRef = FirebaseDatabase.instance.ref();

  // Current user getter
  User? get currentUser => _auth.currentUser;
  Stream<User?> get authStateChanges => _auth.authStateChanges();

  // Sign In with Email & Password
  Future<UserCredential?> signIn(String email, String password) async {
    try {
      return await _auth.signInWithEmailAndPassword(email: email, password: password);
    } catch (e) {
      rethrow;
    }
  }

  // Sign Up with Email & Password
  Future<UserCredential?> signUp(String email, String password) async {
    try {
      UserCredential credential = await _auth.createUserWithEmailAndPassword(
        email: email,
        password: password,
      );
      // Initialize user node in Realtime Database
      if (credential.user != null) {
        await _dbRef.child('users/${credential.user!.uid}').set({
          'email': email,
          'createdAt': ServerValue.timestamp,
        });
      }
      return credential;
    } catch (e) {
      rethrow;
    }
  }

  // Sign Out
  Future<void> signOut() async {
    await _auth.signOut();
  }

  // Save Watchlist / Favorites to Realtime Database
  Future<void> saveMovieToWatchlist(String movieId, Map<String, dynamic> movieData) async {
    User? user = _auth.currentUser;
    if (user != null) {
      await _dbRef.child('users/${user.uid}/watchlist/$movieId').set(movieData);
    }
  }

  // Remove from Watchlist
  Future<void> removeMovieFromWatchlist(String movieId) async {
    User? user = _auth.currentUser;
    if (user != null) {
      await _dbRef.child('users/${user.uid}/watchlist/$movieId').remove();
    }
  }

  // Fetch Watchlist Stream
  Stream<DatabaseEvent> watchlistStream() {
    User? user = _auth.currentUser;
    if (user != null) {
      return _dbRef.child('users/${user.uid}/watchlist').onValue;
    }
    // Return empty stream if not logged in
    return const Stream.empty();
  }
}
