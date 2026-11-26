(function () {
  "use strict";
  document.documentElement.classList.add("js");

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Mobile navigation ---------- */
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("site-nav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(open));
      toggle.textContent = open ? "Close" : "Menu";
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && nav.classList.contains("is-open")) {
        nav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
        toggle.textContent = "Menu";
        toggle.focus();
      }
    });
  }

  /* ---------- Current page in nav ---------- */
  // Works with clean URLs (/about) as well as /about.html
  var page = location.pathname.replace(/\.html$/, "").replace(/\/index$/, "/");
  if (page.length > 1) page = page.replace(/\/$/, "");
  if (page.indexOf("/case-study") === 0) page = "/portfolio";
  document.querySelectorAll(".site-nav a").forEach(function (a) {
    if (a.getAttribute("href") === page) a.setAttribute("aria-current", "page");
  });

  /* ---------- Footer year ---------- */
  document.querySelectorAll("[data-year]").forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });

  /* ---------- Home hero: type the search query, then show the result ---------- */
  var serp = document.querySelector(".serp");
  if (serp) {
    var q = serp.querySelector(".query");
    var text = q ? q.getAttribute("data-query") : "";
    if (!q || reduceMotion) {
      if (q) q.textContent = text;
      serp.classList.add("is-searched");
    } else {
      var i = 0;
      q.textContent = "";
      var tick = function () {
        q.textContent = text.slice(0, ++i);
        if (i < text.length) {
          setTimeout(tick, 45 + Math.random() * 45);
        } else {
          setTimeout(function () { serp.classList.add("is-searched"); }, 250);
        }
      };
      setTimeout(tick, 400);
    }
  }

  /* ---------- Projects ---------- */
  var CATEGORY = { seo: "SEO", ads: "Google Ads", web: "Website" };

  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  function card(p) {
    var results = (p.results || []).slice(0, 3).map(function (r) {
      return "<div><strong>" + esc(r.value) + "</strong><span>" + esc(r.label) + "</span></div>";
    }).join("");
    return (
      '<article class="project cat-' + esc(p.category) + (p.placeholder ? " is-placeholder" : "") + '">' +
        '<div class="project-tags"><span class="project-tag tag-' + esc(p.category) + '">' + esc(CATEGORY[p.category] || p.category) + "</span>" +
          (p.placeholder ? '<span class="project-tag is-sample">Sample project</span>' : "") +
          (p.pending ? '<span class="project-tag is-sample">Results coming soon</span>' : "") + "</div>" +
        "<h3>" + esc(p.title) + "</h3>" +
        (p.client ? '<p class="client">' + esc(p.client) + "</p>" : "") +
        '<p class="summary">' + esc(p.summary) + "</p>" +
        (results ? '<div class="results">' + results + "</div>" : "") +
        (!results && p.pending ? '<p class="results-pending">Screenshots and performance numbers will be added here.</p>' : "") +
        (p.tools ? '<p class="tools">Tools: ' + esc(p.tools) + "</p>" : "") +
        (p.caseStudy ? '<p class="project-links"><a class="project-link is-primary" href="' + esc(p.caseStudy) + '">Read case study</a></p>' : "") +
      "</article>"
    );
  }

  var projects = window.PROJECTS || [];

  // Home: featured work, one group per type (paid / SEO)
  document.querySelectorAll("[data-featured]").forEach(function (el) {
    var cat = el.getAttribute("data-featured");
    var items = projects.filter(function (p) { return p.featured && p.category === cat; }).slice(0, 3);
    el.innerHTML = items.map(card).join("");
    var group = el.closest(".work-group");
    if (group) group.hidden = items.length === 0;
  });

  // Portfolio: one section per type
  document.querySelectorAll("[data-category]").forEach(function (el) {
    var cat = el.getAttribute("data-category");
    var items = projects.filter(function (p) { return p.category === cat; });
    el.innerHTML = items.length ? items.map(card).join("") : '<p class="empty">Projects coming soon.</p>';
  });

  /* ---------- One-time SEO setups: show all websites ---------- */
  var chipToggle = document.querySelector(".site-chips-toggle");
  if (chipToggle) {
    var chipList = document.getElementById("site-chips");
    var label = chipToggle.textContent;
    chipToggle.addEventListener("click", function () {
      var open = chipList.classList.toggle("is-open");
      chipToggle.setAttribute("aria-expanded", String(open));
      chipToggle.textContent = open ? "Show fewer" : label;
    });
  }

  /* ---------- Google Ads plans: show all ---------- */
  var plansToggle = document.querySelector(".plans-toggle");
  if (plansToggle) {
    var plansGrid = document.querySelector(".plans");
    var plansLabel = plansToggle.textContent;
    plansToggle.addEventListener("click", function () {
      var open = plansGrid.classList.toggle("is-open");
      plansToggle.setAttribute("aria-expanded", String(open));
      plansToggle.textContent = open ? "Show fewer plans" : plansLabel;
      if (!open) document.getElementById("plans").scrollIntoView();
    });
  }

  /* ---------- Image viewer: screenshots and plan slides ---------- */
  var viewer = null;
  function openViewer(items, start, title) {
    if (typeof HTMLDialogElement !== "function") { window.open(items[start].src, "_blank"); return; }
    if (!viewer) {
      viewer = document.createElement("dialog");
      viewer.className = "lightbox";
      viewer.innerHTML =
        '<button type="button" class="lightbox-close" aria-label="Close">&times;</button>' +
        '<div class="lightbox-stage"><img alt=""></div>' +
        '<div class="lightbox-bar"><p class="lightbox-caption"></p>' +
        '<div class="lightbox-nav"><button type="button" class="lb-prev" aria-label="Previous slide">&larr;</button>' +
        '<span class="lb-count"></span>' +
        '<button type="button" class="lb-next" aria-label="Next slide">&rarr;</button></div></div>';
      document.body.appendChild(viewer);
      viewer.querySelector(".lightbox-close").addEventListener("click", function () { viewer.close(); });
      viewer.addEventListener("click", function (e) { if (e.target === viewer) viewer.close(); });
      viewer.querySelector(".lb-prev").addEventListener("click", function () { show(viewer._i - 1); });
      viewer.querySelector(".lb-next").addEventListener("click", function () { show(viewer._i + 1); });
      viewer.addEventListener("keydown", function (e) {
        if (e.key === "ArrowLeft") show(viewer._i - 1);
        if (e.key === "ArrowRight") show(viewer._i + 1);
      });
    }
    function show(i) {
      var list = viewer._items;
      viewer._i = (i + list.length) % list.length;
      var it = list[viewer._i];
      var img = viewer.querySelector(".lightbox-stage img");
      img.src = it.src;
      img.alt = it.alt || "";
      viewer.querySelector(".lightbox-caption").textContent = it.caption || "";
      viewer.querySelector(".lb-count").textContent = (viewer._i + 1) + " / " + list.length;
      viewer.querySelector(".lightbox-nav").hidden = list.length < 2;
    }
    viewer._items = items;
    show(start);
    if (!viewer.open) viewer.showModal();
  }

  document.querySelectorAll("a[data-lightbox]").forEach(function (a) {
    a.addEventListener("click", function (e) {
      e.preventDefault();
      var img = a.querySelector("img");
      openViewer([{ src: img ? img.currentSrc || img.src : a.href, alt: img ? img.alt : "", caption: img ? img.alt : "" }], 0);
    });
  });

  document.querySelectorAll("[data-plan]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var list = document.getElementById("plan-" + btn.getAttribute("data-plan"));
      if (!list) return;
      var title = list.getAttribute("data-title");
      var items = Array.prototype.map.call(list.querySelectorAll("li"), function (li, i, all) {
        return { src: li.getAttribute("data-src"), alt: title + ", slide " + (i + 1), caption: title };
      });
      openViewer(items, 0);
    });
  });

  /* ---------- Contact form ---------- */
  var form = document.getElementById("contact-form");
  if (form) {
    var status = document.getElementById("form-status");
    var started = form.querySelector('input[name="form_time"]');
    if (started) started.value = String(Math.floor(Date.now() / 1000));

    var showStatus = function (ok, msg) {
      status.className = "form-status " + (ok ? "is-success" : "is-error");
      status.textContent = msg;
      status.focus();
    };

    // Result of a non-JavaScript submit (contact.php redirects back here)
    var params = new URLSearchParams(location.search);
    if (params.get("status") === "sent") showStatus(true, "Message sent. I'll reply within one working day.");
    if (params.get("status") === "error") showStatus(false, "Your message wasn't sent. Please check the form and try again, or email me directly.");

    var rules = {
      name: function (v) { return v.trim().length >= 2 || "Enter your name."; },
      email: function (v) { return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()) || "Enter a valid email address, like name@example.com."; },
      phone: function (v) { return v.trim() === "" || /^[+()\-\s\d]{7,20}$/.test(v.trim()) || "Enter a valid phone number, or leave it blank."; },
      message: function (v) { return v.trim().length >= 10 || "Tell me a little more about your project (at least 10 characters)."; }
    };

    var check = function (name) {
      var input = form.elements[name];
      var field = input.closest(".field");
      var result = rules[name](input.value);
      var err = field.querySelector(".error");
      if (result === true) {
        field.classList.remove("has-error");
        input.removeAttribute("aria-invalid");
        return true;
      }
      field.classList.add("has-error");
      input.setAttribute("aria-invalid", "true");
      if (err) err.textContent = result;
      return false;
    };

    Object.keys(rules).forEach(function (name) {
      form.elements[name].addEventListener("blur", function () { check(name); });
    });

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var firstBad = null;
      Object.keys(rules).forEach(function (name) {
        if (!check(name) && !firstBad) firstBad = form.elements[name];
      });
      if (firstBad) { firstBad.focus(); return; }

      var btn = form.querySelector('button[type="submit"]');
      btn.disabled = true;
      btn.textContent = "Sending…";

      fetch(form.action, {
        method: "POST",
        body: new URLSearchParams(new FormData(form)),
        headers: { "X-Requested-With": "fetch", "Accept": "application/json" }
      })
        .then(function (r) { return r.json().catch(function () { return { ok: false }; }); })
        .then(function (data) {
          if (data.ok) {
            form.reset();
            if (started) started.value = String(Math.floor(Date.now() / 1000));
            showStatus(true, data.message || "Message sent. I'll reply within one working day.");
          } else {
            showStatus(false, data.message || "Your message wasn't sent. Please try again, or email me directly.");
          }
        })
        .catch(function () {
          showStatus(false, "Your message wasn't sent because the connection failed. Please try again, or email me directly.");
        })
        .finally(function () {
          btn.disabled = false;
          btn.textContent = "Send message";
        });
    });
  }
})();
