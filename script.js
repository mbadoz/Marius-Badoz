// ================================================
// PORTFOLIO MARIUS BADOZ — INTERACTIONS
// ================================================

// --- Theme Toggle ---
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');
const body = document.body;

const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'light') {
    body.classList.add('light-mode');
    themeIcon.classList.remove('fa-sun');
    themeIcon.classList.add('fa-moon');
}

themeToggle.addEventListener('click', () => {
    body.classList.toggle('light-mode');
    if (body.classList.contains('light-mode')) {
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon');
        localStorage.setItem('theme', 'light');
    } else {
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
        localStorage.setItem('theme', 'dark');
    }
});

// --- Custom Cursor ---
const cursor = document.getElementById('cursor');
const follower = document.getElementById('cursor-follower');

if (cursor && follower) {
    let mouseX = 0, mouseY = 0;
    let followerX = 0, followerY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        cursor.style.left = mouseX + 'px';
        cursor.style.top = mouseY + 'px';
    });

    // Smooth follower animation
    function animateFollower() {
        followerX += (mouseX - followerX) * 0.12;
        followerY += (mouseY - followerY) * 0.12;
        follower.style.left = followerX + 'px';
        follower.style.top = followerY + 'px';
        requestAnimationFrame(animateFollower);
    }
    animateFollower();

    // Interactable hover effects
    const observeInteractables = () => {
        document.querySelectorAll('.interactable').forEach(el => {
            el.addEventListener('mouseenter', () => document.body.classList.add('hovered'));
            el.addEventListener('mouseleave', () => document.body.classList.remove('hovered'));
        });
    };
    observeInteractables();
}

// --- Scroll Reveal (staggered) ---
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            // Stagger delay based on element position among siblings
            const siblings = entry.target.parentElement?.querySelectorAll('.reveal-up') || [];
            let siblingIndex = 0;
            siblings.forEach((sib, i) => { if (sib === entry.target) siblingIndex = i; });
            
            setTimeout(() => {
                entry.target.classList.add('active');
            }, siblingIndex * 80);
        }
    });
}, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal-up').forEach(el => revealObserver.observe(el));

// --- Smooth Scroll for nav links ---
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// --- Nav background on scroll ---
const nav = document.querySelector('nav');
if (nav) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            nav.style.background = body.classList.contains('light-mode') 
                ? 'rgba(248, 248, 252, 0.95)' 
                : 'rgba(6, 6, 11, 0.92)';
        } else {
            nav.style.background = body.classList.contains('light-mode') 
                ? 'rgba(248, 248, 252, 0.85)' 
                : 'rgba(6, 6, 11, 0.75)';
        }
    });
}

// --- Mobile menu ---
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
        const navLinks = document.querySelector('.nav-links');
        if (navLinks) {
            navLinks.classList.toggle('mobile-open');
        }
    });
}
