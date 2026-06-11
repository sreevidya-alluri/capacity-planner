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
  // Close region dropdown when clicking outside
  const dd = document.getElementById("region-dropdown");
  if (dd && !e.target.closest("#region-pill-trigger")) {
    dd.classList.remove("open");
  }
});

// ── Language Toggle ─────────────────────────────────────────────
let currentLang = "en";

const translations = {
  en: {
    searchPlaceholder: "Search project, role, vehicle...",
    // Nav sections
    "nav-section-workspace": "Workspace",
    "nav-section-resource": "Resource Core",
    "nav-section-planning": "Planning",
    // Nav labels
    "nav-dashboard": "Dashboard",
    "nav-create-project": "Create Project",
    "nav-project-detail": "Project Detail",
    "nav-ai-planner": "AI Planner",
    "nav-resources": "Resources",
    "nav-manpower": "Manpower",
    "nav-vehicles": "Vehicles",
    "nav-equipment": "Equipment",
    //    "nav-regions": "Region Settings",
    "nav-historical": "Historical Data",
    "nav-calendar": "Capacity Calendar",
    "nav-allocation": "Allocation",
    //    "nav-budget": "Budget",
    "nav-reports": "Reports",
    "nav-admin": "Admin",
    // Screen breadcrumb titles
    "title-dashboard": "Dashboard",
    "subtitle-dashboard": "Overview of your planning workspace",
    "title-create-project": "Create Project",
    "subtitle-create-project": "Define project parameters for AI planning",
    "title-project-detail": "Project Detail",
    "subtitle-project-detail": "View baseline, phases, and resource plan",
    "title-ai-planner": "AI Planner",
    "subtitle-ai-planner": "AI-generated resource recommendations",
    "title-resources": "Resources",
    "subtitle-resources": "Manage all resource categories",
    "title-manpower": "Manpower",
    "subtitle-manpower": "Manage workforce and labour resources",
    "title-vehicles": "Vehicles",
    "subtitle-vehicles": "Manage vehicle fleet and assignments",
    "title-equipment": "Equipment",
    "subtitle-equipment": "Manage equipment inventory and allocation",
    //    "title-regions": "Region Settings",
    //    "subtitle-regions": "Configure region-specific planning factors",
    "title-historical": "Historical Data",
    "subtitle-historical": "Learn from past project performance",
    "title-calendar": "Capacity Calendar",
    "subtitle-calendar": "View resource availability over time",
    "title-allocation": "Allocation",
    "subtitle-allocation": "Assign resources to projects and phases",
    //    "title-budget": "Budget",
    //    "subtitle-budget": "Track cost estimates and budget health",
    "title-reports": "Reports",
    "subtitle-reports": "Generate and export planning reports",
    "title-admin": "Admin",
    "subtitle-admin": "Manage roles, permissions and approval workflows",
    // Budget dynamic text
    "of-budget": "of budget",
    "100-cap": "100% cap",
    // General
    cancel: "Cancel",
    // Dashboard tabs
    "tab-mgmt-dashboard": "Management Dashboard",
    "tab-proj-dashboard": "Project Dashboard",
    "tab-regional-dashboard": "Regional Dashboard",
    // Dashboard – Management KPIs
    "btn-open-calendar": "Open Calendar",
    "btn-new-project": "New Project",
    "kpi-active-projects": "Active Projects",
    "kpi-avail-manpower": "Available Manpower",
    "kpi-alloc-manpower": "Allocated Manpower",
    "kpi-avail-vehicles": "Available Vehicles",
    "kpi-resource-util": "Resource Utilization",
    "kpi-projects-risk": "Projects at Risk",
    "kpi-budget-overruns": "Budget Overruns",
    "kpi-upcoming-shortages": "Upcoming Shortages",
    "kpi-sub-last-month": "from last month",
    "kpi-sub-deployed": "currently deployed",
    "kpi-sub-total-workforce": "of total workforce",
    "kpi-sub-maintenance": "in maintenance this month",
    "kpi-sub-target-band": "within target band",
    "kpi-sub-intervention": "need intervention",
    "kpi-sub-review": "require review",
    "kpi-sub-next30": "next 30 days",
    "card-project-pipeline": "Project Pipeline",
    "sub-project-pipeline": "New opportunities and baseline planning readiness",
    "btn-this-quarter": "This Quarter",
    "card-demand-vs-capacity": "Demand vs Available Capacity",
    "sub-demand-vs-capacity": "Critical roles over the next 90 days",
    "card-regional-load": "Regional Load",
    "sub-regional-load": "Utilization heat by region",
    "card-decision-queue": "Decision Queue",
    "sub-decision-queue": "Items requiring action",
    "card-upcoming-approvals": "Upcoming Approvals",
    "sub-upcoming-approvals": "Plan and budget workflows",
    "alert-supervisor-shortage-title": "Supervisor shortage in Alberta",
    "alert-supervisor-shortage-desc":
      "North Ridge 5 MW will need 2 additional supervisors in August.",
    "alert-crane-overlap-title": "Crane overlap in Week 32",
    "alert-crane-overlap-desc":
      "One crane is double-booked across solar and pipeline jobs.",
    "alert-subcontract-title": "AI suggests subcontract option",
    "alert-subcontract-desc":
      "Service van rental reduces capital lock-in for the service portfolio.",
    // Dashboard – Project tab
    "kpi-proj-budget": "Project Budget",
    "kpi-est-resource-cost": "Est. Resource Cost",
    "kpi-timeline-progress": "Timeline Progress",
    "kpi-active-risks": "Active Risks",
    "kpi-sub-approved-baseline": "Approved baseline",
    "kpi-sub-of-budget-used": "of budget used",
    "kpi-sub-unresolved": "unresolved",
    "card-budget-vs-est": "Budget vs Estimated Cost",
    "th-category": "Category",
    "th-budgeted": "Budgeted",
    "th-estimated": "Estimated",
    "th-variance": "Variance",
    "th-status": "Status",
    "row-manpower": "Manpower",
    "row-vehicles": "Vehicles",
    "row-equipment": "Equipment",
    "row-subcontract": "Subcontract",
    "row-total": "Total",
    "card-phase-manpower": "Phase-wise Manpower Plan",
    "th-phase": "Phase",
    "th-duration": "Duration",
    "th-headcount": "Headcount",
    "th-key-roles": "Key Roles",
    "card-ai-rec-summary": "AI Recommendation Summary",
    "card-risks-alerts": "Risks & Alerts",
    "issues-open": "6 open issues",
    // Dashboard – Regional tab
    "kpi-active-regions": "Active Regions",
    "kpi-regions-shortage": "Regions with Shortage",
    "kpi-avg-regional-util": "Avg Regional Utilization",
    "kpi-total-regional-budget": "Total Regional Budget",
    "card-region-project-summary": "Region-wise Project & Resource Summary",
    "th-region": "Region",
    "th-active-projects": "Active Projects",
    "th-manpower-demand": "Manpower Demand",
    "th-available": "Available",
    "th-shortage": "Shortage",
    "th-utilization": "Utilization",
    "th-resource-cost": "Resource Cost",
    "card-region-cost-compare": "Region-wise Cost Comparison",
    "card-shortage-alerts": "Shortage Alerts by Region",
    // Create Project
    "h1-create-project": "Create New Project",
    "btn-save-draft": "Save Draft",
    "btn-run-ai-plan": "Run AI Plan",
    "card-project-input-form": "Project Input Form",
    "lbl-project-name": "Project Name",
    "lbl-client-name": "Client Name",
    "lbl-project-type": "Project Type",
    "lbl-industry-category": "Industry Category",
    "lbl-contract-type": "Contract Type",
    "lbl-country": "Country",
    "lbl-state-province": "State/Province",
    "lbl-site-condition": "Site Condition",
    "lbl-project-size": "Project Size",
    "lbl-unit": "Unit",
    "lbl-complexity": "Complexity",
    "lbl-start-date": "Start Date",
    "lbl-end-date": "End Date",
    "lbl-expected-duration": "Expected Duration",
    "lbl-working-hours-day": "Working Hours/Day",
    "lbl-working-days-week": "Working Days/Week",
    "lbl-total-working-days": "Total Working Days",
    "lbl-project-budget": "Project Budget",
    "lbl-priority": "Priority",
    "lbl-scope-of-work": "Scope of Work",
    "opt-remote": "Remote",
    "opt-urban": "Urban",
    "opt-rural": "Rural",
    "opt-difficult-terrain": "Difficult Terrain",
    "opt-high": "High",
    "opt-medium": "Medium",
    "opt-low": "Low",
    "opt-days": "Days",
    "opt-weeks": "Weeks",
    "opt-months": "Months",
    // Project Detail
    "btn-open-allocation": "Open Allocation",
    "lbl-duration": "Duration",
    "lbl-shortages": "Shortages",
    "lbl-ai-confidence": "AI Confidence",
    "lbl-start": "Start",
    "lbl-length": "Length",
    "lbl-risk": "Risk",
    "lbl-sites": "Sites",
    "lbl-issue": "Issue",
    "lbl-action": "Action",
    "lbl-site-engineers": "Site Engineers",
    "th-supervisors": "Supervisors",
    "th-technicians": "Technicians",
    "th-cranes": "Cranes",
    "tab-overview": "Overview",
    "tab-phases": "Phases",
    "tab-resources": "Resources",
    "tab-risks": "Risks",
    "card-baseline-summary": "Baseline Summary",
    "sub-baseline-summary": "Planned resource mix and timeline",
    "card-approval-timeline": "Approval Timeline",
    "sub-approval-timeline": "Current workflow state",
    "card-phase-timeline": "Phase Timeline",
    "sub-phase-timeline": "Expected sequencing and peak manpower by phase",
    "th-resource-group": "Resource Group",
    "th-planned": "Planned",
    "th-allocated": "Allocated",
    "th-availability": "Availability",
    // AI Planner
    "h1-ai-planner": "AI Resource Recommendation",
    "btn-compare-scenarios": "Compare Scenarios",
    "btn-accept-plan": "Accept Plan",
    "btn-balanced-plan": "Balanced Plan",
    "btn-lowest-cost": "Lowest Cost",
    "btn-fastest-delivery": "Fastest Delivery",
    "th-type": "Type",
    "th-role-asset": "Role / Asset",
    "th-qty": "Qty",
    "th-est-hours": "Estimated Hours",
    "th-est-cost": "Estimated Cost",
    "th-why": "Why",
    "card-phase-cost-plan": "Phase-wise Cost Plan",
    "sub-phase-cost-plan":
      "Largest consumption comes during core install phases",
    "card-ai-explanation": "AI Explanation Highlights",
    "sub-ai-explanation": "Top drivers for the recommendation",
    "lbl-rec-confidence": "Recommendation Confidence",
    "lbl-top-factors": "Top Factors",
    "lbl-similar-projects": "Similar Projects",
    "lbl-risk-flags": "Risk Flags",
    "sub-rec-confidence":
      "High confidence due to strong historical similarity and stable input coverage.",
    "factor-chip-weather-high": "Weather impact high",
    "factor-chip-productivity": "Productivity 0.75",
    "factor-chip-remote-logistics": "Remote logistics",
    "factor-chip-safety-ratio": "Safety ratio",
    "factor-chip-work-week": "5-day work week",
    "risk-month-2": "Supervisor shortage in Month 2",
    "risk-week-9": "Crane overlap in Week 9",
    "risk-weather-buffer":
      "Weather contingency may require 8% additional buffer",
    "sub-ai-planner":
      "Recommendation built from project inputs, regional rules, historical analogs, and current availability.",
    "stat-similar-projects-count": "14 similar projects",
    "project-risk-supervisor-shortage": "Supervisor shortage",
    "project-risk-supervisor-shortage-desc":
      "Need 2 more supervisors for peak August workload.",
    "project-risk-weather-sensitivity": "Weather sensitivity",
    "project-risk-weather-sensitivity-desc":
      "Productivity may drop further during storm weeks.",
    "trend-stable-this-quarter": "this quarter",
    // Resources
    "h1-resources": "Resource Master",
    "btn-import-csv": "Import CSV",
    "btn-add-resource": "Add Resource",
    "th-name": "Name",
    "th-cost-rate": "Cost Rate",
    // Manpower
    "h1-manpower": "Manpower Master",
    "btn-add-person": "Add Person",
    "th-role": "Role",
    "th-skill-level": "Skill Level",
    "th-cost-hr": "Cost/hr",
    "th-cost-day": "Cost/day",
    "th-max-hrs-wk": "Max Hrs/Wk",
    "th-current-allocation": "Current Allocation",
    "th-future-availability": "Future Availability",
    "th-productivity-rate": "Productivity Rate",
    "th-actions": "Actions",
    // Vehicles
    "h1-vehicles": "Vehicle Master",
    "btn-add-vehicle": "Add Vehicle",
    "th-vehicle-id": "Vehicle ID",
    "th-ownership": "Ownership",
    "th-avail-date": "Avail. Date",
    "th-cost-month": "Cost/Month",
    "th-max-hrs-day": "Max Hrs/Day",
    // Equipment
    "h1-equipment": "Equipment Master",
    "btn-add-equipment": "Add Equipment",
    "th-equipment-id": "Equipment ID",
    "th-operator-required": "Operator Required",
    // Region Settings
    //    "h1-regions": "Region Settings",
    "btn-add-region": "Add Region Plan",
    "lbl-working-hours-day-factor": "Working hours/day",
    "lbl-working-days-week-factor": "Working days/week",
    "lbl-productivity-multiplier": "Productivity multiplier",
    "lbl-cost-multiplier": "Cost multiplier",
    "lbl-weather-impact": "Weather impact",
    "lbl-contingency": "Contingency",
    "lbl-logistics-factor": "Logistics factor",
    "lbl-supervisor-ratio": "Supervisor ratio",
    "alert-planning-draft-title": "Planning draft approved",
    "alert-planning-draft-desc": "Project Manager approved input assumptions.",
    "alert-budget-review-title": "Budget review pending",
    "alert-budget-review-desc":
      "Finance review is waiting on subcontract option analysis.",
    "alert-regional-productivity-title": "Regional productivity adjustment",
    "alert-regional-productivity-desc":
      "Alberta multiplier reduced productivity and increased crew size.",
    "alert-safety-rule-title": "Safety staffing rule",
    "alert-safety-rule-desc":
      "Supervisor and safety coverage increased compared to India benchmark.",
    "alert-historical-analog-title": "Historical analog matching",
    "alert-historical-analog-desc":
      "14 comparable 3–8 MW projects were used as benchmark anchors.",
    // Historical
    "h1-historical": "Historical Project Learning",
    "btn-add-entry": "Add Entry",
    "btn-import-batch": "Import Batch",
    "upload-drop-text": "Drop CSV / XLSX files here",
    "card-learning-impact": "Learning Impact",
    "card-project-entries": "Project Entries",
    "th-size": "Size",
    "th-duration-planned-actual": "Duration (Planned/Actual)",
    "th-cost-planned-actual": "Cost (Planned/Actual)",
    "th-budget-overrun": "Budget Overrun",
    "th-manpower-pa": "Manpower (P/A)",
    "th-vehicles-pa": "Vehicles (P/A)",
    "th-delay-reason": "Delay Reason",
    "th-lessons-learned": "Lessons Learned",
    // Calendar
    "h1-calendar": "Capacity Calendar",
    "btn-export": "Export",
    "btn-3months": "3 Months",
    "btn-6months": "6 Months",
    "btn-12months": "12 Months",
    "btn-custom": "Custom",
    "btn-monthly": "Monthly",
    "btn-weekly": "Weekly",
    "btn-gantt": "Gantt",
    "btn-by-region": "By Region",
    "btn-by-project": "By Project",
    "filter-all-regions": "All Regions",
    "filter-all-categories": "All Categories",
    "kpi-total-resources": "Total Resources",
    "kpi-overallocated": "Overallocated",
    "kpi-free-resources": "Free Resources",
    "kpi-avg-utilization": "Avg Utilization",
    "lbl-legend": "Legend",
    "legend-over100": "Overallocated >100%",
    "legend-75-100": "Allocated 75–100%",
    "legend-50-74": "Partial 50–74%",
    "legend-free": "Free <50%",
    "legend-shortage": "Shortage flag",
    "cal-group-manpower": "Manpower",
    "cal-group-vehicles": "Vehicles",
    "cal-group-equipment": "Equipments",
    "cal-prev": "‹ Prev",
    "cal-next": "Next ›",
    "cal-available": "available",
    "cal-total": "total",
    "gantt-col-project-resource": "Project / Resource",
    "cal-region-monthly-util": "Region-wise Monthly Utilization",
    "cal-project-resource-util": "Project-wise Resource Utilization",
    "th-active-period": "Active Period",
    "th-manpower-used": "Manpower Used",
    "th-manpower-pct": "Manpower %",
    "th-vehicles-used": "Vehicles Used",
    "th-vehicles-pct": "Vehicles %",
    "th-equipment-used": "Equipment Used",
    "th-equipment-pct": "Equipment %",
    "th-overall-util": "Overall Util.",
    "cal-upcoming-shortages": "Upcoming Shortages:",
    // Allocation
    "h1-allocation": "Resource Allocation",
    "btn-auto-assign": "Auto Assign",
    "btn-approve-final": "Approve Final Plan",
    "ai-banner-text": "AI Plan Ready — Balanced Scenario",
    "btn-edit-plan": "Edit Plan",
    "btn-reject": "Reject",
    "conflict-critical": "3 Critical Conflicts",
    "conflict-overbooked": "1 Overbooked Resource",
    "conflict-skill-gap": "1 Skill Gap",
    "conflict-timeline-risk": "1 Timeline Risk",
    "conflict-clean": "14 Clean Assignments",
    "btn-view-all-issues": "View All Issues",
    "tab-people": "People",
    "tab-vehicles-equipment": "Vehicles & Equipment",
    "tab-by-phase": "By Phase",
    "tab-move-resources": "Move Resources",
    "tab-conflicts-alerts": "Conflicts & Alerts",
    "th-assigned-employee": "Assigned Employee",
    "th-skill-match": "Skill Match",
    "th-project-phase": "Project/Phase",
    "th-date-from": "Date From",
    "th-date-to": "Date To",
    "th-workload": "Workload",
    "th-action": "Action",
    "btn-add-assignment": "Add Assignment",
    "th-asset-id": "Asset ID",
    "th-assigned-project": "Assigned Project",
    "th-vehicle-assignments": "Vehicle Assignments",
    "th-equipment-assignments": "Equipment Assignments",
    "conflicts-detected": "6 issues detected",
    "conflicts-must-resolve":
      "All conflicts must be resolved before approving the plan.",
    "btn-auto-resolve": "Auto-Resolve All",
    // Budget
    //    "h1-budget": "Budget Planning",
    "btn-scenario-compare": "Scenario Compare",
    "btn-send-approval": "Send for Approval",
    "lbl-project-colon": "Project:",
    "lbl-period-colon": "Period:",
    "opt-full-project": "Full Project",
    "budget-warning-text": "Resource cost exceeds budget cap!",
    "budget-ok-text": "Budget Status: Within Budget",
    //    "lbl-budget-utilization": "Budget Utilization",
    "kpi-project-budget": "Project Budget",
    "kpi-manpower-cost": "Manpower Cost",
    "kpi-vehicle-cost": "Vehicle Cost",
    "kpi-equipment-cost": "Equipment Cost",
    "kpi-contingency": "Contingency",
    "kpi-total-resource-cost": "Total Resource Cost",
    "card-cost-breakdown": "Cost Breakdown",
    "th-cost-component": "Cost Component",
    "th-revised": "Revised",
    "th-pct-budget": "% of Budget",
    "card-budget-insights": "Budget Insights",
    "subtitle-budget-insights": "Factors behind the cost changes",
    "card-regional-cost-impact": "Regional Cost Impact",
    "subtitle-regional-cost-impact": "Resource cost by deployment region",
    "th-cost": "Cost",
    "th-pct-total": "% of Total",
    "th-total-row": "Total",
    // Reports
    "h1-reports": "Reports",
    "btn-export-bundle": "Export Bundle",
    "report-manpower-req": "Manpower Requirement",
    "report-utilization": "Utilization Report",
    "report-budget-variance": "Budget Variance",
    "report-ai-recommendation": "AI Recommendation",
    "report-historical-comparison": "Historical Comparison",
    "report-shortage-conflict": "Shortage & Conflict",
    "meta-updated-daily": "Updated daily",
    "meta-updated-on-approval": "Updated on approval",
    "meta-on-demand": "On demand",
    "meta-real-time": "Real time",
    // Admin
    "h1-admin": "Admin Settings",
    "btn-add-role": "Add Role",
    "th-projects": "Projects",
    "th-ai-planner-col": "AI Planner",
    "th-budget-col": "Budget",
    "th-admin-col": "Admin",
    "role-super-admin": "Super Admin",
    "role-pm": "Project Manager",
    "role-finance": "Finance Manager",
    "role-viewer": "Viewer / Auditor",
    "card-approval-workflow": "Approval Workflow",
    "subtitle-approval-workflow": "Default baseline approval path",
    "step-pm": "Project Manager",
    "step-pm-desc": "Validates project input assumptions.",
    "step-planning-mgr": "Planning Manager",
    "step-planning-mgr-desc": "Accepts AI or manual scenario baseline.",
    "step-finance-mgr": "Finance Manager",
    "step-finance-mgr-desc": "Approves cost and contingency.",
    "step-project-owner": "Project Owner",
    "step-project-owner-desc": "Final project go-ahead.",
    // Modal – Add Historical
    "modal-historical-title": "Add Historical Project Entry",
    "modal-historical-section-info": "Project Information",
    "modal-historical-section-duration": "Duration",
    "modal-historical-section-manpower": "Manpower",
    "modal-historical-section-vehicles": "Vehicles",
    "modal-historical-section-cost": "Cost",
    "modal-historical-section-delays": "Delays & Issues",
    "lbl-planned-duration": "Planned Duration",
    "lbl-actual-duration": "Actual Duration",
    "lbl-planned-manpower": "Planned Manpower",
    "lbl-actual-manpower": "Actual Manpower Used",
    "lbl-planned-vehicles": "Planned Vehicles",
    "lbl-actual-vehicles": "Actual Vehicles Used",
    "lbl-planned-cost": "Planned Cost",
    "lbl-actual-cost": "Actual Cost",
    //    "lbl-budget-overrun-pct": "Budget Overrun (%)",
    "lbl-delays-occurred": "Delays Occurred",
    "lbl-reason-for-delay": "Reason for Delay",
    "lbl-productivity-achieved": "Productivity Achieved (%)",
    "lbl-resource-shortage-issues": "Resource Shortage Issues",
    "lbl-lessons-learned": "Lessons Learned",
    "btn-save-entry": "Save Entry",
    // Modal – Add Region
    "modal-region-title": "Add Region Plan",
    "modal-region-section-location": "Location",
    "modal-region-section-schedule": "Working Schedule",
    "modal-region-section-multipliers": "Planning Multipliers",
    "modal-region-section-safety": "Safety & Staffing Minimums",
    "lbl-region-name": "Region Name",
    "lbl-std-working-hours": "Standard Working Hours / Day",
    "lbl-std-working-days": "Standard Working Days / Week",
    "lbl-labour-availability": "Labour Availability Factor",
    "lbl-weather-impact-factor": "Weather Impact Factor",
    "lbl-travel-logistics": "Travel / Logistics Factor",
    "lbl-safety-compliance": "Safety Compliance Factor",
    "lbl-local-regulation": "Local Regulation Factor",
    "lbl-vehicle-req-multiplier": "Vehicle Requirement Multiplier",
    "lbl-min-safety-staff": "Min. Required Safety Staff",
    "lbl-min-supervisor-ratio": "Min. Supervisor-to-Worker Ratio",
    "lbl-contingency-pct": "Contingency Percentage",
    "btn-save-region": "Save Region Plan",
    // Modal – Add Person
    "modal-person-title": "Add Person to Resource Master",
    "lbl-resource-name": "Resource Name",
    "lbl-availability-date": "Availability Date",
    "lbl-cost-per-hour": "Cost per Hour",
    "lbl-cost-per-day": "Cost per Day",
    "lbl-cost-per-month": "Cost per Month",
    "lbl-max-working-hrs-wk": "Max Working Hours/Week",
    "lbl-current-allocation-status": "Current Allocation Status",
    "lbl-future-availability-date": "Future Availability Date",
    "lbl-certifications": "Certifications",
    "lbl-notes": "Notes",
    "btn-save-person": "Save Person",
    // Modal – Add Vehicle
    "modal-vehicle-title": "Add Vehicle to Resource Master",
    "lbl-vehicle-id": "Vehicle ID",
    "lbl-vehicle-type": "Vehicle Type",
    "lbl-ownership": "Ownership",
    "lbl-available-date": "Available Date",
    "lbl-cost-per-day": "Cost per Day",
    "lbl-cost-per-month": "Cost per Month",
    "lbl-max-hours-day": "Max Hours/Day",
    "lbl-operator-required": "Operator Required",
    "lbl-driver-required": "Driver Required",
    "btn-save-vehicle": "Save Vehicle",
    // Modal – Add Equipment
    "modal-equipment-title": "Add Equipment to Resource Master",
    "lbl-equipment-id": "Equipment ID",
    "lbl-equipment-type": "Equipment Type",
    "lbl-calibration-due": "Calibration Due Date",
    "btn-save-equipment": "Save Equipment",
    // Modal – Scenario Compare
    "modal-compare-title": "Compare AI Scenarios",
    "modal-compare-subtitle":
      "Side-by-side comparison of AI-generated resource plans for your project.",
    "th-metric": "Metric",
    "th-balanced-plan": "Balanced Plan / AI Recommended",
    "th-lowest-cost-col": "Lowest Cost / Lean staffing",
    "th-fastest-delivery-col": "Fastest Delivery / Surge resourcing",
    "row-manpower-cost": "Manpower Cost",
    "row-vehicle-cost": "Vehicle Cost",
    "row-equipment-cost": "Equipment Cost",
    "row-regional-impact": "Regional Impact",
    "row-contingency": "Contingency",
    "row-total-resource-cost": "Total Resource Cost",
    "row-project-duration": "Project Duration",
    "row-team-size": "Team Size",
    "row-risk-level": "Risk Level",
    "row-budget-status": "Budget Status",
    "row-ai-confidence": "AI Confidence",
    "btn-close": "Close",
    "btn-apply-lowest-cost": "Apply Lowest Cost",
    "btn-apply-balanced": "Apply Balanced Plan",
    // Modal – Edit Plan
    "modal-edit-plan-title": "Edit AI Plan Parameters",
    "lbl-optimization-goal": "Optimization Goal",
    "lbl-max-team-size": "Max Team Size",
    "lbl-target-end-date": "Target End Date",
    //    "lbl-budget-cap": "Budget Cap",
    "lbl-constraints": "Constraints",
    "chk-allow-subcontractors": "Allow subcontractors when needed",
    "chk-enforce-certifications": "Enforce certification requirements",
    "chk-allow-cross-project": "Allow cross-project resource sharing",
    "chk-respect-max-util": "Respect max 100% utilization per resource",
    "opt-balanced": "Balanced (Cost + Time)",
    "opt-minimize-conflicts": "Minimize Conflicts",
    "btn-rerun-ai": "Re-run AI Plan",
    // Tender Pipeline / Activity Planning / Dept. Coordination (new screens)
    "nav-tender-pipeline": "Tender Pipeline",
    "nav-activity-planning": "Activity Planning",
    "nav-dept-coordination": "Dept. Coordination",
    "title-tender-pipeline": "Tender Pipeline",
    "subtitle-tender-pipeline": "Track open, won and lost proposals",
    "title-activity-planning": "Activity Planning",
    "subtitle-activity-planning":
      "Plan hours by discipline against FocusGP guardrails",
    "title-dept-coordination": "Dept. Coordination",
    "subtitle-dept-coordination":
      "Weekly capacity heatmap across engineering disciplines",
    "btn-new-tender": "New Tender",
    //    "lbl-budget-fees": "Budget Fees",
    //    "lbl-budget-hours": "Budget Hours",
    "lbl-target-rate": "Target Rate",
    "lbl-guardrails": "FocusGP Guardrails",
    //    "lbl-budget-honoraires": "BudgetHonoraires",
    //    "lbl-budget-heures": "BudgetHeures",
    "lbl-target-avg-rate": "Target Avg Rate",
    "lbl-rate-variance": "Rate Variance",
  },
  fr: {
    searchPlaceholder: "Rechercher projet, rôle, véhicule...",
    // Nav sections
    "nav-section-workspace": "Espace de travail",
    "nav-section-resource": "Ressources principales",
    "nav-section-planning": "Planification",
    // Nav labels
    "nav-dashboard": "Tableau de bord",
    "nav-create-project": "Créer un projet",
    "nav-project-detail": "Détail du projet",
    "nav-ai-planner": "Planificateur IA",
    "nav-resources": "Ressources",
    "nav-manpower": "Main-d'œuvre",
    "nav-vehicles": "Véhicules",
    "nav-equipment": "Équipement",
    //    "nav-regions": "Paramètres régionaux",
    "nav-historical": "Données historiques",
    "nav-calendar": "Calendrier de capacité",
    "nav-allocation": "Allocation",
    //    "nav-budget": "Budget",
    "nav-reports": "Rapports",
    "nav-admin": "Administration",
    // Screen breadcrumb titles
    "title-dashboard": "Tableau de bord",
    "subtitle-dashboard": "Aperçu de votre espace de planification",
    "title-create-project": "Créer un projet",
    "subtitle-create-project":
      "Définir les paramètres du projet pour la planification IA",
    "title-project-detail": "Détail du projet",
    "subtitle-project-detail":
      "Voir la référence, les phases et le plan de ressources",
    "title-ai-planner": "Planificateur IA",
    "subtitle-ai-planner": "Recommandations de ressources générées par l'IA",
    "title-resources": "Ressources",
    "subtitle-resources": "Gérer toutes les catégories de ressources",
    "title-manpower": "Main-d'œuvre",
    "subtitle-manpower": "Gérer la main-d'œuvre et les ressources humaines",
    "title-vehicles": "Véhicules",
    "subtitle-vehicles": "Gérer la flotte de véhicules et les attributions",
    "title-equipment": "Équipement",
    "subtitle-equipment": "Gérer l'inventaire et l'allocation des équipements",
    //    "title-regions": "Paramètres régionaux",
    //    "subtitle-regions": "Configurer les facteurs de planification par région",
    "title-historical": "Données historiques",
    "subtitle-historical": "Apprendre des performances passées des projets",
    "title-calendar": "Calendrier de capacité",
    "subtitle-calendar": "Voir la disponibilité des ressources dans le temps",
    "title-allocation": "Allocation",
    "subtitle-allocation": "Assigner des ressources aux projets et aux phases",
    //    "title-budget": "Budget",
    //    "subtitle-budget": "Suivre les estimations de coûts et la santé budgétaire",
    "title-reports": "Rapports",
    "subtitle-reports": "Générer et exporter des rapports de planification",
    "title-admin": "Administration",
    "subtitle-admin":
      "Gérer les rôles, les permissions et les flux d'approbation",
    // Budget dynamic text
    "of-budget": "du budget",
    "100-cap": "100% plafond",
    // General
    cancel: "Annuler",
    // Dashboard tabs
    "tab-mgmt-dashboard": "Tableau de bord de gestion",
    "tab-proj-dashboard": "Tableau de bord projet",
    "tab-regional-dashboard": "Tableau de bord régional",
    // Dashboard – Management KPIs
    "btn-open-calendar": "Ouvrir le calendrier",
    "btn-new-project": "Nouveau projet",
    "kpi-active-projects": "Projets actifs",
    "kpi-avail-manpower": "Main-d'œuvre disponible",
    "kpi-alloc-manpower": "Main-d'œuvre allouée",
    "kpi-avail-vehicles": "Véhicules disponibles",
    "kpi-resource-util": "Utilisation des ressources",
    "kpi-projects-risk": "Projets à risque",
    "kpi-budget-overruns": "Dépassements budgétaires",
    "kpi-upcoming-shortages": "Pénuries à venir",
    "kpi-sub-last-month": "par rapport au mois dernier",
    "kpi-sub-deployed": "actuellement déployés",
    "kpi-sub-total-workforce": "de la main-d'œuvre totale",
    "kpi-sub-maintenance": "en maintenance ce mois",
    "kpi-sub-target-band": "dans la cible",
    "kpi-sub-intervention": "nécessitent une intervention",
    "kpi-sub-review": "nécessitent une révision",
    "kpi-sub-next30": "dans les 30 prochains jours",
    "card-project-pipeline": "Pipeline de projets",
    "sub-project-pipeline":
      "Nouvelles opportunités et préparation de la planification de base",
    "btn-this-quarter": "Ce trimestre",
    "card-demand-vs-capacity": "Demande vs capacité disponible",
    "sub-demand-vs-capacity": "Rôles critiques sur les 90 prochains jours",
    "card-regional-load": "Charge régionale",
    "sub-regional-load": "Carte de chaleur de l'utilisation par région",
    "card-decision-queue": "File de décisions",
    "sub-decision-queue": "Éléments nécessitant une action",
    "card-upcoming-approvals": "Approbations à venir",
    "sub-upcoming-approvals": "Flux de planification et de budget",
    "alert-supervisor-shortage-title": "Pénurie de superviseurs en Alberta",
    "alert-supervisor-shortage-desc":
      "North Ridge 5 MW aura besoin de 2 superviseurs supplémentaires en août.",
    "alert-crane-overlap-title": "Chevauchement de grue à la semaine 32",
    "alert-crane-overlap-desc":
      "Une grue est réservée deux fois entre les travaux solaires et de pipeline.",
    "alert-subcontract-title": "L'IA suggère une option de sous-traitance",
    "alert-subcontract-desc":
      "La location d'une camionnette réduit l'immobilisation du capital pour le portefeuille de service.",
    // Dashboard – Project tab
    "kpi-proj-budget": "Budget du projet",
    "kpi-est-resource-cost": "Coût estimé des ressources",
    "kpi-timeline-progress": "Avancement du calendrier",
    "kpi-active-risks": "Risques actifs",
    "kpi-sub-approved-baseline": "Base approuvée",
    "kpi-sub-of-budget-used": "du budget utilisé",
    "kpi-sub-unresolved": "non résolus",
    "card-budget-vs-est": "Budget vs coût estimé",
    "th-category": "Catégorie",
    "th-budgeted": "Budgété",
    "th-estimated": "Estimé",
    "th-variance": "Écart",
    "th-status": "Statut",
    "row-manpower": "Main-d'œuvre",
    "row-vehicles": "Véhicules",
    "row-equipment": "Équipement",
    "row-subcontract": "Sous-traitance",
    "row-total": "Total",
    "card-phase-manpower": "Plan de main-d'œuvre par phase",
    "th-phase": "Phase",
    "th-duration": "Durée",
    "th-headcount": "Effectif",
    "th-key-roles": "Rôles clés",
    "card-ai-rec-summary": "Résumé des recommandations IA",
    "card-risks-alerts": "Risques et alertes",
    "issues-open": "6 problèmes ouverts",
    // Dashboard – Regional tab
    "kpi-active-regions": "Régions actives",
    "kpi-regions-shortage": "Régions en pénurie",
    "kpi-avg-regional-util": "Utilisation régionale moy.",
    "kpi-total-regional-budget": "Budget régional total",
    "card-region-project-summary": "Résumé projets et ressources par région",
    "th-region": "Région",
    "th-active-projects": "Projets actifs",
    "th-manpower-demand": "Besoin en main-d'œuvre",
    "th-available": "Disponible",
    "th-shortage": "Pénurie",
    "th-utilization": "Utilisation",
    "th-resource-cost": "Coût ressources",
    "card-region-cost-compare": "Comparaison des coûts par région",
    "card-shortage-alerts": "Alertes pénurie par région",
    // Create Project
    "h1-create-project": "Créer un nouveau projet",
    "btn-save-draft": "Sauvegarder le brouillon",
    "btn-run-ai-plan": "Lancer le plan IA",
    "card-project-input-form": "Formulaire de saisie du projet",
    "lbl-project-name": "Nom du projet",
    "lbl-client-name": "Nom du client",
    "lbl-project-type": "Type de projet",
    "lbl-industry-category": "Catégorie d'industrie",
    "lbl-contract-type": "Type de contrat",
    "lbl-country": "Pays",
    "lbl-state-province": "Province/État",
    "lbl-site-condition": "Condition du site",
    "lbl-project-size": "Taille du projet",
    "lbl-unit": "Unité",
    "lbl-complexity": "Complexité",
    "lbl-start-date": "Date de début",
    "lbl-end-date": "Date de fin",
    "lbl-expected-duration": "Durée prévue",
    "lbl-working-hours-day": "Heures de travail/jour",
    "lbl-working-days-week": "Jours ouvrables/semaine",
    "lbl-total-working-days": "Total jours ouvrables",
    "lbl-project-budget": "Budget du projet",
    "lbl-priority": "Priorité",
    "lbl-scope-of-work": "Périmètre des travaux",
    "opt-remote": "À distance",
    "opt-urban": "Urbain",
    "opt-rural": "Rural",
    "opt-difficult-terrain": "Terrain difficile",
    "opt-high": "Élevé",
    "opt-medium": "Moyen",
    "opt-low": "Faible",
    "opt-days": "Jours",
    "opt-weeks": "Semaines",
    "opt-months": "Mois",
    // Project Detail
    "btn-open-allocation": "Ouvrir l'allocation",
    "lbl-duration": "Durée",
    "lbl-shortages": "Pénuries",
    "lbl-ai-confidence": "Confiance IA",
    "lbl-start": "Début",
    "lbl-length": "Longueur",
    "lbl-risk": "Risque",
    "lbl-sites": "Sites",
    "lbl-issue": "Problème",
    "lbl-action": "Action",
    "lbl-site-engineers": "Ingénieurs de chantier",
    "th-supervisors": "Superviseurs",
    "th-technicians": "Techniciens",
    "th-cranes": "Grues",
    "tab-overview": "Aperçu",
    "tab-phases": "Phases",
    "tab-resources": "Ressources",
    "tab-risks": "Risques",
    "card-baseline-summary": "Résumé de référence",
    "sub-baseline-summary": "Mélange de ressources et calendrier prévus",
    "card-approval-timeline": "Calendrier d'approbation",
    "sub-approval-timeline": "État actuel du flux de travail",
    "card-phase-timeline": "Calendrier des phases",
    "sub-phase-timeline": "Séquencement attendu et charge de pointe par phase",
    "th-resource-group": "Groupe de ressources",
    "th-planned": "Planifié",
    "th-allocated": "Alloué",
    "th-availability": "Disponibilité",
    // AI Planner
    "h1-ai-planner": "Recommandation IA de ressources",
    "btn-compare-scenarios": "Comparer les scénarios",
    "btn-accept-plan": "Accepter le plan",
    "btn-balanced-plan": "Plan équilibré",
    "btn-lowest-cost": "Coût le plus bas",
    "btn-fastest-delivery": "Livraison la plus rapide",
    "th-type": "Type",
    "th-role-asset": "Rôle / Actif",
    "th-qty": "Qté",
    "th-est-hours": "Heures estimées",
    "th-est-cost": "Coût estimé",
    "th-why": "Raison",
    "card-phase-cost-plan": "Plan de coûts par phase",
    "sub-phase-cost-plan":
      "La plus grande consommation se produit pendant les phases d'installation principales",
    "card-ai-explanation": "Points saillants des explications IA",
    "sub-ai-explanation": "Principaux facteurs de la recommandation",
    "lbl-rec-confidence": "Confiance de la recommandation",
    "lbl-top-factors": "Facteurs principaux",
    "lbl-similar-projects": "Projets similaires",
    "lbl-risk-flags": "Signalements de risques",
    "sub-rec-confidence":
      "Forte confiance grâce à une forte similitude historique et à une couverture stable des entrées.",
    "factor-chip-weather-high": "Impact météo élevé",
    "factor-chip-productivity": "Productivité 0,75",
    "factor-chip-remote-logistics": "Logistique distante",
    "factor-chip-safety-ratio": "Ratio de sécurité",
    "factor-chip-work-week": "Semaine de travail de 5 jours",
    "risk-month-2": "Pénurie de superviseurs au mois 2",
    "risk-week-9": "Chevauchement de grue à la semaine 9",
    "risk-weather-buffer":
      "La contingence météo peut nécessiter une réserve supplémentaire de 8%",
    "sub-ai-planner":
      "La recommandation est construite à partir des entrées du projet, des règles régionales, des analogues historiques et de la disponibilité actuelle.",
    "stat-similar-projects-count": "14 projets similaires",
    "project-risk-supervisor-shortage": "Pénurie de superviseurs",
    "project-risk-supervisor-shortage-desc":
      "Il faut 2 superviseurs de plus pour la charge de pointe d'août.",
    "project-risk-weather-sensitivity": "Sensibilité météo",
    "project-risk-weather-sensitivity-desc":
      "La productivité peut encore baisser pendant les semaines de tempête.",
    "trend-stable-this-quarter": "ce trimestre",
    // Resources
    "h1-resources": "Registre des ressources",
    "btn-import-csv": "Importer CSV",
    "btn-add-resource": "Ajouter une ressource",
    "th-name": "Nom",
    "th-cost-rate": "Taux de coût",
    // Manpower
    "h1-manpower": "Registre de la main-d'œuvre",
    "btn-add-person": "Ajouter une personne",
    "th-role": "Rôle",
    "th-skill-level": "Niveau de compétence",
    "th-cost-hr": "Coût/h",
    "th-cost-day": "Coût/jour",
    "th-max-hrs-wk": "Max h/sem",
    "th-current-allocation": "Allocation actuelle",
    "th-future-availability": "Disponibilité future",
    "th-productivity-rate": "Taux de productivité",
    "th-actions": "Actions",
    // Vehicles
    "h1-vehicles": "Registre des véhicules",
    "btn-add-vehicle": "Ajouter un véhicule",
    "th-vehicle-id": "ID véhicule",
    "th-ownership": "Propriété",
    "th-avail-date": "Date de dispo.",
    "th-cost-month": "Coût/mois",
    "th-max-hrs-day": "Max h/jour",
    // Equipment
    "h1-equipment": "Registre des équipements",
    "btn-add-equipment": "Ajouter un équipement",
    "th-equipment-id": "ID équipement",
    "th-operator-required": "Opérateur requis",
    // Region Settings
    //    "h1-regions": "Paramètres régionaux",
    "btn-add-region": "Ajouter un plan régional",
    "lbl-working-hours-day-factor": "Heures de travail/jour",
    "lbl-working-days-week-factor": "Jours ouvrables/semaine",
    "lbl-productivity-multiplier": "Multiplicateur de productivité",
    "lbl-cost-multiplier": "Multiplicateur de coût",
    "lbl-weather-impact": "Impact météo",
    "lbl-contingency": "Contingence",
    "lbl-logistics-factor": "Facteur logistique",
    "lbl-supervisor-ratio": "Ratio superviseur",
    "alert-planning-draft-title": "Brouillon de plan approuvé",
    "alert-planning-draft-desc":
      "Le chef de projet a approuvé les hypothèses de saisie.",
    "alert-budget-review-title": "Révision du budget en attente",
    "alert-budget-review-desc":
      "La révision financière attend l'analyse de l'option de sous-traitance.",
    "alert-regional-productivity-title": "Ajustement de productivité régionale",
    "alert-regional-productivity-desc":
      "Le multiplicateur d'Alberta a réduit la productivité et augmenté la taille de l'équipe.",
    "alert-safety-rule-title": "Règle de dotation en sécurité",
    "alert-safety-rule-desc":
      "La couverture superviseur et sécurité a augmenté par rapport au benchmark indien.",
    "alert-historical-analog-title":
      "Correspondance avec les analogues historiques",
    "alert-historical-analog-desc":
      "14 projets comparables de 3 à 8 MW ont servi d'ancrage de référence.",
    // Historical
    "h1-historical": "Apprentissage des projets historiques",
    "btn-add-entry": "Ajouter une entrée",
    "btn-import-batch": "Importer en lot",
    "upload-drop-text": "Déposez des fichiers CSV / XLSX ici",
    "card-learning-impact": "Impact de l'apprentissage",
    "card-project-entries": "Entrées de projets",
    "th-size": "Taille",
    "th-duration-planned-actual": "Durée (Prévu/Réel)",
    "th-cost-planned-actual": "Coût (Prévu/Réel)",
    "th-budget-overrun": "Dépassement budgétaire",
    "th-manpower-pa": "Main-d'œuvre (P/R)",
    "th-vehicles-pa": "Véhicules (P/R)",
    "th-delay-reason": "Cause du retard",
    "th-lessons-learned": "Leçons apprises",
    // Calendar
    "h1-calendar": "Calendrier de capacité",
    "btn-export": "Exporter",
    "btn-3months": "3 mois",
    "btn-6months": "6 mois",
    "btn-12months": "12 mois",
    "btn-custom": "Personnalisé",
    "btn-monthly": "Mensuel",
    "btn-weekly": "Hebdomadaire",
    "btn-gantt": "Gantt",
    "btn-by-region": "Par région",
    "btn-by-project": "Par projet",
    "filter-all-regions": "Toutes les régions",
    "filter-all-categories": "Toutes les catégories",
    "kpi-total-resources": "Ressources totales",
    "kpi-overallocated": "Suralloués",
    "kpi-free-resources": "Ressources libres",
    "kpi-avg-utilization": "Utilisation moy.",
    "lbl-legend": "Légende",
    "legend-over100": "Suralloué >100%",
    "legend-75-100": "Alloué 75–100%",
    "legend-50-74": "Partiel 50–74%",
    "legend-free": "Libre <50%",
    "legend-shortage": "Signalement pénurie",
    "cal-group-manpower": "Main-d'œuvre",
    "cal-group-vehicles": "Véhicules",
    "cal-group-equipment": "Équipements",
    "cal-prev": "‹ Préc.",
    "cal-next": "Suiv. ›",
    "cal-available": "disponibles",
    "cal-total": "au total",
    "gantt-col-project-resource": "Projet / Ressource",
    "cal-region-monthly-util": "Utilisation mensuelle par région",
    "cal-project-resource-util": "Utilisation des ressources par projet",
    "th-active-period": "Période active",
    "th-manpower-used": "Main-d'œuvre utilisée",
    "th-manpower-pct": "Main-d'œuvre %",
    "th-vehicles-used": "Véhicules utilisés",
    "th-vehicles-pct": "Véhicules %",
    "th-equipment-used": "Équipements utilisés",
    "th-equipment-pct": "Équipements %",
    "th-overall-util": "Util. globale",
    "cal-upcoming-shortages": "Pénuries à venir :",
    // Allocation
    "h1-allocation": "Allocation des ressources",
    "btn-auto-assign": "Attribution automatique",
    "btn-approve-final": "Approuver le plan final",
    "ai-banner-text": "Plan IA prêt — Scénario équilibré",
    "btn-edit-plan": "Modifier le plan",
    "btn-reject": "Rejeter",
    "conflict-critical": "3 conflits critiques",
    "conflict-overbooked": "1 ressource surbookée",
    "conflict-skill-gap": "1 lacune de compétence",
    "conflict-timeline-risk": "1 risque de calendrier",
    "conflict-clean": "14 attributions sans conflit",
    "btn-view-all-issues": "Voir tous les problèmes",
    "tab-people": "Personnes",
    "tab-vehicles-equipment": "Véhicules et équipements",
    "tab-by-phase": "Par phase",
    "tab-move-resources": "Déplacer les ressources",
    "tab-conflicts-alerts": "Conflits et alertes",
    "th-assigned-employee": "Employé assigné",
    "th-skill-match": "Correspondance compétence",
    "th-project-phase": "Projet/Phase",
    "th-date-from": "Date de début",
    "th-date-to": "Date de fin",
    "th-workload": "Charge de travail",
    "th-action": "Action",
    "btn-add-assignment": "Ajouter une attribution",
    "th-asset-id": "ID actif",
    "th-assigned-project": "Projet assigné",
    "th-vehicle-assignments": "Attributions de véhicules",
    "th-equipment-assignments": "Attributions d'équipements",
    "conflicts-detected": "6 problèmes détectés",
    "conflicts-must-resolve":
      "Tous les conflits doivent être résolus avant d'approuver le plan.",
    "btn-auto-resolve": "Résoudre tout automatiquement",
    // Budget
    //    "h1-budget": "Planification budgétaire",
    "btn-scenario-compare": "Comparer les scénarios",
    "btn-send-approval": "Envoyer pour approbation",
    "lbl-project-colon": "Projet :",
    "lbl-period-colon": "Période :",
    "opt-full-project": "Projet complet",
    "budget-warning-text":
      "Le coût des ressources dépasse le plafond budgétaire !",
    "budget-ok-text": "Statut budget : Dans le budget",
    //    "lbl-budget-utilization": "Utilisation du budget",
    "kpi-project-budget": "Budget du projet",
    "kpi-manpower-cost": "Coût main-d'œuvre",
    "kpi-vehicle-cost": "Coût véhicules",
    "kpi-equipment-cost": "Coût équipements",
    "kpi-contingency": "Contingence",
    "kpi-total-resource-cost": "Coût total des ressources",
    "card-cost-breakdown": "Décomposition des coûts",
    "th-cost-component": "Composante de coût",
    "th-revised": "Révisé",
    "th-pct-budget": "% du budget",
    "card-budget-insights": "Informations budgétaires",
    "subtitle-budget-insights": "Facteurs derrière les changements de coûts",
    "card-regional-cost-impact": "Impact coût régional",
    "subtitle-regional-cost-impact":
      "Coût des ressources par région de déploiement",
    "th-cost": "Coût",
    "th-pct-total": "% du total",
    "th-total-row": "Total",
    // Reports
    "h1-reports": "Rapports",
    "btn-export-bundle": "Télécharger le lot",
    "report-manpower-req": "Besoin en main-d'œuvre",
    "report-utilization": "Rapport d'utilisation",
    "report-budget-variance": "Écart budgétaire",
    "report-ai-recommendation": "Recommandation IA",
    "report-historical-comparison": "Comparaison historique",
    "report-shortage-conflict": "Pénurie et conflits",
    "meta-updated-daily": "Mis à jour quotidiennement",
    "meta-updated-on-approval": "Mis à jour à l'approbation",
    "meta-on-demand": "À la demande",
    "meta-real-time": "Temps réel",
    // Admin
    "h1-admin": "Paramètres d'administration",
    "btn-add-role": "Ajouter un rôle",
    "th-projects": "Projets",
    "th-ai-planner-col": "Planificateur IA",
    "th-budget-col": "Budget",
    "th-admin-col": "Administration",
    "role-super-admin": "Super Administrateur",
    "role-pm": "Chef de projet",
    "role-finance": "Directeur financier",
    "role-viewer": "Observateur / Auditeur",
    "card-approval-workflow": "Flux d'approbation",
    "subtitle-approval-workflow": "Chemin d'approbation par défaut",
    "step-pm": "Chef de projet",
    "step-pm-desc": "Valide les hypothèses de saisie du projet.",
    "step-planning-mgr": "Responsable de la planification",
    "step-planning-mgr-desc": "Accepte la référence du scénario IA ou manuel.",
    "step-finance-mgr": "Directeur financier",
    "step-finance-mgr-desc": "Approuve les coûts et la contingence.",
    "step-project-owner": "Propriétaire du projet",
    "step-project-owner-desc": "Approbation finale du projet.",
    // Modal – Add Historical
    "modal-historical-title": "Ajouter une entrée de projet historique",
    "modal-historical-section-info": "Informations sur le projet",
    "modal-historical-section-duration": "Durée",
    "modal-historical-section-manpower": "Main-d'œuvre",
    "modal-historical-section-vehicles": "Véhicules",
    "modal-historical-section-cost": "Coût",
    "modal-historical-section-delays": "Retards et problèmes",
    "lbl-planned-duration": "Durée prévue",
    "lbl-actual-duration": "Durée réelle",
    "lbl-planned-manpower": "Main-d'œuvre prévue",
    "lbl-actual-manpower": "Main-d'œuvre réelle",
    "lbl-planned-vehicles": "Véhicules prévus",
    "lbl-actual-vehicles": "Véhicules réels",
    "lbl-planned-cost": "Coût prévu",
    "lbl-actual-cost": "Coût réel",
    //    "lbl-budget-overrun-pct": "Dépassement budgétaire (%)",
    "lbl-delays-occurred": "Retards survenus",
    "lbl-reason-for-delay": "Raison du retard",
    "lbl-productivity-achieved": "Productivité atteinte (%)",
    "lbl-resource-shortage-issues": "Problèmes de pénurie de ressources",
    "lbl-lessons-learned": "Leçons apprises",
    "btn-save-entry": "Sauvegarder l'entrée",
    // Modal – Add Region
    "modal-region-title": "Ajouter un plan régional",
    "modal-region-section-location": "Localisation",
    "modal-region-section-schedule": "Horaires de travail",
    "modal-region-section-multipliers": "Multiplicateurs de planification",
    "modal-region-section-safety": "Minimums de sécurité et de dotation",
    "lbl-region-name": "Nom de la région",
    "lbl-std-working-hours": "Heures de travail standard / jour",
    "lbl-std-working-days": "Jours ouvrables standard / semaine",
    "lbl-labour-availability": "Facteur de disponibilité de main-d'œuvre",
    "lbl-weather-impact-factor": "Facteur d'impact météo",
    "lbl-travel-logistics": "Facteur de voyage / logistique",
    "lbl-safety-compliance": "Facteur de conformité sécurité",
    "lbl-local-regulation": "Facteur de réglementation locale",
    "lbl-vehicle-req-multiplier": "Multiplicateur de besoin en véhicules",
    "lbl-min-safety-staff": "Effectif sécurité minimum requis",
    "lbl-min-supervisor-ratio": "Ratio superviseur/ouvrier minimum",
    "lbl-contingency-pct": "Pourcentage de contingence",
    "btn-save-region": "Sauvegarder le plan régional",
    // Modal – Add Person
    "modal-person-title": "Ajouter une personne au registre des ressources",
    "lbl-resource-name": "Nom de la ressource",
    "lbl-availability-date": "Date de disponibilité",
    "lbl-cost-per-hour": "Coût par heure",
    "lbl-cost-per-day": "Coût par jour",
    "lbl-cost-per-month": "Coût par mois",
    "lbl-max-working-hrs-wk": "Heures de travail max/semaine",
    "lbl-current-allocation-status": "Statut d'allocation actuel",
    "lbl-future-availability-date": "Date de disponibilité future",
    "lbl-certifications": "Certifications",
    "lbl-notes": "Notes",
    "btn-save-person": "Sauvegarder la personne",
    // Modal – Add Vehicle
    "modal-vehicle-title": "Ajouter un véhicule au registre des ressources",
    "lbl-vehicle-id": "ID véhicule",
    "lbl-vehicle-type": "Type de véhicule",
    "lbl-ownership": "Propriété",
    "lbl-available-date": "Date de disponibilité",
    "lbl-cost-per-day": "Coût par jour",
    "lbl-cost-per-month": "Coût par mois",
    "lbl-max-hours-day": "Max heures/jour",
    "lbl-operator-required": "Opérateur requis",
    "lbl-driver-required": "Conducteur requis",
    "btn-save-vehicle": "Sauvegarder le véhicule",
    // Modal – Add Equipment
    "modal-equipment-title": "Ajouter un équipement au registre des ressources",
    "lbl-equipment-id": "ID équipement",
    "lbl-equipment-type": "Type d'équipement",
    "lbl-calibration-due": "Date d'étalonnage due",
    "btn-save-equipment": "Sauvegarder l'équipement",
    // Modal – Scenario Compare
    "modal-compare-title": "Comparer les scénarios IA",
    "modal-compare-subtitle":
      "Comparaison côte à côte des plans de ressources générés par l'IA pour votre projet.",
    "th-metric": "Métrique",
    "th-balanced-plan": "Plan équilibré / Recommandé par l'IA",
    "th-lowest-cost-col": "Coût le plus bas / Dotation réduite",
    "th-fastest-delivery-col":
      "Livraison la plus rapide / Ressources en hausse",
    "row-manpower-cost": "Coût main-d'œuvre",
    "row-vehicle-cost": "Coût véhicules",
    "row-equipment-cost": "Coût équipements",
    "row-regional-impact": "Impact régional",
    "row-contingency": "Contingence",
    "row-total-resource-cost": "Coût total des ressources",
    "row-project-duration": "Durée du projet",
    "row-team-size": "Taille de l'équipe",
    "row-risk-level": "Niveau de risque",
    "row-budget-status": "Statut du budget",
    "row-ai-confidence": "Confiance IA",
    "btn-close": "Fermer",
    "btn-apply-lowest-cost": "Appliquer coût le plus bas",
    "btn-apply-balanced": "Appliquer le plan équilibré",
    // Modal – Edit Plan
    "modal-edit-plan-title": "Modifier les paramètres du plan IA",
    "lbl-optimization-goal": "Objectif d'optimisation",
    "lbl-max-team-size": "Taille maximale de l'équipe",
    "lbl-target-end-date": "Date de fin cible",
    //    "lbl-budget-cap": "Plafond budgétaire",
    "lbl-constraints": "Contraintes",
    "chk-allow-subcontractors": "Autoriser les sous-traitants si nécessaire",
    "chk-enforce-certifications": "Appliquer les exigences de certification",
    "chk-allow-cross-project":
      "Autoriser le partage de ressources entre projets",
    "chk-respect-max-util":
      "Respecter l'utilisation max. de 100% par ressource",
    "opt-balanced": "Équilibré (Coût + Délai)",
    "opt-minimize-conflicts": "Minimiser les conflits",
    "btn-rerun-ai": "Relancer le plan IA",
    // Tender Pipeline / Activity Planning / Dept. Coordination (new screens)
    "nav-tender-pipeline": "Appels d'offres",
    "nav-activity-planning": "Plan d'activités",
    "nav-dept-coordination": "Coord. département",
    "title-tender-pipeline": "Appels d'offres",
    "subtitle-tender-pipeline":
      "Suivre les propositions ouvertes, gagnées et perdues",
    "title-activity-planning": "Plan d'activités",
    "subtitle-activity-planning":
      "Planifier les heures par discipline selon les gardes-fous FocusGP",
    "title-dept-coordination": "Coord. département",
    "subtitle-dept-coordination":
      "Heatmap de capacité hebdomadaire par discipline",
    "btn-new-tender": "Nouvel appel d'offres",
    //    "lbl-budget-fees": "Budget honoraires",
    //    "lbl-budget-hours": "Budget heures",
    "lbl-target-rate": "Taux cible",
    "lbl-guardrails": "Gardes-fous FocusGP",
    //    "lbl-budget-honoraires": "BudgetHonoraires",
    //    "lbl-budget-heures": "BudgetHeures",
    "lbl-target-avg-rate": "Taux horaire moyen cible",
    "lbl-rate-variance": "Écart de taux",
  },
};

