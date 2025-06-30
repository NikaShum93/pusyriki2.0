<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Редактор Пузыриков</title>
  <style>
    body {
      background: #0b0f1a;
      font-family: 'Rubik', sans-serif;
      color: white;
      margin: 0;
      padding: 2vh;
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    h1 {
      font-size: 2.5em;
      color: #00f9ff;
      text-shadow: 0 0 10px #00f9ff;
      text-align: center;
    }
    .logo {
      width: 100px;
      margin-bottom: 10px;
    }
    label {
      margin-top: 1em;
      font-weight: bold;
      display: block;
    }
    input, textarea, select {
      width: 60vw;
      max-width: 480px;
      margin-top: 0.5em;
      padding: 0.5em;
      border-radius: 8px;
      border: none;
      background: #fff;
      color: #000;
      font-size: 1em;
      outline: none;
      box-shadow: 0 0 4px #00f9ff;
    }
    input:focus, textarea:focus, select:focus {
      box-shadow: 0 0 8px #00f9ff;
    }
    button {
      margin-top: 2em;
      padding: 1em 2em;
      font-size: 1.2em;
      border: none;
      border-radius: 12px;
      background: #ff00e5;
      color: white;
      cursor: pointer;
      box-shadow: 0 0 15px #ff00e5;
    }
    button:hover {
      transform: scale(1.05);
    }
    .output {
      margin-top: 2em;
      word-break: break-word;
      background: #111;
      padding: 1em;
      border-radius: 12px;
      width: 60vw;
      max-width: 480px;
      box-shadow: 0 0 12px #00f9ff;
      border: 1px solid #00f9ff;
      color: #00f9ff;
    }
  </style>
</head>
<body>
  <img class="logo" src="https://nikashum93.github.io/pusyriki/assets/kgb-logo.png" alt="logo" />
  <h1>Пузырики <span style="color:#fff">by Nika Shum & КГБ</span></h1>

  <label>Изображение пузыря (URL)</label>
  <input id="bubbleImage" placeholder="https://..." autocomplete="off" />

  <label>Финальный фидбек</label>
  <input id="feedback" placeholder="🎉 Well done!" autocomplete="off" />

  <label>Изображение фидбека (сундука)</label>
  <input id="feedbackImage" placeholder="https://..." autocomplete="off" />

  <label>Размер шрифта заданий</label>
  <input id="fontSize" type="number" value="36" autocomplete="off" />

  <label>Фон плашки задания</label>
  <input id="taskBgColor" type="color" value="#ffffff" autocomplete="off" />

  <label>Цвет текста задания</label>
  <input id="taskTextColor" type="color" value="#000000" autocomplete="off" />

  <label>Эффект плашки (тень или рамка)</label>
  <select id="taskEffect">
    <option value="none">Нет</option>
    <option value="shadow">Тень</option>
    <option value="border">Рамка</option>
    <option value="3d">3D</option>
  </select>

  <label>Размер шрифта фидбека</label>
  <input id="feedbackFontSize" type="number" value="36" autocomplete="off" />

  <label>Цвет фона фидбека</label>
  <input id="feedbackColor" type="color" value="#FFA500" autocomplete="off" />

  <label>Цвет текста фидбека</label>
  <input id="feedbackTextColor" type="color" value="#FFFFFF" autocomplete="off" />

  <label>Звук лопания пузыря (mp3)</label>
  <input id="popSound" placeholder="https://..." autocomplete="off" />

  <label>Звук открытия сундука (mp3)</label>
  <input id="openSound" placeholder="https://..." autocomplete="off" />

  <label>Отключить сундук</label>
  <select id="noChest">
    <option value="false">Нет</option>
    <option value="true">Да</option>
  </select>

  <label>Неоновое оформление (только для рамки)</label>
  <select id="neon">
    <option value="false">Отключено</option>
    <option value="true">Включено</option>
  </select>

  <label>Задания (по одному в строке)</label>
  <textarea id="tasks" rows="6" placeholder="Например:\nSay a sentence with 'because'\nWhat did you do yesterday?" autocomplete="off"></textarea>

  <button onclick="generate()">🔮 Скопировать код для Genially</button>

  <div class="output" id="output"></div>

  <p style="margin-top:2em; color:#aaa; font-size:0.9em;">© Корпорация Геймификации Будущего</p>

  <script>
    function generate() {
      const cleanedTasks = tasks.value
        .split('\n')
        .map(t => t.trim())
        .filter(t => t !== '')
        .join('\n');

      const params = new URLSearchParams({
        bubbleImage: bubbleImage.value,
        feedback: feedback.value,
        feedbackImage: feedbackImage.value,
        fontSize: fontSize.value,
        taskBgColor: taskBgColor.value,
        taskTextColor: taskTextColor.value,
        taskEffect: taskEffect.value,
        feedbackFontSize: feedbackFontSize.value,
        feedbackColor: feedbackColor.value,
        feedbackTextColor: feedbackTextColor.value,
        popSound: popSound.value,
        openSound: openSound.value,
        noChest: noChest.value,
        neon: neon.value,
        tasks: cleanedTasks
      });

      const url = `https://nikashum93.github.io/pusyriki2.0/index.html?${params.toString()}`;
      output.innerHTML = `<textarea readonly onclick="this.select()" style='width:100%;height:100px;'>\n<iframe src="${url}" style="width:100%;height:100%" frameborder="0" allowfullscreen></iframe>\n</textarea>`;
    }
  </script>
</body>
</html>
