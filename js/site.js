(function () {
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("site-nav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      toggle.textContent = open ? "Close" : "Menu";
    });
  }

  var form = document.getElementById("contact-form");
  if (!form) return;

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    var data = new FormData(form);
    var name = String(data.get("name") || "").trim();
    var business = String(data.get("business") || "").trim();
    var email = String(data.get("email") || "").trim();
    var phone = String(data.get("phone") || "").trim();
    var help = String(data.get("help") || "").trim();
    var message = String(data.get("message") || "").trim();
    var subject = "Enquiry — " + (name || "website");
    var body = [
      "Name: " + name,
      "Business name: " + (business || "(not given)"),
      "Email: " + email,
      "Phone: " + (phone || "(not given)"),
      "What do you need help with?: " + help,
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
