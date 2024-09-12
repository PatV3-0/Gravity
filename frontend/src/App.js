import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Playlist from './pages/Playlist';
import Library from './pages/Library';
import About from './pages/About';
import SplashPage from './pages/SplashPage';

class App extends Component {
  componentDidMount() {
    console.log("Womp");
  }

  handleSearch = (query) => {
    console.log('Search query:', query);
    // Add search functionality here if needed
  };

  render() {
    // Dummy data for playlists and songs
    const dummyPlaylists = [
      { id: 1, name: 'Villain mode' },
      { id: 2, name: 'Car jams' },
      { id: 3, name: 'Taytay be craycray' },
      { id: 4, name: 'CHEESE!' },
      { id: 5, name: 'Drunk on life' },
      { id: 6, name: 'Unhinged, unmedicated!' },
      { id: 7, name: 'Hot girl summer' }
    ];

    const dummySongs = [
      { id: 1, title: 'Too Sweet', artist: 'Hozier', album: 'Some Hozier album idk', genre: 'Sad indie?', releaseYear: 2023, duration: '3:30' },
      { id: 2, title: 'Okay boomer', artist: 'Wish I knew', album: 'Probably TikTok', genre: 'Weird', releaseYear: 2020, duration: '4:00' },
      { id: 3, title: 'My kink is karma', artist: 'Chapel Roan', album: 'Your favourite artists artist', genre: 'Hell yeah', releaseYear: 2020, duration: '4:00' },
      { id: 4, title: 'Viva La Vida', artist: 'Coldplay', album: 'Viva La Vida', genre: 'Alternative Rock', releaseYear: 2008, duration: '4:02' },
      { id: 5, title: 'Levitating', artist: 'Dua Lipa', album: 'Future Nostalgia', genre: 'Pop', releaseYear: 2020, duration: '3:23' },
      { id: 6, title: 'Take Me to Church', artist: 'Hozier', album: 'Hozier', genre: 'Indie Rock', releaseYear: 2013, duration: '4:02' },
      { id: 7, title: 'Bohemian Rhapsody', artist: 'Queen', album: 'A Night at the Opera', genre: 'Classic Rock', releaseYear: 1975, duration: '5:55' },
      { id: 8, title: 'Bad Guy', artist: 'Billie Eilish', album: 'When We All Fall Asleep, Where Do We Go?', genre: 'Alternative Pop', releaseYear: 2019, duration: '3:14' },
      { id: 9, title: 'Sunflower', artist: 'Post Malone', album: 'Hollywood\'s Bleeding', genre: 'Hip-Hop', releaseYear: 2019, duration: '2:38' },
      { id: 10, title: 'Radioactive', artist: 'Imagine Dragons', album: 'Night Visions', genre: 'Alternative', releaseYear: 2012, duration: '3:06' },
      { id: 11, title: 'Billie Jean', artist: 'Michael Jackson', album: 'Thriller', genre: 'Pop', releaseYear: 1982, duration: '4:54' },
      { id: 12, title: 'Hotel California', artist: 'Eagles', album: 'Hotel California', genre: 'Classic Rock', releaseYear: 1976, duration: '6:30' },
      { id: 13, title: 'Shallow', artist: 'Lady Gaga & Bradley Cooper', album: 'A Star Is Born Soundtrack', genre: 'Soundtrack', releaseYear: 2018, duration: '3:36' },
    ];

    const cheesePlaylist = {
      id: 4, 
      name: 'CHEESE', 
      songs: [
        { id: 1, title: 'Hotel California', artist: 'Eagles', album: 'Hotel California', genre: 'Classic Rock', releaseYear: 1976, duration: '6:30' },
        { id: 2, title: 'Bohemian Rhapsody', artist: 'Queen', album: 'A Night at the Opera', genre: 'Classic Rock', releaseYear: 1975, duration: '5:55' },
        { id: 3, title: 'Stairway to Heaven', artist: 'Led Zeppelin', album: 'Led Zeppelin IV', genre: 'Rock', releaseYear: 1971, duration: '8:02' },
        { id: 4, title: 'Born to Run', artist: 'Bruce Springsteen', album: 'Born to Run', genre: 'Rock', releaseYear: 1975, duration: '4:30' },
        { id: 5, title: 'Sweet Child O\' Mine', artist: 'Guns N\' Roses', album: 'Appetite for Destruction', genre: 'Hard Rock', releaseYear: 1987, duration: '5:56' },
        { id: 6, title: 'Back in Black', artist: 'AC/DC', album: 'Back in Black', genre: 'Rock', releaseYear: 1980, duration: '4:15' },
        { id: 7, title: 'Smoke on the Water', artist: 'Deep Purple', album: 'Machine Head', genre: 'Hard Rock', releaseYear: 1972, duration: '5:40' },
        { id: 8, title: 'Free Bird', artist: 'Lynyrd Skynyrd', album: '(Pronounced \'Lĕh-\'nérd \'Skin-\'nérd)', genre: 'Southern Rock', releaseYear: 1973, duration: '9:08' },
        { id: 9, title: 'Rock You Like a Hurricane', artist: 'Scorpions', album: 'Love at First Sting', genre: 'Hard Rock', releaseYear: 1984, duration: '4:11' },
        { id: 10, title: 'Don\'t Stop Believin\'', artist: 'Journey', album: 'Escape', genre: 'Rock', releaseYear: 1981, duration: '4:11' }
      ]
    };

    const dummyUser = {
      name: 'Bill Cipher',
      email: 'bill@weirdmageddon.com',
      bio: 'Music lover, playlist curator, and vinyl collector collector.',
    };

    const dummyFollowers = [
      { id: 1, name: '8 Ball' },
      { id: 2, name: 'Gideon Gleeful' },
      { id: 3, name: 'That goat' }
    ];

    const dummyFollowing = [
      { id: 1, name: 'Pine Tree' },
      { id: 2, name: 'Poindexter' },
    ];

    return (
      <Router>
        <Header />
        <Routes>
          {/* Directly show the SplashPage for "/" route */}
          <Route path="/" element={<SplashPage />} />
          {/* Define other routes */}
          <Route 
            path="/home" 
            element={
              <Home 
                playlists={dummyPlaylists} 
                songs={dummySongs} 
                onSearch={this.handleSearch} 
              />
            } 
          />
          <Route 
            path="/profile" 
            element={
              <Profile 
                user={dummyUser} 
                playlists={dummyPlaylists} 
                songs={dummySongs} 
                followers={dummyFollowers} 
                following={dummyFollowing} 
              />
            } 
          />
          <Route 
            path="/playlist" 
            element={
              <Playlist 
                playlist={cheesePlaylist} 
                songs={cheesePlaylist.songs} 
              />
            } 
          />
          <Route 
            path="/library" 
            element={
              <Library 
                playlists={dummyPlaylists} 
                songs={dummySongs} 
              />
            } 
          />
          <Route path="/about" element={<About />} />
          {/* Catch-all route to redirect to home if none of the above match */}
          <Route path="*" element={<SplashPage />} />
        </Routes>
      </Router>
    );
  }
}

export default App;
