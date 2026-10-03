(function () {
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("site-nav");

  function label(open) {
    var key = open ? "nav.close" : "nav.menu";
    if (window.KSQUAD) return KSQUAD.t(key);
    return open ? "Close" : "Menu";
  }

  function syncMenu() {
    if (!toggle) return;
    var open = toggle.getAttribute("aria-expanded") === "true";
    toggle.textContent = label(open);
  }

  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      toggle.textContent = label(open);
    });
  }
  syncMenu();
  document.addEventListener("ksquad-lang", syncMenu);

  var form = document.getElementById("contact-form");
  if (!form) return;

  function tr(key) {
    return window.KSQUAD ? KSQUAD.t(key) : key;
  }

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    var data = new FormData(form);
    var name = String(data.get("name") || "").trim();
    var business = String(data.get("business") || "").trim();
    var email = String(data.get("email") || "").trim();
    var phone = String(data.get("phone") || "").trim();
    var help = String(data.get("help") || "").trim();
    var message = String(data.get("message") || "").trim();
    var subject = tr("mail.subject") + (name || tr("mail.website"));
    var body = [
      tr("mail.name") + ": " + name,
      tr("mail.business") + ": " + (business || tr("mail.notGiven")),
      tr("mail.email") + ": " + email,
      tr("mail.phone") + ": " + (phone || tr("mail.notGiven")),
      tr("mail.help") + ": " + help,
      "",
      message
    ].join("\n");
    var href = "mailto:hello@example.com?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(body);
    var note = document.getElementById("form-confirmation");
    if (note) {
      note.hidden = false;
      note.focus();
    }
    window.location.href = href;
  });
})();
