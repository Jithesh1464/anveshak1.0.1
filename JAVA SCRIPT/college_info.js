document.addEventListener('DOMContentLoaded', function () {
    const backgroundContainer = document.getElementById('background-container');
    const cursorOutline = document.getElementById('cursorOutline');
    const words = ['NIT', 'IIT', 'IIIT', 'GFIT']; // Words from your original code
    const totalWords = 280; // Number of words to show
    const placedWords = []; // Store bounding boxes of placed words
    const radius = 100; // Radius of the highlight circle
    const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEEAD', '#D4A5A5']; // Colors from second code

    function getRandomValue(min, max) {
        return Math.random() * (max - min) + min;
    }

    function isOverlapping(newBox) {
        for (const placedBox of placedWords) {
            if (
                newBox.left < placedBox.right &&
                newBox.right > placedBox.left &&
                newBox.top < placedBox.bottom &&
                newBox.bottom > placedBox.top
            ) {
                return true; // Overlap detected
            }
        }
        return false; // No overlap
    }

    // Generate random text elements
    function createTextElements() {
        for (let i = 0; i < totalWords; i++) {
            let span, boundingBox;

            do {
                span = document.createElement('span');
                span.classList.add('background-text');
                span.textContent = words[Math.floor(Math.random() * words.length)];

                const size = getRandomValue(1, 1); // Font size in vw
                const left = getRandomValue(0, 90); // Horizontal position as %
                const top = getRandomValue(0, 90); // Vertical position as %
                span.style.left = `${left}%`;
                span.style.top = `${top}%`;
                span.style.fontSize = `${size}vw`;
                span.style.transform = `rotate(${getRandomValue(-30, 30)}deg)`;
                span.style.position = 'absolute';
                span.dataset.color = colors[Math.floor(Math.random() * colors.length)]; // Assign random color

                backgroundContainer.appendChild(span);
                const rect = span.getBoundingClientRect();
                boundingBox = {
                    left: rect.left,
                    top: rect.top,
                    right: rect.right,
                    bottom: rect.bottom,
                };

                if (isOverlapping(boundingBox)) {
                    backgroundContainer.removeChild(span);
                }
            } while (isOverlapping(boundingBox));

            placedWords.push(boundingBox);
        }
    }

    // Handle mouse movement
    document.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX;
        const mouseY = e.clientY;

        // Update cursor outline position
        cursorOutline.style.left = `${mouseX}px`;
        cursorOutline.style.top = `${mouseY}px`;

        // Handle text highlighting
        const texts = document.querySelectorAll('.background-text');
        texts.forEach(text => {
            const rect = text.getBoundingClientRect();
            const textX = rect.left + rect.width / 2;
            const textY = rect.top + rect.height / 2;

            const distance = Math.sqrt(
                Math.pow(mouseX - textX, 2) + 
                Math.pow(mouseY - textY, 2)
            );

            if (distance < radius) {
                text.classList.add('highlight');
                text.style.color = text.dataset.color;
            } else {
                text.classList.remove('highlight');
                text.style.color = 'white';
            }
        });
    });

    // Navbar hover effects
    const navLinks = document.querySelectorAll(".topnav a");
    let activeLink = document.querySelector(".topnav a.active");

    navLinks.forEach(link => {
        link.addEventListener("mouseenter", function () {
            if (activeLink) {
                activeLink.classList.add("make-transparent");
            }
            this.classList.add("hovered");
        });

        link.addEventListener("mouseleave", function () {
            if (activeLink) {
                activeLink.classList.remove("make-transparent");
            }
            this.classList.remove("hovered");
        });
    });

    // Initialize
    createTextElements();
});