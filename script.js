// Clone tools for loop
const toolsContainer = document.querySelector('#tools-container');
const tools = Array.from(toolsContainer.children);
tools.forEach(tool => {
  const clone = tool.cloneNode(true);
  toolsContainer.appendChild(clone);
});

//Footer update year
const currentYear = new Date().getFullYear();
document.getElementById("year_footer").textContent = currentYear;

// Highlight projects on scroll
if (window.matchMedia("(hover: none)").matches) { // Only for touch devices
  document.addEventListener('scroll', () => {
    const projects = document.querySelectorAll('.project');
    projects.forEach(project => {
      const rect = project.getBoundingClientRect();
      const projectIsCentered = rect.top < window.innerHeight / 2 && rect.bottom > window.innerHeight / 2;
  
      if (projectIsCentered) {
        project.classList.add('highlighted');
      } else {
        project.classList.remove('highlighted');
      }
    });
  });
}

const scaleFactor = 1;
document.addEventListener("scroll", () => {
    const scrollSpeed = 0.5;
    const offset = window.scrollY * scrollSpeed * scaleFactor;
    document.body.style.backgroundPosition = `0px ${offset}px`;
});
