  // Enhanced tab functionality with auto-sliding
  const tabs = document.querySelectorAll('.nav-tab');
  
  // Define the mapping of tabs to sections
  const tabSections = [
    { tab: 'Overview', section: '#introduction' },
    { tab: 'Comparison', section: '#comparison' },
    { tab: 'Case Studies', section: '#case-studies' },
    { tab: 'Strategy', section: '#strategy' }
  ];
  
  // Tab click functionality
  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => {
      // Remove active class from all tabs
      tabs.forEach(t => t.classList.remove('active'));
      // Add active class to clicked tab
      tab.classList.add('active');
      
      // Auto-slide to corresponding section
      const targetSection = tabSections[index]?.section;
      if (targetSection) {
        const section = document.querySelector(targetSection);
        if (section) {
          section.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }
    });
  });

  // Auto-update active tab based on scroll position
  window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY + 200; // Offset for better detection
    
    // Check which section is currently in view
    tabSections.forEach((tabSection, index) => {
      const section = document.querySelector(tabSection.section);
      if (section) {
        const sectionTop = section.offsetTop;
        const sectionBottom = sectionTop + section.offsetHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
          tabs.forEach(t => t.classList.remove('active'));
          if (tabs[index]) {
            tabs[index].classList.add('active');
          }
        }
      }
    });
  });

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
        
        // Update active tab based on clicked link
        const targetId = this.getAttribute('href');
        const tabIndex = tabSections.findIndex(item => item.section === targetId);
        if (tabIndex !== -1 && tabs[tabIndex]) {
          tabs.forEach(t => t.classList.remove('active'));
          tabs[tabIndex].classList.add('active');
        }
      }
    });
  });

  // Add hover effects for better interactivity
  tabs.forEach(tab => {
    tab.addEventListener('mouseenter', () => {
      if (!tab.classList.contains('active')) {
        tab.style.transform = 'translateY(-3px)';
      }
    });
    
    tab.addEventListener('mouseleave', () => {
      if (!tab.classList.contains('active')) {
        tab.style.transform = 'translateY(0)';
      }
    });
  });