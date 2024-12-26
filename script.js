const navLinks = document.querySelectorAll("header nav a");
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

// Add a click event listener to the logo link to reset to the first section
logoLink.addEventListener("click", () => {
  if (!navLinks[0].classList.contains("active")) {
    activePage();

    navLinks[0].classList.add("active");

    setTimeout(() => {
      sections[0].classList.add("active");
    }, 1100);
  }
});

// Function to handle the transition between pages
const transitionPage = (idx) => {
  const barsBox = document.querySelector(".bars-box");
  const header = document.querySelector("header");

  sections.forEach((section) => {
    section.classList.remove("active");
  });

  // Wait for the hide-bars animation to finish before updating the page
  setTimeout(() => {
    barsBox.classList.add("active");

    // Update navigation links to reflect the active section
    navLinks.forEach((link) => link.classList.remove("active"));
    navLinks[idx].classList.add("active");
  }, 1100);

  // Reset the mobile navigation menu to the default state
  // menuIcon.classList.remove("bx-x");
  // navbar.classList.remove("active");
};

// Add click event listeners to navigation links for transitioning pages
navLinks.forEach((link, idx) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    if (!link.classList.contains("active")) {
      transitionPage(idx);
    }
  });
});

// Resume Buttons Functionality
const resumeBtns = document.querySelectorAll(".resume-btn");
resumeBtns.forEach((btn, idx) => {
  btn.addEventListener("click", () => {
    const resumeDetails = document.querySelectorAll(".resume-detail");

    // Remove the 'active' class from all buttons
    resumeBtns.forEach((btn) => {
      btn.classList.remove("active");
    });

    btn.classList.add("active");

    resumeDetails.forEach((detail) => {
      detail.classList.remove("active");
    });

    // Add the 'active' class to the corresponding resume detail
    resumeDetails[idx].classList.add("active");
  });
});

// Portfolio Carousel Functionality
const arrowRight = document.querySelector(
  ".portfolio-box .navigation .arrow-right"
);
const arrowLeft = document.querySelector(
  ".portfolio-box .navigation .arrow-left"
);

// Initialize index for portfolio navigation
let index = 0;

// Function to update the portfolio carousel and details
const activePortfolio = () => {
  const imgSlide = document.querySelector(".portfolio-carousel .img-slide");
  const portfolioDetails = document.querySelectorAll(".portfolio-detail");

  imgSlide.style.transform = `translateX(calc(${index * -100}% - ${
    index * 2
  }rem))`;

  portfolioDetails.forEach((detail) => {
    detail.classList.remove("active");
  });

  portfolioDetails[index].classList.add("active");
};

// Add click event listener to the right arrow
arrowRight.addEventListener("click", () => {
  if (index < 4) {
    index++;
    arrowLeft.classList.remove("disabled");
  } else {
    index = 5;
    arrowRight.classList.add("disabled");
  }

  activePortfolio();
});

// Add click event listener to the left arrow
arrowLeft.addEventListener("click", () => {
  if (index > 1) {
    index--;
    arrowRight.classList.remove("disabled");
  } else {
    index = 0;
    arrowLeft.classList.add("disabled");
  }

  activePortfolio();
});
