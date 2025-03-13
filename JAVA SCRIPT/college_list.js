let isFullScreen = false;

const expandIcon = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" style="width: 1em; height: 1em;">
  <path fill="var(--color-icon)" stroke="var(--color-icon)" stroke-width="1" d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"></path>
</svg>
`;

const collapseIcon = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" style="width: 0.5em; height: 0.5em;">
  <path fill="var(--color-icon)" stroke="var(--color-icon)" stroke-width="2" d="M10 0 v10 h-10 v-1 h9 v-9 z M14 0 v10 h10 v-1 h-9 v-9 z M0 14 h10 v10 h-1 v-9 h-9 z M24 14 h-10 v10 h1 v-9 h9 z"></path>
</svg>
`;

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
            if (activeLink) activeLink.classList.add("make-transparent");
            this.classList.add("hovered");
        });
        link.addEventListener("mouseleave", function () {
            if (activeLink) activeLink.classList.remove("make-transparent");
            this.classList.remove("hovered");
        });
    });

    const sidebar = document.getElementById("sidebar");
    const expandBar = document.getElementById("expand-bar");
    const expandFullBtn = document.getElementById("expand-full");
    const expandUpBtn = document.getElementById("expand-up");
    const expandDownBtn = document.getElementById("expand-down");
    const svgTop = document.getElementById('curves-top');
    const svgBottom = document.getElementById('curves-bottom');
    const numCurves = 95;
    const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEEAD', '#D4A5A5'];

    let isExpanded = false;
    let isDragging = false;

    expandFullBtn.innerHTML = expandIcon;

    function toggleSidebar() {
        if (!isExpanded) {
            sidebar.style.height = "50vh";
            sidebar.classList.add("sidebar-expanded");
            isExpanded = true;
        } else {
            sidebar.style.height = "80px";
            sidebar.classList.remove("sidebar-expanded");
            isExpanded = false;
        }
        isFullScreen = false;
        expandFullBtn.innerHTML = expandIcon;
        updateCurves();
    }

    function toggleFullScreen() {
        if (!isFullScreen) {
            sidebar.style.height = "calc(100vh - 140px)";
            sidebar.classList.add("sidebar-expanded");
            isExpanded = true;
            isFullScreen = true;
            expandFullBtn.innerHTML = collapseIcon;
        } else {
            sidebar.style.height = "80px";
            sidebar.classList.remove("sidebar-expanded");
            isExpanded = false;
            isFullScreen = false;
            expandFullBtn.innerHTML = expandIcon;
        }
        updateCurves();
    }

    expandUpBtn.addEventListener("click", toggleSidebar);
    expandDownBtn.addEventListener("click", toggleSidebar);
    expandFullBtn.addEventListener("click", toggleFullScreen);

    expandBar.addEventListener("mousedown", (e) => {
        e.preventDefault();
        isDragging = true;
        document.addEventListener("mousemove", resizeSidebar);
        document.addEventListener("mouseup", stopResize);
    });

    function resizeSidebar(e) {
        if (!isDragging) return;
        const newHeight = window.innerHeight - e.clientY;
        const minHeight = 40;
        const maxHeight = window.innerHeight - 20;
        if (newHeight >= minHeight && newHeight <= maxHeight) {
            sidebar.style.height = `${newHeight}px`;
            sidebar.classList.add("sidebar-expanded");
            isExpanded = true;
            updateCurves();
        }
    }

    function stopResize() {
        isDragging = false;
        document.removeEventListener("mousemove", resizeSidebar);
        document.removeEventListener("mouseup", stopResize);
        const currentHeight = parseInt(sidebar.style.height);
        if (currentHeight <= 100) {
            sidebar.style.height = "20px";
            sidebar.classList.remove("sidebar-expanded");
            isExpanded = false;
            isFullScreen = false;
            expandFullBtn.innerHTML = expandIcon;
        }
        updateCurves();
    }

    expandBar.addEventListener("dragstart", (e) => e.preventDefault());

    function getRandomValue(min, max) {
        return Math.random() * (max - min) + min;
    }

    function createCurvePair() {
        const width = sidebar.offsetWidth;
        const height = sidebar.offsetHeight;

        const startX = getRandomValue(0, width);
        const startY = getRandomValue(0, height);
        const endX = getRandomValue(0, width);
        const endY = getRandomValue(0, height);

        const control1X = getRandomValue(0, width);
        const control1Y = getRandomValue(0, height);
        const control2X = getRandomValue(0, width);
        const control2Y = getRandomValue(0, height);

        const d = `M ${startX},${startY} C ${control1X},${control1Y}, ${control2X},${control2Y}, ${endX},${endY}`;

        // Create top curve (for hover detection)
        const pathTop = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        pathTop.classList.add('curve');
        pathTop.setAttribute('d', d);

        // Create bottom curve (for visual display)
        const pathBottom = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        pathBottom.classList.add('curve');
        pathBottom.setAttribute('d', d);

        const randomColor = colors[Math.floor(Math.random() * colors.length)];

        // Add hover events to top curve that affect bottom curve
        pathTop.addEventListener('mouseenter', () => {
            pathBottom.style.stroke = randomColor;
            pathBottom.style.strokeWidth = '15'; // Ensure visibility
        });
        pathTop.addEventListener('mouseleave', () => {
            pathBottom.style.stroke = 'rgba(255, 255, 255, 0)';
        });

        svgTop.appendChild(pathTop);
        svgBottom.appendChild(pathBottom);
    }

    function updateCurves() {
        svgTop.innerHTML = '';
        svgBottom.innerHTML = '';
        svgTop.setAttribute('width', sidebar.offsetWidth);
        svgTop.setAttribute('height', sidebar.offsetHeight);
        svgBottom.setAttribute('width', sidebar.offsetWidth);
        svgBottom.setAttribute('height', sidebar.offsetHeight);

        // Create clipPath for the entire sidebar
        const clipPath = document.createElementNS('http://www.w3.org/2000/svg', 'clipPath');
        clipPath.setAttribute('id', 'box-clip');

        const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        rect.setAttribute('x', '0');
        rect.setAttribute('y', '0');
        rect.setAttribute('width', sidebar.offsetWidth);
        rect.setAttribute('height', sidebar.offsetHeight);
        clipPath.appendChild(rect);

        svgTop.appendChild(clipPath);

        for (let i = 0; i < numCurves; i++) {
            createCurvePair();
        }

        // Apply clip-path to curves-top paths
        const topCurves = svgTop.querySelectorAll('.curve');
        topCurves.forEach(curve => {
            curve.setAttribute('clip-path', 'url(#box-clip)');
        });
    }

    updateCurves();
});