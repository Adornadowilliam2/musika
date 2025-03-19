import React from 'react'
import { Link } from 'react-router-dom'

export default function Navigation() {
    return (
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
    )
}
