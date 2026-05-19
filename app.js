const navItems = document.querySelectorAll(".nav-item");
const screens = document.querySelectorAll(".screen");
const pageTitle = document.getElementById("page-title");
const pageSubtitle = document.getElementById("page-subtitle");
const toastContainer = document.getElementById("toast-container");

function showScreen(screenId) {
  screens.forEach((screen) => {
    screen.classList.toggle("active", screen.id === screenId);
  });

  navItems.forEach((item) => {
    const isActive = item.dataset.screen === screenId;
    item.classList.toggle("active", isActive);
    if (isActive) {
      pageTitle.textContent = item.dataset.title || "CapPlan";
      pageSubtitle.textContent = item.dataset.subtitle || "";
    }
  });

  window.scrollTo({ top: 0, behavior: "smooth" });
}

navItems.forEach((item) => {
  item.addEventListener("click", () => showScreen(item.dataset.screen));
});

document.querySelectorAll("[data-goto]").forEach((button) => {
  button.addEventListener("click", () => showScreen(button.dataset.goto));
});

document.querySelectorAll("[data-toast]").forEach((button) => {
  button.addEventListener("click", () =>
    showToast(button.dataset.toast, "success"),
  );
});

const tabGroups = document.querySelectorAll("[data-tab-group]");
tabGroups.forEach((group) => {
  group.querySelectorAll(".tab").forEach((tab) => {
    tab.addEventListener("click", () => {
      const groupId = group.dataset.tabGroup;
      group
        .querySelectorAll(".tab")
        .forEach((item) => item.classList.remove("active"));
      document
        .querySelectorAll(`[id^="${groupId}-"]`)
        .forEach((panel) => panel.classList.remove("active"));
      tab.classList.add("active");
      const panel = document.getElementById(`${groupId}-${tab.dataset.tab}`);
      if (panel) panel.classList.add("active");
    });
  });
});

document.querySelectorAll(".scenario-btn").forEach((button) => {
  button.addEventListener("click", () => {
    document
      .querySelectorAll(".scenario-btn")
      .forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
    showToast(`Scenario switched to ${button.textContent.trim()}`, "info");
  });
});

function showToast(message, type = "info") {
  if (!toastContainer) return;

  const toast = document.createElement("div");
  toast.className = `toast toast-${type}`;
  toast.innerHTML = `
    <div class="toast-icon"><i class="fa-solid ${iconFor(type)}"></i></div>
    <div>${message}</div>
    <div class="toast-close"><i class="fa-solid fa-xmark"></i></div>
  `;

  toastContainer.appendChild(toast);

  const closeButton = toast.querySelector(".toast-close");
  closeButton.addEventListener("click", () => toast.remove());

  setTimeout(() => {
    toast.remove();
  }, 3200);
}

function iconFor(type) {
  switch (type) {
    case "success":
      return "fa-circle-check";
    case "warning":
      return "fa-triangle-exclamation";
    case "danger":
      return "fa-circle-exclamation";
    default:
      return "fa-circle-info";
  }
}

// ── Modal helpers ──────────────────────────────────────────────
function openModal(id) {
  const overlay = document.getElementById(id);
  if (overlay) overlay.classList.add("open");
}

function closeModal(id) {
  const overlay = document.getElementById(id);
  if (overlay) overlay.classList.remove("open");
}

// Close modal when clicking outside the modal card
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("modal-overlay")) {
    e.target.classList.remove("open");
  }
});

// Close modal on Escape key
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    document
      .querySelectorAll(".modal-overlay.open")
      .forEach((el) => el.classList.remove("open"));
  }
});

