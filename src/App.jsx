import { useEffect, useState, useRef } from 'react';
import './App.css';
import { toast, ToastContainer } from "react-toastify";

function App() {
  const [musicData, setMusicData] = useState([]);
  const audioRefs = useRef([]);

  const getData = async () => {
    try {
      const response = await fetch("https://musica-api-eta.vercel.app/api/user");
      const data = await response.json();
      setMusicData(data);
    } catch (error) {
      toast.error("Error fetching data", error);
    }
  };

  const handleEnd = (index) => {
    if (index < musicData.length - 1) {
      const nextAudio = audioRefs.current[index + 1];
      nextAudio.play();
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="App">
      <ToastContainer />
      {/* Navbar */}
      <nav className="navbar">
        <div className="navbar-container">
          <a href="#" className="navbar-logo">MusicSite</a>
          <ul className="navbar-links">
            <li><a href="#">Home</a></li>
            <li><a href="#">Artists</a></li>
            <li><a href="#">Albums</a></li>
            <li><a href="#">Contact</a></li>
          </ul>

        </div>
      </nav>



      {/* Music Cards Container */}
      <div className="music-container">
        {musicData.length > 0 ? (
          musicData.map((music, index) => (
            <div key={music.id} className="music-card">
              <img src={music.image} alt={music.name} className="music-image" />
              <div className="music-info">
                <h2 className="music-title">{music.name}</h2>
                <audio
                  ref={(el) => audioRefs.current[index] = el}
                  controls
                  className="audio-player"
                  onEnded={() => handleEnd(index)}
                >
                  <source src={music.music} type="audio/mpeg" />
                </audio>
              </div>
            </div>
          ))
        ) : (
          <div className='w-full h-full flex justify-center items-center'>
            <img src="" alt="logo" />
            <p>Loading music data...</p>
          </div>

        )}
      </div>

      {/* Footer */}
      <footer className='text-center text-white mt-4 fixed bottom-0 left-0 right-0'>
        <p>© 2025 My Playlist. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
