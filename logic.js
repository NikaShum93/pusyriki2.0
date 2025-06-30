// logic.js (обновлённый с учётом правок)

const params = new URLSearchParams(window.location.search);

const bubbleImage = params.get("bubbleImage") || "https://nikashum93.github.io/pusyriki/assets/bubble.png";
const feedbackText = params.get("feedback") || "Well done!";
const feedbackImage = params.get("feedbackImage") || "";
const tasksRaw = params.get("tasks") || "";
const noChest = params.get("noChest") === "true";
const fontSize = parseInt(params.get("fontSize") || "36");
const feedbackFontSize = parseInt(params.get("feedbackFontSize") || "36");
const popSoundUrl = params.get("popSound") || "https://nikashum93.github.io/pusyriki/assets/pop.mp3";
const openSoundUrl = params.get("openSound") || "https://nikashum93.github.io/pusyriki/assets/open.mp3";
const neon = params.get("neon") === "true";
const feedbackColor = params.get("feedbackColor") || "#FFA500";
const feedbackTextColor = params.get("feedbackTextColor") || "white";

const tasks = tasksRaw.split("\n").map(t => t.trim()).filter(t => t !== "");

const container = document.getElementById("bubble-extension");
const popSound = new Audio(popSoundUrl);
const openSound = new Audio(openSoundUrl);

function createBubble(taskText, index) {
  const bubble = document.createElement("div");
  bubble.className = "bubble";
  bubble.style.backgroundImage = `url('${bubbleImage}')`;
  bubble.dataset.index = index;
  bubble.style.top = `${Math.random() * 80 + 10}%`;
  bubble.style.left = `${Math.random() * 80 + 10}%`;

  const move = () => {
    if (!bubble.parentElement) return;
    const x = Math.random() * 80 + 10;
    const y = Math.random() * 80 + 10;
    bubble.style.transform = `translate(${x}%, ${y}%)`;
    setTimeout(move, 4000 + Math.random() * 3000);
  };
  move();

  bubble.addEventListener("click", () => {
    popSound.currentTime = 0;
    popSound.play();
    showTask(taskText);
    bubble.remove();
    popped++;
    if (popped === tasks.length) showFeedback();
  });

  container.appendChild(bubble);
}

function showTask(text) {
  const task = document.createElement("div");
  task.className = "task";
  task.innerText = text;
  task.style.fontSize = fontSize + "px";
  container.appendChild(task);
  setTimeout(() => task.remove(), 3000);
}

function showFeedback() {
  const feedback = document.createElement("div");
  feedback.className = "feedback";
  feedback.innerText = feedbackText;
  feedback.style.background = feedbackColor;
  feedback.style.color = feedbackTextColor;
  feedback.style.fontSize = feedbackFontSize + "px";
  feedback.style.cursor = "pointer";

  if (neon) {
    feedback.style.boxShadow = `0 0 20px ${feedbackColor}, 0 0 40px ${feedbackColor}`;
  }

  const feedbackWrapper = document.createElement("div");
  feedbackWrapper.className = "feedback-wrapper";
  feedbackWrapper.appendChild(feedback);

  if (feedbackImage && !noChest) {
    const img = document.createElement("img");
    img.src = feedbackImage;
    img.style.maxWidth = "30%";
    img.style.display = "block";
    img.style.margin = "0 auto";
    feedbackWrapper.insertBefore(img, feedback);
  } else if (!feedbackImage && !noChest) {
    const img = document.createElement("img");
    img.src = "https://nikashum93.github.io/pusyriki/assets/chest_closed.png";
    img.style.maxWidth = "30%";
    img.style.display = "block";
    img.style.margin = "0 auto";
    feedbackWrapper.insertBefore(img, feedback);
  }

  feedbackWrapper.style.position = "absolute";
  feedbackWrapper.style.top = "50%";
  feedbackWrapper.style.left = "50%";
  feedbackWrapper.style.transform = feedbackImage || !noChest ? "translate(-50%, -110%)" : "translate(-50%, -50%)";

  feedbackWrapper.addEventListener("mouseenter", () => {
    feedbackWrapper.style.transform += " scale(1.05)";
  });
  feedbackWrapper.addEventListener("mouseleave", () => {
    feedbackWrapper.style.transform = feedbackImage || !noChest ? "translate(-50%, -110%)" : "translate(-50%, -50%)";
  });
  feedbackWrapper.addEventListener("click", () => {
    openSound.currentTime = 0;
    openSound.play();
  });

  container.appendChild(feedbackWrapper);
}

let popped = 0;
tasks.forEach((task, i) => createBubble(task, i));
