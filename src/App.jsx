import { useEffect, useState } from 'react';
import './App.css';
import {toast, ToastContainer,} from "react-toastify";
function App() {
  const [musicData, setMusicData] = useState([]); 
  
  const getData = async () => {
    try {
      const response = await fetch("https://musica-api-eta.vercel.app/api/user"); 
      const data = await response.json(); 
      setMusicData(data); 
    } catch (error) {
      toast.error("Error fetching data", error); 
    }
  };

  useEffect(() => {
    getData(); 
  }, []); 

  return (
    <div className="App">
      <ToastContainer />
      <h1 className='bg-[black] text-center text-[yellow] ' style={{marginBottom:"10px"}}>Music List</h1>
      <div className="flex justify-evenly flex-wrap gap-2">
        {musicData.length > 0 ? (
          musicData.map((music) => (
            <div key={music.id} className="w-[300px] border text-center border-black" style={{padding:"10px"}}>
              <h2>{music.name}</h2>
              <img src={music.image} alt={music.name} className='w-[100%]' />
              <audio controls style={{transform:"scale(0.9", display: "block",margin:"auto", width:"100%"}}>
                <source src={music.music} type='audio/mpeg' />
              </audio>
            </div>
          ))
        ) : (
          <p>Loading music data...</p>
        )}
      </div>
    </div>
  );
}

export default App;
