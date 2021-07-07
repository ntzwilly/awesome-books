const links = document.querySelectorAll('.nav-link');

links.forEach((link) => {
  link.addEventListener('click', (event) => {
    event.preventDefault();
    document.querySelector('.active').classList.remove('active');
    link.classList.add('active');
    const id = link.getAttribute('href').slice('1');

    const currentSection = document.querySelector('.current-page');
    if (currentSection) {
      currentSection.classList.remove('current-page');
    }
    const section = document.getElementById(id);
    if (section) {
      section.classList.add('current-page');
    }
  });
});

// eslint-disable-next-line no-undef 
const { DateTime } = luxon; 
const now = DateTime.now(); 
document.getElementById('date').innerText = now.toLocaleString(DateTime.DATETIME_MED) 