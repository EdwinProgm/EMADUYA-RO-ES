document.addEventListener("DOMContentLoaded", () => {
    // Slider functionality
    const slides = document.querySelectorAll(".slide")
    const prevBtn = document.querySelector(".prev")
    const nextBtn = document.querySelector(".next")
    let currentIndex = 0
    let slideInterval
  
    function showSlide(index) {
      slides.forEach((slide) => slide.classList.remove("active"))
      slides[index].classList.add("active")
    }
  
    function nextSlide() {
      currentIndex = (currentIndex + 1) % slides.length
      showSlide(currentIndex)
    }
  
    function prevSlide() {
      currentIndex = (currentIndex - 1 + slides.length) % slides.length
      showSlide(currentIndex)
    }
  
    function startSlideInterval() {
      slideInterval = setInterval(nextSlide, 5000)
    }
  
    function stopSlideInterval() {
      clearInterval(slideInterval)
    }
  
    // Event listeners for slider buttons
    if (nextBtn && prevBtn) {
      nextBtn.addEventListener("click", () => {
        nextSlide()
        stopSlideInterval()
        startSlideInterval()
      })
  
      prevBtn.addEventListener("click", () => {
        prevSlide()
        stopSlideInterval()
        startSlideInterval()
      })
    }
  
    // Pause slider on hover
    const heroSlider = document.querySelector(".hero-slider")
    if (heroSlider) {
      heroSlider.addEventListener("mouseenter", stopSlideInterval)
      heroSlider.addEventListener("mouseleave", startSlideInterval)
    }
  
    // Start the slider
    if (slides.length > 0) {
      startSlideInterval()
    }
  
    // Mobile menu toggle
    const menuToggle = document.getElementById("menu-toggle")
    const mainNav = document.querySelector(".main-nav")
  
    if (menuToggle && mainNav) {
      menuToggle.addEventListener("click", () => {
        mainNav.classList.toggle("active")
        const icon = menuToggle.querySelector("i")
        if (icon) {
          icon.classList.toggle("fa-bars")
          icon.classList.toggle("fa-times")
        }
      })
    }
  
    // Mobile dropdown toggle
    // Fix for dropdown menus on mobile
    const dropdowns = document.querySelectorAll(".dropdown")
  
    dropdowns.forEach((dropdown) => {
      const link = dropdown.querySelector("a")
  
      link.addEventListener("click", (e) => {
        // Only handle dropdown toggle on mobile
        if (window.innerWidth <= 768) {
          e.preventDefault()
  
          // Toggle the current dropdown
          dropdown.classList.toggle("active")
  
          // Close other dropdowns
          dropdowns.forEach((otherDropdown) => {
            if (otherDropdown !== dropdown && otherDropdown.classList.contains("active")) {
              otherDropdown.classList.remove("active")
            }
          })
        }
      })
    })
  
    // Handle window resize
    window.addEventListener("resize", () => {
      if (window.innerWidth > 768) {
        // Reset mobile menu when resizing to desktop
        if (mainNav) {
          mainNav.classList.remove("active")
        }
  
        // Reset all dropdowns when resizing to desktop
        dropdowns.forEach((dropdown) => {
          dropdown.classList.remove("active")
        })
  
        // Reset menu toggle icon
        if (menuToggle) {
          const icon = menuToggle.querySelector("i")
          if (icon) {
            icon.classList.remove("fa-times")
            icon.classList.add("fa-bars")
          }
        }
      }
    })
  
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        const href = this.getAttribute("href")
  
        if (href !== "#" && href !== "#!" && !this.parentElement.classList.contains("dropdown")) {
          e.preventDefault()
  
          const targetElement = document.querySelector(href)
          if (targetElement) {
            targetElement.scrollIntoView({
              behavior: "smooth",
            })
  
            // Close mobile menu after clicking a link
            if (mainNav && window.innerWidth <= 768) {
              mainNav.classList.remove("active")
              if (menuToggle) {
                const icon = menuToggle.querySelector("i")
                if (icon) {
                  icon.classList.remove("fa-times")
                  icon.classList.add("fa-bars")
                }
              }
            }
          }
        }
      })
    })
  })
  
  