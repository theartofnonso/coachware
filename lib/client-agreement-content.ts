/**
 * Operational coaching terms for display on /client-agreement.
 * Have a qualified solicitor review before heavy reliance (especially UK-specific law).
 */
export const CLIENT_AGREEMENT_BRAND = "Not Athletes";
export type AgreementSection = {
  id: string;
  title: string;
  paragraphs: readonly string[];
};

export const CLIENT_AGREEMENT_SECTIONS: readonly AgreementSection[] = [
  {
    id: "coaching",
    title: "A. Coaching services",
    paragraphs: [
      "Coaching includes training support, accountability, and practical guidance. It does not replace medical care, physiotherapy, dietetic treatment, or mental health therapy. I am not a doctor or clinician; if you need that kind of care, you should see an appropriate professional.",
      "Outcomes depend on many factors outside anyone’s control. I do not guarantee specific results. You are responsible for giving honest information, following guidance safely, and telling me promptly if something does not feel right.",
    ],
  },
  {
    id: "payments",
    title: "B. Payments",
    paragraphs: [
      "Fees are payable in advance according to the plan or invoice we agree. Coaching and app access generally start once payment has cleared. Missed or failed payments may mean pausing sessions or access until the account is brought up to date.",
      "Where you are on a recurring plan, billing continues on the agreed cycle unless you cancel in line with the cancellation terms below.",
    ],
  },
  {
    id: "cancellations",
    title: "C. Cancellations, rescheduling, lateness, and no-shows",
    paragraphs: [
      "Please give at least 24 hours’ notice if you need to reschedule a session. Cancellations or reschedules inside 24 hours may be treated as a used session, unless we agree otherwise in writing.",
      "If you do not attend a booked session without notice (a no-show), that session is treated as used.",
      "If you arrive late, the session usually still ends at the scheduled finish time so the next client is not affected.",
    ],
  },
  {
    id: "refunds",
    title: "D. Refunds",
    paragraphs: [
      "Fees are generally non-refundable once a billing period or package has started, except where the law requires otherwise. Unused sessions or partial periods do not automatically roll over unless we explicitly agree that in writing.",
      "Any refund or credit is at my reasonable discretion and in line with applicable consumer law.",
    ],
  },
  {
    id: "health",
    title: "E. Health and medical responsibility",
    paragraphs: [
      "You confirm that any health questionnaire (such as a PAR-Q) you complete for coaching is honest and up to date. You agree to tell me about injuries, medical conditions, pregnancy, medications, or other factors that could affect training.",
      "I may ask you to get medical clearance before we continue or increase intensity if something in your history or symptoms suggests it. You should not train against medical advice.",
    ],
  },
  {
    id: "scope",
    title: "F. Coaching scope and expectations",
    paragraphs: [
      "I provide professional guidance based on the information you give me. Progress depends on your adherence, sleep, nutrition, stress, and consistency, as well as communication between us.",
      "You are responsible for exercising safely, using appropriate technique, and stopping if you feel unwell or something hurts in a worrying way.",
    ],
  },
  {
    id: "liability",
    title: "G. Liability and assumption of risk",
    paragraphs: [
      "Physical activity carries inherent risk. You take part voluntarily and accept that injury or discomfort can sometimes occur even with good coaching.",
      "To the fullest extent permitted by law, Not Athletes and I are not liable for any indirect loss, or for loss or damage except where liability cannot legally be excluded or limited. Nothing in this agreement excludes or limits liability for death or personal injury caused by negligence, fraud, or any other liability which cannot be excluded or limited under applicable law.",
    ],
  },
  {
    id: "termination",
    title: "H. Termination",
    paragraphs: [
      "Either of us may end the coaching relationship by reasonable notice, according to what we have agreed for your plan. Fees for work or periods already delivered usually remain payable.",
      "I may end coaching immediately if behaviour is abusive, unsafe, repeatedly dishonest, or if terms are seriously breached. In those cases, any fees already due remain payable where the law allows.",
    ],
  },
  {
    id: "communication",
    title: "I. Communication and check-ins",
    paragraphs: [
      "Support is delivered through the channels we agree (for example the coaching app, email, or messages). I aim to be responsive within reasonable coaching hours; replies are not instant 24/7.",
      "Reasonable boundaries apply outside booked sessions so coaching stays sustainable for both of us.",
    ],
  },
  {
    id: "media",
    title: "J. Progress photos and testimonials (optional)",
    paragraphs: [
      "Separate optional consents below cover whether we may use progress photos or short testimonials for marketing. Declining does not affect your coaching.",
    ],
  },
] as const;
