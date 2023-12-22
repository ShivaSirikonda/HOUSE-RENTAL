let menu = document.querySelector("#menu-icon");
let navbar = document.querySelector(".navbar");

menu.onclick = () => {
    menu.classList.toggle('bx-x');
    navbar.classList.toggle('active');
}

windows.onscroll = () =>{
    menu.classList.remove('bx-x');
    navbar.classList.remove('active');
}

document.addEventListener('DOMContentLoaded', function() {
    const sr = ScrollReveal({
        distance: '60px',
        duration: 2500,
        delay: 400,
        reset: true
    });

    sr.reveal('.text', { delay: 200, origin: 'top' });
    sr.reveal('.form-container form', { delay: 200, origin: 'left' });
});