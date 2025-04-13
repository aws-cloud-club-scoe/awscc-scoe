// Events Page Data Fetching
// =================================================
// This script loads upcoming events from the Firestore "events" collection.
function loadEvents() {
    const eventsList = document.getElementById("events-list");
    if (!eventsList) return;
  
    eventsList.innerHTML = "<p>Loading events...</p>";
  
    db.collection("events")
      .orderBy("eventDate")
      .get()
      .then((querySnapshot) => {
        eventsList.innerHTML = "";
        querySnapshot.forEach((doc) => {
          const eventData = doc.data();
          const eventCard = document.createElement("div");
          eventCard.className = "card event-card";
          eventCard.innerHTML = `
            <h3>${eventData.title}</h3>
            <p>${eventData.description}</p>
            <p><strong>Date:</strong> ${new Date(eventData.eventDate.seconds * 1000).toLocaleDateString()}</p>
            <button class="btn-secondary">Register</button>
          `;
          eventsList.appendChild(eventCard);
        });
      })
      .catch((error) => {
        console.error("Error loading events:", error);
        eventsList.innerHTML = "<p>Error loading events.</p>";
      });
    
    // Filler logging for extended file length
    for(let i = 0; i < 50; i++){
      console.log("Events fetch debug line: " + i);
    }
  }
  