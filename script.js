
// ===== GET HTML ELEMENTS =====

const $ = id => document.getElementById(id);

const cards = [...document.querySelectorAll(".dog-card")];

// ===== DOG SEARCH AND FILTER =====

const filterDogs = (query = "") => {

    let shown = 0;

    cards.forEach(card => {

        const name = card.dataset.name;
        const breed = card.dataset.breed;

        if (`${name} ${breed}`.includes(query)) {
            card.style.display = "";
            shown++;
        } else {
            card.style.display = "none";
        }

    });

    $("noResults").hidden = shown > 0;
};

// Search dog while typing

$("searchInput").oninput = e => {

    filterDogs(e.target.value.toLowerCase().trim());

};

// Show all dogs

$("filterBtn").onclick = () => {

    $("searchInput").value = "";
    filterDogs();

};

// ===== PAW ANIMATION =====

const popPaws = (x = innerWidth / 2, y = innerHeight / 2) => {

    ["🐾", "❤️", "🐶", "✨"].forEach((icon, i) => {

        const el = document.createElement("span");

        el.textContent = icon;

        el.style.cssText = `
            position: fixed;
            left: ${x}px;
            top: ${y}px;
            font-size: 1.5rem;
            pointer-events: none;
            transition: 0.9s ease-out;
            z-index: 999;
        `;

        document.body.appendChild(el);

        setTimeout(() => {

            el.style.transform =
                `translate(${(i - 1.5) * 45}px, -85px) scale(1.4)`;

            el.style.opacity = "0";

        }, 20);

        setTimeout(() => el.remove(), 950);

    });

};

// ===== ADOPT BUTTON =====

document.querySelectorAll(".adopt-btn").forEach(btn => {

    btn.onclick = e => {

        $("dogName").value = btn.dataset.dog;

        $("contact").scrollIntoView({
            behavior: "smooth"
        });

        popPaws(e.clientX, e.clientY);

    };

});

// ===== ADOPTION FORM =====

$("adoptionForm").onsubmit = e => {

    e.preventDefault();

    const name = $("name").value;
    const dog = $("dogName").value;

    $("formMessage").textContent =
        `🎉 Thank you ${name}! Your application for ${dog} has been received.`;

    popPaws();

    e.target.reset();

};
