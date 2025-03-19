import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ToastContainer } from "react-toastify";
import Navigation from './components/Navigation';
import Home from './pages/Home';
import Contact from './pages/Contact';
import Album from './pages/Album';
import Artist from './pages/Artist';
import './App.css'
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
    <div className="App">
      {/* Wrap everything with RouterProvider */}
      <ToastContainer />
      {/* This ensures the router context is available for all components */}
      <RouterProvider router={router}>
        {/* Navigation will be rendered for all pages */}
        <Navigation />
      </RouterProvider>
    </div>
  );
}

export default App;
