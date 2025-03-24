// Generate decorative hearts
function createHearts() {
  const container = document.querySelector(".container");
  const colors = ["#e25c67", "#f7d6d9", "#f2b5bb"];

  for (let i = 0; i < 6; i++) {
    const heart = document.createElement("div");
    heart.classList.add("heart");
    heart.innerHTML = "❤️";
    heart.style.fontSize = Math.floor(Math.random() * 30 + 20) + "px";
    heart.style.left = Math.floor(Math.random() * 100) + "%";
    heart.style.top = Math.floor(Math.random() * 100) + "%";
    container.appendChild(heart);
  }
}

createHearts();

// Show acceptance content and trigger confetti
function showAcceptance() {
  document.querySelector(".initial-content").classList.add("hidden");
  document.querySelector(".celebration-content").classList.add("visible");
  startConfetti();
}

// Show rejection content
function showRejection() {
  document.querySelector(".initial-content").classList.add("hidden");
  document.querySelector(".rejection-content").classList.add("visible");
}

// Return to initial content
function showInitialContent() {
  document.querySelector(".rejection-content").classList.remove("visible");
  document.querySelector(".initial-content").classList.remove("hidden");
}

// Confetti animation
const canvas = document.getElementById("confetti-canvas");
const ctx = canvas.getContext("2d");
const particles = [];
const particleCount = 150;

function startConfetti() {
  // Set canvas to full window size
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  // Create particles
  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height - canvas.height,
      size: Math.random() * 10 + 5,
      color: `hsl(${Math.random() * 360}, 100%, 70%)`,
      speed: Math.random() * 3 + 2,
      angle: Math.random() * 2 * Math.PI,
      rotation: Math.random() * 0.2 - 0.1,
      rotationSpeed: Math.random() * 0.01 - 0.005,
    });
  }

  // Start animation
  animateConfetti();
}

function animateConfetti() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  let stillActive = false;

  for (let i = 0; i < particles.length; i++) {
    const p = particles[i];

    if (p.y < canvas.height) {
      stillActive = true;

      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rotation);

      ctx.fillStyle = p.color;
      ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);

      ctx.restore();

      p.y += p.speed;
      p.x += Math.sin(p.angle) * 2;
      p.rotation += p.rotationSpeed;
    }
  }

  if (stillActive) {
    requestAnimationFrame(animateConfetti);
  }
}

// Adjust canvas size when window resizes
window.addEventListener("resize", function () {
  if (canvas.width > 0) {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
});
