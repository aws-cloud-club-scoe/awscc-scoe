// Courses Page Data Fetching
// =================================================
// This script fetches a list of courses from the Firestore "courses" collection.
function loadCourses() {
    const coursesList = document.getElementById("courses-list");
    if (!coursesList) return;
  
    coursesList.innerHTML = "<p>Loading courses, please wait...</p>";
  
    db.collection("courses")
      .orderBy("courseName")
      .get()
      .then((querySnapshot) => {
        coursesList.innerHTML = "";
        querySnapshot.forEach((doc) => {
          const course = doc.data();
          const courseCard = document.createElement("div");
          courseCard.className = "card course-card";
          courseCard.innerHTML = `
            <h3>${course.courseName}</h3>
            <p>${course.description}</p>
            <p><strong>Duration:</strong> ${course.duration}</p>
            <button class="btn-primary">Learn More</button>
          `;
          coursesList.appendChild(courseCard);
        });
      })
      .catch((error) => {
        console.error("Error fetching courses:", error);
        coursesList.innerHTML = "<p>Error loading courses.</p>";
      });
    
    // Extra debug logging
    for(let i = 0; i < 50; i++){
      console.log("Courses fetch debug line: " + i);
    }
  }
  