// logic.js (обновлённая версия)

const params = new URLSearchParams(window.location.search);

const bubbleImage = params.get("bubbleImage") || "https://nikashum93.github.io/pusyriki/assets/bubble.png";
const feedbackText = params.get("feedback") || "🎉 Well done!";
const feedbackImage = params.get("feedbackImage") || "";
const tasksRaw = params.get("tasks") || "";
const fontSize = parseInt(params.get("fontSize") || "36");
const feedbackFontSize = parseInt(params.get("feedbackFontSize") || "36");
const taskBgColor = params.get("taskBgColor") || "#ffffff";
const taskTextColor = params.get("taskTextColor") || "#000000";
const taskEffect = params.get("taskEffect") || "none";
const feedbackColor = params.get("feedbackColor") || "#FFA500";
const feedbackTextColor = params.get("feedbackTextColor") || "#FFFFFF";
const popSoundUrl = params.get("popSound") || "https://nikashum93.github.io/pusyriki/assets/pop.mp3";
const openSoundUrl = params.get("openSound") || "https://nikashum93.github.io/pusyriki/assets/open.mp3";
const noChest = params.get("noChest") === "true";
const neon = params.get("neon") === "true";

const tasks = tasksRaw.split("\n").map(t => t.trim()).filter(t => t !== "");

const container = document.getElementById("bubble-extension");
const popSound = new Audio(popSoundUrl);
const openSound = new Audio(openSoundUrl);

let popped = 0;

function createBubble(taskText, index) {
  const bubble = document.createElement("div");
  bubble.className = "bubble";
  bubble.style.backgroundImage = `url("${bubbleImage}")`;
  bubble.style.backgroundSize = "cover";
  bubble.style.position = "absolute";
  bubble.style.top = `${Math.random() * 80 + 10}%`;
  bubble.style.left = `${Math.random() * 80 + 10}%`;
  bubble.style.width = "80px";
  bubble.style.height = "80px";
  bubble.style.cursor = "pointer";
  bubble.style.transition = "transform 0.3s";
  bubble.dataset.task = taskText;

  function move() {
    if (!bubble.parentElement) return;
    const x = Math.random() * 80 + 10;
    const y = Math.random() * 80 + 10;
    bubble.style.transform = `translate(${x}%, ${y}%)`;
    setTimeout(move, 4000 + Math.random() * 3000);
  }

  move();

  bubble.addEventListener("click", () => {
    popSound.play();
    showTask(taskText);
    bubble.remove();
    popped++;
    if (popped === tasks.length && !noChest) {
      showFeedback();
    }
  });

  container.appendChild(bubble);
}

function showTask(text) {
  const task = document.createElement("div");
  task.className = "task";
  task.innerText = text;
  task.style.position = "absolute";
  task.style.top = "50%";
  task.style.left = "50%";
  task.style.transform = "translate(-50%, -50%)";
  task.style.padding = "1em 2em";
  task.style.fontSize = fontSize + "px";
  task.style.backgroundColor = taskBgColor;
  task.style.color = taskTextColor;
  task.style.borderRadius = "12px";
  task.style.zIndex = 1000;
  task.style.textAlign = "center";

  if (taskEffect === "shadow") {
    task.style.boxShadow = "0 0 20px rgba(0,0,0,0.5)";
  } else if (taskEffect === "border") {
    task.style.border = "3px solid #000";
  } else if (taskEffect === "3d") {
    task.style.boxShadow = "4px 4px 0 #000";
  }

  container.appendChild(task);
  setTimeout(() => task.remove(), 3000);
}

function showFeedback() {
  const feedback = document.createElement("div");
  feedback.className = "feedback";
  feedback.innerText = feedbackText;
  feedback.style.position = "absolute";
  feedback.style.top = "50%";
  feedback.style.left = "50%";
  feedback.style.transform = "translate(-50%, -50%)";
  feedback.style.padding = "1em 2em";
  feedback.style.fontSize = feedbackFontSize + "px";
  feedback.style.backgroundColor = feedbackColor;
  feedback.style.color = feedbackTextColor;
  feedback.style.borderRadius = "16px";
  feedback.style.zIndex = 1000;
  feedback.style.textAlign = "center";
  feedback.style.boxShadow = "0 0 25px #000";

  if (feedbackImage) {
    feedback.innerHTML = `<img src="${feedbackImage}" style="width:150px;height:auto;"><br>${feedbackText}`;
  }

  container.appendChild(feedback);
  openSound.play();
}

tasks.forEach(createBubble);
