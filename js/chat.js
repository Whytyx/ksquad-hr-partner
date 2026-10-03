(function () {
  var BOOK = [
    "go ahead", "book", "talk to a person", "talk to someone", "talk to kevalin",
    "speak to", "real person", "contact", "get in touch", "use the service",
    "use your service", "let's talk", "lets talk", "enquiry", "inquiry",
    "work with you", "hire you", "sign up", "ready to start", "how do i start",
    "นัดคุย", "นัดหมาย", "คุยกับคน", "พูดกับคน", "ใช้บริการ", "อยากเริ่ม", "ไปต่อ", "ส่งเรื่อง"
  ];

  var TOPICS = [
    { key: "chat.solicitor", keys: ["solicitor", "lawyer", "legal advice", "attorney", "ทนาย"] },
    { key: "chat.price", keys: ["how much", "price", "pricing", "cost", "fee", "fees", "charge", "rates", "ราคา", "ค่าบริการ", "ค่าใช้จ่าย", "เท่าไร", "เท่าไหร่"] },
    { key: "chat.one", keys: ["one-off", "one off", "oneoff", "just one", "single piece", "a one off", "audit only", "ครั้งเดียว", "งานเดียว", "ชิ้นเดียว"] },
    { key: "chat.size", keys: ["how big", "what size", "company size", "certain size", "too small", "number of employees", "handful", "size", "ขนาด", "กี่คน", "ไม่กี่คน"] },
    { key: "chat.who", keys: ["who is", "who are", "about kevalin", "kevalin", "about you", "your background", "head of hr", "คือใคร", "เป็นใคร"] },
    { key: "chat.hosp", keys: ["hospitality", "restaurant", "chef", "hotel", "pub", "cafe", "café", "bar", "only work with", "ฮอสพิทาลิตี้", "ร้านอาหาร", "โรงแรม", "เชฟ", "บาร์", "คาเฟ่"] },
    { key: "chat.hiring", keys: ["hiring", "onboarding", "recruit", "vacancy", "interview", "right to work", "new starter", "จ้าง", "สรรหา", "ปฐมนิเทศ", "สัมภาษณ์", "เรซูเม่"] },
    { key: "chat.compliance", keys: ["compliance", "compliant", "handbook", "policy", "policies", "sponsor", "working time", "harassment", "contract", "กฎหมาย", "นโยบาย", "สปอนเซอร์", "คู่มือ", "สิทธิการทำงาน"] },
    { key: "chat.relations", keys: ["employee relation", "disciplinary", "grievance", "investigation", "performance", "conflict", "sickness", "tribunal", "dismissal", "วินัย", "ร้องทุกข์", "สอบสวน", "ลาป่วย", "ขัดแย้ง"] },
    { key: "chat.ongoing", keys: ["ongoing", "retainer", "monthly", "in-house", "full-time hr", "day to day", "day-to-day", "as and when", "as-and-when", "hr help", "รายเดือน", "ต่อเนื่อง", "เต็มเวลา"] }
  ];

  function hasAny(q, keys) {
    for (var i = 0; i < keys.length; i++) {
      if (q.indexOf(keys[i]) !== -1) return true;
    }
    return false;
  }

  function answer(raw) {
    var q = String(raw || "").toLowerCase();
    if (hasAny(q, BOOK)) return { book: true, key: "chat.book" };
    for (var i = 0; i < TOPICS.length; i++) {
      if (hasAny(q, TOPICS[i].keys)) return { book: false, key: TOPICS[i].key };
    }
    return { book: false, key: "chat.fallback" };
  }

  var root = document.createElement("div");
  root.innerHTML =
    '<button class="chat-launcher" type="button" aria-expanded="false" aria-controls="faq-chat" data-i18n="chat.ask"></button>' +
    '<section class="chat-panel" id="faq-chat" role="dialog" aria-labelledby="faq-chat-title" hidden>' +
      '<div class="chat-head">' +
        '<div>' +
          '<p class="chat-kicker" data-i18n="chat.guide"></p>' +
          '<p class="chat-title" id="faq-chat-title" data-i18n="chat.ask"></p>' +
          '<p class="note" data-i18n="chat.notLive"></p>' +
        '</div>' +
        '<button class="chat-close" type="button" data-i18n="nav.close"></button>' +
      '</div>' +
      '<div class="chat-log" aria-live="polite"></div>' +
      '<form class="chat-form">' +
        '<input type="text" name="q" data-i18n-attr="aria-label:chat.yourQ,placeholder:chat.placeholder" aria-label="Your question" placeholder="Ask about hiring, fees, booking…" required>' +
        '<button type="submit" data-i18n="chat.send"></button>' +
      '</form>' +
    '</section>';
  document.body.appendChild(root);

  var launcher = root.querySelector(".chat-launcher");
  var panel = root.querySelector(".chat-panel");
  var log = root.querySelector(".chat-log");
  var form = root.querySelector(".chat-form");
  var input = form.querySelector("input");
  var greeted = false;

  function paint(el, key) {
    el.setAttribute("data-i18n", key);
    if (!el.hasAttribute("data-i18n-en")) el.setAttribute("data-i18n-en", KSQUAD.en(key));
    el.textContent = KSQUAD.t(key);
  }

  function add(className, keyOrText, book, isUser) {
    var wrap = document.createElement("div");
    wrap.className = "chat-msg " + className;
    if (isUser) {
      wrap.textContent = keyOrText;
    } else {
      var span = document.createElement("span");
      paint(span, keyOrText);
      wrap.appendChild(span);
      if (book) {
        var a = document.createElement("a");
        a.className = "chat-go";
        a.href = "contact.html";
        paint(a, "chat.go");
        wrap.appendChild(a);
      }
    }
    log.appendChild(wrap);
    log.scrollTop = log.scrollHeight;
  }

  function open() {
    panel.hidden = false;
    panel.classList.add("is-open");
    launcher.setAttribute("aria-expanded", "true");
    if (!greeted) {
      greeted = true;
      add("chat-msg-bot", "chat.hello", false, false);
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
    add("chat-msg-user", text, false, true);
    input.value = "";
    var result = answer(text);
    add("chat-msg-bot", result.key, result.book, false);
  });

  if (window.KSQUAD) {
    var seeded = root.querySelectorAll("[data-i18n]");
    for (var n = 0; n < seeded.length; n++) {
      var key = seeded[n].getAttribute("data-i18n");
      if (!seeded[n].textContent) {
        seeded[n].setAttribute("data-i18n-en", KSQUAD.en(key));
        seeded[n].textContent = KSQUAD.en(key);
      }
    }
    KSQUAD.apply();
  }
})();
