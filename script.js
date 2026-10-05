/* =========================================================
   DIGITAL MARKETER PORTFOLIO
   Vanilla JavaScript
========================================================= */


/* =========================================================
   1. CONFIGURATION
   Change your personal links here.
========================================================= */

const siteConfig = {

    portfolioLinks: {
        project1: "#",
        project2: "#",
        project3: "#",
        wordpress1: "https://example.com",
        wordpress2: "https://example.com"
    },

    socialLinks: {
        linkedin: "https://linkedin.com/in/YOUR_USERNAME",
        instagram: "https://instagram.com/YOUR_USERNAME",
        whatsapp: "https://wa.me/YOUR_NUMBER"
    },

    email: "YOUR_EMAIL@example.com"

};


/* =========================================================
   2. DOM ELEMENTS
========================================================= */

const header = document.getElementById("header");

const menuToggle = document.getElementById("menuToggle");

const mainNav = document.getElementById("mainNav");

const currentYear = document.getElementById("currentYear");

const filterButtons =
    document.querySelectorAll(".filter-btn");

const portfolioItems =
    document.querySelectorAll(".portfolio-item");

const revealElements =
    document.querySelectorAll(".reveal");

const galleryItems =
    document.querySelectorAll("[data-lightbox]");

const lightbox =
    document.getElementById("lightbox");

const lightboxImage =
    document.getElementById("lightboxImage");

const lightboxCaption =
    document.getElementById("lightboxCaption");

const lightboxClose =
    document.getElementById("lightboxClose");

const lightboxPrev =
    document.getElementById("lightboxPrev");

const lightboxNext =
    document.getElementById("lightboxNext");

const contactForm =
    document.getElementById("contactForm");

const formMessage =
    document.getElementById("formMessage");


/* =========================================================
   3. CURRENT YEAR
========================================================= */

if (currentYear) {
    currentYear.textContent =
        new Date().getFullYear();
}


/* =========================================================
   4. STICKY HEADER
========================================================= */

function handleHeaderScroll() {

    if (!header) return;

    if (window.scrollY > 30) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }
}

window.addEventListener(
    "scroll",
    handleHeaderScroll,
    { passive: true }
);

handleHeaderScroll();


/* =========================================================
   5. MOBILE NAVIGATION
========================================================= */

function toggleMobileMenu() {

    if (!menuToggle || !mainNav) return;

    const isOpen =
        mainNav.classList.toggle("open");

    menuToggle.setAttribute(
        "aria-expanded",
        String(isOpen)
    );

    menuToggle.setAttribute(
        "aria-label",
        isOpen
            ? "Close navigation menu"
            : "Open navigation menu"
    );
}


if (menuToggle) {
    menuToggle.addEventListener(
        "click",
        toggleMobileMenu
    );
}


/* Close mobile navigation after clicking a link */

const navLinks =
    mainNav?.querySelectorAll("a");

navLinks?.forEach(link => {

    link.addEventListener("click", () => {

        mainNav.classList.remove("open");

        menuToggle.setAttribute(
            "aria-expanded",
            "false"
        );

        menuToggle.setAttribute(
            "aria-label",
            "Open navigation menu"
        );

    });

});


/* Close menu when clicking outside */

document.addEventListener("click", event => {

    if (
        !mainNav ||
        !menuToggle
    ) {
        return;
    }

    const clickedInside =
        mainNav.contains(event.target) ||
        menuToggle.contains(event.target);

    if (!clickedInside) {

        mainNav.classList.remove("open");

        menuToggle.setAttribute(
            "aria-expanded",
            "false"
        );

    }

});


/* =========================================================
   6. PORTFOLIO FILTER
========================================================= */

filterButtons.forEach(button => {

    button.addEventListener(
        "click",
        () => {

            filterButtons.forEach(
                item => item.classList.remove("active")
            );

            button.classList.add("active");

            const filter =
                button.dataset.filter;

            portfolioItems.forEach(item => {

                const category =
                    item.dataset.category;

                const shouldShow =
                    filter === "all" ||
                    category === filter;

                if (shouldShow) {

                    item.classList.remove(
                        "is-hidden"
                    );

                } else {

                    item.classList.add(
                        "is-hidden"
                    );

                }

            });

        }
    );

});


/* =========================================================
   7. SCROLL REVEAL
========================================================= */

const revealObserver =
    new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (!entry.isIntersecting) {
                    return;
                }

                entry.target.classList.add(
                    "visible"
                );

                revealObserver.unobserve(
                    entry.target
                );

            });

        },
        {
            threshold: 0.12,
            rootMargin: "0px 0px -40px 0px"
        }
    );


revealElements.forEach(element => {

    revealObserver.observe(element);

});


/* =========================================================
   8. LIGHTBOX
========================================================= */

let currentGalleryIndex = 0;

let gallerySources = [];


/*
    Build a list of all lightbox-enabled elements.
*/

