(function () {
  "use strict";

  function setExpanded(button, content, expanded) {
    button.setAttribute("aria-expanded", expanded ? "true" : "false");
    content.hidden = !expanded;
  }

  function expandHashTarget() {
    if (!window.location.hash) {
      return;
    }

    var target = document.getElementById(window.location.hash.slice(1));
    if (!target) {
      return;
    }

    var content = null;
    if (target.classList.contains("collapsible-section-content")) {
      content = target;
    } else if (target.classList.contains("collapsible-section-toggle")) {
      content = document.getElementById(target.getAttribute("aria-controls"));
    } else if (target.classList.contains("collapsible-section-heading")) {
      var targetButton = target.querySelector(".collapsible-section-toggle");
      content = document.getElementById(targetButton.getAttribute("aria-controls"));
    } else {
      content = target.closest(".collapsible-section-content");
    }

    if (!content) {
      return;
    }

    var button = document.getElementById(
      content.getAttribute("aria-labelledby")
    );
    if (button) {
      setExpanded(button, content, true);
      target.scrollIntoView();
    }
  }

  function makeHeadingsCollapsible(headings, options) {
    headings.forEach(function (heading, index) {
      var sectionNumber = index + 1;
      var content = document.createElement("div");
      var sibling = heading.nextSibling;

      content.className = "collapsible-section-content";
      content.id = options.idPrefix + sectionNumber;
      content.setAttribute("role", "region");

      while (sibling && !options.isBoundary(sibling)) {
        var nextSibling = sibling.nextSibling;
        content.appendChild(sibling);
        sibling = nextSibling;
      }

      heading.parentNode.insertBefore(content, sibling);

      var button = document.createElement("button");
      button.type = "button";
      button.className = "collapsible-section-toggle";
      button.id = options.idPrefix + "toggle-" + sectionNumber;
      button.setAttribute("aria-controls", content.id);
      content.setAttribute("aria-labelledby", button.id);
      heading.id = options.idPrefix + "heading-" + sectionNumber;

      while (heading.firstChild) {
        button.appendChild(heading.firstChild);
      }

      heading.className +=
        (heading.className ? " " : "") + "collapsible-section-heading";
      heading.appendChild(button);
      setExpanded(button, content, false);

      button.addEventListener("click", function () {
        var isExpanded = button.getAttribute("aria-expanded") === "true";
        setExpanded(button, content, !isExpanded);
      });
    });
  }

  function findReadingTopicHeadings(layoutContent) {
    var recommendedHeading = null;
    var children = layoutContent.children;
    var index;

    for (index = 0; index < children.length; index += 1) {
      if (
        children[index].tagName === "H2" &&
        children[index].textContent.replace(/\s+/g, " ").trim() ===
          "Recommended Reading (by Topic)"
      ) {
        recommendedHeading = children[index];
        break;
      }
    }

    if (!recommendedHeading) {
      return [];
    }

    var headings = [];
    var sibling = recommendedHeading.nextElementSibling;
    while (sibling && sibling.tagName !== "H2") {
      if (sibling.tagName === "H3") {
        headings.push(sibling);
      }
      sibling = sibling.nextElementSibling;
    }

    return headings;
  }

  function initializeCollapsibleSections() {
    var layoutContent = document.getElementById("layout-content");
    var currentPageLink = document.querySelector("#layout-menu a.current");
    if (!layoutContent || !currentPageLink) {
      return;
    }

    var currentPage = currentPageLink.getAttribute("href").split("/").pop();
    if (currentPage === "reading.html") {
      var readingTopicHeadings = findReadingTopicHeadings(layoutContent);
      if (!readingTopicHeadings.length) {
        return;
      }

      makeHeadingsCollapsible(readingTopicHeadings, {
        idPrefix: "reading-topic-",
        isBoundary: function (element) {
          return (
            element.nodeType === 1 &&
            (element.tagName === "H2" || element.tagName === "H3")
          );
        }
      });
    } else if (currentPage === "study.html") {
      var studyHeadings = Array.prototype.filter.call(
        layoutContent.children,
        function (element) {
          return element.tagName === "H2";
        }
      );

      makeHeadingsCollapsible(studyHeadings, {
        idPrefix: "study-section-",
        isBoundary: function (element) {
          return element.nodeType === 1 && element.tagName === "H2";
        }
      });
    } else {
      return;
    }

    expandHashTarget();
    window.addEventListener("hashchange", expandHashTarget);
  }

  if (document.readyState === "loading") {
    document.addEventListener(
      "DOMContentLoaded",
      initializeCollapsibleSections
    );
  } else {
    initializeCollapsibleSections();
  }
})();