// ── Budget Planning ────────────────────────────────────────────
const budgetProjects = {
  proj1: {
    budget: "₹5.00 Cr",
    manpower: "₹1.20 Cr",
    manpowerPct: "24%",
    vehicle: "₹20 L",
    vehiclePct: "4%",
    equipment: "₹35 L",
    equipmentPct: "7%",
    contingency: "₹15 L",
    contingencyPct: "3%",
    total: "₹1.90 Cr",
    totalPct: "38%",
    barPct: 38,
    barColor: "linear-gradient(90deg,var(--primary),var(--success))",
    barLabel: "₹1.90 Cr / ₹5.00 Cr (38%)",
    barLegend:
      "🔵 Manpower: ₹1.20 Cr (24%)&nbsp;&nbsp;🟡 Vehicles: ₹20 L (4%)&nbsp;&nbsp;🟠 Equipment: ₹35 L (7%)&nbsp;&nbsp;⚪ Regional: ₹20 L (4%)&nbsp;&nbsp;⚪ Contingency: ₹15 L (3%)",
    variance: "Budget Variance: ₹3.10 Cr remaining",
    varianceColor: "#dcfce7",
    varianceTextColor: "#15803d",
    varianceBorderColor: "#86efac",
    status: "within",
    statusText: "Budget Status: Within Budget",
    tableRows: `<tr>
      <td><i class="fa-solid fa-users" style="color:var(--primary);margin-right:6px;"></i>Manpower Cost</td>
      <td>₹1.10 Cr</td><td>₹1.20 Cr</td><td>24%</td>
      <td style="color:#d97706;">+9.1%</td><td><span class="badge badge-warning">Review</span></td></tr>
    <tr><td><i class="fa-solid fa-truck" style="color:var(--warning);margin-right:6px;"></i>Vehicle Cost</td>
      <td>₹16 L</td><td>₹20 L</td><td>4%</td>
      <td style="color:#dc2626;">+25%</td><td><span class="badge badge-danger">Rental Impact</span></td></tr>
    <tr><td><i class="fa-solid fa-screwdriver-wrench" style="color:var(--purple);margin-right:6px;"></i>Equipment Cost</td>
      <td>₹33 L</td><td>₹35 L</td><td>7%</td>
      <td style="color:#16a34a;">+6.1%</td><td><span class="badge badge-success">OK</span></td></tr>
    <tr><td><i class="fa-solid fa-earth-americas" style="color:#0ea5e9;margin-right:6px;"></i>Regional Cost Impact</td>
      <td>₹18 L</td><td>₹20 L</td><td>4%</td>
      <td style="color:#d97706;">+11.1%</td><td><span class="badge badge-warning">Review</span></td></tr>
    <tr><td><i class="fa-solid fa-shield-halved" style="color:#64748b;margin-right:6px;"></i>Contingency</td>
      <td>₹15 L</td><td>₹15 L</td><td>3%</td>
      <td style="color:#16a34a;">0%</td><td><span class="badge badge-success">OK</span></td></tr>
    <tr style="background:#f8faff;"><td><strong>Total Estimated Resource Cost</strong></td>
      <td><strong>₹1.72 Cr</strong></td><td><strong>₹1.90 Cr</strong></td><td><strong>38%</strong></td>
      <td style="color:#d97706;"><strong>+10.5%</strong></td><td><span class="badge badge-success">Within Budget</span></td></tr>
    <tr style="background:#f0fdf4;"><td><strong>Budget Variance (Remaining)</strong></td>
      <td colspan="2" style="color:#15803d;"><strong>₹3.10 Cr available</strong></td><td><strong>62%</strong></td>
      <td style="color:#15803d;"><strong>—</strong></td><td><span class="badge badge-success">Healthy</span></td></tr>`,
    regionalRows: `<tr><td style="padding:8px 14px;">🇨🇦 Alberta</td><td style="text-align:right;padding:8px 14px;">₹52 L</td><td style="text-align:right;padding:8px 14px;color:var(--primary);">27%</td></tr>
    <tr style="background:#fafbfc;"><td style="padding:8px 14px;">🇨🇦 Ontario</td><td style="text-align:right;padding:8px 14px;">₹48 L</td><td style="text-align:right;padding:8px 14px;color:var(--primary);">25%</td></tr>
    <tr><td style="padding:8px 14px;">🇮🇳 Telangana</td><td style="text-align:right;padding:8px 14px;">₹58 L</td><td style="text-align:right;padding:8px 14px;color:var(--primary);">31%</td></tr>
    <tr style="background:#fafbfc;"><td style="padding:8px 14px;">🇺🇸 Texas</td><td style="text-align:right;padding:8px 14px;">₹32 L</td><td style="text-align:right;padding:8px 14px;color:var(--primary);">17%</td></tr>
    <tr style="font-weight:700;border-top:2px solid var(--border);"><td style="padding:8px 14px;">Total</td><td style="text-align:right;padding:8px 14px;">₹1.90 Cr</td><td style="text-align:right;padding:8px 14px;">100%</td></tr>`,
    alerts: `<div class="alert alert-warning"><div class="alert-icon"><i class="fa-solid fa-car-side"></i></div><div class="alert-content"><strong>Vehicle cost +25%</strong><p>External crane rental adds ₹4 L above estimate.</p></div></div>
    <div class="alert alert-warning"><div class="alert-icon"><i class="fa-solid fa-users"></i></div><div class="alert-content"><strong>Manpower revised up +9.1%</strong><p>Supervisor overtime added ₹10 L above plan.</p></div></div>
    <div class="alert alert-success"><div class="alert-icon"><i class="fa-solid fa-circle-check"></i></div><div class="alert-content"><strong>Overall within budget</strong><p>Total resource cost ₹1.90 Cr is 62% below the ₹5 Cr cap.</p></div></div>`,
  },
  proj2: {
    budget: "₹8.50 Cr",
    manpower: "₹2.10 Cr",
    manpowerPct: "25%",
    vehicle: "₹35 L",
    vehiclePct: "4%",
    equipment: "₹28 L",
    equipmentPct: "3%",
    contingency: "₹25 L",
    contingencyPct: "3%",
    total: "₹3.06 Cr",
    totalPct: "36%",
    barPct: 36,
    barColor: "linear-gradient(90deg,var(--primary),var(--success))",
    barLabel: "₹3.06 Cr / ₹8.50 Cr (36%)",
    barLegend:
      "🔵 Manpower: ₹2.10 Cr (25%)&nbsp;&nbsp;🟡 Vehicles: ₹35 L (4%)&nbsp;&nbsp;🟠 Equipment: ₹28 L (3%)&nbsp;&nbsp;⚪ Regional: ₹8 L (1%)&nbsp;&nbsp;⚪ Contingency: ₹25 L (3%)",
    variance: "Budget Variance: ₹5.44 Cr remaining",
    varianceColor: "#dcfce7",
    varianceTextColor: "#15803d",
    varianceBorderColor: "#86efac",
    status: "within",
    statusText: "Budget Status: Within Budget",
    tableRows: `<tr><td><i class="fa-solid fa-users" style="color:var(--primary);margin-right:6px;"></i>Manpower Cost</td>
      <td>₹1.95 Cr</td><td>₹2.10 Cr</td><td>25%</td>
      <td style="color:#d97706;">+7.7%</td><td><span class="badge badge-warning">Review</span></td></tr>
    <tr><td><i class="fa-solid fa-truck" style="color:var(--warning);margin-right:6px;"></i>Vehicle Cost</td>
      <td>₹30 L</td><td>₹35 L</td><td>4%</td>
      <td style="color:#d97706;">+16.7%</td><td><span class="badge badge-warning">Review</span></td></tr>
    <tr><td><i class="fa-solid fa-screwdriver-wrench" style="color:var(--purple);margin-right:6px;"></i>Equipment Cost</td>
      <td>₹28 L</td><td>₹28 L</td><td>3%</td>
      <td style="color:#16a34a;">0%</td><td><span class="badge badge-success">OK</span></td></tr>
    <tr><td><i class="fa-solid fa-earth-americas" style="color:#0ea5e9;margin-right:6px;"></i>Regional Cost Impact</td>
      <td>₹7 L</td><td>₹8 L</td><td>1%</td>
      <td style="color:#d97706;">+14.3%</td><td><span class="badge badge-warning">Review</span></td></tr>
    <tr><td><i class="fa-solid fa-shield-halved" style="color:#64748b;margin-right:6px;"></i>Contingency</td>
      <td>₹25 L</td><td>₹25 L</td><td>3%</td>
      <td style="color:#16a34a;">0%</td><td><span class="badge badge-success">OK</span></td></tr>
    <tr style="background:#f8faff;"><td><strong>Total Estimated Resource Cost</strong></td>
      <td><strong>₹2.85 Cr</strong></td><td><strong>₹3.06 Cr</strong></td><td><strong>36%</strong></td>
      <td style="color:#d97706;"><strong>+7.4%</strong></td><td><span class="badge badge-success">Within Budget</span></td></tr>
    <tr style="background:#f0fdf4;"><td><strong>Budget Variance (Remaining)</strong></td>
      <td colspan="2" style="color:#15803d;"><strong>₹5.44 Cr available</strong></td><td><strong>64%</strong></td>
      <td style="color:#15803d;"><strong>—</strong></td><td><span class="badge badge-success">Healthy</span></td></tr>`,
    regionalRows: `<tr><td style="padding:8px 14px;">🇮🇳 Telangana (Primary)</td><td style="text-align:right;padding:8px 14px;">₹1.85 Cr</td><td style="text-align:right;padding:8px 14px;color:var(--primary);">60%</td></tr>
    <tr style="background:#fafbfc;"><td style="padding:8px 14px;">🇮🇳 Andhra Pradesh</td><td style="text-align:right;padding:8px 14px;">₹82 L</td><td style="text-align:right;padding:8px 14px;color:var(--primary);">27%</td></tr>
    <tr><td style="padding:8px 14px;">🇨🇦 Ontario (Remote)</td><td style="text-align:right;padding:8px 14px;">₹39 L</td><td style="text-align:right;padding:8px 14px;color:var(--primary);">13%</td></tr>
    <tr style="font-weight:700;border-top:2px solid var(--border);"><td style="padding:8px 14px;">Total</td><td style="text-align:right;padding:8px 14px;">₹3.06 Cr</td><td style="text-align:right;padding:8px 14px;">100%</td></tr>`,
    alerts: `<div class="alert alert-success"><div class="alert-icon"><i class="fa-solid fa-circle-check"></i></div><div class="alert-content"><strong>Well within budget</strong><p>Only 36% of ₹8.50 Cr budget consumed.</p></div></div>
    <div class="alert alert-warning"><div class="alert-icon"><i class="fa-solid fa-truck"></i></div><div class="alert-content"><strong>Vehicle cost +16.7%</strong><p>Logistics cost higher due to pipeline terrain access.</p></div></div>`,
  },
  proj3: {
    budget: "₹2.00 Cr",
    manpower: "₹72 L",
    manpowerPct: "36%",
    vehicle: "₹8 L",
    vehiclePct: "4%",
    equipment: "₹12 L",
    equipmentPct: "6%",
    contingency: "₹8 L",
    contingencyPct: "4%",
    total: "₹1.06 Cr",
    totalPct: "53%",
    barPct: 53,
    barColor: "linear-gradient(90deg,#f59e0b,#d97706)",
    barLabel: "₹1.06 Cr / ₹2.00 Cr (53%)",
    barLegend:
      "🔵 Manpower: ₹72 L (36%)&nbsp;&nbsp;🟡 Vehicles: ₹8 L (4%)&nbsp;&nbsp;🟠 Equipment: ₹12 L (6%)&nbsp;&nbsp;⚪ Regional: ₹6 L (3%)&nbsp;&nbsp;⚪ Contingency: ₹8 L (4%)",
    variance: "Budget Variance: ₹94 L remaining",
    varianceColor: "#fef9c3",
    varianceTextColor: "#92400e",
    varianceBorderColor: "#fde68a",
    status: "within",
    statusText: "Budget Status: Within Budget",
    tableRows: `<tr><td><i class="fa-solid fa-users" style="color:var(--primary);margin-right:6px;"></i>Manpower Cost</td>
      <td>₹68 L</td><td>₹72 L</td><td>36%</td>
      <td style="color:#d97706;">+5.9%</td><td><span class="badge badge-warning">Review</span></td></tr>
    <tr><td><i class="fa-solid fa-truck" style="color:var(--warning);margin-right:6px;"></i>Vehicle Cost</td>
      <td>₹8 L</td><td>₹8 L</td><td>4%</td>
      <td style="color:#16a34a;">0%</td><td><span class="badge badge-success">OK</span></td></tr>
    <tr><td><i class="fa-solid fa-screwdriver-wrench" style="color:var(--purple);margin-right:6px;"></i>Equipment Cost</td>
      <td>₹10 L</td><td>₹12 L</td><td>6%</td>
      <td style="color:#d97706;">+20%</td><td><span class="badge badge-warning">Review</span></td></tr>
    <tr><td><i class="fa-solid fa-earth-americas" style="color:#0ea5e9;margin-right:6px;"></i>Regional Cost Impact</td>
      <td>₹6 L</td><td>₹6 L</td><td>3%</td>
      <td style="color:#16a34a;">0%</td><td><span class="badge badge-success">OK</span></td></tr>
    <tr><td><i class="fa-solid fa-shield-halved" style="color:#64748b;margin-right:6px;"></i>Contingency</td>
      <td>₹8 L</td><td>₹8 L</td><td>4%</td>
      <td style="color:#16a34a;">0%</td><td><span class="badge badge-success">OK</span></td></tr>
    <tr style="background:#f8faff;"><td><strong>Total Estimated Resource Cost</strong></td>
      <td><strong>₹1.00 Cr</strong></td><td><strong>₹1.06 Cr</strong></td><td><strong>53%</strong></td>
      <td style="color:#d97706;"><strong>+6%</strong></td><td><span class="badge badge-success">Within Budget</span></td></tr>
    <tr style="background:#f0fdf4;"><td><strong>Budget Variance (Remaining)</strong></td>
      <td colspan="2" style="color:#15803d;"><strong>₹94 L available</strong></td><td><strong>47%</strong></td>
      <td style="color:#15803d;"><strong>—</strong></td><td><span class="badge badge-success">Moderate</span></td></tr>`,
    regionalRows: `<tr><td style="padding:8px 14px;">🇨🇦 Ontario (Primary)</td><td style="text-align:right;padding:8px 14px;">₹1.06 Cr</td><td style="text-align:right;padding:8px 14px;color:var(--primary);">100%</td></tr>
    <tr style="font-weight:700;border-top:2px solid var(--border);"><td style="padding:8px 14px;">Total</td><td style="text-align:right;padding:8px 14px;">₹1.06 Cr</td><td style="text-align:right;padding:8px 14px;">100%</td></tr>`,
    alerts: `<div class="alert alert-success"><div class="alert-icon"><i class="fa-solid fa-circle-check"></i></div><div class="alert-content"><strong>Budget comfortable at 53%</strong><p>AMC project has healthy remaining budget.</p></div></div>
    <div class="alert alert-warning"><div class="alert-icon"><i class="fa-solid fa-screwdriver-wrench"></i></div><div class="alert-content"><strong>Equipment cost +20%</strong><p>Specialized testing tools required for pump inspection.</p></div></div>`,
  },
  proj4: {
    budget: "₹3.50 Cr",
    manpower: "₹2.80 Cr",
    manpowerPct: "80%",
    vehicle: "₹45 L",
    vehiclePct: "13%",
    equipment: "₹52 L",
    equipmentPct: "15%",
    contingency: "₹22 L",
    contingencyPct: "6%",
    total: "₹4.27 Cr",
    totalPct: "122%",
    barPct: 100,
    barColor: "linear-gradient(90deg,var(--danger),#b91c1c)",
    barLabel: "₹4.27 Cr / ₹3.50 Cr (122%) ⚠ OVER BUDGET",
    barLegend:
      "🔴 Manpower: ₹2.80 Cr (80%)&nbsp;&nbsp;🔴 Vehicles: ₹45 L (13%)&nbsp;&nbsp;🔴 Equipment: ₹52 L (15%)&nbsp;&nbsp;🔴 Regional: ₹28 L (8%)&nbsp;&nbsp;🔴 Contingency: ₹22 L (6%)",
    variance: "⚠ OVER BUDGET by ₹77 L — Action Required",
    varianceColor: "#fee2e2",
    varianceTextColor: "#b91c1c",
    varianceBorderColor: "#fca5a5",
    status: "over",
    statusText: "⚠ Resource Cost Exceeds Budget!",
    tableRows: `<tr><td><i class="fa-solid fa-users" style="color:var(--primary);margin-right:6px;"></i>Manpower Cost</td>
      <td>₹1.80 Cr</td><td>₹2.80 Cr</td><td>80%</td>
      <td style="color:#dc2626;">+55.6%</td><td><span class="badge badge-danger">Over Budget</span></td></tr>
    <tr><td><i class="fa-solid fa-truck" style="color:var(--warning);margin-right:6px;"></i>Vehicle Cost</td>
      <td>₹28 L</td><td>₹45 L</td><td>13%</td>
      <td style="color:#dc2626;">+60.7%</td><td><span class="badge badge-danger">Over Budget</span></td></tr>
    <tr><td><i class="fa-solid fa-screwdriver-wrench" style="color:var(--purple);margin-right:6px;"></i>Equipment Cost</td>
      <td>₹38 L</td><td>₹52 L</td><td>15%</td>
      <td style="color:#dc2626;">+36.8%</td><td><span class="badge badge-danger">Over Budget</span></td></tr>
    <tr><td><i class="fa-solid fa-earth-americas" style="color:#0ea5e9;margin-right:6px;"></i>Regional Cost Impact</td>
      <td>₹22 L</td><td>₹28 L</td><td>8%</td>
      <td style="color:#dc2626;">+27.3%</td><td><span class="badge badge-danger">Over Budget</span></td></tr>
    <tr><td><i class="fa-solid fa-shield-halved" style="color:#64748b;margin-right:6px;"></i>Contingency</td>
      <td>₹18 L</td><td>₹22 L</td><td>6%</td>
      <td style="color:#d97706;">+22.2%</td><td><span class="badge badge-warning">Review</span></td></tr>
    <tr style="background:#fee2e2;"><td><strong>Total Estimated Resource Cost</strong></td>
      <td><strong>₹2.86 Cr</strong></td><td><strong>₹4.27 Cr</strong></td><td><strong>122%</strong></td>
      <td style="color:#dc2626;"><strong>+49.3%</strong></td><td><span class="badge badge-danger">Over Budget</span></td></tr>
    <tr style="background:#fee2e2;"><td><strong>Budget Variance (Shortfall)</strong></td>
      <td colspan="2" style="color:#dc2626;"><strong>₹77 L OVER BUDGET</strong></td><td><strong>—</strong></td>
      <td style="color:#dc2626;"><strong>↑</strong></td><td><span class="badge badge-danger">Action Required</span></td></tr>`,
    regionalRows: `<tr><td style="padding:8px 14px;">🇺🇸 Texas (Primary)</td><td style="text-align:right;padding:8px 14px;">₹3.20 Cr</td><td style="text-align:right;padding:8px 14px;color:#dc2626;">75%</td></tr>
    <tr style="background:#fafbfc;"><td style="padding:8px 14px;">🇺🇸 Nevada (Support)</td><td style="text-align:right;padding:8px 14px;">₹72 L</td><td style="text-align:right;padding:8px 14px;color:#d97706;">17%</td></tr>
    <tr><td style="padding:8px 14px;">🇨🇦 Alberta (Remote Mgmt)</td><td style="text-align:right;padding:8px 14px;">₹35 L</td><td style="text-align:right;padding:8px 14px;color:var(--primary);">8%</td></tr>
    <tr style="font-weight:700;border-top:2px solid var(--border);"><td style="padding:8px 14px;">Total</td><td style="text-align:right;padding:8px 14px;color:#dc2626;">₹4.27 Cr</td><td style="text-align:right;padding:8px 14px;color:#dc2626;">100%</td></tr>`,
    alerts: `<div class="alert alert-danger"><div class="alert-icon"><i class="fa-solid fa-triangle-exclamation"></i></div><div class="alert-content"><strong>OVER BUDGET by ₹77 L</strong><p>Total resource cost ₹4.27 Cr exceeds the ₹3.50 Cr cap. Immediate review required.</p></div></div>
    <div class="alert alert-danger"><div class="alert-icon"><i class="fa-solid fa-users"></i></div><div class="alert-content"><strong>Manpower surge +55.6%</strong><p>Texas solar installation requires double the planned crew size.</p></div></div>
    <div class="alert alert-warning"><div class="alert-icon"><i class="fa-solid fa-lightbulb"></i></div><div class="alert-content"><strong>Recommendation</strong><p>Consider applying Lowest Cost scenario or phasing the project to Q1 2027.</p></div></div>`,
  },
};

