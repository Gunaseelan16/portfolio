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


// Function to open the dropdown menu
function hamburg() {
    const dropdown = document.querySelector('.dropdown');
    dropdown.classList.toggle('active');
}

function cancel() {
    const dropdown = document.querySelector('.dropdown');
    dropdown.classList.remove('active');
}