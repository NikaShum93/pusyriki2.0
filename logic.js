(function(){
  const root = document.getElementById('bubble-extension');
  const urlParams = new URLSearchParams(window.location.search);

  const finalText = decodeURIComponent(urlParams.get('final') || '🎉 Well Done!');
  const bubbleImg = decodeURIComponent(urlParams.get('img') || 'https://media.tenor.com/mqvTrVZEMxIAAAAi/bubble-bfdi.gif');
  const isCustomImg = bubbleImg !== 'https://media.tenor.com/mqvTrVZEMxIAAAAi/bubble-bfdi.gif';

  const customFont = decodeURIComponent(urlParams.get('font') || 'Comic Sans MS');
  const customBg = decodeURIComponent(urlParams.get('bg') || '#4facfe');
  const customColor = decodeURIComponent(urlParams.get('color') || '#ffffff');
  const finalImg = decodeURIComponent(urlParams.get('finalImg') || '');
  const showFinalFlag = urlParams.get('showFinal') !== 'false';
  const finalFont = decodeURIComponent(urlParams.get('finalFont') || 'Comic Sans MS');
  const finalBg = decodeURIComponent(urlParams.get('finalBg') || '#e67e22');
  const finalColor = decodeURIComponent(urlParams.get('finalColor') || '#ffffff');
  const popSoundUrl = decodeURIComponent(urlParams.get('popSound') || 'https://nikashum93.github.io/bubbles-by-nika-shum/pop.mp3');

  const TASKS = {};
  for (let [key, value] of urlParams.entries()) {
    if (key.startsWith('task')) {
      const id = parseInt(key.replace('task', ''));
      TASKS[id] = decodeURIComponent(value);
    }
  }

  const total = Object.keys(TASKS).length;
  let popped = 0;
  let finalUnlocked = false;
  const bubbles = [];

  const counter = document.createElement('div');
  counter.innerHTML = `🫧 <strong>0 / ${total}</strong>`;
  Object.assign(counter.style, {
    position: 'absolute',
    top: '20px',
    left: '20px',
    background: 'linear-gradient(135deg, #f6f9fc, #dff9fb)',
    padding: '10px 16px',
    borderRadius: '12px',
    fontFamily: 'sans-serif',
    fontSize: '18px',
    color: '#2d3436',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    zIndex: 300,
    pointerEvents: 'none'
  });
  root.appendChild(counter);

  function createBubbles() {
    const padding = 10;
    const maxW = root.clientWidth - 80 - padding * 2;
    const maxH = root.clientHeight - 80 - padding * 2;

    for (let i = 1; i <= total; i++) {
      const el = document.createElement('img');
      el.src = bubbleImg;
      el.style.opacity = isCustomImg ? '1' : '0.6';
      Object.assign(el.style, {
        position: 'absolute',
        width: '80px',
        height: '80px',
        pointerEvents: 'auto',
        cursor: 'pointer',
        zIndex: 100,
        transition: 'transform 0.2s ease'
      });

      const x = padding + Math.random() * maxW;
      const y = padding + Math.random() * maxH;
      el.style.left = x + 'px';
      el.style.top = y + 'px';

      let dx = (Math.random() * 2 - 1) * 1.5;
      let dy = (Math.random() * 2 - 1) * 1.5;
      if (Math.abs(dx) < 0.3) dx = 0.3 * Math.sign(dx || 1);
      if (Math.abs(dy) < 0.3) dy = 0.3 * Math.sign(dy || 1);

      const bubble = { el, dx, dy, id: i };
      bubbles.push(bubble);

      el.addEventListener('click', () => {
        const popSound = new Audio(popSoundUrl);
        popSound.play().catch(() => {});
        el.remove();
        showMessage(i);
        popped++;
        counter.innerHTML = `🫧 <strong>${popped} / ${total}</strong>`;

        const sparkle = document.createElement('div');
        sparkle.textContent = '✨';
        Object.assign(sparkle.style, {
          position: 'absolute',
          left: el.style.left,
          top: el.style.top,
          fontSize: '18px',
          zIndex: 150,
          pointerEvents: 'none',
          opacity: 1,
          transition: 'opacity 0.6s ease-out, transform 0.6s ease-out'
        });
        root.appendChild(sparkle);
        requestAnimationFrame(() => {
          sparkle.style.opacity = '0';
          sparkle.style.transform = 'scale(1.6)';
        });
        setTimeout(() => sparkle.remove(), 600);
      });

      el.addEventListener('mouseenter', () => {
        bubble.dx *= 0.2;
        bubble.dy *= 0.2;
      });
      el.addEventListener('mouseleave', () => {
        bubble.dx *= 5;
        bubble.dy *= 5;
      });

      root.appendChild(el);
    }
  }

  window.addEventListener('load', () => {
    setTimeout(createBubbles, 50);
  });

  function animate() {
    const W = root.clientWidth;
    const H = root.clientHeight;
    for (const b of bubbles) {
      if (!b.el.parentNode) continue;

      let x = b.el.offsetLeft + b.dx;
      let y = b.el.offsetTop + b.dy;

      if (x <= 0 || x >= W - 80) {
        b.dx = -b.dx + (Math.random() - 0.5) * 0.2;
      }
      if (y <= 0 || y >= H - 80) {
        b.dy = -b.dy + (Math.random() - 0.5) * 0.2;
      }

      b.dx += (Math.random() - 0.5) * 0.05;
      b.dy += (Math.random() - 0.5) * 0.05;

      b.dx = Math.max(-1.5, Math.min(1.5, b.dx));
      b.dy = Math.max(-1.5, Math.min(1.5, b.dy));

      b.el.style.left = (b.el.offsetLeft + b.dx) + 'px';
      b.el.style.top  = (b.el.offsetTop + b.dy) + 'px';
    }
    requestAnimationFrame(animate);
  }
  animate();

  function showMessage(id) {
    const msg = document.createElement('div');
    msg.innerHTML = TASKS[id] || `<b>Task ${id}</b>`;
    Object.assign(msg.style, {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      background: customBg,
      color: customColor,
      fontFamily: customFont,
      padding: '24px 36px',
      borderRadius: '20px',
      fontSize: '22px',
      textAlign: 'center',
      boxShadow: '0 6px 16px rgba(0,0,0,0.3)',
      pointerEvents: 'auto',
      cursor: 'pointer',
      zIndex: 200
    });

    msg.addEventListener('click', () => {
      msg.remove();
      if (popped === total && !finalUnlocked && showFinalFlag) {
        finalUnlocked = true;
        showFinal();
      }
    });

    root.appendChild(msg);
  }

  function showFinal() {
    counter.remove();

    if (finalImg) {
      const chest = document.createElement('img');
      chest.src = finalImg;
      Object.assign(chest.style, {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%) scale(1)',
        width: '240px',
        cursor: 'pointer',
        zIndex: 300,
        pointerEvents: 'auto',
        transition: 'transform 0.3s ease'
      });
      root.appendChild(chest);

      chest.addEventListener('click', () => {
        chest.style.transform = 'translate(-50%, -50%) scale(1.1)';
        const openSound = new Audio('https://nikashum93.github.io/bubbles-by-nika-shum/open.mp3');
        openSound.play().catch(() => {});
        const label = document.createElement('div');
        label.textContent = finalText;
        Object.assign(label.style, {
          position: 'absolute',
          top: '32%',
          left: 'calc(50% - 6px)',
          transform: 'translate(-50%, -50%)',
          fontSize: '32px',
          fontWeight: 'bold',
          fontFamily: finalFont,
          color: finalColor,
          padding: '16px 30px',
          background: finalBg,
          borderRadius: '16px',
          boxShadow: '0 8px 20px rgba(0,0,0,0.3)',
          zIndex: 400,
          pointerEvents: 'none',
          textAlign: 'center'
        });
        root.appendChild(label);
      });
    } else {
      const label = document.createElement('div');
      label.textContent = finalText;
      Object.assign(label.style, {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        fontSize: '32px',
        fontWeight: 'bold',
        fontFamily: finalFont,
        color: finalColor,
        padding: '16px 30px',
        background: finalBg,
        borderRadius: '16px',
        boxShadow: '0 8px 20px rgba(0,0,0,0.3)',
        zIndex: 400,
        pointerEvents: 'none',
        textAlign: 'center'
      });
      root.appendChild(label);
    }
  }
})();