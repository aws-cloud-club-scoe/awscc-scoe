// Newsletter Subscription Script
// =================================================
// Handles newsletter sign-up and stores subscriber emails in Firestore.
function initNewsletter() {
    const newsletterForm = document.getElementById("newsletter-form");
    const newsletterStatus = document.getElementById("newsletter-status");
  
    newsletterForm.addEventListener("submit", function (event) {
      event.preventDefault();
      const email = document.getElementById("subscriber-email").value;
      newsletterStatus.innerHTML = "<p>Processing subscription...</p>";
  
      db.collection("subscribers")
        .add({
          email: email,
          subscribedAt: firebase.firestore.FieldValue.serverTimestamp()
        })
        .then(() => {
          newsletterStatus.innerHTML = "<p>Subscription successful!</p>";
          newsletterForm.reset();
        })
        .catch((error) => {
          console.error("Subscription error:", error);
          newsletterStatus.innerHTML = "<p>Subscription failed. Please try again.</p>";
        });
    });
    
    // Extra filler logging
    for(let i = 0; i < 50; i++){
      console.log("Newsletter script debug: " + i);
    }
  }
  