function applyTranslations() {
  const t = translations[currentLang];

  // Update all [data-i18n] elements
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.dataset.i18n;
    if (t[key] !== undefined) el.textContent = t[key];
  });

  // Update all [data-i18n-placeholder] inputs
  document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
    const key = el.dataset.i18nPlaceholder;
    if (t[key] !== undefined) el.placeholder = t[key];
  });

  // Update search placeholder
  const searchInput = document.querySelector(".topbar-search input");
  if (searchInput) searchInput.placeholder = t.searchPlaceholder;

  // Update nav data-title / data-subtitle for breadcrumb
  document.querySelectorAll(".nav-item[data-screen]").forEach((item) => {
    const screen = item.dataset.screen;
    const titleKey = "title-" + screen;
    const subtitleKey = "subtitle-" + screen;
    if (t[titleKey]) item.dataset.title = t[titleKey];
    if (t[subtitleKey]) item.dataset.subtitle = t[subtitleKey];
  });

  // Re-apply breadcrumb for active screen
  const activeNav = document.querySelector(".nav-item.active");
  if (activeNav) {
    const titleEl = document.getElementById("page-title");
    const subtitleEl = document.getElementById("page-subtitle");
    if (titleEl) titleEl.textContent = activeNav.dataset.title;
    if (subtitleEl) subtitleEl.textContent = activeNav.dataset.subtitle;
  }

  // Refresh budget view so "of budget" text updates
  updateBudgetView();
}

