(function(){
  const root = document.getElementById('bubble-extension');
  const urlParams = new URLSearchParams(window.location.search);
  const finalText = decodeURIComponent(urlParams.get('final') || '🎉 Well Done!');
  const bubbleImg = decodeURIComponent(urlParams.get('img') || 'https://media.tenor.com/mqvTrVZEMxIAAAAi/bubble-bfdi.gif');
  const feedbackImg = decodeURIComponent(urlParams.get('feedbackImg') || '');
  const noChest = urlParams.get('noChest') === '1';

  const fontColor = decodeURIComponent(urlParams.get('fontColor') || '#ffffff');
  const fontFamily = decodeURIComponent(urlParams.get('fontFamily') || 'sans-serif');
  const finalFontColor = decodeURIComponent(urlParams.get('finalFontColor') || '#ffffff');
  const finalFontFamily = decodeURIComponent(urlParams.get('finalFontFamily') || 'Comic Sans MS, sans-serif');

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
    fontFamily: fontFamily,
    fontSize: '18px',
    color: '#2d3436',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    zIndex: 300,
    pointerEvents: 'none'
  });
  root.appendChild(counter);

  function showMessage(id) {
    const msg = document.createElement('div');
    msg.innerHTML = TASKS[id] || `<b>Task ${id}</b>`;
    Object.assign(msg.style, {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      background: 'linear-gradient(135deg, #4facfe, #00f2fe)',
      color: fontColor,
      padding: '24px 36px',
      borderRadius: '20px',
      fontSize: '22px',
      fontFamily: fontFamily,
      textAlign: 'center',
      boxShadow: '0 6px 16px rgba(0,0,0,0.3)',
      pointerEvents: 'auto',
      cursor: 'pointer',
      zIndex: 200
    });

    msg.addEventListener('click', () => {
      msg.remove();
      if (popped === total && !finalUnlocked) {
        finalUnlocked = true;
        showFinal();
      }
    });

    root.appendChild(msg);
  }

  function showFinal() {
    counter.remove();
    if (feedbackImg) {
      const img = document.createElement('img');
      img.src = feedbackImg;
      Object.assign(img.style, {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        maxWidth: '80%',
        zIndex: 300
      });
      root.appendChild(img);

      const label = document.createElement('div');
      label.textContent = finalText;
      Object.assign(label.style, {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -160%)',
        fontSize: '32px',
        fontWeight: 'bold',
        color: finalFontColor,
        background: 'linear-gradient(135deg, #e67e22, #f1c40f)',
        padding: '16px 30px',
        borderRadius: '16px',
        fontFamily: finalFontFamily,
        boxShadow: '0 8px 20px rgba(0,0,0,0.3)',
        zIndex: 400,
        pointerEvents: 'none',
        textShadow: '2px 2px 6px rgba(0,0,0,0.4)'
      });
      root.appendChild(label);
    } else if (!noChest) {
      const chest = document.createElement('img');
      chest.src = 'https://img.genially.com/64233afb55129a0017751c8e/915b9b98-7a24-4b3f-887a-28042ba9acca.png';
      Object.assign(chest.style, {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '240px',
        cursor: 'pointer',
        zIndex: 300,
        pointerEvents: 'auto',
        transition: 'transform 0.3s ease'
      });
      root.appendChild(chest);

      chest.addEventListener('click', () => {
        chest.src = 'https://img.genially.com/64233afb55129a0017751c8e/d76550fd-2622-441f-bbf2-faee6906772e.png';
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
          color: finalFontColor,
          background: 'linear-gradient(135deg, #e67e22, #f1c40f)',
          padding: '16px 30px',
          borderRadius: '16px',
          fontFamily: finalFontFamily,
          boxShadow: '0 8px 20px rgba(0,0,0,0.3)',
          zIndex: 400,
          pointerEvents: 'none',
          textShadow: '2px 2px 6px rgba(0,0,0,0.4)'
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
        color: finalFontColor,
        background: 'linear-gradient(135deg, #e67e22, #f1c40f)',
        padding: '16px 30px',
        borderRadius: '16px',
        fontFamily: finalFontFamily,
        boxShadow: '0 8px 20px rgba(0,0,0,0.3)',
        zIndex: 400,
        pointerEvents: 'none',
        textShadow: '2px 2px 6px rgba(0,0,0,0.4)'
      });
      root.appendChild(label);
    }
  }

  function createBubbles() {
    const padding = 10;
    const maxW = root.clientWidth - 80 - padding * 2;
    const maxH = root.clientHeight - 80 - padding * 2;

    for (let i = 1; i <= total; i++) {
      const el = document.createElement('img');
      el.src = bubbleImg;
      el.style.opacity = bubbleImg.includes('mqvTrVZEMxIAAAAi') ? '0.6' : '1';
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

      el.addEventListener('click', () => {
        const popSound = new Audio('https://nikashum93.github.io/bubbles-by-nika-shum/pop.mp3');
        popSound.play().catch(() => {});
        el.remove();
        showMessage(i);
        popped++;
        counter.innerHTML = `🫧 <strong>${popped} / ${total}</strong>`;
      });

      root.appendChild(el);
      bubbles.push({ el, dx, dy });
    }
  }

  window.addEventListener('load', () => {
    setTimeout(() => {
      createBubbles();
      requestAnimationFrame(animate);
    }, 50);
  });

  function animate() {
    const W = root.clientWidth;
    const H = root.clientHeight;
    for (const b of bubbles) {
      if (!b.el.parentNode) continue;

      let x = b.el.offsetLeft + b.dx;
      let y = b.el.offsetTop + b.dy;

      if (x <= 0 || x >= W - 80) b.dx *= -1;
      if (y <= 0 || y >= H - 80) b.dy *= -1;

      b.el.style.left = x + 'px';
      b.el.style.top = y + 'px';
    }
    requestAnimationFrame(animate);
  }
})();
