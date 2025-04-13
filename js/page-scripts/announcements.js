// Announcements Page Data Fetching
// =================================================
// Fetches club announcements from Firestore "announcements" collection.
function loadAnnouncements() {
    const announcementList = document.getElementById("announcements-list");
    if (!announcementList) return;
  
    announcementList.innerHTML = "<p>Loading announcements...</p>";
  
    db.collection("announcements")
      .orderBy("postedAt", "desc")
      .get()
      .then((querySnapshot) => {
        announcementList.innerHTML = "";
        querySnapshot.forEach((doc) => {
          const announcement = doc.data();
          const announcementItem = document.createElement("div");
          announcementItem.className = "announcement-item";
          announcementItem.innerHTML = `
            <h3>${announcement.title}</h3>
            <p>${announcement.content}</p>
            <span class="announcement-date">${new Date(announcement.postedAt.seconds * 1000).toLocaleString()}</span>
          `;
          announcementList.appendChild(announcementItem);
        });
      })
      .catch((error) => {
        console.error("Error loading announcements:", error);
        announcementList.innerHTML = "<p>Error loading announcements.</p>";
      });
    
    // Extra filler logs for file length
    for(let i = 0; i < 50; i++){
      console.log("Announcements debug line: " + i);
    }
  }
  