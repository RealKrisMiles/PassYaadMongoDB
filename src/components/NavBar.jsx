import React from 'react'

const NavBar = () => {
  return (
    <nav className='bg-violet-300 flex justify-between items-center px-3 h-16'>
        <div className="logo font-bold  font-bold text-violet-500">
          <span className='text-white'> &lt;</span>
          Pass
          
          <span className='text-white'>Yaad / &gt; </span>
        
          </div>
        <ul>
           
        </ul>
        <button className='text-white bg-slate-200 flex items-center justify-center gap-2 p-2 rounded-xl'>
          <a className='text-white bg-slate-200 flex items-center justify-center gap-2  rounded-xl'  href="https://github.com/RealKrisMiles" target='_blank'>
          <img width={30} src="public/icons/github.svg" alt="github logo" />
          <span className='text-violet-400'>GitHub</span></a>
        </button>

    </nav>
  )
}

export default NavBar