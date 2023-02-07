import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './components/App.css'
import NavList from './components/NavLink';


import ReactDOM from "react-dom/client";
import { Routes, Route } from "react-router-dom";


function App() {

  return (
    <div className='App'>
     
       <NavList />
      <Routes>
          <Route path="/" element={<Home /> }/>
          <Route  path="characters/" element={<Characters />} />
          <Route  path="/about" element={<About />} />
          <Route  path="/characters/:id" element={<DetailedInfoAboutCharacters />} />
      </Routes>
      </div>
  )

}

export default App


