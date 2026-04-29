const navToggle = document.querySelector("[data-nav-toggle]");
const siteNav = document.querySelector("[data-site-nav]");

if (navToggle && siteNav) {
    navToggle.addEventListener("click", () => {
        const isOpen = siteNav.classList.toggle("is-open");
        navToggle.setAttribute("aria-expanded", String(isOpen));
    });
}

const yearNode = document.querySelector("[data-year]");

if (yearNode) {
    yearNode.textContent = new Date().getFullYear();
}

const siteScript = document.querySelector('script[src$="assets/site.js"]');
const legalHref = siteScript
    ? siteScript.getAttribute("src")?.replace("assets/site.js", "mentions-legales/index.html")
    : null;
const complianceHref = siteScript
    ? siteScript.getAttribute("src")?.replace("assets/site.js", "conformite/index.html")
    : null;
const isLegalPage = window.location.pathname.endsWith("/mentions-legales/index.html")
    || window.location.pathname.endsWith("/mentions-legales/")
    || window.location.pathname.endsWith("mentions-legales/index.html");
const isCompliancePage = window.location.pathname.endsWith("/conformite/index.html")
    || window.location.pathname.endsWith("/conformite/")
    || window.location.pathname.includes("/conformite/");

if (siteNav && complianceHref && !isCompliancePage) {
    const complianceLinkExists = document.querySelector(`a[href="${complianceHref}"], a[href$="/conformite/index.html"]`);

    if (!complianceLinkExists) {
        const complianceLink = document.createElement("a");
        const demoLink = siteNav.querySelector(".btn-primary");
        complianceLink.href = complianceHref;
        complianceLink.textContent = "Conformité";

        if (demoLink) {
            siteNav.insertBefore(complianceLink, demoLink);
        } else {
            siteNav.appendChild(complianceLink);
        }
    }
}

if (legalHref && !isLegalPage) {
    const legalLinkExists = document.querySelector(`a[href="${legalHref}"], a[href$="/mentions-legales/index.html"]`);

    if (!legalLinkExists) {
        const socialLinks = document.querySelector(".social-links");

        if (socialLinks) {
            socialLinks.style.display = "";
            const legalLink = document.createElement("a");
            legalLink.href = legalHref;
            legalLink.textContent = "Mentions légales";
            socialLinks.appendChild(legalLink);
        } else {
            const footerNote = document.querySelector(".footer-note");

            if (footerNote) {
                footerNote.append(" ");
                const separator = document.createElement("span");
                separator.textContent = "·";
                separator.setAttribute("aria-hidden", "true");
                footerNote.appendChild(separator);
                footerNote.append(" ");

                const legalLink = document.createElement("a");
                legalLink.href = legalHref;
                legalLink.textContent = "Mentions légales";
                footerNote.appendChild(legalLink);
            }
        }
    }
}

const btsSearch = document.querySelector("[data-bts-search]");
const btsRows = Array.from(document.querySelectorAll("[data-bts-row]"));
const filterButtons = Array.from(document.querySelectorAll("[data-filter-button]"));
const resultsCount = document.querySelector("[data-results-count]");

if (btsRows.length) {
    let activeFilter = "all";

    const syncBtsCatalogue = () => {
        const query = (btsSearch?.value || "").trim().toLowerCase();
        let visible = 0;

        btsRows.forEach((row) => {
            const status = row.dataset.statusKey || "";
            const haystack = row.dataset.searchText || row.textContent.toLowerCase();
            const matchesFilter = activeFilter === "all" || status === activeFilter;
            const matchesQuery = !query || haystack.includes(query);
            const shouldShow = matchesFilter && matchesQuery;
            row.hidden = !shouldShow;

            if (shouldShow) {
                visible += 1;
            }
        });

        if (resultsCount) {
            resultsCount.textContent = String(visible);
        }

        filterButtons.forEach((button) => {
            button.classList.toggle("is-active", button.dataset.filterButton === activeFilter);
        });
    };

    if (btsSearch) {
        btsSearch.addEventListener("input", syncBtsCatalogue);
    }

    filterButtons.forEach((button) => {
        button.addEventListener("click", () => {
            activeFilter = button.dataset.filterButton || "all";
            syncBtsCatalogue();
        });
    });

    syncBtsCatalogue();
}

const rowLinks = Array.from(document.querySelectorAll("[data-row-href]"));

rowLinks.forEach((row) => {
    row.addEventListener("click", (event) => {
        const target = event.target;
        if (target instanceof HTMLElement && target.closest("a, button, input")) {
            return;
        }
        const href = row.getAttribute("data-row-href");
        if (href) {
            window.location.href = href;
        }
    });
});

const demoForm = document.querySelector("[data-demo-form]");

if (demoForm instanceof HTMLFormElement) {
    const statusNode = demoForm.querySelector("[data-form-status]");
    const submitButton = demoForm.querySelector('button[type="submit"]');

    const setFormStatus = (message, tone = "") => {
        if (!(statusNode instanceof HTMLElement)) {
            return;
        }
        statusNode.textContent = message;
        statusNode.classList.remove("is-success", "is-error");
        if (tone) {
            statusNode.classList.add(tone);
        }
    };

    const resolveEndpoint = () => {
        const previewEndpoint = demoForm.dataset.previewEndpoint || "";
        if (window.location.protocol === "file:" && previewEndpoint) {
            return previewEndpoint;
        }
        return demoForm.dataset.endpoint || demoForm.getAttribute("action") || "";
    };

    demoForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        if (!demoForm.reportValidity()) {
            return;
        }

        const endpoint = resolveEndpoint();
        const formData = new FormData(demoForm);
        const payload = Object.fromEntries(formData.entries());

        if (typeof payload.website === "string" && payload.website.trim() !== "") {
            demoForm.reset();
            setFormStatus("Votre demande a bien ete envoyee. Nous revenons vers vous rapidement.", "is-success");
            return;
        }

        if (!(submitButton instanceof HTMLButtonElement) || !endpoint) {
            setFormStatus("L'envoi n'est pas disponible pour le moment. Ecrivez a vassili@gradesedu.io.", "is-error");
            return;
        }

        const originalLabel = submitButton.textContent || "Envoyer la demande";
        submitButton.disabled = true;
        submitButton.textContent = "Envoi en cours...";
        setFormStatus("");

        try {
            const response = await fetch(endpoint, {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(payload)
            });

            const responseText = await response.text();
            const result = responseText ? JSON.parse(responseText) : null;

            if (!response.ok || (responseText && !result?.success)) {
                throw new Error("submission_failed");
            }

            demoForm.reset();
            setFormStatus("Votre demande a bien ete envoyee. Nous revenons vers vous rapidement.", "is-success");
        } catch (error) {
            setFormStatus("L'envoi n'a pas abouti. Reessayez dans quelques instants ou ecrivez a vassili@gradesedu.io.", "is-error");
        } finally {
            submitButton.disabled = false;
            submitButton.textContent = originalLabel;
        }
    });
}
