import { useState, useEffect, useRef } from 'react';
import './App.css';
import { toast, ToastContainer } from 'react-toastify';

function App() {
  const [musicData, setMusicData] = useState([]);
  const [currentTrack, setCurrentTrack] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0); 
  const [searchQuery, setSearchQuery] = useState('');
  const audioRef = useRef(null);

  const getData = async () => {
    try {
      const response = await fetch('https://musica-api-eta.vercel.app/api/user');
      const data = await response.json();
      setMusicData(data);

      
      if (data.length > 0) {
        setCurrentTrack({
          track: data[0].music,
          cover: data[0].image,
          name: data[0].name,
        });
      }
    } catch (error) {
      toast.error('Error fetching data', error);
    }
  };

  const handleTrackClick = (track, cover, name, index) => {
    setCurrentTrack({ track, cover, name });
    setCurrentIndex(index); 
    audioRef.current.load(); 
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredSongs = musicData.filter((music) =>
    music.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  
  const songsToDisplay = filteredSongs.slice(0, 10);



  useEffect(() => {
    if (songsToDisplay.length > 0) {
      const currentSong = songsToDisplay[currentIndex];
      setCurrentTrack({
        track: currentSong.music,
        cover: currentSong.image,
        name: currentSong.name,
      });
    }
  }, [currentIndex, songsToDisplay]);

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="App">
      <ToastContainer />
      <header>
        <h1>My Playlist 𐐝1gg@</h1>
      </header>

      <div className="container">
        {/* Music Player */}
        <div className="music-player">
          <div className="player-header">
            <h2>Now Playing</h2>
            <p id="current-track">
              {currentTrack ? `Now playing: ${currentTrack.name}` : 'No track playing'}
            </p>
          </div>
          <div id="album-cover" className="album-cover">
            <img src={currentTrack ? currentTrack.cover : 'default-cover.jpg'} alt="Album Cover" />
          </div>

          {/* Conditionally render audio player */}
          {currentTrack && currentTrack.track && (
            <audio ref={audioRef} controls>
              <source src={currentTrack.track} type="audio/mpeg" />
              Your browser does not support the audio element.
            </audio>
          )}

        
        </div>

        {/* Playlist Section */}
        <div className="playlist">
          <h2>Tracks</h2>

          {/* Search Bar */}
          <input
            type="text"
            placeholder="Search for a song..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="search-bar"
          />

          <ul id="track-list">
            {songsToDisplay.length > 0 ? (
              songsToDisplay.map((music, index) => (
                <li
                  key={music.id}
                  className="track"
                  onClick={() => handleTrackClick(music.music, music.image, music.name, index)}
                >
                  {music.name}
                </li>
              ))
            ) : (
              <li>No tracks found</li>
            )}
          </ul>
        </div>
      </div>

      <footer>
        <p>&copy; 2025 My Playlist. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
