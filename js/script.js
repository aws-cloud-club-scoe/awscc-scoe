// Import necessary Firebase modules
import { auth, provider, db } from "./firebase-config.js";
import { signInWithPopup } from "firebase/auth";
import { collection, getDocs, addDoc } from "firebase/firestore";

// Google Sign-In Function
async function googleSignIn() {
  try {
    const result = await signInWithPopup(auth, provider);
    alert(`Welcome, ${result.user.displayName}!`);
    localStorage.setItem("isLoggedIn", true); // Save login state for restricted page access
    window.location.href = "courses.html"; // Redirect to the Courses page
  } catch (error) {
    console.error("Error during sign-in:", error);
    alert("Sign-in failed. Please try again.");
  }
}

// Dynamically Populate Bulletin Slider
async function populateBulletinSlider() {
  const sliderContainer = document.getElementById("bulletin-slider");
  const bulletinsCollection = collection(db, "bulletins"); // Firestore collection for bulletin data
  const snapshot = await getDocs(bulletinsCollection);

  snapshot.forEach((doc) => {
    const img = document.createElement("img");
    img.src = doc.data().imageUrl; // Firestore should store `imageUrl`
    img.alt = "Bulletin";
    sliderContainer.appendChild(img);
  });

  // Add sliding functionality for bulletin images
  let index = 0;
  setInterval(() => {
    const slides = sliderContainer.querySelectorAll("img");
    slides.forEach((slide, i) => (slide.style.display = i === index ? "block" : "none"));
    index = (index + 1) % slides.length;
  }, 2000);
}

// Newsletter Subscription Functionality
async function subscribeNewsletter(event) {
  event.preventDefault();
  const emailInput = document.getElementById("email");
  const email = emailInput.value;

  try {
    await addDoc(collection(db, "subscribers"), { email }); // Add email to Firestore `subscribers` collection
    alert("Thanks for subscribing!");
    emailInput.value = ""; // Reset the form input field
  } catch (error) {
    console.error("Error adding subscription:", error);
    alert("Subscription failed. Please try again.");
  }
}

// Initialize Event Listeners
document.addEventListener("DOMContentLoaded", () => {
  // Populate bulletin slider on the landing page
  populateBulletinSlider();

  // Add event listener for Google Sign-In
  const loginButton = document.getElementById("google-login-btn");
  if (loginButton) {
    loginButton.addEventListener("click", googleSignIn);
  }

  // Add event listener for Newsletter Subscription
  const newsletterForm = document.getElementById("newsletter-form");
  if (newsletterForm) {
    newsletterForm.addEventListener("submit", subscribeNewsletter);
  }
});