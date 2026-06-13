/* QEC Book — Main JS */

(function () {
  "use strict";

  /* ---- Sidebar toggle (mobile) ---- */
  const sidebar = document.getElementById("sidebar");
  const overlay = document.getElementById("sidebar-overlay");
  const menuBtn = document.getElementById("menu-toggle");

  function openSidebar() {
    sidebar && sidebar.classList.add("open");
    overlay && overlay.classList.add("open");
    document.body.style.overflow = "hidden";
  }

  function closeSidebar() {
    sidebar && sidebar.classList.remove("open");
    overlay && overlay.classList.remove("open");
    document.body.style.overflow = "";
  }

  menuBtn && menuBtn.addEventListener("click", openSidebar);
  overlay && overlay.addEventListener("click", closeSidebar);

  /* Close sidebar when a nav link is clicked on mobile */
  if (sidebar) {
    sidebar.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        if (window.innerWidth <= 900) closeSidebar();
      });
    });
  }

  /* ---- Active link highlighting ---- */
  (function () {
    var page = window.location.pathname.split("/").pop() || "index.html";
    var links = document.querySelectorAll("#sidebar-nav a");
    links.forEach(function (a) {
      var href = a.getAttribute("href");
      if (!href) return;
      var linkPage = href.split("/").pop();
      if (linkPage === page) {
        a.classList.add("active");
        /* Scroll sidebar to active link */
        setTimeout(function () {
          a.scrollIntoView({ block: "nearest", behavior: "smooth" });
        }, 100);
      }
    });
  })();

  /* ---- Sidebar search ---- */
  var searchInput = document.getElementById("sidebar-search-input");
  if (searchInput) {
    searchInput.addEventListener("input", function () {
      var q = this.value.trim().toLowerCase();
      var links = document.querySelectorAll("#sidebar-nav li.nav-item");
      links.forEach(function (li) {
        var text = li.textContent.toLowerCase();
        if (!q || text.indexOf(q) !== -1) {
          li.classList.remove("search-hidden");
        } else {
          li.classList.add("search-hidden");
        }
      });
    });
  }

  /* ---- Keyboard shortcuts ---- */
  document.addEventListener("keydown", function (e) {
    /* / or s → focus search */
    if ((e.key === "/" || e.key === "s") && !e.ctrlKey && !e.metaKey) {
      var tag = document.activeElement.tagName;
      if (tag !== "INPUT" && tag !== "TEXTAREA") {
        e.preventDefault();
        searchInput && searchInput.focus();
      }
    }
    /* Escape → close sidebar on mobile */
    if (e.key === "Escape") closeSidebar();
  });

  /* ---- Copy code blocks ---- */
  document.querySelectorAll("pre").forEach(function (pre) {
    var btn = document.createElement("button");
    btn.textContent = "Copy";
    btn.style.cssText =
      "position:absolute;top:6px;right:8px;font-size:0.72rem;padding:2px 8px;" +
      "border:1px solid #ccc;border-radius:4px;background:#fff;cursor:pointer;" +
      "font-family:sans-serif;opacity:0.7;";
    pre.style.position = "relative";
    pre.appendChild(btn);
    btn.addEventListener("click", function () {
      var code = pre.querySelector("code") || pre;
      navigator.clipboard &&
        navigator.clipboard.writeText(code.textContent).then(function () {
          btn.textContent = "Copied!";
          setTimeout(function () {
            btn.textContent = "Copy";
          }, 1500);
        });
    });
  });
})();
