(function () {
    "use strict";

    const setText = (id, value) => { document.getElementById(id).textContent = value; };
    const setHtml = (id, html) => { document.getElementById(id).innerHTML = html; };

    function roleEntry({ role, period, company, link, description }, place) {
        return `
        <div class="entry">
            <div class="row cover">
                <p class="title">${role}</p>
                <p class="muted">${period}</p>
            </div>
            <div class="row cover">
                <a href="${link}" target="_blank">${company}</a>
                <p class="muted">${place}</p>
            </div>
            ${description ? `<p>${description}</p>` : ""}
        </div>`;
    }

    function projectEntry({ name, description, githubLink, liveLink }) {
        const links = liveLink
            ? `<div class="row links">
                <a href="${liveLink}" target="_blank">Live</a>
                <a href="${githubLink}" target="_blank">GitHub</a>
            </div>`
            : `<a href="${githubLink}" target="_blank">GitHub</a>`;

        return `
        <div class="entry">
            <div class="row">
                <p class="title">${name}</p>
                ${links}
            </div>
            ${description ? `<p>${description}</p>` : ""}
        </div>`;
    }

    function educationEntry({ degree, institution, year }, place) {
        return `
        <div class="entry">
            <div class="row cover">
                <p class="title">${degree}</p>
                <p class="muted">${year}</p>
            </div>
            <div class="row cover">
                <p>${institution}</p>
                <p class="muted">${place}</p>
            </div>
        </div>`;
    }

    function render() {
        const { name, title, location, socials, experience, projects, education } = CONFIG;
        const place = location.split(",").pop().trim();

        setText("name", name);
        setText("title", title);
        setText("location", `Based in ${location}`);

        setHtml("socials", [
            ["GitHub", socials.github],
            ["LinkedIn", socials.linkedin]
        ].map(([label, href]) => `<a href="${href}" target="_blank">${label}</a>`).join(""));

        setHtml("experience", experience.map((job) => roleEntry(job, place)).join(""));
        setHtml("projects", projects.map(projectEntry).join(""));
        setHtml("education", educationEntry(education, place));

        setText("footerName", name);
        setText("footerYear", new Date().getFullYear());
    }

    document.addEventListener("DOMContentLoaded", render);
})();
