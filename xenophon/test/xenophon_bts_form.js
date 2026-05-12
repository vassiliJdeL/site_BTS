const form = document.getElementById("xenophon-bts-form");
const statusBlock = document.getElementById("status-block");
const statusPanel = document.getElementById("status-panel");
const comboRoot = document.getElementById("bts-combo");
const comboInput = document.getElementById("bts-search");
const comboToggle = document.getElementById("bts-toggle");
const comboResults = document.getElementById("bts-results");
const btsSlugInput = document.getElementById("bts-slug");
const btsLabelInput = document.getElementById("bts-label");
const evaluationModeInput = document.getElementById("evaluation-mode");
const selectionSummary = document.getElementById("selection-summary");

const LOCAL_CATALOG = [
  {
    bts_slug: "bts_services_informatiques_aux_organisations",
    bts_label: "BTS Services informatiques aux organisations",
    bts_acronym: "SIO",
    mode_evaluation: "Mixte selon voie",
    requires_explicit_mode: true,
    options: [
      {
        selection_key: "bts_services_informatiques_aux_organisations:ccf",
        label: "SIO — CCF",
        bts_slug: "bts_services_informatiques_aux_organisations",
        bts_label: "BTS Services informatiques aux organisations",
        bts_acronym: "SIO",
        support_document_label: "dossier professionnel",
        evaluation_mode: "ccf",
        evaluation_mode_label: "CCF",
        search_text: "BTS Services informatiques aux organisations SIO CCF bts services informatiques aux organisations Mixte selon voie"
      },
      {
        selection_key: "bts_services_informatiques_aux_organisations:ponctuelle",
        label: "SIO — Ponctuelle",
        bts_slug: "bts_services_informatiques_aux_organisations",
        bts_label: "BTS Services informatiques aux organisations",
        bts_acronym: "SIO",
        support_document_label: "dossier professionnel",
        evaluation_mode: "ponctuelle",
        evaluation_mode_label: "Ponctuelle",
        search_text: "BTS Services informatiques aux organisations SIO Ponctuelle bts services informatiques aux organisations Mixte selon voie"
      }
    ]
  },
  {
    bts_slug: "bts_management_commercial_operationnel",
    bts_label: "BTS Management commercial opérationnel",
    bts_acronym: "MCO",
    mode_evaluation: "Mixte selon voie",
    requires_explicit_mode: true,
    options: [
      {
        selection_key: "bts_management_commercial_operationnel:ccf",
        label: "MCO — CCF",
        bts_slug: "bts_management_commercial_operationnel",
        bts_label: "BTS Management commercial opérationnel",
        bts_acronym: "MCO",
        support_document_label: "dossier professionnel",
        evaluation_mode: "ccf",
        evaluation_mode_label: "CCF",
        search_text: "BTS Management commercial opérationnel MCO CCF bts management commercial operationnel Mixte selon voie"
      },
      {
        selection_key: "bts_management_commercial_operationnel:ponctuelle",
        label: "MCO — Ponctuelle",
        bts_slug: "bts_management_commercial_operationnel",
        bts_label: "BTS Management commercial opérationnel",
        bts_acronym: "MCO",
        support_document_label: "dossier professionnel",
        evaluation_mode: "ponctuelle",
        evaluation_mode_label: "Ponctuelle",
        search_text: "BTS Management commercial opérationnel MCO Ponctuelle bts management commercial operationnel Mixte selon voie"
      }
    ]
  },
  {
    bts_slug: "bts_negociation_et_digitalisation_de_la_relation_client",
    bts_label: "BTS Négociation et digitalisation de la relation client",
    bts_acronym: "NDRC",
    mode_evaluation: "Mixte selon voie",
    requires_explicit_mode: true,
    options: [
      {
        selection_key: "bts_negociation_et_digitalisation_de_la_relation_client:ccf",
        label: "NDRC — CCF",
        bts_slug: "bts_negociation_et_digitalisation_de_la_relation_client",
        bts_label: "BTS Négociation et digitalisation de la relation client",
        bts_acronym: "NDRC",
        support_document_label: "dossier professionnel",
        evaluation_mode: "ccf",
        evaluation_mode_label: "CCF",
        search_text: "BTS Négociation et digitalisation de la relation client NDRC CCF bts negociation et digitalisation de la relation client Mixte selon voie"
      },
      {
        selection_key: "bts_negociation_et_digitalisation_de_la_relation_client:ponctuelle",
        label: "NDRC — Ponctuelle",
        bts_slug: "bts_negociation_et_digitalisation_de_la_relation_client",
        bts_label: "BTS Négociation et digitalisation de la relation client",
        bts_acronym: "NDRC",
        support_document_label: "dossier professionnel",
        evaluation_mode: "ponctuelle",
        evaluation_mode_label: "Ponctuelle",
        search_text: "BTS Négociation et digitalisation de la relation client NDRC Ponctuelle bts negociation et digitalisation de la relation client Mixte selon voie"
      }
    ]
  },
  {
    bts_slug: "bts_assurance",
    bts_label: "BTS Assurance",
    bts_acronym: "Assurance",
    mode_evaluation: "CCF",
    requires_explicit_mode: false,
    options: [
      {
        selection_key: "bts_assurance:ccf",
        label: "Assurance — CCF",
        bts_slug: "bts_assurance",
        bts_label: "BTS Assurance",
        bts_acronym: "Assurance",
        support_document_label: "dossier professionnel",
        evaluation_mode: "ccf",
        evaluation_mode_label: "CCF",
        search_text: "BTS Assurance Assurance CCF bts assurance"
      }
    ]
  },
  {
    bts_slug: "bts_support_a_l_action_manageriale",
    bts_label: "BTS Support à l'action managériale",
    bts_acronym: "SAM",
    mode_evaluation: "Mixte selon voie",
    requires_explicit_mode: true,
    options: [
      {
        selection_key: "bts_support_a_l_action_manageriale:ccf",
        label: "SAM — CCF",
        bts_slug: "bts_support_a_l_action_manageriale",
        bts_label: "BTS Support à l'action managériale",
        bts_acronym: "SAM",
        support_document_label: "dossier professionnel",
        evaluation_mode: "ccf",
        evaluation_mode_label: "CCF",
        search_text: "BTS Support à l'action managériale SAM CCF bts support a l action manageriale Mixte selon voie"
      },
      {
        selection_key: "bts_support_a_l_action_manageriale:ponctuelle",
        label: "SAM — Ponctuelle",
        bts_slug: "bts_support_a_l_action_manageriale",
        bts_label: "BTS Support à l'action managériale",
        bts_acronym: "SAM",
        support_document_label: "dossier professionnel",
        evaluation_mode: "ponctuelle",
        evaluation_mode_label: "Ponctuelle",
        search_text: "BTS Support à l'action managériale SAM Ponctuelle bts support a l action manageriale Mixte selon voie"
      }
    ]
  }
];

