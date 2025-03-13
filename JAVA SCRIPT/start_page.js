document.querySelector('a[href="page1.html"]').addEventListener("click", function(event) {
    event.preventDefault(); // Prevent instant navigation

    let body = document.body;
    body.classList.add("page-transition"); // Apply zoom effect

    setTimeout(() => {
        window.location.href = "page1.html"; // Navigate after animation
    }, 1500); // Match animation duration
});
