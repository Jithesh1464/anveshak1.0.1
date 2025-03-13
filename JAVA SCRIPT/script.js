function navigateTo(page) {
    const overlay = document.getElementById('overlay');
    const overlayContent = document.getElementById('overlay-content');
  
    const button = document.querySelector(`button[onclick="navigateTo('${page}')"]`);
    overlayContent.textContent = button.textContent.split('\n').join('');
  
    overlay.classList.add('show');
  
    setTimeout(() => {
      window.location.href = page;
    }, 1100); // Adjust the delay as needed
  }
  
  function addTriangleBackground(button) {
    for (let i = 0; i < 20; i++) {
      const triangle = document.createElement("div");
      triangle.classList.add("triangle");
  
      // Random size for the triangle
      const size = Math.random() * 30 + 10; // Size range: 10px - 40px
      triangle.style.borderLeft = `${size / 2}px solid transparent`;
      triangle.style.borderRight = `${size / 2}px solid transparent`;
      triangle.style.borderBottom = `${size}px solid rgba(255, 157, 0, 0.1)`; // Red color with 50% opacity
  
      // Random position around the button
      triangle.style.top = `${Math.random() * 100}%`;
      triangle.style.left = `${Math.random() * 100}%`;
  
      // Random rotation
      triangle.style.transform = `rotate(${Math.random() * 360}deg)`;
  
      // Add the triangle to the button's parent (opt div)
      button.parentElement.appendChild(triangle);
    }
  }
  
  
  
  
  
  // Apply triangle backgrounds to all buttons
  const buttons = document.querySelectorAll(".options button");
  buttons.forEach((button) => addTriangleBackground(button));
  
// function navigateTo(page) {
//     window.location.href = page;
// }

function updateDateTime() {
    const now = new Date();
    
    // Format time as HH:MM:SS
    const time = now.toLocaleTimeString();

    // Format date as DD-MM-YYYY
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    const date = now.toLocaleDateString(undefined, options);

    // Update the HTML
    document.getElementById('time').textContent = time;
    document.getElementById('date').textContent = date;
}

// Update time and date every second
setInterval(updateDateTime, 1000);

// Initial call to set the time and date immediately
updateDateTime();