const state = {
  catalog: [],
  selected: null,
  catalogReady: false,
};

function normalizeText(value) {
  return (value || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

function setStatus(html, isVisible = true) {
  statusPanel.innerHTML = html;
  statusBlock.hidden = !isVisible;
}

function submissionProgressMessage(option) {
  const documentLabel = option?.support_document_label || "rapport de stage";
  return `<p class="status-line">Le ${documentLabel} est en cours d'évaluation. Celle-ci devrait prendre quelques minutes. Vérifiez votre boîte mail.</p>`;
}

function displayBtsLabel(value) {
  return (value || "").replace(/^BTS\s+/i, "").trim();
}

function hasUsefulAcronym(value) {
  return (value || "").trim().length > 1;
}

function formatBtsChoiceLabel(label, acronym) {
  const cleanLabel = displayBtsLabel(label);
  if (!hasUsefulAcronym(acronym)) {
    return cleanLabel;
  }
  return `${cleanLabel} (${acronym})`;
}

function clearSelection() {
  state.selected = null;
  btsSlugInput.value = "";
  btsLabelInput.value = "";
  evaluationModeInput.value = "";
  selectionSummary.hidden = true;
  selectionSummary.textContent = "";
}

function applySelection(option) {
  state.selected = option;
  comboInput.value = option.bts_label;
  btsSlugInput.value = option.bts_slug;
  btsLabelInput.value = option.bts_label;
  evaluationModeInput.value = option.evaluation_mode;
  selectionSummary.hidden = false;
  selectionSummary.textContent = `${formatBtsChoiceLabel(option.bts_label, option.bts_acronym)} · ${option.evaluation_mode_label}`;
  closeResults();
}

function openResults() {
  comboResults.classList.add("is-open");
  comboInput.setAttribute("aria-expanded", "true");
}

function closeResults() {
  comboResults.classList.remove("is-open");
  comboInput.setAttribute("aria-expanded", "false");
}

function showLoadingState(message) {
  comboResults.innerHTML = `<div class="combo-loading">${message}</div>`;
  openResults();
}

function buildOptionButton(option, extraClass = "", subtitleText = "") {
  const button = document.createElement("button");
  button.type = "button";
  button.className = `combo-option ${extraClass}`.trim();
  button.setAttribute("role", "option");

  const title = document.createElement("span");
  title.className = "combo-option-title";
  title.textContent = option.label;
  button.appendChild(title);

  const subtitle = document.createElement("span");
  subtitle.className = "combo-option-subtitle";
  subtitle.textContent = subtitleText;
  if (subtitleText) {
    button.appendChild(subtitle);
  }

  button.addEventListener("click", () => applySelection(option));
  return button;
}

function visibleGroupsForQuery(query) {
  return state.catalog
    .map((group) => {
      const matchingOptions = group.options.filter((option) => normalizeText(option.search_text).includes(query));
      const groupMatches = normalizeText(group.bts_label).includes(query) || normalizeText(group.bts_acronym).includes(query);
      const visibleOptions = !query || groupMatches ? group.options : matchingOptions;
      if (!query || groupMatches || matchingOptions.length > 0) {
        return { group, options: visibleOptions };
      }
      return null;
    })
    .filter(Boolean);
}

function renderResults(forceOpen = true) {
  if (!state.catalogReady) {
    showLoadingState("Chargement des BTS disponibles…");
    return;
  }

  const query = normalizeText(comboInput.value);
  comboResults.innerHTML = "";
  const visibleGroups = visibleGroupsForQuery(query);

  if (visibleGroups.length === 0) {
    comboResults.innerHTML = '<div class="combo-empty">Aucun BTS correspondant.</div>';
    if (forceOpen) {
      openResults();
    }
    return;
  }

  for (const entry of visibleGroups) {
    const { group, options } = entry;
    if (group.requires_explicit_mode) {
      const wrapper = document.createElement("div");
      wrapper.className = "combo-group";

      const title = document.createElement("div");
      title.className = "combo-group-title";
      title.textContent = formatBtsChoiceLabel(group.bts_label, group.bts_acronym);
      wrapper.appendChild(title);

      for (const option of options) {
        wrapper.appendChild(
          buildOptionButton(
            { ...option, label: option.evaluation_mode_label },
            "is-child"
          )
        );
      }

      comboResults.appendChild(wrapper);
      continue;
    }

    const option = options[0];
    const button = buildOptionButton(
      { ...option, label: formatBtsChoiceLabel(group.bts_label, group.bts_acronym) },
      "",
      option.evaluation_mode_label
    );
    comboResults.appendChild(button);
  }

  if (forceOpen) {
    openResults();
  }
}

async function tryFetchCatalog(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Catalogue indisponible via ${url}`);
  }
  return response.json();
}

async function loadCatalog() {
  if (Array.isArray(window.__BTS_CATALOG__) && window.__BTS_CATALOG__.length > 0) {
    state.catalog = window.__BTS_CATALOG__;
    state.catalogReady = true;
    renderResults(false);
    return;
  }

  const candidates = window.location.protocol === "file:"
    ? ["./bts_catalog.json"]
    : ["/api/v1/bts/catalog", "./bts_catalog.json"];

  for (const candidate of candidates) {
    try {
      state.catalog = await tryFetchCatalog(candidate);
      state.catalogReady = true;
      renderResults(false);
      return;
    } catch (error) {
      // Try next source.
    }
  }

  state.catalog = LOCAL_CATALOG;
  state.catalogReady = true;
  setStatus("", false);
  renderResults(false);
}

async function pollJob(statusUrl) {
  while (true) {
    const response = await fetch(statusUrl, { cache: "no-store" });
    const payload = await response.json();

    if (!response.ok) {
      setStatus(`<p class="status-line status-error">${payload.detail || "Erreur de suivi du job."}</p>`);
      return;
    }

    if (payload.status === "queued" || payload.status === "processing") {
      setStatus(submissionProgressMessage(state.selected));
      await new Promise((resolve) => window.setTimeout(resolve, 2500));
      continue;
    }

    if (payload.status === "succeeded") {
      setStatus(
        `<p class="status-line status-success">Analyse terminée.</p>
         <p class="status-line">Run ID : <strong>${payload.run_id}</strong></p>
         <p class="status-line"><a class="status-link" href="${statusUrl}" target="_blank" rel="noopener noreferrer">Voir le statut JSON</a></p>`
      );
      return;
    }

    setStatus(
      `<p class="status-line status-error">Le traitement a échoué.</p>
       <p class="status-line">${payload.error_message || "Erreur non documentée."}</p>`
    );
    return;
  }
}

comboInput.addEventListener("focus", () => renderResults(true));
comboInput.addEventListener("click", () => renderResults(true));
comboInput.addEventListener("input", () => {
  if (state.selected && comboInput.value.trim() !== state.selected.bts_label) {
    clearSelection();
  }
  renderResults(true);
});

comboInput.addEventListener("blur", () => {
  window.setTimeout(() => {
    if (!state.selected) {
      comboInput.value = "";
    }
  }, 120);
});

comboToggle.addEventListener("click", () => {
  if (comboResults.classList.contains("is-open")) {
    closeResults();
    return;
  }
  renderResults(true);
});

document.addEventListener("click", (event) => {
  if (!comboRoot.contains(event.target)) {
    closeResults();
  }
});

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  if (!state.selected) {
    setStatus('<p class="status-line status-error">Sélectionnez un BTS dans le menu proposé.</p>');
    renderResults(true);
    return;
  }

  if (window.location.protocol === "file:") {
    setStatus(submissionProgressMessage(state.selected));
    return;
  }

  const documentInput = form.elements.document;
  if (!documentInput.files || documentInput.files.length === 0) {
    setStatus('<p class="status-line status-error">Ajoutez un rapport de stage avant l\'envoi.</p>');
    return;
  }

  const metadata = {
    prenom: form.elements.prenom.value.trim(),
    nom: form.elements.nom.value.trim(),
    email: form.elements.email.value.trim(),
    titre: form.elements.titre.value.trim(),
    entreprise: form.elements.entreprise.value.trim(),
    bts_slug: state.selected.bts_slug,
    bts_label: state.selected.bts_label,
    evaluation_mode: state.selected.evaluation_mode,
  };

  const payload = new FormData();
  payload.append("document", documentInput.files[0]);
  payload.append("metadata_json", JSON.stringify(metadata));

  setStatus(submissionProgressMessage(state.selected));
  try {
    const response = await fetch("/api/v1/programs/xenophon_bts/jobs/document", {
      method: "POST",
      body: payload,
    });
    const result = await response.json();
    if (!response.ok) {
      setStatus(`<p class="status-line status-error">${result.detail || "La soumission a échoué."}</p>`);
      return;
    }
    await pollJob(result.status_url);
  } catch (error) {
    setStatus(`<p class="status-line status-error">${error.message}</p>`);
  }
});

loadCatalog().catch((error) => {
  state.catalog = LOCAL_CATALOG;
  state.catalogReady = true;
  setStatus(`<p class="status-line status-error">${error.message}</p>`);
  renderResults(false);
});
