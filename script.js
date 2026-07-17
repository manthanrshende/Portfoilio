// Typing effect in hero
const words = ["LLMs.", "Generative AI.", "NLP.", "Machine Learning.", "Python."];
let wordIndex = 0;
let charIndex = 0;
let deleting = false;
const typingEl = document.getElementById("typing");

function type() {
  const currentWord = words[wordIndex];

  if (!deleting) {
    typingEl.textContent = currentWord.slice(0, charIndex + 1);
    charIndex++;
    if (charIndex === currentWord.length) {
      deleting = true;
      setTimeout(type, 1400);
      return;
    }
  } else {
    typingEl.textContent = currentWord.slice(0, charIndex - 1);
    charIndex--;
    if (charIndex === 0) {
      deleting = false;
      wordIndex = (wordIndex + 1) % words.length;
    }
  }

  setTimeout(type, deleting ? 40 : 80);
}

type();

// Smooth scroll for nav links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function (e) {
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
});

// Contact form submission
const form = document.querySelector(".contact-form");
const formStatus = document.getElementById("formStatus");

if (form) {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const data = new FormData(form);
    formStatus.textContent = "Sending...";

    try {
      const response = await fetch(form.action, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });

      if (response.ok) {
        formStatus.textContent = "Message sent — thanks for reaching out!";
        form.reset();
      } else {
        formStatus.textContent = "Something went wrong. Please try again.";
      }
    } catch (error) {
      formStatus.textContent = "Network error. Please try again.";
    }
  });
}