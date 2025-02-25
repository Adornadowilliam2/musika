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
      <h1 className="bg-black p-2 text-center text-yellow-500 mb-9 text-[24px]">
        My Playlist
      </h1>
      <div className="flex justify-evenly flex-wrap gap-2">
        {musicData.length > 0 ? (
          musicData.map((music, index) => (
            <div key={music.id} className="w-[300px] border text-center border-black bg-[#1f1e36] p-2.5 rounded-2xl">

              <img src={music.image} alt={music.name} className="w-[200px] m-auto d-block" />
              <h2 className='text-white text-left'>{music.name}</h2>
              <audio
                ref={(el) => audioRefs.current[index] = el}
                controls
                className='m-auto w-[100%] d-block scale-100'
                onEnded={() => handleEnd(index)}
              >
                <source src={music.music} type="audio/mpeg" />
              </audio>
            </div>
          ))
        ) : (
          <p>Loading music data...</p>
        )}
      </div>
      <footer className='text-center text-white mt-4'>
        <p>© 2025 My Playlist. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
