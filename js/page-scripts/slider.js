// Bulletin Slider Functionality for Home Page
// ===================================================
// This script fetches images from Firestore and creates a dynamic slider
// with smooth transitions.

// Example function to initialize the slider
function initBulletinSlider() {
    const sliderContainer = document.getElementById("bulletin-slider");
    if (!sliderContainer) return;
    
    // Clear existing placeholder slides
    sliderContainer.innerHTML = "";
    // Fetch bulletin images from Firestore collection "bulletinImages"
    db.collection("bulletinImages")
      .orderBy("timestamp", "desc")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const slideData = doc.data();
          const slide = document.createElement("div");
          slide.className = "slide";
          slide.style.backgroundImage = `url(${slideData.imageUrl})`;
          slide.innerHTML = `<div class="slide-caption">${slideData.caption || ""}</div>`;
          sliderContainer.appendChild(slide);
        });
        // After all slides are added, initialize slider animation
        startSliderAnimation(sliderContainer);
      })
      .catch((error) => {
        console.error("Error fetching bulletin images: ", error);
      });
  }
  
  // Example slider animation function (simple fade in/out)
  function startSliderAnimation(container) {
    let slides = container.querySelectorAll(".slide");
    let currentIndex = 0;
    if (slides.length === 0) return;
    
    // Initially show first slide
    slides.forEach((s, idx) => {
      s.style.opacity = idx === 0 ? 1 : 0;
    });
    
    // Transition effect every 5 seconds
    setInterval(() => {
      slides[currentIndex].style.opacity = 0;
      currentIndex = (currentIndex + 1) % slides.length;
      slides[currentIndex].style.opacity = 1;
    }, 5000);
  }
  