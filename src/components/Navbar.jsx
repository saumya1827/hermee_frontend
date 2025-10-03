import React from 'react'
export default function Navbar({go, cartCount, theme, setTheme}){
  return (
    <header className="header">
      <div className="brand">Hermee The Label</div>
      <nav className="nav header-right">
        <a href="#" onClick={(e)=>{e.preventDefault();go('home')}}>Home</a>
        <a href="#" onClick={(e)=>{e.preventDefault();go('tryon')}}>Try-On</a>
        <a href="#" onClick={(e)=>{e.preventDefault();go('cart')}}>Cart <span style={{background:'#111',color:'#fff',padding:'4px 8px',borderRadius:999,fontSize:12,marginLeft:6}}>{cartCount}</span></a>
        <a href="#" onClick={(e)=>{e.preventDefault();go('signin')}}>Sign In</a>
        <button className="dark-toggle" onClick={()=>setTheme(theme==='light'?'dark':'light')}>{theme==='light'?'Dark':'Light'}</button>
      </nav>
    </header>
  )
}
