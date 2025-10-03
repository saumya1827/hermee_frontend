import React from 'react'
import { motion } from 'framer-motion'

const products = [
  {id:1,title:'Silken White Tunic',img:'/images/kurti.png',price:1299},
  {id:2,title:'Cocoa CropTop',img:'/images/kurti2.png',price:799},
  {id:3,title:'Toffee Maxi',img:'/images/kurti3.png',price:1399},
  {id:4,title:'Lunar CropTop',img:'/images/saree.png',price:699},
  {id:5,title:'Petal Gown',img:'/images/saree2.png',price:1599}
]

export default function Home({addToCart, go}){
  return (
    <div>
      <section className="hero">
        <div>
          <div className="title">Modern classics, thoughtfully made</div>
          <p className="lead">Discover a curated edit of Dresses and CropTops — timeless silhouettes, refined details.</p>
          <div style={{marginTop:16}}>
            <button className="btn" onClick={()=>go('tryon')}>Try-On</button>
          </div>
        </div>
        <div style={{flex:1}}>
          <img src="/images/hero-model.png" style={{width:'100%',borderRadius:12,boxShadow:'0 12px 30px rgba(16,24,40,0.08)'}} alt="hero"/>
        </div>
      </section>

      <h2 style={{marginTop:28}}>Collections</h2>
      <div className="grid">
        {products.map((p,i)=>(
          <motion.div key={p.id} className="card" initial={{opacity:0, y:8}} animate={{opacity:1, y:0}} transition={{delay: i*0.08}}>
            <img src={p.img} alt={p.title}/>
            <h3 style={{marginTop:10}}>{p.title}</h3>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginTop:8}}>
              <div style={{fontWeight:700}}>₹{p.price}</div>
              <div style={{display:'flex',gap:8}}>
                <button className="btn" onClick={()=>addToCart(p)}>Add to cart</button>
                <button className="btn" onClick={()=>go('tryon')}>Try</button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
