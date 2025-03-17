
document.addEventListener("DOMContentLoaded", () => {
    const projectItems = document.querySelectorAll(".project-item");
    const projectList = document.querySelector(".project-list");
    const dynamicHeading = document.querySelector(".dynamic-heading");

    // Populate the project list dynamically
    projectItems.forEach((item, index) => {
        const subheading = item.querySelector(".project-subheading").textContent;
        const listItem = document.createElement("li");
        listItem.textContent = subheading;
        listItem.classList.add("project-list-item");
        projectList.appendChild(listItem);
    });

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                const subheading = entry.target.querySelector(".project-subheading").textContent;
                const listItems = document.querySelectorAll(".project-list-item");

                if (entry.isIntersecting) {
                    // Update the dynamic heading
                    dynamicHeading.textContent = subheading;
                    dynamicHeading.classList.add("show");

                    // Highlight the active project in the list
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
        { threshold: 0.5 }
    );

    // Observe each project item
    projectItems.forEach((item) => observer.observe(item));
});



// humburger 
function toggleNavbar() {
    const menu = document.querySelector('.menu');
    const hamburger = document.querySelector('.hamburger');
    menu.classList.toggle('show');
    hamburger.classList.toggle('active');
  }