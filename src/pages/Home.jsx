import { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';

import { toast, ToastContainer } from "react-toastify";


export default function Home() {
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
                    <a href="#" className="navbar-logo">
                        {/* Wrap each letter in a span */}
                        <span className="letter">M</span>
                        <span className="letter">u</span>
                        <span className="letter">s</span>
                        <span className="letter">i</span>
                        <span className="letter">c</span>
                        <span className="letter">S</span>
                        <span className="letter">i</span>
                        <span className="letter">t</span>
                        <span className="letter">e</span>
                    </a>
                    <ul className="navbar-links">
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/artist">Artists</Link></li>
                        <li><Link to="/album">Albums</Link></li>
                        <li><Link to="/contact">Contact</Link></li>
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
