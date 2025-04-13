import { auth, provider, db } from "./firebase-config.js";
import { signInWithPopup } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-auth.js";
import { collection, getDocs, addDoc } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-firestore.js";

// Google Sign-In
async function googleSignIn() {
  try {
    const result = await signInWithPopup(auth, provider);
    alert(`Welcome, ${result.user.displayName}!`);
    localStorage.setItem("isLoggedIn", true); // For restricted page access
    window.location.href = "courses.html";
  } catch (error) {
    console.error("Error during sign-in:", error);
    alert("Sign-in failed.");
  }
}

// Dynamically Populate Bulletin Slider
async function populateBulletinSlider() {
  const sliderContainer = document.getElementById("bulletin-slider");
  const bulletinsCollection = collection(db, "bulletins");
  const snapshot = await getDocs(bulletinsCollection);

  snapshot.forEach((doc) => {
    const img = document.createElement("img");
    img.src = doc.data().imageUrl;
    img.alt = "Bulletin";
    sliderContainer.appendChild(img);
  });

  let index = 0;
  setInterval(() => {
    const slides = sliderContainer.querySelectorAll("img");
    slides.forEach((slide, i) => (slide.style.display = i === index ? "block" : "none"));
    index = (index + 1) % slides.length;
  }, 2000);
}

// Newsletter Subscription
async function subscribeNewsletter(event) {
  event.preventDefault();
  const emailInput = document.getElementById("email");
  const email = emailInput.value;

  try {
    await addDoc(collection(db, "subscribers"), { email });
    alert("Thanks for subscribing!");
    emailInput.value = "";
  } catch (error) {
    console.error("Error adding subscription:", error);
    alert("Subscription failed.");
  }
}

// Initialize
document.addEventListener("DOMContentLoaded", () => {
  populateBulletinSlider();
  const loginButton = document.getElementById("google-login-btn");
  if (loginButton) loginButton.addEventListener("click", googleSignIn);

  const newsletterForm = document.getElementById("newsletter-form");
  if (newsletterForm) newsletterForm.addEventListener("submit", subscribeNewsletter);
});