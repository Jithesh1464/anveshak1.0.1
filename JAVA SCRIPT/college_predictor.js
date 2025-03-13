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
});