import React from "react"
import { Link } from "gatsby"                                                                                                               

const Navbar = () => {

  return (
    <>
      <div className="navbar">
        <ul className="navitems">
          <Link to="/projects">Projects</Link>
          <Link to="/blog">Blog</Link>
          <a href={`ScottNewman-Resume.pdf`} download>R&eacute;sum&eacute;</a>
          <Link to="/contact">Contact</Link>
        </ul>
      </div>
    </>
  )
        
}

export default Navbar
