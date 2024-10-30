
import React, { useEffect } from 'react';

import './SkyEffect.css';


const SkyEffect = () => {
  useEffect(() => {
    const sky = document.getElementById('sky');
    const numberOfStars = 500;
    const numberOfShootingStars = 6;
    if (sky) {
      sky.innerHTML = '';


      for (let i = 0; i < numberOfStars; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.top = `${Math.random() * 100}%`;
        star.style.left = `${Math.random() * 100}%`;
        star.style.animation = `${Math.random() * 2 + 1}s twinkle infinite ${Math.random() * 2
          }s`;
        sky.appendChild(star);
      }
      for (let i = 0; i < numberOfShootingStars; i++) {
        const shootingStar = document.createElement('div');
        shootingStar.className = 'shooting-star';
        shootingStar.style.top = `${Math.random() * 100}%`;
        shootingStar.style.animation = `${Math.random() * 5 + 20
          }s shooting-star infinite ${Math.random() * 25}s`;
        sky.appendChild(shootingStar);
      }
    }
  }, []);

  return <div className="sky" id="sky"></div>;
};

export default SkyEffect;
