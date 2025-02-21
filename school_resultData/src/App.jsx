import React from 'react'
import Home from './page/Home'
import Result from './page/Result'
import { Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'


const App = () => {

  return (
    <div className='bg-[#F8F9FD]'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/result/:id' element={<Result />} />
        </Routes>

    
    </div>
  )
}

export default App



