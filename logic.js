(async function () {
  const root = document.getElementById('bubble-extension');
  const urlParams = new URLSearchParams(window.location.search);

  // --- Параметры
  const finalText = decodeURIComponent(urlParams.get('final') || '🎉 Well Done!');
  const bubbleImg = urlParams.get('bubble') || '';
  const finalImg = urlParams.get('img') || '';
  const noChest = urlParams.get('nochest') === '1';
  const textFont = urlParams.get('font') || 'Arial';
  const textColor = urlParams.get('color') || '#ffffff';
  const textSize = parseInt(urlParams.get('size') || '28');
  const feedbackFont = urlParams.get('finalFont') || 'Arial';
  const feedbackColor = urlParams.get('finalColor') || '#ffffff';
  const feedbackSize = parseInt(urlParams.get('finalSize') || '36');
  const soundUrl = urlParams.get('pop') || 'https://nikashum93.github.io/pusyriki2.0/pop.mp3';
  const openSound = 'https://nikashum93.github.io/pusyriki2.0/open.mp3';
  const neonEffect = urlParams.get('neon') === '1';
  const styleEffect = urlParams.get('style') || ''; // gradient, neon, none

  // --- Сбор заданий
  const TASKS = {};
  urlParams.forEach((value, key) => {
    if (key.startsWith('task')) {
      const decoded = decodeURIComponent(value || '');
      if (decoded.trim()) {
        TASKS[key] = decoded.trim();
      }
    }
  });

  const total = Object.keys(TASKS).length;
  const state = { done: 0 };

  // --- Аудио
  const popSound = new Audio(soundUrl);
  const openChest = new Audio(openSound);

  // --- Инициализация
  await loadFrame();
  spawnAllBubbles();

  // === Функции ===

  function loadFrame() {
    return new Promise((resolve) => {
      setTimeout(resolve, 100); // короткая пауза перед спавном пузырей
    });
  }

  function spawnAllBubbles() {
    Object.entries(TASKS).forEach(([key, text]) => spawnBubble(text));
  }

  function spawnBubble(text) {
    const bubble = document.createElement('div');
    bubble.className = 'bubble';
    bubble.textContent = text;
    bubble.style.fontFamily = textFont;
    bubble.style.fontSize = `${textSize}px`;
    bubble.style.color = textColor;
    if (bubbleImg) {
      bubble.style.backgroundImage = `url(${bubbleImg})`;
      bubble.style.backgroundSize = 'contain';
      bubble.style.backgroundRepeat = 'no-repeat';
      bubble.style.backgroundPosition = 'center';
      bubble.textContent = '';
    }

    const size = 80;
    const startX = Math.random() * (window.innerWidth - size);
    const startY = Math.random() * (window.innerHeight - size);

    bubble.style.position = 'absolute';
    bubble.style.left = `${startX}px`;
    bubble.style.top = `${startY}px`;
    bubble.style.width = `${size}px`;
    bubble.style.height = `${size}px`;
    bubble.style.display = 'flex';
    bubble.style.alignItems = 'center';
    bubble.style.justifyContent = 'center';
    bubble.style.borderRadius = '50%';
    bubble.style.cursor = 'pointer';
    bubble.style.transition = 'transform 0.2s';

    moveBubble(bubble);
    bubble.onclick = () => {
      popSound.currentTime = 0;
      popSound.play();
      showLabel(text);
      bubble.remove();
      state.done++;
      if (state.done === total) setTimeout(showFinalFeedback, 600);
    };

    root.appendChild(bubble);
  }

  function moveBubble(bubble) {
    let dx = (Math.random() - 0.5) * 2;
    let dy = (Math.random() - 0.5) * 2;

    function animate() {
      const rect = bubble.getBoundingClientRect();
      if (rect.left + dx < 0 || rect.right + dx > window.innerWidth) dx = -dx;
      if (rect.top + dy < 0 || rect.bottom + dy > window.innerHeight) dy = -dy;

      bubble.style.left = `${rect.left + dx}px`;
      bubble.style.top = `${rect.top + dy}px`;

      requestAnimationFrame(animate);
    }

    animate();
  }

  function showLabel(text) {
    const label = document.createElement('div');
    label.textContent = text;
    label.style.position = 'fixed';
    label.style.top = '50%';
    label.style.left = '50%';
    label.style.transform = 'translate(-50%, -50%)';
    label.style.background = '#222';
    label.style.color = textColor;
    label.style.fontFamily = textFont;
    label.style.fontSize = `${textSize}px`;
    label.style.padding = '10px 20px';
    label.style.borderRadius = '20px';
    label.style.zIndex = '999';
    root.appendChild(label);
    setTimeout(() => label.remove(), 1500);
  }

  function showFinalFeedback() {
    const wrapper = document.createElement('div');
    wrapper.style.position = 'fixed';
    wrapper.style.top = '50%';
    wrapper.style.left = '50%';
    wrapper.style.transform = 'translate(-50%, -50%)';
    wrapper.style.display = 'flex';
    wrapper.style.flexDirection = 'column';
    wrapper.style.alignItems = 'center';
    wrapper.style.cursor = 'pointer';
    wrapper.style.zIndex = 999;

    const label = document.createElement('div');
    label.textContent = finalText;
    label.style.fontFamily = feedbackFont;
    label.style.fontSize = `${feedbackSize}px`;
    label.style.color = feedbackColor;
    label.style.padding = '10px 20px';
    label.style.borderRadius = '20px';
    label.style.marginBottom = finalImg || !noChest ? '10px' : '0';

    if (styleEffect === 'neon') {
      label.style.boxShadow = `0 0 10px ${feedbackColor}, 0 0 20px ${feedbackColor}`;
    }
    if (styleEffect === 'gradient') {
      label.style.background = `linear-gradient(45deg, ${feedbackColor}, #ffffff)`;
      label.style.color = '#000';
    } else {
      label.style.background = '#222';
    }

    const image = document.createElement('img');
    if (finalImg) {
      image.src = finalImg;
      image.style.width = '150px';
    } else if (!noChest) {
      image.src = 'https://media.tenor.com/mqvTrVZEMxIAAAAi/bubble-bfdi.gif';
      image.style.width = '150px';
    }

    wrapper.appendChild(label);
    if (finalImg || !noChest) wrapper.appendChild(image);
    wrapper.onclick = () => {
      openChest.currentTime = 0;
      openChest.play();
      showSparkles(wrapper);
    };

    root.appendChild(wrapper);
  }

  function showSparkles(container) {
    for (let i = 0; i < 20; i++) {
      const sparkle = document.createElement('div');
      sparkle.style.position = 'absolute';
      sparkle.style.width = '6px';
      sparkle.style.height = '6px';
      sparkle.style.borderRadius = '50%';
      sparkle.style.background = 'gold';
      sparkle.style.left = '50%';
      sparkle.style.top = '50%';
      sparkle.style.transform = 'translate(-50%, -50%)';
      sparkle.style.animation = `flyOut 1s ease-out forwards`;
      sparkle.style.animationDelay = `${i * 30}ms`;
      container.appendChild(sparkle);
      setTimeout(() => sparkle.remove(), 1000);
    }
  }

})();
