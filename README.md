# 🐾 PAWSPER — Dog Adoption Website

**PAWSPER** is a modern, responsive, and interactive single-page web application designed to connect adoptable dogs with loving forever homes. Built with pure HTML5, CSS3, and Vanilla JavaScript, it features live dog search and filtering, smooth navigation, interactive emoji animations, and an automated adoption application form.

## ✨ Features

* **Sticky Glassmorphism Navbar:** Smooth-scrolling navigation bar with quick-jump links (`Home`, `Our Dogs`, `About`, `Process`, `Contact`) and an `Adopt Now` call-to-action button.

* **Hero Section & Impact Stats:** Welcoming landing banner featuring adoption highlights (`500+ Happy Adoptions`, `100% Pure Love`).

* **Live Dog Search & Filter:** Real-time search input that filters available dogs by **name** or **breed**, paired with a `Show All` reset button and a `No dogs found!` fallback message.

* **Interactive "Adopt Me" Flow:** Clicking **Adopt Me** on any dog card automatically:

  1. Pre-selects that specific dog in the adoption form dropdown.

  2. Smoothly scrolls the user down to the application section.

  3. Triggers a playful floating emoji burst (`🐾 ❤️ 🐶 ✨`).

* **3-Step Adoption Process:** Clear visual breakdown of how adoption works (*Choose a Dog → Fill The Form → Welcome Home*).

* **Adoption Application Form:** Validated contact form with instant confirmation feedback upon submission, form reset, and celebratory paw animation.

* **Fully Responsive Design:** Adapts cleanly across desktop, tablet, and mobile screens (breakpoint at `850px`).

## 🐶 Featured Adoptable Dogs

| Name | Breed | Age | Status | 
| ----- | ----- | ----- | ----- | 
| Buddy | Labrador | 2 Years | Available | 
| Luna | Beagle | 1 Year | Available | 
| Max | Indie | 3 Years | Available | 
| Coco | Pomeranian | 1.5 Years | Available | 

## 🛠️ Tech Stack

* **HTML5:** Semantic structure (`<header>`, `<nav>`, `<section>`, `<form>`, `<footer>`) and custom `data-*` attributes for filtering and selection.

* **CSS3:** Custom CSS variables (`:root`), CSS Grid & Flexbox layouts, smooth transitions, hover effects, and responsive media queries.

* **Vanilla JavaScript (ES6+):** DOM manipulation, live search filtering, smooth scrolling, form handling, and dynamic animation effects.

* **Unsplash:** High-resolution dog photography.

## 📂 Project Structure

```
PAWSPER/
├── index.html      # Main HTML document (rename html.html to index.html)
├── style.css       # Styling & responsive layout (rename CSS.css to style.css)
├── script.js       # Search, filter, form logic & paw animations
└── README.md       # Project documentation

```

> **Note:** Make sure your HTML file is named `index.html` and your CSS file is named `style.css` so the `<link rel="stylesheet" href="style.css">` tag and GitHub Pages work automatically.

## 🚀 Getting Started

### Run Locally

1. **Clone the repository:**

   ```
   git clone https://github.com/your-username/pawsper-dog-adoption.git
   
   ```

2. **Navigate into the project folder:**

   ```
   cd pawsper-dog-adoption
   
   ```

3. **Open the project:**
   Double-click `index.html` to open it in your browser, or run it using the **Live Server** extension in VS Code.

## 🌐 Deploying on GitHub Pages

1. Push your project files (`index.html`, `style.css`, `script.js`, `README.md`) to your GitHub repository.

2. Go to your repository **Settings** → **Pages**.

3. Under **Source**, select the `main` branch and `/ (root)` folder, then click **Save**.

4. Your live website will be available at:

   ```
   https://your-username.github.io/pawsper-dog-adoption/
   
   ```

## 💡 Future Enhancements

* Add breed, age, and size filter buttons alongside the search bar.

* Connect the adoption form to a backend service (such as Formspree, EmailJS, or Node.js) to receive real email applications.

* Add a mobile hamburger menu toggle for smaller screens.

* Expand the dog gallery with modal popups showing full biographies and vaccination details.

---

Made with ❤️ for furry friends — **PAWSPER (© 2026)**
