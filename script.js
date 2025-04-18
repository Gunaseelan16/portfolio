

// Typewriter Effect
const typewriterText = ["DESIGNER", "DEVELOPER"];
const typewriterElement = document.querySelector(".typewriter-text");
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeWriter() {
    const currentText = typewriterText[textIndex];

    if (!isDeleting) {
        // Typing the text
        typewriterElement.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;

        // If the text is fully typed, start deleting
        if (charIndex === currentText.length) {
            isDeleting = true;
            setTimeout(typeWriter, 1000); // Pause before deleting
        } else {
            setTimeout(typeWriter, 100); // Typing speed
        }
    } else {
        // Deleting the text
        typewriterElement.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;

        // If the text is fully deleted, move to the next word
        if (charIndex === 0) {
            isDeleting = false;
            textIndex++;

            // Reset to the first word if the last word is deleted
            if (textIndex === typewriterText.length) {
                textIndex = 0;
            }

            setTimeout(typeWriter, 500); // Pause before typing the next word
        } else {
            setTimeout(typeWriter, 50); // Deleting speed
        }
    }
}

// Start the typewriter effect
typeWriter();


function hamburg() {
    const dropdown = document.querySelector('.dropdown');
    dropdown.classList.toggle('active');
}

function cancel() {
    const dropdown = document.querySelector('.dropdown');
    dropdown.classList.remove('active');
}





  document.getElementById("contactForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent the default form submission

    // Collect the form data
    const formData = {
      name: document.getElementById("name").value,
      phone: document.getElementById("phone").value,
      email: document.getElementById("email").value,
      message: document.getElementById("message").value,
    };

    // Send the data to the backend using Fetch API
    fetch('http://localhost:3000/submit-contact', { // Make sure the URL is correct
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
    .then(response => response.json()) // Parse the response as JSON
    .then(data => {
      // Display the response message in the frontend
      const responseMessageElement = document.getElementById("responseMessage");
      responseMessageElement.style.display = "block";
      responseMessageElement.textContent = data.message; // Display success message from backend
      responseMessageElement.style.color = "green"; // Set the color to green for success

      // Optionally, clear the form after successful submission
      document.getElementById("contactForm").reset();
    })
    .catch(error => {
      // Handle any errors that occurred during the request
      const responseMessageElement = document.getElementById("responseMessage");
      responseMessageElement.style.display = "block";
      responseMessageElement.textContent = "Something went wrong. Please try again later."; // Error message
      responseMessageElement.style.color = "red"; // Set the color to red for error
    });
  });



document.addEventListener('DOMContentLoaded', function() {
    // Skill column toggle functionality
    const skillColumns = document.querySelectorAll('.skill-column');
    
    skillColumns.forEach(column => {
        const header = column.querySelector('.column-header');
        
        header.addEventListener('click', () => {
            // Close all other columns
            skillColumns.forEach(col => {
                if (col !== column) {
                    col.classList.remove('active');
                }
            });
            
            // Toggle current column
            column.classList.toggle('active');
            
            // Show corresponding projects
            const columnId = column.id;
            const projectId = columnId.replace('column', 'projects');
            showProjects(projectId);
        });
    });
    
    // Skill card click functionality
    const skillCards = document.querySelectorAll('.skill-card');
    
    skillCards.forEach(card => {
        card.addEventListener('click', function() {
            const skillType = this.getAttribute('data-skill');
            showProjects(`${skillType}-projects`);
            
            // Highlight the corresponding column
            skillColumns.forEach(column => {
                column.classList.remove('active');
            });
            document.querySelector(`#${skillType}-column`).classList.add('active');
        });
    });
    
    // Function to show specific projects
    function showProjects(projectId) {
        const projectContainers = document.querySelectorAll('.projects-container');
        
        projectContainers.forEach(container => {
            container.classList.remove('active');
        });
        
        const targetProject = document.getElementById(projectId);
        if (targetProject) {
            targetProject.classList.add('active');
        }
    }
    
    // Initialize with frontend projects visible
    document.querySelector('#frontend-column').classList.add('active');
    document.querySelector('#frontend-projects').classList.add('active');
    
    // Initialize AOS animations
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-in-out',
            once: true
        });
    }
});
