const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const dropdowns = document.querySelectorAll('.dropdown');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');

        // Close any open dropdowns when the main menu is toggled
        dropdowns.forEach(dropdown => {
            if (dropdown.classList.contains('active') && !dropdown.contains(event.target)) {
                dropdown.classList.remove('active');
            }
        });
    });

    dropdowns.forEach(dropdown => {
        const dropdownLink = dropdown.querySelector('> a');
        dropdownLink.addEventListener('click', (event) => {
            if (window.innerWidth <= 992) { // Only toggle on smaller screens
                event.preventDefault(); // Prevent default link behavior
                dropdown.classList.toggle('active');
            }
        });
    });