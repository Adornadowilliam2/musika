import { useEffect, useState, useRef } from 'react';
import './App.css';
import { toast, ToastContainer } from "react-toastify";
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/Home';
import Contact from './pages/Contact';
import Album from './pages/Album';
import Artist from './pages/Artist';

function App() {
  const router = createBrowserRouter([
    {
      path:"/",
      element: <Home />
    },
    {
      path:'/contact',
      element: <Contact />
    },
    {
      path:"/album",
      element: <Album />
    },
    {
      path:"/artist",
      element: <Artist />
    }
  ])

  return (
   <RouterProvider router={router} />
  );
}

export default App;
