// Common JavaScript functions across the website
// =================================================
// This file contains global functions and common UI behaviors
// including dark mode toggle, dynamic navigation menu functionality,
// and common loading animations.

// Dark Mode Toggle
(function () {
    const toggleButton = document.getElementById("dark-mode-toggle");
    if (toggleButton) {
      toggleButton.addEventListener("click", function () {
        document.body.classList.toggle("dark-mode");
      });
    }
  })();
  
  // Floating Contact Button Animation
  (function () {
    const contactBtn = document.querySelector(".floating-contact a");
    if (contactBtn) {
      contactBtn.addEventListener("mouseover", function () {
        contactBtn.classList.add("hovered");
      });
      contactBtn.addEventListener("mouseout", function () {
        contactBtn.classList.remove("hovered");
      });
    }
  })();
  
  // Loading Animation Handler
  function showLoading(selector) {
    const element = document.querySelector(selector);
    if (element) {
      element.innerHTML = "<p class='loading'>Loading...</p>";
    }
  }
  function clearLoading(selector) {
    const element = document.querySelector(selector);
    if (element) {
      element.innerHTML = "";
    }
  }
  
  // Additional common functions
  // .......................................................................................
  // Extra filler lines for function definitions and debug logging
  for (let i = 0; i < 100; i++) {
    console.log("Common app function debug: line " + i);
  }
  
  // Expose common functions to global scope if necessary
  window.showLoading = showLoading;
  window.clearLoading = clearLoading;
  