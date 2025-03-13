var prevScrollpos = window.scrollY;

window.onscroll = function() {
    var currentScrollPos = window.scrollY;
    if (prevScrollpos > currentScrollPos) {
        document.getElementById("navbar").style.top = "20px";
    } else {
        document.getElementById("navbar").style.top = "-120px"; // Match navbar height
    }
    prevScrollpos = currentScrollPos;
};

document.addEventListener("DOMContentLoaded", function () {
    const navLinks = document.querySelectorAll(".topnav a");
    let activeLink = document.querySelector(".topnav a.active");

    navLinks.forEach(link => {
        link.addEventListener("mouseenter", function () {
            if (activeLink) {
                activeLink.classList.add("make-transparent"); // Make active one transparent
            }
            this.classList.add("hovered"); // Add hovered effect
        });

        link.addEventListener("mouseleave", function () {
            if (activeLink) {
                activeLink.classList.remove("make-transparent"); // Restore active color
            }
            this.classList.remove("hovered"); // Remove hover effect
        });
    });
});