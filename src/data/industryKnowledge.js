// Industry Knowledge Matrices for RevPulse AI
export const industryKnowledgeData = {
  hvac: {
    id: 'hvac',
    name: 'HVAC & Mechanical Contractors',
    complianceNotes: 'Avoid diagnostic cost disputes; emphasize emergency response times and seasonal maintenance transparency.',
    commonKeywords: ['seer rating', 'refrigerant', 'compressor', 'ductwork', 'preventative maintenance', 'emergency dispatch'],
    samplePrompts: [
      "Thank you for trusting us with your system replacement. Our NATE-certified technicians always prioritize transparent pricing and safe refrigerant handling.",
      "We apologize for the delay during the peak heatwave. Our dispatch team is committed to faster emergency response windows."
    ]
  },
  dental: {
    id: 'dental',
    name: 'Dental & Orthodontic Clinics',
    complianceNotes: 'HIPAA compliance: Never confirm patient clinical details or treatment specifics in public review replies.',
    commonKeywords: ['gentle care', 'hygiene', 'whitening', 'crown', 'patient comfort', 'insurance processing'],
    samplePrompts: [
      "Thank you for your kind words about our clinic environment! Dr. Smith and our team always strive to make every visit stress-free.",
      "We appreciate your feedback regarding scheduling. Our front desk team is working to streamline appointment confirmations."
    ]
  },
  autoRepair: {
    id: 'autoRepair',
    name: 'Auto Repair & Body Shops',
    complianceNotes: 'Reference digital inspection transparency, warranty guarantees, and OEM parts compliance.',
    commonKeywords: ['diagnostic', 'brake pads', 'transmission', 'warranty', 'transparent estimate', 'oem parts'],
    samplePrompts: [
      "Thanks for bringing your vehicle to us! We believe in transparent digital inspections so you always know your vehicle's health before we start work.",
      "We appreciate your patience while waiting for specialized parts. All our repairs are backed by our nationwide parts warranty."
    ]
  },
  medspa: {
    id: 'medspa',
    name: 'MedSpas & Aesthetics',
    complianceNotes: 'Focus on sterile environments, certified master aestheticians, and personalized consultation plans.',
    commonKeywords: ['botox', 'filler', 'rejuvenation', 'consultation', 'skincare regimen', 'licensed practitioner'],
    samplePrompts: [
      "Thank you for sharing your glow-up experience! Our master practitioners customize every treatment to your skin's exact needs.",
      "We value your feedback and would love to discuss your treatment progression during your next complimentary follow-up."
    ]
  },
  generalContractor: {
    id: 'generalContractor',
    name: 'General Contractors & Remodeling',
    complianceNotes: 'Address timeline management, dust containment protocols, and transparent change-order documentation.',
    commonKeywords: ['framing', 'drywall', 'finish carpentry', 'project manager', 'clean-up', 'punch list'],
    samplePrompts: [
      "Thank you for trusting us with your home remodel. Our crew takes pride in daily job-site clean-up and transparent milestone tracking.",
      "We appreciate your note on the punch list timeline. Our project manager is coordinating the final details to ensure 100% satisfaction."
    ]
  }
};