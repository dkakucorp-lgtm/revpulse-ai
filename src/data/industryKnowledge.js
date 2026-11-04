// src/data/industryKnowledge.js
export const industryKnowledgeBase = {
    hvac: {
      id: "hvac",
      label: "HVAC, Plumbing & Electrical",
      regulatoryRules: "State contractor licensing compliance. EPA Section 608 refrigerant handling safety. Diagnostic fee credit disclaimers.",
      complaintPatterns: [
        "Diagnostic / service call fee complaints",
        "Broad arrival windows (8 AM - 12 PM)",
        "Post-repair breakdown recurrence",
        "Price vs DIY material cost expectations"
      ],
      scenarioGuidelines: `
  - Explain that diagnostic fees cover truck roll, certified technician dispatch, and full system safety inspection.
  - Reassure clients that diagnostic fees are 100% credited toward completed repairs.
  - De-escalate arrival delays by highlighting safety protocols and unforeseen emergency repair complexity on prior jobs.
      `
    },
    dental: {
      id: "dental",
      label: "Dental & Medical Practices",
      regulatoryRules: "STRICT HIPAA & HITECH COMPLIANCE: Never confirm patient identity, treatment details, or medical history in public replies.",
      complaintPatterns: [
        "Long lobby wait times past appointment time",
        "Unexpected out-of-network balance billing",
        "Dental procedure discomfort or anxiety",
        "Insurance pre-authorization delays"
      ],
      scenarioGuidelines: `
  - Maintain strict HIPAA compliance: use generic terms ("our patients", "our office standard").
  - Show deep empathy for dental anxiety or procedural discomfort.
  - Direct insurance billing disputes off public forums to the practice manager directly via private email or phone.
      `
    },
    auto: {
      id: "auto",
      label: "Auto Repair & Body Shops",
      regulatoryRules: "Written estimate laws. OEM vs aftermarket part disclosures. Environmental disposal fee compliance.",
      complaintPatterns: [
        "Supply chain shipping delays on specialty OEM parts",
        "Labor rate vs parts cost misunderstandings",
        "Additional repairs discovered during teardown inspection",
        "Warranty coverage scope queries"
      ],
      scenarioGuidelines: `
  - Explain supply chain part lead times transparently while emphasizing quality standards.
  - Reinforce that multi-point inspections catch hidden safety issues before vehicles hit the road.
  - Highlight nationwide parts & labor warranty protections.
      `
    },
    medspa: {
      id: "medspa",
      label: "MedSpas, Salons & Aesthetics",
      regulatoryRules: "Practitioner licensure distinctions (RN/NP vs Esthetician). Medical director oversight. Deposit forfeiture disclaimers.",
      complaintPatterns: [
        "24-hour late cancellation fee enforcement",
        "Procedure outcome vs client aesthetic expectation",
        "Touch-up appointment pricing queries"
      ],
      scenarioGuidelines: `
  - Maintain a warm, luxury, high-touch brand tone.
  - Uphold cancellation policies firmly but offer policy exceptions as credits toward future service bookings.
  - Invite clients back for a complimentary post-treatment assessment with the practitioner.
      `
    },
    roofing: {
      id: "roofing",
      label: "Roofing, Solar & Construction",
      regulatoryRules: "Building permit regulations. HOA guidelines. Insurance claim supplement procedures.",
      complaintPatterns: [
        "Weather-related project delays",
        "Debris / nail cleanup on lawn or driveway",
        "Estimate adjustments due to hidden deck wood rot"
      ],
      scenarioGuidelines: `
  - Reassure clients about property protection standards (e.g., magnetic lawn sweeps for nails).
  - Explain how crew safety and weather conditions dictate roof installation timelines.
  - Frame scope changes as essential structural integrity measures.
      `
    },
    legal: {
      id: "legal",
      label: "Legal, Financial & Insurance",
      regulatoryRules: "State Bar advertising ethics. Strict confidentiality. No attorney-client privilege creation in public responses.",
      complaintPatterns: [
        "Retainer fee structure and billable hour confusion",
        "Case communication update frequency",
        "Consultation outcome dissatisfaction"
      ],
      scenarioGuidelines: `
  - Maintain a formal, dignified, high-authority tone.
  - Never discuss case specifics or admit liability in public forums.
  - Offer direct consultation with managing partners to review fee structures or case milestones.
      `
    },
    general: {
      id: "general",
      label: "All Other Local Service Businesses",
      regulatoryRules: "Standard consumer protection transparency.",
      complaintPatterns: [
        "Pricing expectations vs service delivery",
        "Communication response turnaround",
        "Scheduling conflicts"
      ],
      scenarioGuidelines: `
  - Maintain professional, solution-oriented customer service.
  - Address concerns directly and provide direct escalation channels.
      `
    }
  };