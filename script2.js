const navLinks = document.querySelectorAll("header nav a");
const nav2Containers = document.querySelectorAll("header .nav-2-container");
const sections = document.querySelectorAll("section");
const menuIcon = document.querySelector("#menu-icon");
const navbar = document.querySelector("header nav");

// Function to reset the active state of all navigation links, icons, and sections
const resetActiveState = () => {
  navLinks.forEach((link) => link.classList.remove("active"));
  nav2Containers.forEach((container) => {
    container.querySelector("a").classList.remove("active");
    container.querySelector("i").classList.remove("active");
  });
  sections.forEach((section) => section.classList.remove("active"));
};

// Function to set active state for a specific link and section
const setActiveState = (index) => {
  // Add active state to nav link
  navLinks[index].classList.add("active");

  // Add active state to nav-2 link and icon
  const nav2Link = nav2Containers[index].querySelector("a");
  const nav2Icon = nav2Containers[index].querySelector("i");
  nav2Link.classList.add("active");
  nav2Icon.classList.add("active");

  // Add active state to the corresponding section
  sections[index].classList.add("active");
};

// Add click event listeners to both nav and nav-2 links
const addClickEventListeners = (links, isNav2 = false) => {
  links.forEach((link, idx) => {
    link.addEventListener("click", (event) => {
      event.preventDefault(); // Prevent default link behavior
      resetActiveState();
      setActiveState(idx);
    });
  });
};

// Attach event listeners for both nav and nav-2 links
addClickEventListeners(navLinks);
addClickEventListeners(
  Array.from(nav2Containers).map((container) => container.querySelector("a"))
);

// Toggle menu icon and navbar visibility
menuIcon.addEventListener("click", () => {
  menuIcon.classList.toggle("bx-x");
  navbar.classList.toggle("active");
});

const navLinks = document.querySelectorAll("header nav a, header .nav-2 a");
const logoLink = document.querySelector(".logo");
const sections = document.querySelectorAll("section");
const menuIcon = document.querySelector("#menu-icon");
const navbar = document.querySelector("header nav");

menuIcon.addEventListener("click", () => {
  menuIcon.classList.toggle("bx-x");
  navbar.classList.toggle("active");
});

// Function to reset the active state of elements on the page
const activePage = () => {
  const header = document.querySelector("header");
  const barsBox = document.querySelector(".bars-box");

  // Remove and re-add the 'active' class to the header for animation purposes
  header.classList.remove("active");
  setTimeout(() => {
    header.classList.add("active");
  }, 1100);

  navLinks.forEach((link) => {
    link.classList.remove("active");
  });

  barsBox.classList.remove("active");
  setTimeout(() => {
    barsBox.classList.add("active");
  }, 1100);

  sections.forEach((section) => {
    section.classList.remove("active");
  });

  menuIcon.classList.remove("bx-x");
  navbar.classList.remove("active");
};

// Add click event listeners to all navigation links
navLinks.forEach((link, idx) => {
  link.addEventListener("click", () => {
    if (!link.classList.contains("active")) {
      activePage();

      link.classList.add("active");

      setTimeout(() => {
        sections[idx].classList.add("active");
      }, 1100);
    }
  });
});
