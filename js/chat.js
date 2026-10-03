(function () {
  var BOOK = [
    "go ahead", "book", "talk to a person", "talk to someone", "talk to kevalin",
    "speak to", "real person", "contact", "get in touch", "use the service",
    "use your service", "let's talk", "lets talk", "enquiry", "inquiry",
    "work with you", "hire you", "sign up", "ready to start", "how do i start"
  ];

  var TOPICS = [
    {
      keys: ["solicitor", "lawyer", "legal advice", "attorney", "immigration lawyer"],
      text: "No. Kevalin is not a solicitor. The site offers practical HR and people support based on employment law and best practice. If something needs formal legal or immigration advice, she will say so and can work alongside your adviser."
    },
    {
      keys: ["how much", "price", "pricing", "cost", "fee", "fees", "charge", "rates"],
      text: "There is no price list on the site. It depends on what you need. After an initial conversation, Kevalin gives a clear price — fixed fee, day rate or monthly support."
    },
    {
      keys: ["one-off", "one off", "oneoff", "just one", "single piece", "a one off", "audit only"],
      text: "Yes. One-off work is fine. Plenty of clients start with one audit or one issue. Ongoing support is there if you need it later."
    },
    {
      keys: ["how big", "what size", "company size", "certain size", "too small", "number of employees", "handful", "size"],
      text: "You do not need to be a certain size. Kevalin works with businesses from a handful of employees upwards."
    },
    {
      keys: ["who is", "who are", "about kevalin", "kevalin", "about you", "your background", "head of hr"],
      text: "Kevalin Kitiyanuphap spent over 13 years inside a growing hospitality business, starting in operations, moving through HR, and leading the people function as Head of HR. She set up KSquad HR Partner so smaller businesses can get that quality of people support without paying for a full-time team."
    },
    {
      keys: ["hospitality", "restaurant", "chef", "hotel", "pub", "cafe", "café", "bar", "only work with"],
      text: "Hospitality is where the experience is deepest: over 13 years in a growing restaurant business, from operations to Head of HR. That covers multi-site teams, chefs and hourly-paid staff, high-volume hiring, Right to Work, sponsored workers, rotas and Working Time, absence, and managers promoted from the floor. It is not hospitality only. The same support works for any growing business."
    },
    {
      keys: ["hiring", "onboarding", "recruit", "vacancy", "interview", "right to work", "new starter"],
      text: "Hiring and onboarding runs from the vacancy to someone ready to work. It is not finished when they accept the job. It is finished when they are legally checked, properly contracted, set up on your systems and ready for their first shift. Kevalin can run the whole process, or only the parts you do not have time for. A recruitment agency sends CVs. This is about the person being compliantly employed and ready to start."
    },
    {
      keys: ["compliance", "compliant", "handbook", "policy", "policies", "sponsor", "working time", "harassment", "contract"],
      text: "People compliance means knowing what you need, fixing what is missing, and reducing people risk. Most small businesses are not non-compliant on purpose. They are busy, and nobody has checked in a while. Kevalin reviews what you have, tells you plainly where the gaps are, and helps you fix them in priority order. That includes Right to Work, contracts, handbooks, Working Time and absence, family leave, the sexual harassment prevention duty, and sponsor licence support."
    },
    {
      keys: ["employee relation", "disciplinary", "grievance", "investigation", "performance", "conflict", "sickness", "tribunal", "dismissal"],
      text: "Employee relations is practical support when people problems become difficult: disciplinaries, grievances, independent investigations, performance, probation exits, sickness absence and conflict. Getting it wrong is expensive, in tribunal risk, management time and team morale. You can ask for advice and documents, or ask Kevalin to run the process from start to finish."
    },
    {
      keys: ["ongoing", "retainer", "monthly", "in-house", "full-time hr", "day to day", "day-to-day", "as and when", "as-and-when", "hr help"],
      text: "Ongoing people support is your people support without an in-house HR team. It is for businesses that have employees but do not yet need a full-time HR Manager, and need someone to call when something comes up. It can be monthly, or as-and-when, depending on how much is going on."
    }
  ];

  function hasAny(q, keys) {
    for (var i = 0; i < keys.length; i++) {
      if (q.indexOf(keys[i]) !== -1) return true;
    }
    return false;
  }

  function answer(raw) {
    var q = String(raw || "").toLowerCase();
    if (hasAny(q, BOOK)) {
      return {
        book: true,
        text: "I am only a guide to this website, not a live person. If you want to go ahead, use the contact form. Kevalin will read it and aims to reply within one working day."
      };
    }
    for (var i = 0; i < TOPICS.length; i++) {
      if (hasAny(q, TOPICS[i].keys)) return { book: false, text: TOPICS[i].text };
    }
    return {
      book: false,
      text: "I can answer from what is already on this site: hiring, compliance, employee relations, ongoing support, hospitality, who Kevalin is, fees, one-off work, and whether size matters. If you want a person, say you want to book a conversation."
    };
  }

  var root = document.createElement("div");
  root.innerHTML =
    '<button class="chat-launcher" type="button" aria-expanded="false" aria-controls="faq-chat">Questions</button>' +
    '<section class="chat-panel" id="faq-chat" role="dialog" aria-labelledby="faq-chat-title" hidden>' +
      '<div class="chat-head">' +
        '<div>' +
          '<p class="chat-kicker">Site guide</p>' +
          '<p class="chat-title" id="faq-chat-title">Questions</p>' +
          '<p class="note">Not a live person.</p>' +
        '</div>' +
        '<button class="chat-close" type="button">Close</button>' +
      '</div>' +
      '<div class="chat-log" aria-live="polite"></div>' +
      '<form class="chat-form">' +
        '<input type="text" name="q" aria-label="Your question" placeholder="Ask about hiring, fees, booking…" required>' +
        '<button type="submit">Send</button>' +
      '</form>' +
    '</section>';
  document.body.appendChild(root);

  var launcher = root.querySelector(".chat-launcher");
  var panel = root.querySelector(".chat-panel");
  var log = root.querySelector(".chat-log");
  var form = root.querySelector(".chat-form");
  var input = form.querySelector("input");
  var greeted = false;

  function add(className, text, book) {
    var p = document.createElement("p");
    p.className = "chat-msg " + className;
    p.textContent = text;
    if (book) {
      var a = document.createElement("a");
      a.className = "chat-go";
      a.href = "contact.html";
      a.textContent = "Go to the contact form";
      p.appendChild(document.createElement("br"));
      p.appendChild(a);
    }
    log.appendChild(p);
    log.scrollTop = log.scrollHeight;
  }

  function open() {
    panel.hidden = false;
    panel.classList.add("is-open");
    launcher.setAttribute("aria-expanded", "true");
    if (!greeted) {
      greeted = true;
      add("chat-msg-bot", "Ask me about what is on this site. I am not Kevalin, and this is not a live chat. I can cover hiring, compliance, employee relations, ongoing support, hospitality, who she is, and how to get in touch.");
    }
    input.focus();
  }

  function close() {
    panel.classList.remove("is-open");
    panel.hidden = true;
    launcher.setAttribute("aria-expanded", "false");
    launcher.focus();
  }

  launcher.addEventListener("click", function () {
    if (panel.hidden) open();
    else close();
  });
  root.querySelector(".chat-close").addEventListener("click", close);
  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && !panel.hidden) close();
  });

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    var text = input.value.trim();
    if (!text) return;
    add("chat-msg-user", text, false);
    input.value = "";
    var result = answer(text);
    add("chat-msg-bot", result.text, result.book);
  });
})();
