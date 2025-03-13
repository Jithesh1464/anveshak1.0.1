document.querySelectorAll('.gender-option').forEach(option => {
    option.addEventListener('click', function() {
        document.querySelectorAll('.gender-option').forEach(opt => opt.classList.remove('selected'));
        this.classList.add('selected');
    });
});

document.addEventListener("DOMContentLoaded", function() {
    const sidebar = document.querySelector(".sidebar");
    const btnCollapse = document.getElementById("btn-collapse");
  
    btnCollapse.addEventListener("click", function() {
        sidebar.classList.toggle("sidebar-collapsed");
    });

    const submitButton = document.getElementById('submitBtn');
    submitButton.addEventListener('click', function() {
        const caste = [];
        document.querySelectorAll('.checklist input[type="checkbox"]:checked').forEach(checkbox => {
            caste.push(checkbox.nextElementSibling.textContent.trim());
        });

        const gender = document.querySelector('.gender-selector input[type="radio"]:checked')?.value || '';
        const rank = document.getElementById('rank').value;

        console.log('CASTE:', caste);
        console.log('GENDER:', gender);
        console.log('RANK:', rank);

        // Here you can send the collected data to the server or process it further
    });
});
