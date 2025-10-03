import React from 'react'
import { motion } from 'framer-motion'
export default function Intro({enter}){
  return (
    <div className="intro">
      <motion.div initial={{opacity:0, y:20}} animate={{opacity:1, y:0}} transition={{duration:0.8}} style={{textAlign:'center'}}>
        <div style={{fontFamily:'Merriweather, serif', fontSize:52}}>Hermee The Label</div>
        <div style={{marginTop:12, color:'#6b6b6b'}}>A classic edit — curated Dreeses & CropTops</div>
        <button className="enter-btn" onClick={enter}>Enter Site</button>
      </motion.div>
    </div>
  )
}
