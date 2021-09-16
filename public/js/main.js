// toggler for user profile
const userProfileMenu = document.querySelector("#profile-menu");
const userMenuPhone = document.querySelector("#menu-on-phone");
const hamburgerMenu = document.querySelector("#hamburger-menu");
const profileSettings = document.querySelector("#prof-settings");
const closeIcon = document.querySelector("#close-menu-icon");

// toggler for user profile on widescreen
try {
  userProfileMenu.addEventListener("click", () => {
    profileSettings.classList.toggle("toggle-user-menu");
  });
  // toggle for user on Phones
  hamburgerMenu.addEventListener("click", () => {
    menuToggler();
  });
  closeIcon.addEventListener("click", () => {
    menuToggler();
  });
} catch {}

// function for menu on mobile Phones
function menuToggler() {
  userMenuPhone.classList.toggle("toggle-user-menu");
  closeIcon.classList.toggle("close-icon-show");
  hamburgerMenu.classList.toggle("hamburger-hidden");
}

// // Cartigory menu
// const menu = document.querySelector('.cartigory-list-menu button');
// const cartigoryListWrapper = document.querySelector('.cartigory-list-wrapper');
// const home = document.querySelector('.home');
// const phone = document.querySelector('.phone');
// const computer = document.querySelector('.computer');
// const fashion = document.querySelector('.fashion');
// const accessorie = document.querySelector('.accessorie');
// const housing = document.querySelector('.housing');
// const game = document.querySelector('.game');
//
// //var for confirm password
// const password = document.querySelector('#password');
// const passwordconfirm = document.querySelector('#passwordconfirm');
// const signupButton = document.querySelector('.signup-button');

// home.addEventListener("click", () =>{
//     home.classList.toggle("list")
// });
// phone.addEventListener("click", () =>{
//     phone.classList.toggle("list")
// });
// computer.addEventListener("click", () =>{
//     computer.classList.toggle("list")
// });
// game.addEventListener("click", () =>{
//     game.classList.toggle("list")
// });
// accessorie.addEventListener("click", () =>{
//     accessorie.classList.toggle("list")
// });
// fashion.addEventListener("click", () =>{
//     fashion.classList.toggle("list")
// });
// housing.addEventListener("click", () =>{
//     housing.classList.toggle("list")
// });
// menu.addEventListener("click", () =>{
//     cartigoryListWrapper.classList.toggle("open");
// });
//
//
// // for the comfirm password
// signupButton.addEventListener("click", () =>{
//     if(password != passwordconfirm){
//         alert ("Password didn't match try again");
//         return false
//     }
//     else if(password == passwordconfirm){
//         return true
//     }
// });