function updateBudgetView() {
  const sel = document.getElementById("budget-project-select");
  if (!sel) return;
  const d = budgetProjects[sel.value];
  if (!d) return;

  const set = (id, val) => {
    const el = document.getElementById(id);
    if (el) el.innerHTML = val;
  };
  const setStyle = (id, prop, val) => {
    const el = document.getElementById(id);
    if (el) el.style[prop] = val;
  };

  set("bkpi-budget", d.budget);
  set("bkpi-manpower", d.manpower);
  set("bkpi-manpower-pct", d.manpowerPct + " of budget");
  set("bkpi-vehicle", d.vehicle);
  set("bkpi-vehicle-pct", d.vehiclePct + " of budget");
  set("bkpi-equipment", d.equipment);
  set("bkpi-equipment-pct", d.equipmentPct + " of budget");
  set("bkpi-contingency", d.contingency);
  set("bkpi-contingency-pct", d.contingencyPct + " of budget");
  set("bkpi-total", d.total);
  set("bkpi-total-pct", d.totalPct + " of budget");
  set("budget-bar-label", d.barLabel);
  set("budget-bar-legend", d.barLegend);
  set("budget-table-body", d.tableRows);
  set("budget-regional-body", d.regionalRows);
  set("budget-alerts", d.alerts);

  const chip = document.getElementById("budget-variance-chip");
  if (chip) {
    chip.textContent = d.variance;
    chip.style.background = d.varianceColor;
    chip.style.color = d.varianceTextColor;
    chip.style.borderColor = d.varianceBorderColor;
  }

  const bar = document.getElementById("budget-bar");
  if (bar) {
    bar.style.width = Math.min(d.barPct, 100) + "%";
    bar.style.background = d.barColor;
  }

  const warnBadge = document.getElementById("budget-warning-badge");
  const okBadge = document.getElementById("budget-ok-badge");
  const statusText = document.getElementById("budget-status-text");
  if (d.status === "over") {
    if (warnBadge) warnBadge.style.display = "flex";
    if (okBadge) okBadge.style.display = "none";
    const totalCard = document.getElementById("bkpi-total-card");
    if (totalCard) {
      totalCard.className = "budget-item warn";
    }
  } else {
    if (warnBadge) warnBadge.style.display = "none";
    if (okBadge) {
      okBadge.style.display = "flex";
      okBadge.style.marginLeft = "auto";
    }
    if (statusText) statusText.textContent = d.statusText;
    const totalCard = document.getElementById("bkpi-total-card");
    if (totalCard) {
      totalCard.className = "budget-item ok";
    }
  }
  if (statusText) statusText.textContent = d.statusText;
  if (okBadge && d.status !== "over") {
    okBadge.style.background = d.status === "over" ? "#fee2e2" : "#dcfce7";
    okBadge.style.color = d.status === "over" ? "#b91c1c" : "#15803d";
    okBadge.style.borderColor = d.status === "over" ? "#fca5a5" : "#86efac";
  }
}

