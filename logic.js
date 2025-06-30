// logic.js
(function(){
  const root = document.getElementById('bubble-extension');
  const urlParams = new URLSearchParams(window.location.search);

  const finalText = decodeURIComponent(urlParams.get('final') || '🎉 Well Done!');
  const bubbleImg = decodeURIComponent(urlParams.get('img') || 'https://media.tenor.com/mqvTrVZEMxIAAAAi/bubble-bfdi.gif');
  const isCustomImg = bubbleImg !== 'https://media.tenor.com/mqvTrVZEMxIAAAAi/bubble-bfdi.gif';
  const finalImg = decodeURIComponent(urlParams.get('finalImg') || '');
  const noChest = urlParams.get('nochest') === 'true';

  const feedbackFont = decodeURIComponent(urlParams.get('feedbackFont') || 'Comic Sans MS, sans-serif');
  const feedbackColor = decodeURIComponent(urlParams.get('feedbackColor') || '#ffffff');
  const feedbackBg = decodeURIComponent(urlParams.get('feedbackBg') || '#f39c12');
  const feedbackStyle = decodeURIComponent(urlParams.get('feedbackStyle') || 'default');
  const feedbackSize = decodeURIComponent(urlParams.get('feedbackSize') || '32');

  const taskFont = decodeURIComponent(urlParams.get('taskFont') || 'sans-serif');
  const taskColor = decodeURIComponent(urlParams.get('taskColor') || '#ffffff');
  const taskBg = decodeURIComponent(urlParams.get('taskBg') || '#00f2fe');
  const taskSize = decodeURIComponent(urlParams.get('taskSize') || '22');

  let popSoundSrc = decodeURIComponent(urlParams.get('popSound') || '');
  if (!popSoundSrc.trim()) popSoundSrc = 'https://nikashum93.github.io/bubbles-by-nika-shum/pop.mp3';

  const TASKS = {};
  for (let [key, value] of urlParams.entries()) {
    if (key.startsWith('task')) {
      const id = parseInt(key.replace('task', ''));
      const decoded = decodeURIComponent(value);
      if (decoded.trim()) TASKS[id] = decoded;
    }
  }

  const total = Object.keys(TASKS).length;
  let popped = 0;
  let finalUnlocked = false;
  const bubbles = [];

  const counter = document.createElement('div');
  counter.innerHTML = `🫧 <strong>0 / ${total}</strong>`;
  Object.assign(counter.style, {
    position: 'absolute', top: '20px', left: '20px', zIndex: 300,
    background: 'linear-gradient(135deg, #f6f9fc, #dff9fb)',
    padding: '10px 16px', borderRadius: '12px', fontFamily: 'sans-serif',
    fontSize: '18px', color: '#2d3436', boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
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
        position: 'absolute', width: '80px', height: '80px', zIndex: 100,
        pointerEvents: 'auto', cursor: 'pointer', transition: 'transform 0.2s ease'
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
        const popSound = new Audio(popSoundSrc);
        popSound.play().catch(() => {});
        el.remove();
        showMessage(i);
        popped++;
        counter.innerHTML = `🫧 <strong>${popped} / ${total}</strong>`;

        const sparkle = document.createElement('div');
        sparkle.textContent = '✨';
        Object.assign(sparkle.style, {
          position: 'absolute', left: el.style.left, top: el.style.top,
          fontSize: '18px', zIndex: 150, pointerEvents: 'none', opacity: 1,
          transition: 'opacity 0.6s ease-out, transform 0.6s ease-out'
        });
        root.appendChild(sparkle);
        requestAnimationFrame(() => {
          sparkle.style.opacity = '0';
          sparkle.style.transform = 'scale(1.6)';
        });
        setTimeout(() => sparkle.remove(), 600);
      });

      el.addEventListener('mouseenter', () => { bubble.dx *= 0.2; bubble.dy *= 0.2; });
      el.addEventListener('mouseleave', () => { bubble.dx *= 5; bubble.dy *= 5; });

      root.appendChild(el);
    }
  }

  window.addEventListener('load', () => {
    setTimeout(createBubbles, 100);
  });

  function animate() {
    const W = root.clientWidth;
    const H = root.clientHeight;
    for (const b of bubbles) {
      if (!b.el.parentNode) continue;
      let x = b.el.offsetLeft + b.dx;
      let y = b.el.offsetTop + b.dy;

      if (x <= 0 || x >= W - 80) b.dx = -b.dx + (Math.random() - 0.5) * 0.2;
      if (y <= 0 || y >= H - 80) b.dy = -b.dy + (Math.random() - 0.5) * 0.2;

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
      position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
      background: taskBg, color: taskColor, fontFamily: taskFont,
      padding: '24px 36px', borderRadius: '20px', fontSize: `${taskSize}px`,
      textAlign: 'center', boxShadow: '0 6px 16px rgba(0,0,0,0.3)', zIndex: 200,
      pointerEvents: 'auto', cursor: 'pointer'
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
    if (noChest && !finalImg) {
      return showFinalTextOnly();
    }
    if (finalImg) {
      const img = document.createElement('img');
      img.src = finalImg;
      Object.assign(img.style, {
        position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
        maxWidth: '60%', zIndex: 300, cursor: 'pointer', pointerEvents: 'auto'
      });
      root.appendChild(img);
      img.addEventListener('click', () => {
        showFinalTextOnly();
      });
    } else {
      const chest = document.createElement('img');
      chest.src = 'https://img.genially.com/64233afb55129a0017751c8e/915b9b98-7a24-4b3f-887a-28042ba9acca.png';
      Object.assign(chest.style, {
        position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
        width: '240px', cursor: 'pointer', zIndex: 300, pointerEvents: 'auto'
      });
      root.appendChild(chest);

      chest.addEventListener('click', () => {
        chest.src = 'https://img.genially.com/64233afb55129a0017751c8e/d76550fd-2622-441f-bbf2-faee6906772e.png';
        showFinalTextOnly();
      });
    }
  }

  function showFinalTextOnly() {
    const label = document.createElement('div');
    label.textContent = finalText;
    Object.assign(label.style, {
      position: 'absolute', top: '38%', left: '50%', transform: 'translate(-50%, -50%)',
      fontSize: `${feedbackSize}px`, fontWeight: 'bold', color: feedbackColor, background: feedbackBg,
      padding: '16px 30px', borderRadius: '16px', fontFamily: feedbackFont,
      boxShadow: '0 8px 20px rgba(0,0,0,0.3)', zIndex: 400, pointerEvents: 'none',
      textShadow: '2px 2px 6px rgba(0,0,0,0.4)'
    });
    if (feedbackStyle === 'neon') {
      label.style.textShadow = `0 0 8px ${feedbackColor}, 0 0 16px ${feedbackColor}`;
    } else if (feedbackStyle === 'gradient') {
      label.style.background = `linear-gradient(135deg, ${feedbackColor}, ${feedbackBg})`;
      label.style.color = '#fff';
      label.style.textShadow = 'none';
    }
    root.appendChild(label);
  }
})();
