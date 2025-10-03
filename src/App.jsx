import React, {useState, useEffect} from 'react'
import Intro from './components/Intro'
import Navbar from './components/Navbar'
import Home from './components/Home'
import TryOn from './components/TryOn'
import Cart from './components/Cart'
import SignIn from './components/SignIn'
import Footer from './components/Footer'

export default function App(){
  const [route, setRoute] = useState('intro')
  const [cart, setCart] = useState(()=> JSON.parse(localStorage.getItem('htl_cart')||'[]'))
  const [theme, setTheme] = useState(()=> localStorage.getItem('htl_theme') || 'light')

  useEffect(()=> localStorage.setItem('htl_cart', JSON.stringify(cart)), [cart])
  useEffect(()=> { localStorage.setItem('htl_theme', theme); document.documentElement.setAttribute('data-theme', theme) }, [theme])

  const addToCart = (item) => setCart(prev=>[...prev,item])
  const removeFromCart = (idx) => setCart(prev=>prev.filter((_,i)=>i!==idx))

  return (
    <div>
      {route==='intro' ? (
        <Intro enter={()=>setRoute('home')} />
      ) : (
        <div className="container">
          <Navbar go={setRoute} cartCount={cart.length} theme={theme} setTheme={setTheme} />
          {route==='home' && <Home addToCart={addToCart} go={setRoute} />}
          {route==='tryon' && <TryOn addToCart={addToCart} go={setRoute} />}
          {route==='cart' && <Cart cart={cart} remove={removeFromCart} go={setRoute} />}
          {route==='signin' && <SignIn go={setRoute} />}
          <Footer />
        </div>
      )}
    </div>
  )
}
