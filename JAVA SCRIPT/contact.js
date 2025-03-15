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

function togglePhoneNumber(event) {
    event.preventDefault();
    const phoneNumber = document.getElementById('phone-number');
    phoneNumber.style.display = phoneNumber.style.display === 'block' ? 'none' : 'block';
}