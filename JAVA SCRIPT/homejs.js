var prevScrollpos = window.scrollY;

window.onscroll = function() {
    var currentScrollPos = window.scrollY;
    if (prevScrollpos > currentScrollPos) {
        document.getElementById("navbar").style.top = "20px";
    } else {
        document.getElementById("navbar").style.top = "-120px";
    }
    prevScrollpos = currentScrollPos;
};

document.addEventListener("DOMContentLoaded", function () {
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

    // Bubble Animation Logic
    const maxBubbles = 4;
    let activeBubbles = 0;

    const bubbleColors = [
        {
            gradient: 'radial-gradient(circle at 20% 20%, rgba(255, 255, 255, 0.6), rgba(150, 200, 255, 0.2) 40%, rgba(100, 150, 200, 0.1))',
            shadow: '0 0 15px rgba(150, 200, 255, 0.2), inset 0 0 5px rgba(255, 255, 255, 0.3)'
        },
        {
            gradient: 'radial-gradient(circle at 20% 20%, rgba(255, 255, 255, 0.45), rgba(200, 150, 255, 0.12) 40%, rgba(150, 100, 200, 0.07))',
            shadow: '0 0 15px rgba(200, 150, 255, 0.2), inset 0 0 5px rgba(255, 255, 255, 0.3)'
        },
        {
            gradient: 'radial-gradient(circle at 20% 20%, rgba(255, 255, 255, 0.45), rgba(150, 255, 200, 0.12) 40%, rgba(100, 200, 150, 0.07))',
            shadow: '0 0 15px rgba(150, 255, 200, 0.2), inset 0 0 5px rgba(255, 255, 255, 0.3)'
        },
        {
            gradient: 'radial-gradient(circle at 20% 20%, rgba(255, 255, 255, 0.45), rgba(255, 150, 200, 0.12) 40%, rgba(200, 100, 150, 0.07))',
            shadow: '0 0 15px rgba(255, 150, 200, 0.2), inset 0 0 5px rgba(255, 255, 255, 0.3)'
        }
    ];

    function createBubble() {
        const bubble = document.createElement('div');
        bubble.className = 'bubble';

        const inner = document.createElement('div');
        inner.className = 'bubble-inner';
        bubble.appendChild(inner);

        const windowWidth = window.innerWidth - 60;
        let xPos;
        if (Math.random() < 0.5) {
            xPos = Math.random() * (windowWidth * 0.2); // 0-20%
        } else {
            xPos = (windowWidth * 0.8) + Math.random() * (windowWidth * 0.15); // 80-95%
        }
        bubble.style.left = `${xPos}px`;

        const size = Math.random() * 40 + 40;
        bubble.style.width = size + 'px';
        bubble.style.height = size + 'px';

        const duration = Math.random() * 4 + 6; // 6-10 seconds
        bubble.style.animationDuration = `${duration}s`;
        inner.style.animationDuration = `${duration / 2}s`;

        const delay = Math.random() * 1;
        bubble.style.animationDelay = `${delay}s`;
        inner.style.animationDelay = `${delay}s`;

        const color = bubbleColors[Math.floor(Math.random() * bubbleColors.length)];
        inner.style.background = color.gradient;
        inner.style.boxShadow = color.shadow;

        activeBubbles++;
        document.getElementById('bubbleContainer').appendChild(bubble);

        bubble.addEventListener('animationend', (e) => {
            if (e.animationName === 'rise' && !bubble.classList.contains('burst')) {
                bubble.remove();
                activeBubbles--;
            }
        });

        bubble.addEventListener('click', () => {
            bubble.classList.add('burst');
        });

        bubble.addEventListener('transitionend', (e) => {
            if (e.propertyName === 'transform' && bubble.classList.contains('burst')) {
                bubble.remove();
                activeBubbles--;
            }
        }, { once: true });
    }

    function spawnBubbles() {
        for (let i = 0; i < maxBubbles; i++) {
            createBubble();
        }
        setInterval(() => {
            createBubble();
        }, 500);
    }

    spawnBubbles();
});