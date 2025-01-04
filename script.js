const navLinks = document.querySelectorAll("header nav a");
const nav2Containers = document.querySelectorAll("footer .nav-2-container");
const sections = document.querySelectorAll("section");
const logoLink = document.querySelector(".logo");
const menuIcon = document.querySelector("#menu-icon");
const navbar = document.querySelector("header nav");

let currentActiveIndex = 0; // Tracks the index of the currently active section

// Function to reset active states and trigger the bars animation
const resetActiveStateWithBars = () => {
  const barsBox = document.querySelector(".bars-box");
  const header = document.querySelector("header");

  if (!barsBox || !header) {
    console.error("barsBox or header is missing in the DOM!");
    return;
  }

  // First, hide the header and sections (before bar animation)
  header.classList.remove("active");
  sections.forEach((section) => section.classList.remove("active"));

  // Trigger hide bars animation
  barsBox.classList.remove("active");

  // Reapply animations to ensure they are triggered
  const bars = barsBox.querySelectorAll(".bar");
  bars.forEach((bar) => {
    bar.style.animation = "none"; // Remove animation temporarily
    void bar.offsetHeight; // Force reflow/repaint
    bar.style.animation = ""; // Reapply animation
  });

  // Set a timeout to delay the show bars animation to give time for hide bars animation
  setTimeout(() => {
    // Reset all active states after the animation completes
    navLinks.forEach((link) => link.classList.remove("active"));
    nav2Containers.forEach((container) => {
      container.querySelector("a").classList.remove("active");
      container.querySelector("i").classList.remove("active");
    });

    // Trigger show bars animation after delay
    barsBox.classList.add("active");
    header.classList.add("active"); // Re-add the 'active' class to the header
  }, 1100); // Delay the show bars animation to allow hide bars to finish (matches hide bars duration)
};

// Function to set active state for a specific index
const setActiveState = (index) => {
  // Update active class for nav link
  navLinks[index].classList.add("active");

  // Update active class for nav-2 link and its icon
  const nav2Link = nav2Containers[index].querySelector("a");
  const nav2Icon = nav2Containers[index].querySelector("i");
  nav2Link.classList.add("active");
  nav2Icon.classList.add("active");

  // Activate the corresponding section
  sections[index].classList.add("active");

  // Update the current active index
  currentActiveIndex = index;
};

// Add click event listeners for `nav` and `nav-2` links
const addClickListeners = (links, isNav2 = false) => {
  links.forEach((link, idx) => {
    link.addEventListener("click", (event) => {
      event.preventDefault(); // Prevent default anchor behavior

      // Skip if the clicked link corresponds to the current active section
      if (idx === currentActiveIndex) {
        return;
      }

      resetActiveStateWithBars();
      setTimeout(() => {
        setActiveState(idx);
        // Hide the navbar after section load
        navbar.classList.remove("active"); // Hide the navbar after clicking a link
      }, 1100); // Set active state after animation (matches animation duration)
    });
  });
};

// Attach listeners to both nav links and nav-2 links
addClickListeners(navLinks);
addClickListeners(
  Array.from(nav2Containers).map((container) => container.querySelector("a"))
);

// Add click event listeners for `nav-2` icons
nav2Containers.forEach((container, idx) => {
  const nav2Icon = container.querySelector("i");

  nav2Icon.addEventListener("click", (event) => {
    event.preventDefault(); // Prevent default behavior

    // Skip if the clicked icon corresponds to the current active section
    if (idx === currentActiveIndex) {
      return;
    }

    resetActiveStateWithBars();
    setTimeout(() => {
      setActiveState(idx);
      navbar.classList.remove("active"); // Hide the navbar after clicking an icon
    }, 1100); // Set active state after animation (matches animation duration)
  });
});

// Toggle menu icon and navbar visibility
menuIcon.addEventListener("click", () => {
  // Only toggle the menu when the menu icon itself is clicked, not when a nav link is clicked
  navbar.classList.toggle("active");
});

// Resume Buttons and Portfolio Carousel functionality remain untouched.
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
