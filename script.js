let slideIndex = 0;
const slides = document.querySelector(".slides");
const images = document.querySelectorAll(".slides img");
const dotsContainer = document.querySelector(".dots");

images.forEach((_, i) => {
  const dot = document.createElement("span");
  dot.classList.add("dot");
  dot.addEventListener("click", () => showSlide(i));
  dotsContainer.appendChild(dot);
});
const specialLink = document.querySelector('a[href="#specialMoment"]');
const specialBox = document.getElementById("specialMoment");

if (specialLink && specialBox) {
  specialLink.addEventListener("click", (e) => {
    e.preventDefault();
    specialBox.style.display =
      specialBox.style.display === "block" ? "none" : "block";

    specialBox.scrollIntoView({ behavior: "smooth", block: "center" });
  });
}
const btn = document.querySelector(".gallery-btn");
const menu = document.querySelector(".dropdown-content");

btn.addEventListener("click", () => {
  menu.style.display =
    menu.style.display === "block" ? "none" : "block";
});
function showSlide(index) {
  slideIndex = index;
  slides.style.transform = `translateX(${-index * 100}%)`;
  updateDots();
}

function updateDots() {
  document.querySelectorAll(".dot").forEach((dot, i) => {
    dot.classList.toggle("active", i === slideIndex);
  });
}

function nextSlide() {
  slideIndex = (slideIndex + 1) % images.length;
  showSlide(slideIndex);
}

updateDots();
setInterval(nextSlide, 3000);

const music = document.getElementById("bg-music");
const photoSongs = {
  "img1": "Music/Alipin.mp3",
  "img2": "Music/Harvey-Hers.mp3",
  "img3": "Music/Here With me.mp3",
  "img4": "Music/Johnoy_Danao_Ikaw_at_Ako_.mp3",
  "img5": "Music/EVERYTHING IOWN.mp3"
};

Object.keys(photoSongs).forEach(id => {
  const link = document.querySelector(`a[href="#${id}"]`);
  if (link) {
    link.addEventListener("click", () => {
      music.src = photoSongs[id];
      music.currentTime = 0;
      music.play();
    });
  }
});

document.querySelectorAll(".close-btn").forEach(btn => {
  btn.addEventListener("click", () => music.pause());
});

document.getElementById("surpriseBtn").addEventListener("click", () => {
  const surprise = document.getElementById("surpriseBox");
  surprise.style.display = surprise.style.display === "block" ? "none" : "block";
  surprise.scrollIntoView({ behavior: "smooth", block: "center" });
});

// 💌 Play/Pause music on message button
const msgBtn = document.getElementById("messageBtn");
const msgBox = document.getElementById("messageBox");
let isPlaying = false;

msgBtn.addEventListener("click", () => {
  msgBox.style.display = msgBox.style.display === "block" ? "none" : "block";
  msgBox.scrollIntoView({ behavior: "smooth", block: "center" });

  music.src = "Music/EVERYTHING IOWN.mp3";
  if (!isPlaying) {
    music.play();
  } else {
    music.pause();
  }
  isPlaying = !isPlaying;
});
