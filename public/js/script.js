// Custom smooth scrolling function with slower transition
function smoothScroll(target, duration) {
  const targetPosition = document.querySelector(target).offsetTop;
  const startPosition = window.pageYOffset;
  const distance = targetPosition - startPosition;
  let startTime = null;

  // Easing function for smooth transition
  function ease(t) {
    return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
  }

  // Animate the scroll
  function animation(currentTime) {
    if (startTime === null) startTime = currentTime;
    const timeElapsed = currentTime - startTime;
    const run = ease(timeElapsed / duration) * distance + startPosition;

    window.scrollTo(0, run);

    if (timeElapsed < duration) {
      requestAnimationFrame(animation);
    } else {
      window.scrollTo(0, targetPosition); // Ensure it reaches the exact position
    }
  }

  requestAnimationFrame(animation);
}

// Apply smooth scroll on anchor click
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = this.getAttribute('href');
    smoothScroll(target, 1500); // 1500ms duration for slower smooth scroll (adjust as needed)
  });
});

// humburger 
function toggleNavbar() {
  const menu = document.querySelector('.menu');
  const hamburger = document.querySelector('.hamburger');
  menu.classList.toggle('show');
  hamburger.classList.toggle('active');
}

// Drop letters animation for the logo
window.addEventListener('load', () => {
  const logoText = document.getElementById('logo-text');
  const words = logoText.textContent.split('');
  logoText.textContent = '';
  words.forEach((letter, index) => {
    const span = document.createElement('span');
    span.textContent = letter;
    span.style.animationDelay = `${index * 0.2}s`;
    logoText.appendChild(span);
  });
});

// JavaScript to add the 'scrolled' class to the navbar when the user scrolls
window.onscroll = function () {
  var navbar = document.querySelector('.navbar');
  if (window.pageYOffset > 50) { // When scroll is greater than 50px
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
};

document.addEventListener('DOMContentLoaded', () => {
  const grainContainer = document.getElementById('grain-container');
  const canvas = document.createElement('canvas');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  canvas.style.position = 'absolute';
  canvas.style.top = '0';
  canvas.style.left = '0';
  canvas.style.zIndex = '1';
  canvas.style.pointerEvents = 'none';
  grainContainer.appendChild(canvas);

  const ctx = canvas.getContext('2d');

  // Particle properties
  const particles = [];
  const particleCount = 100;

  class Particle {
    constructor(x, y) {
      this.x = x || Math.random() * canvas.width;
      this.y = y || Math.random() * canvas.height;
      this.vx = (Math.random() - 0.5) * 2;
      this.vy = (Math.random() - 0.5) * 2;
      this.size = Math.random() * 3 + 1;
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;

      // Bounce particles off the edges
      if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
      if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = 'white';
      ctx.fill();
      ctx.closePath();
    }
  }

  function connectParticles() {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        // Draw line if particles are close enough
        if (distance < 120) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(255, 255, 255, ${1 - distance / 120})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
          ctx.closePath();
        }
      }
    }
  }

  // Create particles
  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach((particle) => {
      particle.update();
      particle.draw();
    });

    connectParticles();
    requestAnimationFrame(animate);
  }

  // Adjust canvas size on resize
  window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });

  animate();
});

// heading trhow in animation
document.addEventListener('DOMContentLoaded', () => {
  const heading = document.querySelector('.heading');
  const text = heading.innerText;
  heading.innerHTML = '';

  // Wrap each letter of the heading text in a span
  text.split('').forEach(letter => {
    const span = document.createElement('span');
    span.innerText = letter;
    heading.appendChild(span);
  });
});

// JavaScript to update the dynamic heading in services
document.addEventListener("DOMContentLoaded", () => {
  const serviceItems = document.querySelectorAll(".service-item");
  const dynamicHeading = document.querySelector(".dynamic-heading");
  const serviceList = document.querySelector(".service-list");

  // Populate the list with service subheadings
  serviceItems.forEach((item) => {
    const subheading = item.querySelector(".service-subheading").textContent;
    const listItem = document.createElement("li");
    listItem.textContent = subheading;
    listItem.classList.add("service-list-item");
    serviceList.appendChild(listItem);
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const subheading = entry.target.querySelector(".service-subheading").textContent;
        const listItems = document.querySelectorAll(".service-list-item");

        if (entry.isIntersecting) {
          // Update the dynamic heading
          dynamicHeading.textContent = subheading;
          dynamicHeading.classList.add("show");

          // Highlight the active subheading in the list
          listItems.forEach((item) => {
            if (item.textContent === subheading) {
              item.classList.add("active");
            } else {
              item.classList.remove("active");
            }
          });
        }
      });
    },
    {
      threshold: 0.5, // Trigger when 50% of the element is in the viewport
    }
  );

  // Observe each service item
  serviceItems.forEach((item) => observer.observe(item));
});















// About us Section 
document.addEventListener("DOMContentLoaded", () => {
  const circles = document.querySelectorAll(".circle");

  circles.forEach(circle => {
    const percent = circle.getAttribute("data-percent");
    const span = circle.querySelector(".inner-text span");
    let count = 0;

    const interval = setInterval(() => {
      count++;
      span.textContent = `${count}%`;
      if (count >= percent) {
        clearInterval(interval);
      }
    }, 20); // Adjust speed of percentage count
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const section = document.querySelector(".about-section");

  // Delay the animation if needed
  section.style.animationDelay = "0.2s";

  // Trigger the animation
  section.style.opacity = "1";
});

const tabs = document.querySelectorAll('.tab');
const contents = document.querySelectorAll('.tab-content');

tabs.forEach((tab) => {
  tab.addEventListener('click', () => {
    // Remove active class from all tabs and content
    tabs.forEach((t) => t.classList.remove('active'));
    contents.forEach((content) => content.classList.remove('active'));

    // Add active class to the clicked tab and its content
    tab.classList.add('active');
    const target = tab.getAttribute('data-tab');
    document.getElementById(target).classList.add('active');
  });
});








document.addEventListener("DOMContentLoaded", () => {
  const section = document.querySelector(".tab-container");

  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          section.classList.add("visible"); // Add visible class to trigger keyframes
          observer.unobserve(entry.target); // Stop observing after animation
        }
      });
    },
    { threshold: 0.2 } // Trigger when 20% of the section is visible
  );

  observer.observe(section);
});






const statBoxes = document.querySelectorAll('.stat-box');

statBoxes.forEach((box) => {
  const imagePath = box.getAttribute('data-image');
  box.addEventListener('mouseover', () => {
    box.style.setProperty('--hover-image', `url(${imagePath})`);
  });
});

// Get the carousel container
const carouselContainer = document.querySelector('.carousel-container');

// Clone the first 4 testimonial boxes and append them to create a continuous loop
const items = document.querySelectorAll('.carousel-item');
const clonedItems = Array.from(items).slice(0, 4); // Get the first 4 items to clone

clonedItems.forEach(item => {
  carouselContainer.appendChild(item.cloneNode(true)); // Append the cloned items to the container
});

// Dynamically adjust the scrolling speed (optional)
function adjustSpeed(newSpeed) {
  carouselContainer.style.animationDuration = `${newSpeed}s`;
}

// Call this function to adjust the speed if needed
adjustSpeed(15); // Set speed to 15 seconds (for example)