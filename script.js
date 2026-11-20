const $ = id => document.getElementById(id);
const cards = [...document.querySelectorAll(".dog-card")];

const filterDogs = (q = "") => {
    const shown = cards.filter(c => (c.style.display = `${c.dataset.name} ${c.dataset.breed}`.includes(q) ? "" : "none") === "").length;
    $("noResults").hidden = shown > 0;
};
$("searchInput").oninput = e => filterDogs(e.target.value.toLowerCase().trim());
$("filterBtn").onclick = () => { $("searchInput").value = ""; filterDogs(); };

const popPaws = (x = innerWidth / 2, y = innerHeight / 2) => {
    ["🐾", "❤️", "🐶", "✨"].forEach((icon, i) => {
        const el = Object.assign(document.createElement("span"), { textContent: icon });
        el.style.cssText = `position:fixed;left:${x}px;top:${y}px;font-size:1.5rem;pointer-events:none;transition:0.9s ease-out;z-index:999;`;
        document.body.appendChild(el);
        setTimeout(() => { el.style.transform = `translate(${(i - 1.5) * 45}px, -85px) scale(1.4)`; el.style.opacity = "0"; }, 20);
        setTimeout(() => el.remove(), 950);
    });
};

document.querySelectorAll(".adopt-btn").forEach(btn => btn.onclick = e => {
    $("dogName").value = btn.dataset.dog;
    $("contact").scrollIntoView({ behavior: "smooth" });
    popPaws(e.clientX, e.clientY);
});

$("adoptionForm").onsubmit = e => {
    e.preventDefault();
    $("formMessage").textContent = `🎉 Thank you ${$("name").value}! Application for ${$("dogName").value} sent.`;
    popPaws(); e.target.reset();
};
