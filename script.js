// ===== 1. DYNAMIC STYLES FOR ANIMATIONS, TOAST & CONFETTI =====
const style = document.createElement("style");
style.textContent = `
    .reveal { opacity: 0; transform: translateY(35px); transition: 0.7s ease; }
    .reveal.show { opacity: 1; transform: translateY(0); }
    .nav-links a.active { color: #ff6b35; position: relative; }
    .nav-links a.active::after {
        content: ""; position: absolute; left: 0; bottom: -5px;
        width: 100%; height: 2.5px; background: #ff6b35; border-radius: 4px;
    }
    .paw-toast {
        position: fixed; bottom: 25px; right: 25px; background: #1f2430; color: #fff;
        padding: 14px 22px; border-radius: 12px; border-left: 5px solid #ff6b35;
        box-shadow: 0 12px 30px rgba(0,0,0,0.2); font-weight: 600; z-index: 2000;
        transform: translateX(120%); transition: 0.4s cubic-bezier(.18,.89,.32,1.28);
    }
    .paw-toast.visible { transform: translateX(0); }
    .top-btn {
        position: fixed; bottom: 25px; left: 25px; width: 45px; height: 45px;
        border: none; border-radius: 50%; background: #ff6b35; color: #fff;
        font-size: 1.2rem; cursor: pointer; box-shadow: 0 8px 20px rgba(255,107,53,0.4);
        opacity: 0; pointer-events: none; transition: 0.3s; z-index: 1500;
    }
    .top-btn.visible { opacity: 1; pointer-events: auto; }
    .top-btn:hover { transform: translateY(-4px); background: #e5531f; }
    .confetti-paw {
        position: fixed; font-size: 1.5rem; pointer-events: none; z-index: 3000;
        animation: pawBurst 1.4s ease-out forwards;
    }
    @keyframes pawBurst {
        0% { opacity: 1; transform: translate(0, 0) scale(0.6) rotate(0deg); }
        100% { opacity: 0; transform: translate(var(--x), var(--y)) scale(1.3) rotate(var(--r)); }
    }
    .pulse-highlight { box-shadow: 0 0 0 4px rgba(255, 107, 53, 0.35) !important; border-color: #ff6b35 !important; }
`;
document.head.appendChild(style);

const $ = id => document.getElementById(id);

// ===== 2. TOAST NOTIFICATION & PAW CONFETTI =====
const toast = document.createElement("div");
toast.className = "paw-toast";
document.body.appendChild(toast);
let toastTimer;

function showToast(msg) {
    toast.textContent = msg;
    toast.classList.add("visible");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove("visible"), 3200);
}

function launchPawConfetti(x = window.innerWidth / 2, y = window.innerHeight / 2) {
    const icons = ["🐾", "❤️", "🐶", "✨", "🎉"];
    for (let i = 0; i < 24; i++) {
        const el = document.createElement("span");
        el.className = "confetti-paw";
        el.textContent = icons[i % icons.length];
        el.style.left = x + "px";
        el.style.top = y + "px";
        el.style.setProperty("--x", `${(Math.random() - 0.5) * 320}px`);
        el.style.setProperty("--y", `${(Math.random() - 0.85) * 300}px`);
        el.style.setProperty("--r", `${(Math.random() - 0.5) * 360}deg`);
        document.body.appendChild(el);
        setTimeout(() => el.remove(), 1400);
    }
}

// ===== 3. HERO STATS COUNT-UP ANIMATION =====
document.querySelectorAll(".stats h2").forEach(stat => {
    const target = parseInt(stat.textContent);
    const suffix = stat.textContent.replace(/\d+/, "");
    let current = 0;
    const step = Math.ceil(target / 45);
    const timer = setInterval(() => {
        current = Math.min(current + step, target);
        stat.textContent = current + suffix;
        if (current >= target) clearInterval(timer);
    }, 30);
});

// ===== 4. SCROLL REVEAL & 3D CARD TILT =====
const revealEls = document.querySelectorAll(".dog-card, .process-card, .about-image, .about-content, #adoptionForm");
const observer = new IntersectionObserver(entries => {
    entries.forEach((entry, idx) => {
        if (entry.isIntersecting) {
            setTimeout(() => entry.target.classList.add("show"), idx * 70);
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.12 });

revealEls.forEach(el => {
    el.classList.add("reveal");
    observer.observe(el);
});

document.querySelectorAll(".dog-card").forEach(card => {
    card.addEventListener("mousemove", e => {
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        card.style.transform = `perspective(700px) rotateX(${-y * 10}deg) rotateY(${x * 10}deg) translateY(-8px)`;
    });
    card.addEventListener("mouseleave", () => (card.style.transform = ""));
});

// ===== 5. LIVE DOG SEARCH & FILTER =====
const cards = [...document.querySelectorAll(".dog-card")];
function filterDogs(query = "") {
    let visibleCount = 0;
    cards.forEach(card => {
        const match = (card.dataset.name + " " + card.dataset.breed).includes(query);
        card.style.display = match ? "" : "none";
        if (match) visibleCount++;
    });
    $("noResults").hidden = visibleCount > 0;
}

$("searchInput").addEventListener("input", e => filterDogs(e.target.value.toLowerCase().trim()));
$("filterBtn").addEventListener("click", () => {
    $("searchInput").value = "";
    filterDogs();
    showToast("🐾 Showing all available dogs!");
});

// ===== 6. SMART ADOPT BUTTON & FORM SUBMISSION =====
document.querySelectorAll(".adopt-btn").forEach(btn => {
    btn.addEventListener("click", e => {
        const dog = btn.dataset.dog;
        $("dogName").value = dog;
        $("contact").scrollIntoView({ behavior: "smooth" });
        $("dogName").classList.add("pulse-highlight");
        setTimeout(() => $("dogName").classList.remove("pulse-highlight"), 1500);
        showToast(`🐶 ${dog} selected! Fill the form below.`);
        launchPawConfetti(e.clientX, e.clientY);
    });
});

$("adoptionForm").addEventListener("submit", e => {
    e.preventDefault();
    const userName = $("name").value.trim();
    const dogName = $("dogName").value;
    $("formMessage").textContent = `🎉 Thank you ${userName}! Your adoption request for ${dogName} has been received.`;
    showToast(`❤️ Application sent for ${dogName}!`);
    launchPawConfetti();
    e.target.reset();
});

// ===== 7. ACTIVE NAVBAR LINK & BACK-TO-TOP BUTTON =====
const topBtn = document.createElement("button");
topBtn.className = "top-btn";
topBtn.innerHTML = "↑";
topBtn.title = "Back to Top";
topBtn.onclick = () => window.scrollTo({ top: 0, behavior: "smooth" });
document.body.appendChild(topBtn);

const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {
    topBtn.classList.toggle("visible", window.scrollY > 400);
    let current = "";
    sections.forEach(sec => {
        if (window.scrollY >= sec.offsetTop - 160) current = sec.id;
    });
    navLinks.forEach(link => {
        link.classList.toggle("active", link.getAttribute("href") === `#${current}`);
    });
});
