import { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';

import { toast, ToastContainer } from "react-toastify";
import Navigation from '../components/Navigation';


export default function Home() {
    const [musicData, setMusicData] = useState([]);
    const audioRefs = useRef([]);

    const getData = async () => {
        try {
            const response = await fetch("https://musicaapi.vercel.app/api/user");
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
            <Navigation />
       



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
                    <div className='w-full h-full flex justify-center items-center flex-col'>
                        <div className="speaker-container">
                            <div className="speaker">
                                <div className="speaker-body"></div>
                                <div className="speaker-sound"></div>
                            </div>
                        </div>
                        <p className='mt-9'>Loading music data...</p>
                    </div>
                )}
            </div>

            {/* Footer */}
            <footer className='text-center text-white mt-4 fixed bottom-0 left-0 right-0'>
                <p>© 2025 My Playlist. All rights reserved.</p>
            </footer>
        </div>
    )
}
