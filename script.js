
/* =========================================
   CLARIO — LANDING PAGE INTERACTIONS
========================================= */

document.addEventListener("DOMContentLoaded", () => {
    // 1. Mobile Navigation Menu
    const menuToggle = document.querySelector(".menu-toggle");
    const navLinks = document.querySelector(".nav-links");

    if (menuToggle && navLinks) {
        menuToggle.addEventListener("click", () => {
            const isOpen = navLinks.classList.toggle("is-open");

            menuToggle.setAttribute("aria-expanded", String(isOpen));
            menuToggle.setAttribute(
                "aria-label",
                isOpen ? "Close navigation menu" : "Open navigation menu"
            );
        });

        // Close the menu after clicking a navigation link
        navLinks.querySelectorAll("a").forEach((link) => {
            link.addEventListener("click", () => {
                navLinks.classList.remove("is-open");
                menuToggle.setAttribute("aria-expanded", "false");
                menuToggle.setAttribute("aria-label", "Open navigation menu");
            });
        });

        // Close the menu with the Escape key
        document.addEventListener("keydown", (event) => {
            if (event.key === "Escape") {
                navLinks.classList.remove("is-open");
                menuToggle.setAttribute("aria-expanded", "false");
                menuToggle.setAttribute("aria-label", "Open navigation menu");
                menuToggle.focus();
            }
        });

        // Close the mobile menu when switching to desktop layout
        window.addEventListener("resize", () => {
            if (window.innerWidth > 800) {
                navLinks.classList.remove("is-open");
                menuToggle.setAttribute("aria-expanded", "false");
                menuToggle.setAttribute("aria-label", "Open navigation menu");
            }
        });
    }

    // 2. Automatically Update Footer Year
    const currentYear = document.getElementById("current-year");

    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }

    // 3. FAQ Accordion
    // Only one FAQ answer stays open at a time
    const faqItems = document.querySelectorAll(".faq-item");

    faqItems.forEach((item) => {
        item.addEventListener("toggle", () => {
            if (item.open) {
                faqItems.forEach((otherItem) => {
                    if (otherItem !== item) {
                        otherItem.open = false;
                    }
                });
            }
        });
    });

    // 4. Smooth Scrolling for Internal Links
    document.querySelectorAll('a[href^="#"]').forEach((link) => {
        link.addEventListener("click", (event) => {
            const targetId = link.getAttribute("href");

            if (!targetId || targetId === "#") {
                return;
            }

            const target = document.querySelector(targetId);

            if (target) {
                event.preventDefault();

                target.scrollIntoView({
                    behavior: window.matchMedia(
                        "(prefers-reduced-motion: reduce)"
                    ).matches ? "auto" : "smooth",
                    block: "start"
                });

                // Update the URL hash without an abrupt jump
                if (window.location.hash !== targetId) {
                    history.pushState(null, "", targetId);
                }
            }
        });
    });

    // 5. Prevent the Illustrative Dashboard Add Button
    // from appearing to submit or perform an unsupported action
    const addButton = document.querySelector(".app-add-button");

    if (addButton) {
        addButton.addEventListener("click", () => {
            addButton.setAttribute("aria-label", "Illustrative add button");
        });
    }

    // 6. Add a small loaded state for the page
    document.documentElement.classList.add("page-ready");
});
