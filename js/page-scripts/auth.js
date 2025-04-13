// Authentication Functions for Login Page
// ==================================================
// This script implements Firebase Auth with Google Sign-In.
function initAuth() {
    const signInButton = document.getElementById("google-signin-btn");
    const signOutButton = document.getElementById("google-signout-btn");
    const userDetails = document.getElementById("user-details");
  
    // Google Sign-In
    signInButton.addEventListener("click", function () {
      const provider = new firebase.auth.GoogleAuthProvider();
      auth.signInWithPopup(provider)
        .then((result) => {
          const user = result.user;
          userDetails.innerHTML = `<p>Welcome, ${user.displayName}</p><img src="${user.photoURL}" alt="Profile Picture"/>`;
          signInButton.style.display = "none";
          signOutButton.style.display = "inline-block";
        })
        .catch((error) => {
          console.error("Error during sign in:", error);
        });
    });
    
    // Sign Out
    signOutButton.addEventListener("click", function () {
      auth.signOut().then(() => {
        userDetails.innerHTML = "";
        signInButton.style.display = "inline-block";
        signOutButton.style.display = "none";
      }).catch((error) => {
        console.error("Error during sign out:", error);
      });
    });
    
    // Monitor auth state
    auth.onAuthStateChanged((user) => {
      if (user) {
        userDetails.innerHTML = `<p>Welcome, ${user.displayName}</p>`;
        signInButton.style.display = "none";
        signOutButton.style.display = "inline-block";
      } else {
        userDetails.innerHTML = "";
        signInButton.style.display = "inline-block";
        signOutButton.style.display = "none";
      }
    });
    
    // Extra logging for debugging
    console.log("Auth module initialized");
    for(let i = 0; i < 50; i++){
      console.log("Auth debug log: " + i);
    }
  }
  