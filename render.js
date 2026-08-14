(function () {
    "use strict";

    document.documentElement.classList.add("js");

    const setText = (id, value) => { document.getElementById(id).textContent = value; };
    const setHtml = (id, html) => { document.getElementById(id).innerHTML = html; };

    function socialLink({ label, url }) {
        return `<a class="link" href="${url}" target="_blank" rel="noopener">${label}</a>`;
    }

    function roleEntry({ role, company, period, link, description }) {
        return `
        <a class="entry" href="${link}" target="_blank" rel="noopener" data-reveal>
            <div class="entry-head">
                <p class="entry-title">${role}</p>
                <p class="entry-meta">${period}</p>
            </div>
            <span class="entry-company link">${company}</span>
            ${description ? `<p class="entry-desc">${description}</p>` : ""}
        </a>`;
    }

    function projectEntry({ name, description, link, linkLabel }) {
        return `
        <a class="entry" href="${link}" target="_blank" rel="noopener" data-reveal>
            <div class="entry-head">
                <p class="entry-title">${name}</p>
                <span class="entry-link link">${linkLabel || "GitHub"}</span>
            </div>
            ${description ? `<p class="entry-desc">${description}</p>` : ""}
        </a>`;
    }

    function render() {
        const { name, title, location, education, footerNote, socials, experience, projects } = CONFIG;

        setText("loaderName", name);
        setText("siteName", name);
        setText("title", title);
        setText("location", location);
        setText("education", education);
        setHtml("socials", socials.map(socialLink).join(""));

        setHtml("experience", experience.map(roleEntry).join(""));
        setHtml("projects", projects.map(projectEntry).join(""));

        setText("footer", `© ${new Date().getFullYear()} ${name} · ${footerNote}`);
    }

    // Reveals [data-reveal] elements as they scroll into view, staggering
    // elements that come in together. Returns the update function so the
    // intro can trigger the first reveal pass when the loader lifts.
    function initMotion(reduced) {
        const reveals = reduced ? [] : Array.from(document.querySelectorAll("[data-reveal]"));
        let ticking = false;

        const update = () => {
            ticking = false;
            const vh = window.innerHeight;
            let batch = 0;

            reveals.forEach((el) => {
                if (!el.classList.contains("is-visible") && el.getBoundingClientRect().top < vh * 0.92) {
                    el.style.transitionDelay = `${batch++ * 60}ms`;
                    el.classList.add("is-visible");
                }
            });
        };

        const onScroll = () => {
            if (!ticking) {
                ticking = true;
                requestAnimationFrame(update);
            }
        };

        window.addEventListener("scroll", onScroll, { passive: true });
        window.addEventListener("resize", onScroll, { passive: true });

        // Safety net: never leave content hidden.
        setTimeout(() => reveals.forEach((el) => el.classList.add("is-visible")), 4000);

        return update;
    }

    function intro(reduced, revealUpdate) {
        const body = document.body;
        const finish = () => {
            body.classList.add("is-loaded");
            body.classList.remove("is-loading");
            requestAnimationFrame(revealUpdate);
        };

        if (reduced) {
            finish();
            return;
        }

        // Double rAF so the loader name's initial position paints before animating
        requestAnimationFrame(() => {
            requestAnimationFrame(() => body.classList.add("is-ready"));
        });
        setTimeout(finish, 900);
    }

    function stickyHeader() {
        const header = document.querySelector(".site-header");
        const update = () => header.classList.toggle("is-scrolled", window.scrollY > 8);
        window.addEventListener("scroll", update, { passive: true });
        update();
    }

    document.addEventListener("DOMContentLoaded", () => {
        const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        render();
        stickyHeader();
        intro(reduced, initMotion(reduced));
    });
})();
