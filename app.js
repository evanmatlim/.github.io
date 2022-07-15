const menu = document.querySelector('#mobile-menu')
const menuLinks = document.querySelector('#navbar__menu')

menu.addEventListener('click', function() {
    menu.classList.toggle('is-active');
    menuLinks.classList.toggle('bruh');
});


var navButtonContainer = document.getElementById("navbar__menu");
var navButtons = navButtonContainer.getElementsByClassName("navbar__links");

const navs = ["/", "/about.html", "/projects.html", "/contact.html"];

for (var i=0; i < navs.length; i++) {
    if (window.location.pathname===navs[i]) {
        navButtons[i].className += " active";
    }
}
