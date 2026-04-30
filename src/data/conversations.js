export const initialGreeting = {
  id: 'greeting',
  isHero: true,
  headline: "Ready to vote smart?",
  subtext: "Let's guide you step by step.",
  text: "",
  options: [
    { label: "First-time voter", targetId: "persona_first_time", icon: "UserPlus" },
    { label: "Voting steps", targetId: "election_process", icon: "ListChecks" },
    { label: "Find booth", targetId: "faq_booth", icon: "MapPin" },
    { label: "FAQs", targetId: "faq", icon: "HelpCircle" }
  ],
  fact: "Did you know? The first general elections in India took place in 1951-52, taking 4 months to complete!"
};

export const conversations = {
  main_menu: {
    text: "What would you like to explore?",
    options: [
      { label: "The 4-step Election Process", targetId: "election_process", icon: "ListChecks" },
      { label: "Common Questions (FAQ)", targetId: "faq", icon: "HelpCircle" },
      { label: "Tips for specific voters", targetId: "personas", icon: "Users" }
    ]
  },
  election_process: {
    text: "The election process generally has 4 main steps. Which one would you like to learn about?",
    options: [
      { label: "1. Voter Registration", targetId: "process_registration", icon: "FileSignature" },
      { label: "2. Verification (Voter Slip)", targetId: "process_verification", icon: "CheckSquare" },
      { label: "3. Polling Day (Voting)", targetId: "process_polling", icon: "Vote" },
      { label: "4. Counting & Results", targetId: "process_results", icon: "BarChart" },
      { label: "Back to Main Menu", targetId: "main_menu", icon: "ArrowLeft" }
    ],
    step: 0
  },
  process_registration: {
    text: "📝 **Step 1: Voter Registration**\n\nBefore you can vote, you must be on the voter list. \n\n* **Who:** Citizens 18+ years old.\n* **How:** Apply online (e.g., via the NVSP portal) or offline using Form 6.\n* **Why:** You need an Epic Card (Voter ID) to cast your vote.\n\nMake sure your name is on the electoral roll before election day!",
    options: [
      { label: "Next Step: Verification", targetId: "process_verification", icon: "ArrowRight" },
      { label: "Back to Process Menu", targetId: "election_process", icon: "ArrowLeft" }
    ],
    step: 1,
    fact: "Form 6 is specifically for new voters or those moving to a different constituency."
  },
  process_verification: {
    text: "🔍 **Step 2: Verification**\n\nBefore the election, you should verify your details.\n\n* **Voter Slip:** You will usually receive a voter slip at home. It tells you your polling booth.\n* **Check Online:** You can also check your name on the electoral roll online to confirm your polling station.\n* **What to bring:** Keep your Voter ID (or another accepted ID) ready for polling day.",
    options: [
      { label: "Next Step: Polling Day", targetId: "process_polling", icon: "ArrowRight" },
      { label: "Back to Process Menu", targetId: "election_process", icon: "ArrowLeft" }
    ],
    step: 2,
    fact: "Even if you have a Voter ID, your name MUST be on the electoral roll to vote."
  },
  process_polling: {
    text: "🗳️ **Step 3: Polling Day**\n\nThis is the day you cast your vote!\n\n1. **Go to booth:** Visit your assigned polling booth with your ID.\n2. **Check-in:** Officials will check your name and ID.\n3. **Ink:** Your finger will be marked with indelible ink.\n4. **Vote:** Go to the EVM (Electronic Voting Machine), press the button next to your chosen candidate, and hear the 'beep'.\n5. **VVPAT:** A printed slip will briefly show your vote for verification.",
    options: [
      { label: "Next Step: Counting & Results", targetId: "process_results", icon: "ArrowRight" },
      { label: "Back to Process Menu", targetId: "election_process", icon: "ArrowLeft" }
    ],
    step: 3,
    fact: "The indelible ink used on voters' fingers is manufactured only by Mysore Paints and Varnish Limited."
  },
  process_results: {
    text: "📊 **Step 4: Counting & Results**\n\nAfter voting is complete across all phases:\n\n* **Safe keeping:** EVMs are sealed and stored securely in strong rooms.\n* **Counting Day:** Votes are counted in the presence of candidates' representatives.\n* **Results:** The candidate with the most votes wins the constituency. The party with the majority of seats forms the government.",
    options: [
      { label: "Back to Process Menu", targetId: "election_process", icon: "ArrowLeft" },
      { label: "Main Menu", targetId: "main_menu", icon: "Home" }
    ],
    step: 4,
    fact: "India's EVMs are standalone machines. They are not connected to any network or the internet, ensuring security."
  },
  faq: {
    text: "What would you like to know?",
    options: [
      { label: "How do I register to vote?", targetId: "faq_register", icon: "FileText" },
      { label: "What documents are required?", targetId: "faq_documents", icon: "CreditCard" },
      { label: "What is NOTA?", targetId: "faq_nota", icon: "XCircle" },
      { label: "How to find my polling booth?", targetId: "faq_booth", icon: "MapPin" },
      { label: "Back to Main Menu", targetId: "main_menu", icon: "ArrowLeft" }
    ]
  },
  faq_register: {
    text: "To register to vote, you generally need to fill out **Form 6**.\n\nYou can do this online through the National Voters' Service Portal (NVSP) or the Voter Helpline App. Alternatively, you can submit a physical form to your local Electoral Registration Officer (ERO).",
    options: [
      { label: "What documents are required?", targetId: "faq_documents", icon: "ArrowRight" },
      { label: "Back to FAQ", targetId: "faq", icon: "ArrowLeft" }
    ]
  },
  faq_documents: {
    text: "While a Voter ID (EPIC) is ideal, you can usually vote if your name is on the list by showing other approved IDs, such as:\n\n* Aadhaar Card\n* PAN Card\n* Driving License\n* Indian Passport\n* Passbook with photo issued by Bank/Post Office",
    options: [
      { label: "Back to FAQ", targetId: "faq", icon: "ArrowLeft" }
    ]
  },
  faq_nota: {
    text: "🚫 **NOTA** stands for **None of the Above**.\n\nIt is an option on the voting machine. If you feel none of the candidates are suitable, you can press the NOTA button. It allows you to express your dissatisfaction while still participating in the democratic process.",
    options: [
      { label: "Back to FAQ", targetId: "faq", icon: "ArrowLeft" }
    ]
  },
  faq_booth: {
    text: "You can find your polling booth by:\n\n1. Checking the **Voter Information Slip** delivered to your home.\n2. Searching your name on the **Elector's portal** online using your EPIC number.\n3. Using the **Voter Helpline App**.",
    options: [
      { label: "Back to FAQ", targetId: "faq", icon: "ArrowLeft" }
    ]
  },
  personas: {
    text: "I can give specific tips based on who you are. Choose an option:",
    options: [
      { label: "I'm a First-Time Voter", targetId: "persona_first_time", icon: "UserPlus" },
      { label: "I'm a Student (Living away)", targetId: "persona_student", icon: "GraduationCap" },
      { label: "I want General Citizen Tips", targetId: "persona_general", icon: "Users" },
      { label: "Back to Main Menu", targetId: "initial", icon: "ArrowLeft" }
    ]
  },
  persona_first_time: {
    text: "🎉 **Welcome, First-Time Voter!**\n\n* **Register Early:** Don't wait until the last minute. Register as soon as you turn 18.\n* **Don't Panic:** The officials at the booth are there to help. If you're confused about the EVM, ask the presiding officer.\n* **Check the beep:** When you press the button, wait for the red light against the candidate's name and a long beep sound.\n* **Your vote is secret:** No one will know who you voted for.",
    options: [
      { label: "What is NOTA?", targetId: "faq_nota", icon: "HelpCircle" },
      { label: "Back to Personas", targetId: "personas", icon: "ArrowLeft" }
    ]
  },
  persona_student: {
    text: "🎓 **Tips for Students:**\n\n* **Address Change:** If you moved for college, you can register to vote at your current address (hostel/PG). You will need a declaration from your institute.\n* **Form 8:** If you are already registered back home but want to shift your vote to your college city, use Form 8 for shifting residence.\n* **Stay Informed:** Research the candidates in your local constituency, even if you are new to the area.",
    options: [
      { label: "Back to Personas", targetId: "personas", icon: "ArrowLeft" }
    ]
  },
  persona_general: {
    text: "👥 **General Citizen Tips:**\n\n* **Avoid peak hours:** Try to vote early in the morning to avoid long queues.\n* **Verify your name:** Always verify your name on the electoral roll a few weeks before the election, even if you voted last time.\n* **No phones inside:** You are generally not allowed to take your mobile phone inside the voting compartment.\n* **Know your rights:** If your name is on the list but someone else has cast a vote in your name, you have the right to cast a 'Tendered Vote'. Ask the presiding officer.",
    options: [
      { label: "Back to Personas", targetId: "personas", icon: "ArrowLeft" }
    ]
  }
};
