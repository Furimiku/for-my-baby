// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    // Create mobile menu button
    const navbar = document.querySelector('.navbar .container');
    const menuToggle = document.createElement('div');
    menuToggle.className = 'menu-toggle';
    menuToggle.innerHTML = `
        <span></span>
        <span></span>
        <span></span>
    `;
    
    // Insert menu toggle before nav-links
    const navLinks = document.querySelector('.nav-links');
    navbar.insertBefore(menuToggle, navLinks);
    
    // Toggle menu on click
    menuToggle.addEventListener('click', function() {
        this.classList.toggle('active');
        navLinks.classList.toggle('active');
        document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
    });
    
    // Close menu when clicking a link
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.classList.remove('active');
            navLinks.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navLinks.contains(e.target) && !menuToggle.contains(e.target) && navLinks.classList.contains('active')) {
            menuToggle.classList.remove('active');
            navLinks.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
    
    // Handle window resize
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768 && navLinks.classList.contains('active')) {
            menuToggle.classList.remove('active');
            navLinks.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
});






// JavaScript for Valentine's Website

// DOM Elements
const gfNameElement = document.getElementById('gf-name');
const newReasonBtn = document.getElementById('new-reason-btn');
const currentReasonElement = document.getElementById('current-reason');
const reasonCountElement = document.getElementById('reason-count');
const totalReasonsElement = document.getElementById('total-reasons');
const secretPasswordInput = document.getElementById('secret-password');
const unlockBtn = document.getElementById('unlock-btn');
const secretMessage = document.getElementById('secret-message');
const currentYearElement = document.getElementById('current-year');
const daysElement = document.getElementById('days');
const hoursElement = document.getElementById('hours');
const minutesElement = document.getElementById('minutes');
const secondsElement = document.getElementById('seconds');

// List of reasons - ADD YOUR OWN!
const reasons = [
    "Your smile lights up my world",
    "The way you make me feel understood",
    "Your kindness to everyone around you",
    "How you laugh at my silly jokes",
    "Your intelligence and curiosity",
    "The way you look at me",
    "Your passion for the things you love",
    "How you make ordinary moments magical",
    "Your strength in tough times",
    "The sound of your voice",
    "How you always know what to say",
    "Your beautiful eyes",
    "The way you care about others",
    "Your sense of humor",
    "How you challenge me to be better",
    "Your warm hugs",
    "The way you make me feel safe",
    "Your creativity and imagination",
    "How you remember little details",
    "Your determination and drive",
    "The way you dance when you're happy",
    "Your honesty and integrity",
    "How you make me feel loved",
    "Your beautiful soul",
    "The way you handle challenges",
    "Your patience with me",
    "How you see the good in people",
    "Your adventurous spirit",
    "The way you inspire me",
    "Your positive energy",
    "How you make our house a home",
    "Your thoughtfulness",
    "The way you smell",
    "Your unique perspective",
    "How you support my dreams",
    "Your inner and outer beauty",
    "The way you hold my hand",
    "Your commitment to growing together",
    "How you make every day special",
    "Simply because you're you"
];

// Variables
let usedReasons = [0]; // Start with first reason already shown
let totalReasons = reasons.length;
let secretUnlocked = false;

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    // Set current year
    currentYearElement.textContent = new Date().getFullYear();
    
    // Set total reasons count
    totalReasonsElement.textContent = totalReasons;
    
    // Set girlfriend's name - CHANGE THIS!
    const girlfriendName = "Miel"; // Replace with her name
    gfNameElement.textContent = girlfriendName;
    
    // Update all instances of [Her Name]
    document.querySelectorAll('.highlight').forEach(el => {
        if (el.textContent.includes('[Her Name]')) {
            el.textContent = girlfriendName;
        }
    });
    
    // Set your name - CHANGE THIS!
    const yourName = "Law"; // Replace with your name
    document.querySelectorAll('.signature, .footer-signature').forEach(el => {
        if (el.textContent.includes('[Your Name]')) {
            el.textContent = yourName;
        }
    });
    
    // Initialize countdown
    initializeCountdown();
    
    // Set up event listeners
    setupEventListeners();
    
    // Add fade-in animations to sections
    addScrollAnimations();
});

// Set up event listeners
function setupEventListeners() {
    // New reason button
    newReasonBtn.addEventListener('click', showNewReason);
    
    // Unlock secret message
    unlockBtn.addEventListener('click', unlockSecretMessage);
    secretPasswordInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            unlockSecretMessage();
        }
    });
}

// Show a new random reason
function showNewReason() {
    if (usedReasons.length >= totalReasons) {
        currentReasonElement.textContent = "I could list reasons forever, but mostly I just love YOU.";
        newReasonBtn.innerHTML = '<i class="fas fa-heart"></i><span>All Reasons Discovered!</span>';
        newReasonBtn.disabled = true;
        return;
    }
    
    let randomIndex;
    do {
        randomIndex = Math.floor(Math.random() * totalReasons);
    } while (usedReasons.includes(randomIndex));
    
    usedReasons.push(randomIndex);
    
    // Animate reason change
    currentReasonElement.style.opacity = '0';
    setTimeout(() => {
        currentReasonElement.textContent = reasons[randomIndex];
        currentReasonElement.style.opacity = '1';
        
        // Update counter
        reasonCountElement.textContent = usedReasons.length;
        
        // Check if all reasons have been shown
        if (usedReasons.length >= totalReasons) {
            currentReasonElement.textContent = "I could list reasons forever, but mostly I just love YOU.";
            newReasonBtn.innerHTML = '<i class="fas fa-heart"></i><span>All Reasons Discovered!</span>';
            newReasonBtn.disabled = true;
        }
    }, 300);
    
    // Add celebration effect occasionally
    if (usedReasons.length % 10 === 0) {
        celebrate();
    }
}

