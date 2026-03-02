// ===== Typing Animation =====
const typingText = document.getElementById('typingText');
const phrases = [
    'HTML Developer',
    'Graphics Designer',
    'SEO Link Builder',
    'Facebook Marketing Specialist'
];

let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 100;

function typeEffect() {
    const currentPhrase = phrases[phraseIndex];
    
    if (isDeleting) {
        typingText.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 50;
    } else {
        typingText.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 100;
    }
    
    if (!isDeleting && charIndex === currentPhrase.length) {
        isDeleting = true;
        typingSpeed = 2000; // Pause at end
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        typingSpeed = 500; // Pause before next phrase
    }
    
    setTimeout(typeEffect, typingSpeed);
}

// Start typing animation
typeEffect();

// ===== Mobile Navigation Toggle =====
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
    
    // Prevent body scroll when menu is open (mobile only)
    if (window.innerWidth <= 768) {
        document.body.classList.toggle('menu-open');
    }
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
        
        // Re-enable body scroll
        if (window.innerWidth <= 768) {
            document.body.classList.remove('menu-open');
        }
    });
});

// Close menu when clicking outside (mobile only)
document.addEventListener('click', (e) => {
    if (window.innerWidth <= 768 && navMenu.classList.contains('active')) {
        if (!navMenu.contains(e.target) && !hamburger.contains(e.target)) {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
            document.body.classList.remove('menu-open');
        }
    }
});

// Handle window resize
window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
        document.body.classList.remove('menu-open');
    }
});

// ===== Active Navigation Link on Scroll =====
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');

function highlightNavLink() {
    let scrollPosition = window.scrollY + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', highlightNavLink);

// ===== Smooth Scrolling =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ===== Scroll Reveal Animation =====
function revealOnScroll() {
    const reveals = document.querySelectorAll('.skill-category, .project-card, .service-card');
    
    reveals.forEach(element => {
        const windowHeight = window.innerHeight;
        const elementTop = element.getBoundingClientRect().top;
        const revealPoint = 150;
        
        if (elementTop < windowHeight - revealPoint) {
            element.classList.add('reveal', 'active');
        }
    });
}

window.addEventListener('scroll', revealOnScroll);
revealOnScroll(); // Initial check

// ===== Skill Progress Bar Animation =====
function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    skillBars.forEach(bar => {
        const progress = bar.getAttribute('data-progress');
        const barTop = bar.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (barTop < windowHeight - 100) {
            bar.style.width = progress + '%';
        }
    });
}

window.addEventListener('scroll', animateSkillBars);
animateSkillBars(); // Initial check

// ===== Back to Top Button =====
const backToTopBtn = document.getElementById('backToTop');

function toggleBackToTop() {
    if (window.scrollY > 300) {
        backToTopBtn.classList.add('show');
    } else {
        backToTopBtn.classList.remove('show');
    }
}

window.addEventListener('scroll', toggleBackToTop);

backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ===== Contact Form - Opens Email Client =====
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('form-status');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        
        // Create mailto link
        const subject = encodeURIComponent('Portfolio Contact from ' + name);
        const body = encodeURIComponent(
            'Name: ' + name + '\n' +
            'Email: ' + email + '\n\n' +
            'Message:\n' + message
        );
        
        // Open email client
        window.location.href = 'mailto:johnathanvijay2@gmail.com?subject=' + subject + '&body=' + body;
        
        // Show success message
        formStatus.textContent = 'Opening your email client...';
        formStatus.style.display = 'block';
        formStatus.style.color = 'var(--accent-teal)';
        
        // Reset form after 2 seconds
        setTimeout(function() {
            contactForm.reset();
            formStatus.style.display = 'none';
        }, 2000);
    });
}

// ===== Navbar Background on Scroll =====
const navbar = document.getElementById('navbar');

function updateNavbar() {
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(15, 23, 42, 0.95)';
        navbar.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.3)';
    } else {
        navbar.style.background = 'rgba(30, 41, 59, 0.7)';
        navbar.style.boxShadow = 'none';
    }
}

window.addEventListener('scroll', updateNavbar);

// ===== Initialize Animations on Page Load =====
window.addEventListener('load', () => {
    // Add reveal class to elements
    document.querySelectorAll('.skill-category, .project-card, .service-card').forEach(el => {
        el.classList.add('reveal');
    });
    
    // Trigger initial animations
    revealOnScroll();
    animateSkillBars();
});

