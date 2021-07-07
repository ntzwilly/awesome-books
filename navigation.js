const sections = document.querySelectorAll('.container');
const links = document.querySelectorAll('.nav-link');

links.forEach((link) => {
  link.addEventListener('click', (event) => {
    event.preventDefault();
    document.querySelector('.active').classList.remove('active');
    link.classList.add('active');
  });
});