function refreshGallerySources() {

    gallerySources =
        Array.from(galleryItems)
            .map(item => ({
                src: item.dataset.lightbox,
                title:
                    item.dataset.title ||
                    "Portfolio image"
            }));

}


/*
    Open lightbox at a specific index.
*/

function openLightbox(index) {

    if (!gallerySources.length) {
        return;
    }

    currentGalleryIndex =
        Math.max(
            0,
            Math.min(
                index,
                gallerySources.length - 1
            )
        );

    const item =
        gallerySources[currentGalleryIndex];

    lightboxImage.src = item.src;

    lightboxImage.alt = item.title;

    lightboxCaption.textContent =
        item.title;

    lightbox.classList.add("active");

    lightbox.setAttribute(
        "aria-hidden",
        "false"
    );

    document.body.style.overflow = "hidden";

    lightboxClose.focus();

}


/*
    Close lightbox.
*/

function closeLightbox() {

    lightbox.classList.remove("active");

    lightbox.setAttribute(
        "aria-hidden",
        "true"
    );

    document.body.style.overflow = "";

    lightboxImage.src = "";

}


/*
    Show next image.
*/

function showNextImage() {

    const nextIndex =
        (currentGalleryIndex + 1) %
        gallerySources.length;

    openLightbox(nextIndex);

}


/*
    Show previous image.
*/

function showPreviousImage() {

    const previousIndex =
        (
            currentGalleryIndex -
            1 +
            gallerySources.length
        ) %
        gallerySources.length;

    openLightbox(previousIndex);

}


refreshGallerySources();


galleryItems.forEach((item, index) => {

    item.addEventListener(
        "click",
        () => openLightbox(index)
    );

});


lightboxClose?.addEventListener(
    "click",
    closeLightbox
);

lightboxNext?.addEventListener(
    "click",
    showNextImage
);

lightboxPrev?.addEventListener(
    "click",
    showPreviousImage
);


/*
    Close when clicking outside image.
*/

lightbox?.addEventListener(
    "click",
    event => {

        if (event.target === lightbox) {
            closeLightbox();
        }

    }
);


/*
    Keyboard controls.
*/

document.addEventListener(
    "keydown",
    event => {

        if (
            !lightbox.classList.contains(
                "active"
            )
        ) {
            return;
        }

        if (event.key === "Escape") {
            closeLightbox();
        }

        if (event.key === "ArrowRight") {
            showNextImage();
        }

        if (event.key === "ArrowLeft") {
            showPreviousImage();
        }

    }
);


/* =========================================================
   9. CONTACT FORM
========================================================= */

/*
    GitHub Pages is static, so this form needs an external
    form service.

    Once you have your endpoint, change:

    action=""

    in index.html to something like:

    action="https://api.web3forms.com/submit"

    Then configure the required hidden fields/API key
    according to the service you choose.
*/

if (contactForm) {

    contactForm.addEventListener(
        "submit",
        event => {

            /*
                Prevent the form from pretending to submit
                while no endpoint has been configured.
            */

            if (!contactForm.action ||
                contactForm.action.endsWith(
                    window.location.pathname
                )
            ) {

                event.preventDefault();

                formMessage.textContent =
                    "Please connect the form to Web3Forms, Formspree, or another form service before publishing.";

                formMessage.style.color =
                    "#b56a45";

                return;
            }

        }
    );

}


/* =========================================================
   10. SMOOTH SCROLL FOR INTERNAL LINKS
========================================================= */

document.querySelectorAll(
    'a[href^="#"]'
).forEach(link => {

    link.addEventListener(
        "click",
        event => {

            const targetId =
                link.getAttribute("href");

            if (
                !targetId ||
                targetId === "#"
            ) {
                return;
            }

            const target =
                document.querySelector(targetId);

            if (!target) {
                return;
            }

            event.preventDefault();

            target.scrollIntoView({
                behavior:
                    window.matchMedia(
                        "(prefers-reduced-motion: reduce)"
                    ).matches
                        ? "auto"
                        : "smooth"
            });

        }
    );

});


/* =========================================================
   11. CONFIGURATION EXAMPLE
========================================================= */

/*
    You can use siteConfig to keep important links
    in one place.

    Example:

    console.log(siteConfig.portfolioLinks.project1);

    When you add dynamic project rendering later,
    these values can be used instead of scattering
    URLs throughout the project.
*/


/* =========================================================
   12. IMAGE ERROR HANDLING
========================================================= */

/*
    If an image is missing, prevent a broken-image icon
    from making the design look broken.

    The placeholder background remains visible.
*/

document.querySelectorAll("img").forEach(image => {

    image.addEventListener(
        "error",
        () => {

            image.style.display = "none";

            const parent =
                image.parentElement;

            if (parent) {
                parent.classList.add(
                    "image-missing"
                );
            }

        }
    );

});