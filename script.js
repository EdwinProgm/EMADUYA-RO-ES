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
  
    // Pause slider on hover
    const heroSlider = document.querySelector(".hero-slider")
    heroSlider.addEventListener("mouseenter", stopSlideInterval)
    heroSlider.addEventListener("mouseleave", startSlideInterval)
  
    // Start the slider
    startSlideInterval()
  
    // Mobile menu toggle
    function setupMobileMenu() {
      if (window.innerWidth <= 768) {
        const dropdowns = document.querySelectorAll(".dropdown")
  
        dropdowns.forEach((dropdown) => {
          const link = dropdown.querySelector("a")
          const menu = dropdown.querySelector(".dropdown-menu")
  
          link.addEventListener("click", (e) => {
            e.preventDefault()
            menu.style.display = menu.style.display === "block" ? "none" : "block"
          })
        })
      }
    }
  
    // Initialize mobile menu
    setupMobileMenu()
  
    // Reinitialize on resize
    window.addEventListener("resize", setupMobileMenu)
  
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        const href = this.getAttribute("href")
  
        if (href !== "#") {
          e.preventDefault()
  
          const targetElement = document.querySelector(href)
          if (targetElement) {
            targetElement.scrollIntoView({
              behavior: "smooth",
            })
          }
        }
      })
    })
  })
  
  