showScreen("dashboard");
(function initCalendar() {
  // Period selector buttons
  document.querySelectorAll(".cal-period-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      document
        .querySelectorAll(".cal-period-btn")
        .forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      const period = btn.dataset.period;
      const customRange = document.getElementById("cal-custom-range");
      if (customRange)
        customRange.style.display = period === "custom" ? "flex" : "none";
      if (period !== "custom") {
        setCalMonths({ "3m": 3, "6m": 6, "12m": 12 }[period] || 6);
      }
    });
  });

  // View switcher buttons
  document.querySelectorAll(".cal-view-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      document
        .querySelectorAll(".cal-view-btn")
        .forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      document
        .querySelectorAll(".cal-view-panel")
        .forEach((p) => p.classList.remove("active"));
      const panel = document.getElementById("cal-view-" + btn.dataset.view);
      if (panel) panel.classList.add("active");
    });
  });

  function setCalMonths(count) {
    // Update grid columns on all monthly grid rows
    document.querySelectorAll(".cal-monthly-grid-row").forEach((row) => {
      row.style.gridTemplateColumns = "220px repeat(" + count + ", 1fr)";
    });
    // Show/hide month-indexed cells and headers
    document.querySelectorAll("[data-mi]").forEach((cell) => {
      cell.style.display = parseInt(cell.dataset.mi) <= count ? "" : "none";
    });
  }

  // Default on load: 6 months visible
  setCalMonths(6);
})();

showScreen("dashboard");