// Unlock secret message
function unlockSecretMessage() {
    const password = secretPasswordInput.value;
    
    // Set your special date password - CHANGE THIS!
    const correctPassword = "12042025"; 
    
    if (password === correctPassword) {
        secretMessage.classList.remove('hidden');
        document.querySelector('.secret-box').classList.remove('locked');
        document.querySelector('.secret-header i').className = 'fas fa-lock-open';
        document.querySelector('.secret-header h3').textContent = 'Unlocked with Love';
        secretUnlocked = true;
        
        // Add celebration
        celebrate();
        
        // No localStorage save - will lock again on refresh
    } else {
        // Shake animation for wrong password
        secretPasswordInput.style.animation = 'shake 0.5s';
        setTimeout(() => {
            secretPasswordInput.style.animation = '';
        }, 500);
        
        secretPasswordInput.value = '';
        secretPasswordInput.placeholder = 'Try mo ulit babyy';
    }
}

// Monthly countdown with +2 days adjustment
function initializeCountdown() {
    function updateCountdown() {
        const now = new Date();
        const currentDate = now.getDate();
        const currentYear = now.getFullYear();
        const currentMonth = now.getMonth();
        
        let targetMonth, targetYear;
        
        // Always count to the 10th of next month
        targetMonth = currentMonth + 1;
        targetYear = currentYear;
        
        // Handle December -> January
        if (targetMonth > 11) {
            targetMonth = 0;
            targetYear = currentYear + 1;
        }
        
        // Create target date: 10th of next month at midnight
        const targetDate = new Date(targetYear, targetMonth, 10, 0, 0, 0);
        
        // Add 2 extra days to the countdown
        const adjustedTimeLeft = targetDate - now + (2 * 24 * 60 * 60 * 1000); // +2 days in milliseconds
        
        // Calculate time units
        const days = Math.floor(adjustedTimeLeft / (1000 * 60 * 60 * 24));
        const hours = Math.floor((adjustedTimeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((adjustedTimeLeft % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((adjustedTimeLeft % (1000 * 60)) / 1000);
        
        // Update display (ensure no negative numbers)
        daysElement.textContent = Math.max(0, days).toString().padStart(2, '0');
        hoursElement.textContent = Math.max(0, hours).toString().padStart(2, '0');
        minutesElement.textContent = Math.max(0, minutes).toString().padStart(2, '0');
        secondsElement.textContent = Math.max(0, seconds).toString().padStart(2, '0');
        
        // Month names
        const monthNames = ["January", "February", "March", "April", "May", "June",
                           "July", "August", "September", "October", "November", "December"];
        const targetMonthName = monthNames[targetMonth];
        
        // Simple message
        document.querySelector('.countdown .section-subtitle').textContent = 
            `Until ${targetMonthName} 10th - Our Next Monthsarry`;
    }
    
    // Update immediately and then every second
    updateCountdown();
    setInterval(updateCountdown, 1000);
}

// Celebration effect with falling hearts
function celebrate() {
    const heartsContainer = document.createElement('div');
    heartsContainer.style.position = 'fixed';
    heartsContainer.style.top = '0';
    heartsContainer.style.left = '0';
    heartsContainer.style.width = '100%';
    heartsContainer.style.height = '100%';
    heartsContainer.style.pointerEvents = 'none';
    heartsContainer.style.zIndex = '9999';
    document.body.appendChild(heartsContainer);
    
    for (let i = 0; i < 30; i++) {
        const heart = document.createElement('div');
        heart.innerHTML = '❤️';
        heart.style.position = 'absolute';
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.fontSize = Math.random() * 20 + 15 + 'px';
        heart.style.opacity = '0';
        heart.style.transform = 'translateY(-100px)';
        heartsContainer.appendChild(heart);
        
        // Animate heart falling
        setTimeout(() => {
            heart.style.transition = 'all 1.5s ease-out';
            heart.style.opacity = '0.8';
            heart.style.transform = `translateY(${window.innerHeight + 100}px) rotate(${Math.random() * 360}deg)`;
        }, 10);
        
        // Remove heart after animation
        setTimeout(() => {
            heart.remove();
        }, 1600);
    }
    
    // Remove container after all hearts are gone
    setTimeout(() => {
        heartsContainer.remove();
    }, 2000);
}

// Add scroll animations to sections
function addScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeIn 1s ease forwards';
            }
        });
    }, observerOptions);
    
    // Observe all sections
    document.querySelectorAll('.section').forEach(section => {
        observer.observe(section);
    });
}

// Add shake animation for wrong password
const style = document.createElement('style');
style.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
        20%, 40%, 60%, 80% { transform: translateX(5px); }
    }
`;
document.head.appendChild(style);

// Preload celebration hearts (performance optimization)
function preloadHearts() {
    for (let i = 0; i < 5; i++) {
        const heart = document.createElement('div');
        heart.innerHTML = '❤️';
        heart.style.position = 'absolute';
        heart.style.left = '-100px';
        heart.style.opacity = '0';
        document.body.appendChild(heart);
        setTimeout(() => heart.remove(), 100);
    }
}

// Preload when page loads
window.addEventListener('load', preloadHearts);