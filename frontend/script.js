// JavaScript for handling both desktop and mobile navigation
document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
    const submenuToggles = document.querySelectorAll('.submenu-toggle');
    const dropdowns = document.querySelectorAll('.dropdown');
    const dropdownSubmenus = document.querySelectorAll('.dropdown-submenu');

    // Toggle mobile menu
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
        
        // Close all dropdowns when hamburger is clicked
        dropdowns.forEach(dropdown => {
            dropdown.classList.remove('active');
        });
        
        dropdownSubmenus.forEach(submenu => {
            submenu.classList.remove('active');
        });
    });

    // Handle main dropdown toggles on mobile
    dropdownToggles.forEach(toggle => {
        toggle.addEventListener('click', (event) => {
            if (window.innerWidth <= 992) {
                event.preventDefault();
                
                const parentDropdown = toggle.parentNode;
                
                // Close other dropdowns
                dropdowns.forEach(dropdown => {
                    if (dropdown !== parentDropdown) {
                        dropdown.classList.remove('active');
                    }
                });
                
                // Toggle current dropdown
                parentDropdown.classList.toggle('active');
            } else {
                // Desktop behavior - prevent default navigation
                event.preventDefault();
            }
        });
    });

    // Handle submenu toggles on mobile
    submenuToggles.forEach(toggle => {
        toggle.addEventListener('click', (event) => {
            if (window.innerWidth <= 992) {
                event.preventDefault();
                
                const parentSubmenu = toggle.parentNode;
                
                // Close other submenus
                dropdownSubmenus.forEach(submenu => {
                    if (submenu !== parentSubmenu) {
                        submenu.classList.remove('active');
                    }
                });
                
                // Toggle current submenu
                parentSubmenu.classList.toggle('active');
            } else {
                // Desktop behavior - allow normal link behavior if needed
                // If you want to prevent navigation even on desktop
                // event.preventDefault();
            }
        });
    });

    // Close dropdowns when clicking outside
    document.addEventListener('click', (event) => {
        if (window.innerWidth <= 992) {
            // For mobile: if click is outside a dropdown and not on a toggle
            if (!event.target.closest('.dropdown') && 
                !event.target.classList.contains('dropdown-toggle') &&
                !event.target.classList.contains('submenu-toggle')) {
                
                dropdowns.forEach(dropdown => {
                    dropdown.classList.remove('active');
                });
                
                dropdownSubmenus.forEach(submenu => {
                    submenu.classList.remove('active');
                });
            }
        }
    });

    // Handle window resize
    window.addEventListener('resize', () => {
        if (window.innerWidth > 992) {
            // Reset mobile menu state when resizing to desktop
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
            
            dropdowns.forEach(dropdown => {
                dropdown.classList.remove('active');
            });
            
            dropdownSubmenus.forEach(submenu => {
                submenu.classList.remove('active');
            });
        }
    });
});
document.getElementById('registration-form').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const submitBtn = document.getElementById('submit-btn');
    const btnText = submitBtn.querySelector('.btn-text');
    const btnLoading = submitBtn.querySelector('.btn-loading');
    const messageDiv = document.getElementById('form-message');
    
    // Show loading state
    submitBtn.disabled = true;
    btnText.style.display = 'none';
    btnLoading.style.display = 'inline';
    messageDiv.style.display = 'none';
    
    try {
        const formData = new FormData(this);
        const data = Object.fromEntries(formData.entries());
        
        const response = await fetch('/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });
        
        const result = await response.json();
        
        if (response.ok) {
            messageDiv.textContent = 'Registration submitted successfully! We will contact you soon.';
            messageDiv.className = 'form-message success';
            messageDiv.style.display = 'block';
            this.reset(); // Clear form
        } else {
            throw new Error(result.message || 'Registration failed');
        }
    } catch (error) {
        messageDiv.textContent = error.message || 'An error occurred. Please try again.';
        messageDiv.className = 'form-message error';
        messageDiv.style.display = 'block';
    } finally {
        // Reset button state
        submitBtn.disabled = false;
        btnText.style.display = 'inline';
        btnLoading.style.display = 'none';
    }
});