import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

const outfits = [
  { id: 1, title: 'Royal Kurti', img: '/images/kurti.png', price: 1299 },
  { id: 2, title: 'Silk Saree', img: '/images/saree.png', price: 2499 },
  { id: 3, title: 'Floral Kurti', img: '/images/kurti2.png', price: 999 },
  { id: 4, title: 'Embroidered Saree', img: '/images/saree2.png', price: 2999 },
  { id: 5, title: 'Casual Kurti', img: '/images/kurti3.png', price: 799 }
];

export default function TryOn({ addToCart, go }) {
  const [userImg, setUserImg] = useState(null);
  const [overlay, setOverlay] = useState(outfits[0].img);
  const [pos, setPos] = useState({ x: 0, y: 0, scale: 1 });
  const ovRef = useRef(null);

  // Handle file upload
  const onFile = (e) => {
    const f = e.target.files?.[0];
    if (!f) return;
    const url = URL.createObjectURL(f);
    setUserImg(url);
  };

  // Drag overlay
  useEffect(() => {
    const el = ovRef.current;
    if (!el) return;
    let dragging = false, startX = 0, startY = 0, origX = 0, origY = 0;

    const pointerDown = (ev) => {
      dragging = true;
      el.setPointerCapture(ev.pointerId);
      startX = ev.clientX;
      startY = ev.clientY;
      origX = pos.x;
      origY = pos.y;
      el.style.cursor = 'grabbing';
    };

    const pointerMove = (ev) => {
      if (!dragging) return;
      const dx = ev.clientX - startX;
      const dy = ev.clientY - startY;
      setPos(p => ({ ...p, x: origX + dx, y: origY + dy }));
    };

    const pointerUp = (ev) => {
      dragging = false;
      try { el.releasePointerCapture(ev.pointerId) } catch (e) {}
      el.style.cursor = 'grab';
    };

    el.addEventListener('pointerdown', pointerDown);
    window.addEventListener('pointermove', pointerMove);
    window.addEventListener('pointerup', pointerUp);

    return () => {
      el.removeEventListener('pointerdown', pointerDown);
      window.removeEventListener('pointermove', pointerMove);
      window.removeEventListener('pointerup', pointerUp);
    };
  }, [pos]);

  return (
    <div>
      <h2>Virtual Try-On</h2>
      <div style={{ display: 'flex', gap: 20 }}>
        <div style={{ flex: 1 }}>
          <div className="card">
            <p className="small">Upload your photo (full body recommended)</p>
            <input type="file" accept="image/*" onChange={onFile} />
            <div style={{ marginTop: 12 }}>
              <strong>Choose outfit</strong>
              <div style={{ display: 'flex', gap: 10, marginTop: 10 }}>
                {outfits.map(o => (
                  <img
                    key={o.id}
                    src={o.img}
                    alt={o.title}
                    style={{
                      width: 64,
                      height: 84,
                      objectFit: 'cover',
                      cursor: 'pointer',
                      border: o.img === overlay ? '2px solid #000' : '1px solid #ddd'
                    }}
                    onClick={() => setOverlay(o.img)}
                  />
                ))}
              </div>
              <div style={{ marginTop: 12, display: 'flex', gap: 8, alignItems: 'center' }}>
                <label className="small">Scale</label>
                <input
                  type="range"
                  min="0.5"
                  max="2"
                  step="0.01"
                  value={pos.scale}
                  onChange={(e) => setPos(p => ({ ...p, scale: Number(e.target.value) }))}
                />
                <button
                  className="btn"
                  onClick={() => {
                    if (!userImg) return alert('Please upload your photo first!');
                    addToCart({ id: Date.now(), title: 'TryOn Item', img: overlay, price: 999 });
                  }}
                >
                  Add overlay to cart
                </button>
                <button className="btn" onClick={() => go('cart')}>Go to Cart</button>
              </div>
            </div>
          </div>
        </div>

        <div style={{ width: 460 }}>
          <div className="tryon-canvas card" style={{ position: 'relative', width: '100%', height: 400, background: '#f8f8f8' }}>
            {!userImg && <div className="empty">No photo yet — upload to try on</div>}
            {userImg && <img src={userImg} className="user" alt="you" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />}
            <motion.img
              src={overlay}
              ref={ovRef}
              alt="overlay"
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                transform: `translate(${pos.x}px, ${pos.y}px) scale(${pos.scale})`,
                cursor: 'grab',
                width: 150
              }}
              draggable={false}
            />
          </div>
          <p className="small" style={{ marginTop: 8 }}>
            Tip: Use the scale slider and drag the outfit to position over your photo.
          </p>
        </div>
      </div>
    </div>
  );
}
