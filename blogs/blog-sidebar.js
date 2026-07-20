(function () {
  "use strict";

  function initBlogSidebar() {
    var content = document.getElementById("layout-content");
    if (!content || document.querySelector(".blog-sidebar")) {
      return;
    }

    var headings = Array.prototype.slice.call(content.querySelectorAll("h2"));
    if (!headings.length) {
      return;
    }

    var language =
      document.documentElement.getAttribute("lang") ||
      document.documentElement.getAttribute("xml:lang") ||
      "en";
    var isChinese = language.toLowerCase().indexOf("zh") === 0;

    var shell = document.createElement("div");
    shell.className = "blog-shell";

    var aside = document.createElement("aside");
    aside.className = "blog-sidebar";
    aside.setAttribute(
      "aria-label",
      isChinese ? "文章章节导航" : "Article section navigation"
    );

    var panel = document.createElement("details");
    panel.className = "blog-sidebar-panel";

    var summary = document.createElement("summary");
    summary.textContent = isChinese ? "目录" : "On this page";
    panel.appendChild(summary);

    var navigation = document.createElement("nav");
    navigation.className = "blog-sidebar-nav";
    navigation.setAttribute(
      "aria-label",
      isChinese ? "目录" : "On this page"
    );

    var list = document.createElement("ul");
    var links = [];

    headings.forEach(function (heading, index) {
      var anchorId = heading.id;
      var previous = heading.previousElementSibling;

      if (
        !anchorId &&
        previous &&
        previous.classList.contains("section-anchor") &&
        previous.id
      ) {
        anchorId = previous.id;
      }

      if (!anchorId) {
        anchorId = "blog-section-" + (index + 1);
        heading.id = anchorId;
      }

      heading.classList.add("blog-section-heading");

      var item = document.createElement("li");
      var link = document.createElement("a");
      link.href = "#" + anchorId;
      link.textContent = heading.textContent.replace(/\s+/g, " ").trim();
      link.setAttribute("data-section-id", anchorId);
      item.appendChild(link);
      list.appendChild(item);
      links.push(link);
    });

    navigation.appendChild(list);
    panel.appendChild(navigation);
    aside.appendChild(panel);

    content.parentNode.insertBefore(shell, content);
    shell.appendChild(aside);
    shell.appendChild(content);
    document.body.classList.add("blog-sidebar-ready");

    var desktopQuery = window.matchMedia("(min-width: 1200px)");

    function syncPanelForViewport(event) {
      panel.open = event.matches;
    }

    syncPanelForViewport(desktopQuery);
    if (desktopQuery.addEventListener) {
      desktopQuery.addEventListener("change", syncPanelForViewport);
    } else {
      desktopQuery.addListener(syncPanelForViewport);
    }

    links.forEach(function (link) {
      link.addEventListener("click", function () {
        markActive(link.getAttribute("data-section-id"));
        if (!desktopQuery.matches) {
          panel.open = false;
        }
      });
    });

    function markActive(anchorId) {
      links.forEach(function (link) {
        var isActive = link.getAttribute("data-section-id") === anchorId;
        link.classList.toggle("active", isActive);
        if (isActive) {
          link.setAttribute("aria-current", "true");
        } else {
          link.removeAttribute("aria-current");
        }
      });
    }

    var hashId = window.location.hash.slice(1);
    if (
      hashId &&
      links.some(function (link) {
        return link.getAttribute("data-section-id") === hashId;
      })
    ) {
      markActive(hashId);
    } else {
      markActive(links[0].getAttribute("data-section-id"));
    }

    if ("IntersectionObserver" in window) {
      var observer = new IntersectionObserver(
        function (entries) {
          var visible = entries
            .filter(function (entry) {
              return entry.isIntersecting;
            })
            .sort(function (left, right) {
              return left.boundingClientRect.top - right.boundingClientRect.top;
            });

          if (visible.length) {
            var heading = visible[0].target;
            var previous = heading.previousElementSibling;
            var anchorId =
              heading.id ||
              (previous && previous.classList.contains("section-anchor")
                ? previous.id
                : "");
            if (anchorId) {
              markActive(anchorId);
            }
          }
        },
        {
          rootMargin: "-12% 0px -72% 0px",
          threshold: 0
        }
      );

      headings.forEach(function (heading) {
        observer.observe(heading);
      });
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initBlogSidebar);
  } else {
    initBlogSidebar();
  }
})();