// ===== Prevent Default Form Submission =====
document.querySelectorAll('a[href="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
    });
});

// ===== CV Generator =====
document.getElementById('downloadCV').addEventListener('click', generateCV);

function generateCV() {
    // Get jsPDF from the global scope
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    
    // Personal Information
    const name = "Azlan Shahid";
    const title = "Graphic Designer/Marketing Specialist";
    const email = "azlanshahidd@gmail.com";
    const phone = "+92 3047974977";
    
    // About Me
    const aboutMe = "Versatile professional with expertise in UI/UX design, link building, digital marketing, and MS Office, leveraging user-centred design principles to create engaging digital experiences, craft compelling content, and execute effective marketing strategies to enhance brand visibility and user engagement.";
    
    // Education
    const education = [
        {
            institution: "Comsats University Islamabad",
            duration: "2024-",
            degree: "Bachelor in Computer Sciences"
        },
        {
            institution: "Punjab College Sahiwal",
            duration: "2021-2023",
            degree: "Intermediate"
        },
        {
            institution: "Govt. High School Sahiwal",
            duration: "2018-2021",
            degree: "Matriculation"
        }
    ];
    
    // Work Experience
    const workExperience = [
        {
            company: "Freelance",
            position: "Graphics Designer",
            description: "Experienced in UI/UX design with user research, wireframing, prototyping, and usability testing expertise. Specialised in designing user-friendly, user-focused interfaces that enhance usability, increase satisfaction, and increase engagement."
        },
        {
            company: "Freelance",
            position: "Facebook Marketing",
            description: "Skilled in Facebook online marketing, with a focus on crafting targeted advertising campaigns, optimizing content strategies, and benchmarking performance metrics to enhance brand visibility, generate leads, and engage audiences."
        },
        {
            company: "Freelance",
            position: "Content Writing",
            description: "Proficient in content writing, with expertise in crafting compelling, SEO-rich articles and blog posts that successfully convey brand messaging and elicit audience interaction on a wide range of platforms."
        }
    ];
    
    // Skills
    const skills = [
        "SEO Link Building",
        "Facebook Marketing",
        "Content Writing",
        "UI/UX Designing",
        "Video Editing",
        "MS Office (Word, PowerPoint, Excel)"
    ];
    
    // Professional color scheme - matching the image
    const headerBlue = [91, 133, 186];     // Soft blue for headers
    const darkText = [60, 60, 60];         // Dark gray for main text
    const lightText = [100, 100, 100];     // Light gray for body text
    const dividerColor = [180, 180, 180];  // Light divider
    
    let yPosition = 25;
    
    // Name - Large and Bold
    doc.setTextColor(...headerBlue);
    doc.setFontSize(32);
    doc.setFont(undefined, 'bold');
    doc.text(name, 20, yPosition);
    
    yPosition += 10;
    
    // Title
    doc.setFontSize(13);
    doc.setFont(undefined, 'normal');
    doc.setTextColor(...lightText);
    doc.text(title, 20, yPosition);
    
    yPosition += 12;
    
    // Horizontal line under header
    doc.setDrawColor(...dividerColor);
    doc.setLineWidth(0.5);
    doc.line(20, yPosition, 190, yPosition);
    
    yPosition += 12;
    
    // ABOUT ME Section - Full Width Block
    doc.setFontSize(13);
    doc.setFont(undefined, 'bold');
    doc.setTextColor(...darkText);
    doc.text("ABOUT ME", 20, yPosition);
    
    yPosition += 7;
    
    doc.setFontSize(10);
    doc.setFont(undefined, 'normal');
    doc.setTextColor(...lightText);
    const aboutLines = doc.splitTextToSize(aboutMe, 170);
    doc.text(aboutLines, 20, yPosition);
    
    yPosition += aboutLines.length * 5 + 10;
    
    // Horizontal divider
    doc.setDrawColor(...dividerColor);
    doc.line(20, yPosition, 190, yPosition);
    yPosition += 12;
    
    // Two Column Layout - Like the image
    const leftColumnX = 20;
    const rightColumnX = 110;
    const leftColumnWidth = 80;
    const rightColumnWidth = 80;
    
    let leftY = yPosition;
    let rightY = yPosition;
    
    // LEFT COLUMN - EDUCATION
    doc.setFontSize(13);
    doc.setFont(undefined, 'bold');
    doc.setTextColor(...headerBlue);
    doc.text("Education", leftColumnX, leftY);
    
    leftY += 3;
    
    // Underline
    doc.setDrawColor(...headerBlue);
    doc.setLineWidth(0.8);
    doc.line(leftColumnX, leftY, leftColumnX + 28, leftY);
    
    leftY += 10;
    
    education.forEach((edu) => {
        // Degree - Bold
        doc.setFontSize(10);
        doc.setFont(undefined, 'bold');
        doc.setTextColor(...darkText);
        const degreeLines = doc.splitTextToSize(edu.degree, leftColumnWidth);
        doc.text(degreeLines, leftColumnX, leftY);
        leftY += degreeLines.length * 5 + 2;
        
        // Institution
        doc.setFontSize(9);
        doc.setFont(undefined, 'normal');
        doc.setTextColor(...lightText);
        const instLines = doc.splitTextToSize(edu.institution, leftColumnWidth);
        doc.text(instLines, leftColumnX, leftY);
        leftY += instLines.length * 4.5 + 1;
        
        // Duration
        doc.setFontSize(9);
        doc.text(edu.duration, leftColumnX, leftY);
        leftY += 12;
    });
    
    leftY += 5;
    
    // SKILLS Section
    doc.setFontSize(13);
    doc.setFont(undefined, 'bold');
    doc.setTextColor(...headerBlue);
    doc.text("Skills", leftColumnX, leftY);
    
    leftY += 3;
    
    // Underline
    doc.setDrawColor(...headerBlue);
    doc.line(leftColumnX, leftY, leftColumnX + 18, leftY);
    
    leftY += 10;
    
    doc.setFontSize(9);
    doc.setFont(undefined, 'normal');
    doc.setTextColor(...lightText);
    skills.forEach(skill => {
        doc.text(`• ${skill}`, leftColumnX, leftY);
        leftY += 6;
    });
    
    // RIGHT COLUMN - WORK EXPERIENCE
    doc.setFontSize(13);
    doc.setFont(undefined, 'bold');
    doc.setTextColor(...headerBlue);
    doc.text("Work Experience", rightColumnX, rightY);
    
    rightY += 3;
    
    // Underline
    doc.setDrawColor(...headerBlue);
    doc.setLineWidth(0.8);
    doc.line(rightColumnX, rightY, rightColumnX + 45, rightY);
    
    rightY += 10;
    
    workExperience.forEach((work) => {
        // Position - Bold
        doc.setFontSize(10);
        doc.setFont(undefined, 'bold');
        doc.setTextColor(...darkText);
        doc.text(work.position, rightColumnX, rightY);
        
        rightY += 5;
        
        // Company - Italic
        doc.setFontSize(9);
        doc.setFont(undefined, 'italic');
        doc.setTextColor(...lightText);
        doc.text(work.company, rightColumnX, rightY);
        
        rightY += 6;
        
        // Description
        doc.setFontSize(9);
        doc.setFont(undefined, 'normal');
        doc.setTextColor(...lightText);
        const descLines = doc.splitTextToSize(work.description, rightColumnWidth);
        doc.text(descLines, rightColumnX, rightY);
        
        rightY += descLines.length * 4.5 + 10;
    });
    
    // CONTACT Section - Bottom Right Block
    rightY += 5;
    
    doc.setFontSize(13);
    doc.setFont(undefined, 'bold');
    doc.setTextColor(...headerBlue);
    doc.text("Contact", rightColumnX, rightY);
    
    rightY += 3;
    
    // Underline
    doc.setDrawColor(...headerBlue);
    doc.line(rightColumnX, rightY, rightColumnX + 25, rightY);
    
    rightY += 10;
    
    doc.setFontSize(9);
    doc.setFont(undefined, 'normal');
    doc.setTextColor(...lightText);
    doc.text(phone, rightColumnX, rightY);
    rightY += 5;
    doc.text(email, rightColumnX, rightY);
    
    // Save the PDF
    doc.save('Azlan_Shahid_CV.pdf');
    
    // Show success message
    alert('CV downloaded successfully!');
}