function toggleLanguage() {
  currentLang = currentLang === "en" ? "fr" : "en";
  document
    .getElementById("lang-en")
    .classList.toggle("active", currentLang === "en");
  document
    .getElementById("lang-fr")
    .classList.toggle("active", currentLang === "fr");
  applyTranslations();
  showToast(
    currentLang === "fr"
      ? "Langue changée en Français 🇫🇷"
      : "Language switched to English 🇨🇦",
    "info",
  );
}

// Set English active on load
document.addEventListener("DOMContentLoaded", () => {
  const enEl = document.getElementById("lang-en");
  if (enEl) enEl.classList.add("active");
});

function toggleRegionDropdown(e) {
  e.stopPropagation();
  document.getElementById("region-dropdown").classList.toggle("open");
}

function selectRegion(e, region) {
  e.stopPropagation();
  document.getElementById("region-pill-label").textContent = region;
  document.getElementById("region-dropdown").classList.remove("open");
  document
    .querySelectorAll(".region-dropdown-item")
    .forEach((el) => el.classList.remove("active"));
  e.currentTarget.classList.add("active");
  showToast(`Region switched to ${region}`, "info");
}

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
    budget: "CAD 5.00M",
    manpower: "CAD 1.20M",
    manpowerPct: "24%",
    vehicle: "CAD 200K",
    vehiclePct: "4%",
    equipment: "CAD 350K",
    equipmentPct: "7%",
    contingency: "CAD 150K",
    contingencyPct: "3%",
    total: "CAD 1.90M",
    totalPct: "38%",
    barPct: 38,
    barColor: "linear-gradient(90deg,var(--primary),var(--success))",
    barLabel: "CAD 1.90M / CAD 5.00M (38%)",
    barLegend:
      "🔵 Fees (Honoraires): CAD 1.20M (24%)&nbsp;&nbsp;⚪ Regional: CAD 200K (4%)&nbsp;&nbsp;⚪ Contingency: CAD 150K (3%)",
    variance: "Budget Variance: CAD 3.10M remaining",
    varianceColor: "#dcfce7",
    varianceTextColor: "#15803d",
    varianceBorderColor: "#86efac",
    status: "within",
    statusText: "Budget Status: Within Budget",
    tableRows: `<tr>
      <td><i class="fa-solid fa-users" style="color:var(--primary);margin-right:6px;"></i>Manpower Cost</td>
      <td>CAD 1.10M</td><td>CAD 1.20M</td><td>24%</td>
      <td style="color:#d97706;">+9.1%</td><td><span class="badge badge-warning">Review</span></td></tr>
    <tr><td><i class="fa-solid fa-truck" style="color:var(--warning);margin-right:6px;"></i>Vehicle Cost</td>
      <td>CAD 160K</td><td>CAD 200K</td><td>4%</td>
      <td style="color:#dc2626;">+25%</td><td><span class="badge badge-danger">Rental Impact</span></td></tr>
    <tr><td><i class="fa-solid fa-screwdriver-wrench" style="color:var(--purple);margin-right:6px;"></i>Equipment Cost</td>
      <td>CAD 330K</td><td>CAD 350K</td><td>7%</td>
      <td style="color:#16a34a;">+6.1%</td><td><span class="badge badge-success">OK</span></td></tr>
    <tr><td><i class="fa-solid fa-earth-americas" style="color:#0ea5e9;margin-right:6px;"></i>Regional Cost Impact</td>
      <td>CAD 180K</td><td>CAD 200K</td><td>4%</td>
      <td style="color:#d97706;">+11.1%</td><td><span class="badge badge-warning">Review</span></td></tr>
    <tr><td><i class="fa-solid fa-shield-halved" style="color:#64748b;margin-right:6px;"></i>Contingency</td>
      <td>CAD 150K</td><td>CAD 150K</td><td>3%</td>
      <td style="color:#16a34a;">0%</td><td><span class="badge badge-success">OK</span></td></tr>
    <tr style="background:#f8faff;"><td><strong>Total Estimated Resource Cost</strong></td>
      <td><strong>CAD 1.72M</strong></td><td><strong>CAD 1.90M</strong></td><td><strong>38%</strong></td>
      <td style="color:#d97706;"><strong>+10.5%</strong></td><td><span class="badge badge-success">Within Budget</span></td></tr>
    <tr style="background:#f0fdf4;"><td><strong>Budget Variance (Remaining)</strong></td>
      <td colspan="2" style="color:#15803d;"><strong>CAD 3.10M available</strong></td><td><strong>62%</strong></td>
      <td style="color:#15803d;"><strong>—</strong></td><td><span class="badge badge-success">Healthy</span></td></tr>`,
    regionalRows: `<tr><td style="padding:8px 14px;">🇨🇦 Alberta</td><td style="text-align:right;padding:8px 14px;">CAD 520K</td><td style="text-align:right;padding:8px 14px;color:var(--primary);">27%</td></tr>
    <tr style="background:#fafbfc;"><td style="padding:8px 14px;">🇨🇦 Ontario</td><td style="text-align:right;padding:8px 14px;">CAD 480K</td><td style="text-align:right;padding:8px 14px;color:var(--primary);">25%</td></tr>
    <tr><td style="padding:8px 14px;">🇮🇳 Telangana</td><td style="text-align:right;padding:8px 14px;">CAD 580K</td><td style="text-align:right;padding:8px 14px;color:var(--primary);">31%</td></tr>
    <tr style="background:#fafbfc;"><td style="padding:8px 14px;">🇺🇸 Texas</td><td style="text-align:right;padding:8px 14px;">CAD 320K</td><td style="text-align:right;padding:8px 14px;color:var(--primary);">17%</td></tr>
    <tr style="font-weight:700;border-top:2px solid var(--border);"><td style="padding:8px 14px;">Total</td><td style="text-align:right;padding:8px 14px;">CAD 1.90M</td><td style="text-align:right;padding:8px 14px;">100%</td></tr>`,
    alerts: `<div class="alert alert-warning"><div class="alert-icon"><i class="fa-solid fa-car-side"></i></div><div class="alert-content"><strong>Vehicle cost +25%</strong><p>External crane rental adds CAD 40K above estimate.</p></div></div>
    <div class="alert alert-warning"><div class="alert-icon"><i class="fa-solid fa-users"></i></div><div class="alert-content"><strong>Manpower revised up +9.1%</strong><p>Supervisor overtime added CAD 100K above plan.</p></div></div>
    <div class="alert alert-success"><div class="alert-icon"><i class="fa-solid fa-circle-check"></i></div><div class="alert-content"><strong>Overall within budget</strong><p>Total resource cost CAD 1.90M is 62% below the CAD 5M cap.</p></div></div>`,
  },
  proj2: {
    budget: "CAD 8.50M",
    manpower: "CAD 2.10M",
    manpowerPct: "25%",
    vehicle: "CAD 350K",
    vehiclePct: "4%",
    equipment: "CAD 280K",
    equipmentPct: "3%",
    contingency: "CAD 250K",
    contingencyPct: "3%",
    total: "CAD 3.06M",
    totalPct: "36%",
    barPct: 36,
    barColor: "linear-gradient(90deg,var(--primary),var(--success))",
    barLabel: "CAD 3.06M / CAD 8.50M (36%)",
    barLegend:
      "🔵 Fees (Honoraires): CAD 2.10M (25%)&nbsp;&nbsp;⚪ Regional: CAD 80K (1%)&nbsp;&nbsp;⚪ Contingency: CAD 250K (3%)",
    variance: "Budget Variance: CAD 5.44M remaining",
    varianceColor: "#dcfce7",
    varianceTextColor: "#15803d",
    varianceBorderColor: "#86efac",
    status: "within",
    statusText: "Budget Status: Within Budget",
    tableRows: `<tr><td><i class="fa-solid fa-users" style="color:var(--primary);margin-right:6px;"></i>Manpower Cost</td>
      <td>CAD 1.95M</td><td>CAD 2.10M</td><td>25%</td>
      <td style="color:#d97706;">+7.7%</td><td><span class="badge badge-warning">Review</span></td></tr>
    <tr><td><i class="fa-solid fa-truck" style="color:var(--warning);margin-right:6px;"></i>Vehicle Cost</td>
      <td>CAD 300K</td><td>CAD 350K</td><td>4%</td>
      <td style="color:#d97706;">+16.7%</td><td><span class="badge badge-warning">Review</span></td></tr>
    <tr><td><i class="fa-solid fa-screwdriver-wrench" style="color:var(--purple);margin-right:6px;"></i>Equipment Cost</td>
      <td>CAD 280K</td><td>CAD 280K</td><td>3%</td>
      <td style="color:#16a34a;">0%</td><td><span class="badge badge-success">OK</span></td></tr>
    <tr><td><i class="fa-solid fa-earth-americas" style="color:#0ea5e9;margin-right:6px;"></i>Regional Cost Impact</td>
      <td>CAD 70K</td><td>CAD 80K</td><td>1%</td>
      <td style="color:#d97706;">+14.3%</td><td><span class="badge badge-warning">Review</span></td></tr>
    <tr><td><i class="fa-solid fa-shield-halved" style="color:#64748b;margin-right:6px;"></i>Contingency</td>
      <td>CAD 250K</td><td>CAD 250K</td><td>3%</td>
      <td style="color:#16a34a;">0%</td><td><span class="badge badge-success">OK</span></td></tr>
    <tr style="background:#f8faff;"><td><strong>Total Estimated Resource Cost</strong></td>
      <td><strong>CAD 2.85M</strong></td><td><strong>CAD 3.06M</strong></td><td><strong>36%</strong></td>
      <td style="color:#d97706;"><strong>+7.4%</strong></td><td><span class="badge badge-success">Within Budget</span></td></tr>
    <tr style="background:#f0fdf4;"><td><strong>Budget Variance (Remaining)</strong></td>
      <td colspan="2" style="color:#15803d;"><strong>CAD 5.44M available</strong></td><td><strong>64%</strong></td>
      <td style="color:#15803d;"><strong>—</strong></td><td><span class="badge badge-success">Healthy</span></td></tr>`,
    regionalRows: `<tr><td style="padding:8px 14px;">🇮🇳 Telangana (Primary)</td><td style="text-align:right;padding:8px 14px;">CAD 1.85M</td><td style="text-align:right;padding:8px 14px;color:var(--primary);">60%</td></tr>
    <tr style="background:#fafbfc;"><td style="padding:8px 14px;">🇮🇳 Andhra Pradesh</td><td style="text-align:right;padding:8px 14px;">CAD 820K</td><td style="text-align:right;padding:8px 14px;color:var(--primary);">27%</td></tr>
    <tr><td style="padding:8px 14px;">🇨🇦 Ontario (Remote)</td><td style="text-align:right;padding:8px 14px;">CAD 390K</td><td style="text-align:right;padding:8px 14px;color:var(--primary);">13%</td></tr>
    <tr style="font-weight:700;border-top:2px solid var(--border);"><td style="padding:8px 14px;">Total</td><td style="text-align:right;padding:8px 14px;">CAD 3.06M</td><td style="text-align:right;padding:8px 14px;">100%</td></tr>`,
    alerts: `<div class="alert alert-success"><div class="alert-icon"><i class="fa-solid fa-circle-check"></i></div><div class="alert-content"><strong>Well within budget</strong><p>Only 36% of CAD 8.50M budget consumed.</p></div></div>
    <div class="alert alert-warning"><div class="alert-icon"><i class="fa-solid fa-truck"></i></div><div class="alert-content"><strong>Vehicle cost +16.7%</strong><p>Logistics cost higher due to pipeline terrain access.</p></div></div>`,
  },
  proj3: {
    budget: "CAD 2.00M",
    manpower: "CAD 720K",
    manpowerPct: "36%",
    vehicle: "CAD 80K",
    vehiclePct: "4%",
    equipment: "CAD 120K",
    equipmentPct: "6%",
    contingency: "CAD 80K",
    contingencyPct: "4%",
    total: "CAD 1.06M",
    totalPct: "53%",
    barPct: 53,
    barColor: "linear-gradient(90deg,#f59e0b,#d97706)",
    barLabel: "CAD 1.06M / CAD 2.00M (53%)",
    barLegend:
      "🔵 Fees (Honoraires): CAD 720K (36%)&nbsp;&nbsp;⚪ Regional: CAD 60K (3%)&nbsp;&nbsp;⚪ Contingency: CAD 80K (4%)",
    variance: "Budget Variance: CAD 940K remaining",
    varianceColor: "#fef9c3",
    varianceTextColor: "#92400e",
    varianceBorderColor: "#fde68a",
    status: "within",
    statusText: "Budget Status: Within Budget",
    tableRows: `<tr><td><i class="fa-solid fa-users" style="color:var(--primary);margin-right:6px;"></i>Manpower Cost</td>
      <td>CAD 680K</td><td>CAD 720K</td><td>36%</td>
      <td style="color:#d97706;">+5.9%</td><td><span class="badge badge-warning">Review</span></td></tr>
    <tr><td><i class="fa-solid fa-truck" style="color:var(--warning);margin-right:6px;"></i>Vehicle Cost</td>
      <td>CAD 80K</td><td>CAD 80K</td><td>4%</td>
      <td style="color:#16a34a;">0%</td><td><span class="badge badge-success">OK</span></td></tr>
    <tr><td><i class="fa-solid fa-screwdriver-wrench" style="color:var(--purple);margin-right:6px;"></i>Equipment Cost</td>
      <td>CAD 100K</td><td>CAD 120K</td><td>6%</td>
      <td style="color:#d97706;">+20%</td><td><span class="badge badge-warning">Review</span></td></tr>
    <tr><td><i class="fa-solid fa-earth-americas" style="color:#0ea5e9;margin-right:6px;"></i>Regional Cost Impact</td>
      <td>CAD 60K</td><td>CAD 60K</td><td>3%</td>
      <td style="color:#16a34a;">0%</td><td><span class="badge badge-success">OK</span></td></tr>
    <tr><td><i class="fa-solid fa-shield-halved" style="color:#64748b;margin-right:6px;"></i>Contingency</td>
      <td>CAD 80K</td><td>CAD 80K</td><td>4%</td>
      <td style="color:#16a34a;">0%</td><td><span class="badge badge-success">OK</span></td></tr>
    <tr style="background:#f8faff;"><td><strong>Total Estimated Resource Cost</strong></td>
      <td><strong>CAD 1.00M</strong></td><td><strong>CAD 1.06M</strong></td><td><strong>53%</strong></td>
      <td style="color:#d97706;"><strong>+6%</strong></td><td><span class="badge badge-success">Within Budget</span></td></tr>
    <tr style="background:#f0fdf4;"><td><strong>Budget Variance (Remaining)</strong></td>
      <td colspan="2" style="color:#15803d;"><strong>CAD 940K available</strong></td><td><strong>47%</strong></td>
      <td style="color:#15803d;"><strong>—</strong></td><td><span class="badge badge-success">Moderate</span></td></tr>`,
    regionalRows: `<tr><td style="padding:8px 14px;">🇨🇦 Ontario (Primary)</td><td style="text-align:right;padding:8px 14px;">CAD 1.06M</td><td style="text-align:right;padding:8px 14px;color:var(--primary);">100%</td></tr>
    <tr style="font-weight:700;border-top:2px solid var(--border);"><td style="padding:8px 14px;">Total</td><td style="text-align:right;padding:8px 14px;">CAD 1.06M</td><td style="text-align:right;padding:8px 14px;">100%</td></tr>`,
    alerts: `<div class="alert alert-success"><div class="alert-icon"><i class="fa-solid fa-circle-check"></i></div><div class="alert-content"><strong>Budget comfortable at 53%</strong><p>AMC project has healthy remaining budget.</p></div></div>
    <div class="alert alert-warning"><div class="alert-icon"><i class="fa-solid fa-screwdriver-wrench"></i></div><div class="alert-content"><strong>Equipment cost +20%</strong><p>Specialized testing tools required for pump inspection.</p></div></div>`,
  },
  proj4: {
    budget: "CAD 3.50M",
    manpower: "CAD 2.80M",
    manpowerPct: "80%",
    vehicle: "CAD 450K",
    vehiclePct: "13%",
    equipment: "CAD 520K",
    equipmentPct: "15%",
    contingency: "CAD 220K",
    contingencyPct: "6%",
    total: "CAD 4.27M",
    totalPct: "122%",
    barPct: 100,
    barColor: "linear-gradient(90deg,var(--danger),#b91c1c)",
    barLabel: "CAD 4.27M / CAD 3.50M (122%) ⚠ OVER BUDGET",
    barLegend:
      "🔴 Fees (Honoraires): CAD 2.80M (80%)&nbsp;&nbsp;🔴 Regional: CAD 280K (8%)&nbsp;&nbsp;🔴 Contingency: CAD 220K (6%)",
    variance: "⚠ OVER BUDGET by CAD 770K — Action Required",
    varianceColor: "#fee2e2",
    varianceTextColor: "#b91c1c",
    varianceBorderColor: "#fca5a5",
    status: "over",
    statusText: "⚠ Resource Cost Exceeds Budget!",
    tableRows: `<tr><td><i class="fa-solid fa-users" style="color:var(--primary);margin-right:6px;"></i>Manpower Cost</td>
      <td>CAD 1.80M</td><td>CAD 2.80M</td><td>80%</td>
      <td style="color:#dc2626;">+55.6%</td><td><span class="badge badge-danger">Over Budget</span></td></tr>
    <tr><td><i class="fa-solid fa-truck" style="color:var(--warning);margin-right:6px;"></i>Vehicle Cost</td>
      <td>CAD 280K</td><td>CAD 450K</td><td>13%</td>
      <td style="color:#dc2626;">+60.7%</td><td><span class="badge badge-danger">Over Budget</span></td></tr>
    <tr><td><i class="fa-solid fa-screwdriver-wrench" style="color:var(--purple);margin-right:6px;"></i>Equipment Cost</td>
      <td>CAD 380K</td><td>CAD 520K</td><td>15%</td>
      <td style="color:#dc2626;">+36.8%</td><td><span class="badge badge-danger">Over Budget</span></td></tr>
    <tr><td><i class="fa-solid fa-earth-americas" style="color:#0ea5e9;margin-right:6px;"></i>Regional Cost Impact</td>
      <td>CAD 220K</td><td>CAD 280K</td><td>8%</td>
      <td style="color:#dc2626;">+27.3%</td><td><span class="badge badge-danger">Over Budget</span></td></tr>
    <tr><td><i class="fa-solid fa-shield-halved" style="color:#64748b;margin-right:6px;"></i>Contingency</td>
      <td>CAD 180K</td><td>CAD 220K</td><td>6%</td>
      <td style="color:#d97706;">+22.2%</td><td><span class="badge badge-warning">Review</span></td></tr>
    <tr style="background:#fee2e2;"><td><strong>Total Estimated Resource Cost</strong></td>
      <td><strong>CAD 2.86M</strong></td><td><strong>CAD 4.27M</strong></td><td><strong>122%</strong></td>
      <td style="color:#dc2626;"><strong>+49.3%</strong></td><td><span class="badge badge-danger">Over Budget</span></td></tr>
    <tr style="background:#fee2e2;"><td><strong>Budget Variance (Shortfall)</strong></td>
      <td colspan="2" style="color:#dc2626;"><strong>CAD 770K OVER BUDGET</strong></td><td><strong>—</strong></td>
      <td style="color:#dc2626;"><strong>↑</strong></td><td><span class="badge badge-danger">Action Required</span></td></tr>`,
    regionalRows: `<tr><td style="padding:8px 14px;">🇺🇸 Texas (Primary)</td><td style="text-align:right;padding:8px 14px;">CAD 3.20M</td><td style="text-align:right;padding:8px 14px;color:#dc2626;">75%</td></tr>
    <tr style="background:#fafbfc;"><td style="padding:8px 14px;">🇺🇸 Nevada (Support)</td><td style="text-align:right;padding:8px 14px;">CAD 720K</td><td style="text-align:right;padding:8px 14px;color:#d97706;">17%</td></tr>
    <tr><td style="padding:8px 14px;">🇨🇦 Alberta (Remote Mgmt)</td><td style="text-align:right;padding:8px 14px;">CAD 350K</td><td style="text-align:right;padding:8px 14px;color:var(--primary);">8%</td></tr>
    <tr style="font-weight:700;border-top:2px solid var(--border);"><td style="padding:8px 14px;">Total</td><td style="text-align:right;padding:8px 14px;color:#dc2626;">CAD 4.27M</td><td style="text-align:right;padding:8px 14px;color:#dc2626;">100%</td></tr>`,
    alerts: `<div class="alert alert-danger"><div class="alert-icon"><i class="fa-solid fa-triangle-exclamation"></i></div><div class="alert-content"><strong>OVER BUDGET by CAD 770K</strong><p>Total resource cost CAD 4.27M exceeds the CAD 3.50M cap. Immediate review required.</p></div></div>
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
  const ofBudget = translations[currentLang]["of-budget"];
  set("bkpi-manpower-pct", d.manpowerPct + " " + ofBudget);
  set("bkpi-vehicle", d.vehicle);
  set("bkpi-vehicle-pct", d.vehiclePct + " " + ofBudget);
  set("bkpi-equipment", d.equipment);
  set("bkpi-equipment-pct", d.equipmentPct + " " + ofBudget);
  set("bkpi-contingency", d.contingency);
  set("bkpi-contingency-pct", d.contingencyPct + " " + ofBudget);
  set("bkpi-total", d.total);
  set("bkpi-total-pct", d.totalPct + " " + ofBudget);
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

/* ============================================================
   ACTIVITY PLANNING — discipline accordion toggle
   ============================================================ */
function toggleDiscipline(id) {
  const body = document.getElementById(id);
  const chevron = document.querySelector(`[data-disc-chevron="${id}"]`);
  if (!body) return;
  const collapsed = body.classList.toggle("collapsed");
  if (chevron) chevron.classList.toggle("rotated", !collapsed);
}

/* ============================================================
   ACTIVITY PLANNING — project selector guardrails update
   ============================================================ */
const _apProjects = {
  "ap-proj1": {
    name: "Beaumont Substation Upgrade",
    start: "01 Aug 2026",
    end: "31 Mar 2027",
    hours: "8,800 h",
    fees: "CAD 1,240,000",
    rate: "CAD 140.9 / h",
    planned: "6,680 h",
    utilPct: 76,
  },
  "ap-proj2": {
    name: "Laval Water Treatment Ph.2",
    start: "15 Sep 2026",
    end: "30 Jun 2027",
    hours: "6,400 h",
    fees: "CAD 880,000",
    rate: "CAD 137.5 / h",
    planned: "5,120 h",
    utilPct: 80,
  },
  "ap-proj3": {
    name: "Côte-Nord Transmission Study",
    start: "01 Jun 2026",
    end: "30 Nov 2026",
    hours: "3,200 h",
    fees: "CAD 420,000",
    rate: "CAD 131.3 / h",
    planned: "2,480 h",
    utilPct: 78,
  },
  "ap-proj4": {
    name: "Montréal-Nord HVAC Retrofit",
    start: "01 Jul 2026",
    end: "28 Feb 2027",
    hours: "4,800 h",
    fees: "CAD 650,000",
    rate: "CAD 135.4 / h",
    planned: "3,600 h",
    utilPct: 75,
  },
  "ap-proj5": {
    name: "Jonquière Pipeline Study",
    start: "01 Sep 2026",
    end: "31 Jan 2027",
    hours: "2,400 h",
    fees: "CAD 310,000",
    rate: "CAD 129.2 / h",
    planned: "1,760 h",
    utilPct: 73,
  },
};

function updateActivityGuardrails() {
  const sel = document.getElementById("ap-project-select");
  if (!sel) return;
  const d = _apProjects[sel.value] || _apProjects["ap-proj1"];
  const set = (id, val) => {
    const el = document.getElementById(id);
    if (el) el.textContent = val;
  };
  set("gr-start", d.start);
  set("gr-end", d.end);
  set("gr-hours", d.hours);
  set("gr-fees", d.fees);
  set("gr-rate", d.rate);
  set("gr-planned-hours", d.planned);
  const label = document.getElementById("ap-util-label");
  if (label)
    label.textContent = `${d.planned} planned of ${d.hours} budget (${d.utilPct}%)`;
  const bar = document.getElementById("ap-util-bar");
  if (bar) {
    bar.style.width = d.utilPct + "%";
    bar.style.background =
      d.utilPct > 90 ? "#ef4444" : d.utilPct > 75 ? "#f59e0b" : "#10b981";
  }
}
