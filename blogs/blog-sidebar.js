(function () {
  "use strict";

  function cleanHeadingText(heading) {
    return heading.textContent.replace(/\s+/g, " ").trim();
  }

  function headingAnchor(heading, fallbackId) {
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
      anchorId = fallbackId;
      heading.id = anchorId;
    }

    heading.classList.add("blog-section-heading");
    return anchorId;
  }

  function questionAnchor(heading, index) {
    var codeMatch = cleanHeadingText(heading).match(/^([ZCMS])(\d{3})\b/i);
    var bookPrefix =
      codeMatch && codeMatch[1].toUpperCase() === "Z"
        ? "zhou-z"
        : codeMatch && codeMatch[1].toUpperCase() === "C"
          ? "crack-c"
          : codeMatch && codeMatch[1].toUpperCase() === "M"
            ? "mosteller-m"
            : "stefanica-s";
    return headingAnchor(
      heading,
      codeMatch
        ? bookPrefix + codeMatch[2]
        : "blog-question-" + (index + 1)
    );
  }

  function initBlogSidebar() {
    var content = document.getElementById("layout-content");
    if (!content || document.querySelector(".blog-sidebar")) {
      return;
    }

    var chapterHeadings = Array.prototype.slice.call(
      content.querySelectorAll("h2")
    );
    if (!chapterHeadings.length) {
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

    var panelSummary = document.createElement("summary");
    panelSummary.textContent = isChinese ? "目录" : "On this page";
    panel.appendChild(panelSummary);

    var navigation = document.createElement("nav");
    navigation.className = "blog-sidebar-nav";
    navigation.setAttribute("aria-label", isChinese ? "目录" : "On this page");

    var chapterList = document.createElement("ul");
    chapterList.className = "blog-sidebar-sections";
    var records = [];
    var questionIndex = 0;

    chapterHeadings.forEach(function (chapterHeading, chapterIndex) {
      var chapterId = headingAnchor(
        chapterHeading,
        "blog-section-" + (chapterIndex + 1)
      );
      var nextChapter = chapterHeadings[chapterIndex + 1] || null;
      var questions = [];
      var cursor = chapterHeading.nextElementSibling;

      while (cursor && cursor !== nextChapter) {
        if (cursor.tagName && cursor.tagName.toLowerCase() === "h3") {
          questions.push(cursor);
        }
        cursor = cursor.nextElementSibling;
      }

      var chapterItem = document.createElement("li");

      if (!questions.length) {
        var chapterLink = document.createElement("a");
        chapterLink.href = "#" + chapterId;
        chapterLink.textContent = cleanHeadingText(chapterHeading);
        chapterLink.setAttribute("data-section-id", chapterId);
        chapterItem.appendChild(chapterLink);
        records.push({
          id: chapterId,
          heading: chapterHeading,
          link: chapterLink,
          chapter: null
        });
      } else {
        var chapter = document.createElement("details");
        chapter.className = "blog-sidebar-section";
        chapter.setAttribute("data-chapter-id", chapterId);

        var chapterSummary = document.createElement("summary");
        var chapterTitle = document.createElement("span");
        chapterTitle.className = "blog-sidebar-section-title";
        chapterTitle.textContent = cleanHeadingText(chapterHeading);
        var chapterCount = document.createElement("span");
        chapterCount.className = "blog-sidebar-count";
        chapterCount.textContent = String(questions.length);
        chapterCount.setAttribute(
          "aria-label",
          isChinese ? questions.length + " 道题" : questions.length + " questions"
        );
        chapterSummary.appendChild(chapterTitle);
        chapterSummary.appendChild(chapterCount);
        chapter.appendChild(chapterSummary);

        var questionList = document.createElement("ul");
        questionList.className = "blog-sidebar-questions";

        questions.forEach(function (questionHeading) {
          var questionId = questionAnchor(questionHeading, questionIndex);
          var questionItem = document.createElement("li");
          var questionLink = document.createElement("a");
          var questionText = cleanHeadingText(questionHeading);

          questionIndex += 1;
          questionLink.href = "#" + questionId;
          questionLink.textContent = questionText;
          questionLink.title = questionText;
          questionLink.setAttribute("data-section-id", questionId);
          questionItem.appendChild(questionLink);
          questionList.appendChild(questionItem);
          records.push({
            id: questionId,
            heading: questionHeading,
            link: questionLink,
            chapter: chapter
          });
        });

        chapter.appendChild(questionList);
        chapterItem.appendChild(chapter);
        records.push({
          id: chapterId,
          heading: chapterHeading,
          link: null,
          chapter: chapter
        });
      }

      chapterList.appendChild(chapterItem);
    });

    navigation.appendChild(chapterList);
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

    function markActive(anchorId) {
      var activeRecord = null;

      records.forEach(function (record) {
        var isActive = record.id === anchorId;
        if (record.link) {
          record.link.classList.toggle("active", isActive);
          if (isActive) {
            record.link.setAttribute("aria-current", "location");
          } else {
            record.link.removeAttribute("aria-current");
          }
        }
        if (isActive) {
          activeRecord = record;
        }
      });

      Array.prototype.forEach.call(
        navigation.querySelectorAll(".blog-sidebar-section"),
        function (chapter) {
          var isCurrent = Boolean(activeRecord && activeRecord.chapter === chapter);
          chapter.classList.toggle("active", isCurrent);
          if (isCurrent) {
            chapter.open = true;
          } else if (activeRecord && activeRecord.chapter) {
            chapter.open = false;
          }
        }
      );

      if (activeRecord && activeRecord.link && desktopQuery.matches) {
        window.requestAnimationFrame(function () {
          var sidebarRect = navigation.getBoundingClientRect();
          var linkRect = activeRecord.link.getBoundingClientRect();
          if (linkRect.top < sidebarRect.top + 8) {
            navigation.scrollTop -= sidebarRect.top + 8 - linkRect.top;
          } else if (linkRect.bottom > sidebarRect.bottom - 8) {
            navigation.scrollTop += linkRect.bottom - sidebarRect.bottom + 8;
          }
        });
      }
    }

    Array.prototype.forEach.call(
      navigation.querySelectorAll(".blog-sidebar-section"),
      function (chapter) {
        chapter.addEventListener("toggle", function () {
          if (!chapter.open) {
            return;
          }
          Array.prototype.forEach.call(
            navigation.querySelectorAll(".blog-sidebar-section"),
            function (otherChapter) {
              if (otherChapter !== chapter) {
                otherChapter.open = false;
              }
            }
          );
        });
      }
    );

    Array.prototype.forEach.call(
      navigation.querySelectorAll("a[data-section-id]"),
      function (link) {
        link.addEventListener("click", function () {
          markActive(link.getAttribute("data-section-id"));
          if (!desktopQuery.matches) {
            panel.open = false;
          }
        });
      }
    );

    var hashId = decodeURIComponent(window.location.hash.slice(1));
    var hashRecord = records.find(function (record) {
      return record.id === hashId;
    });
    var firstQuestion = records.find(function (record) {
      return record.link && record.chapter;
    });
    var initialRecord = hashRecord || firstQuestion || records[0];
    if (initialRecord) {
      markActive(initialRecord.id);
    }

    window.addEventListener("hashchange", function () {
      var newHashId = decodeURIComponent(window.location.hash.slice(1));
      var hashMatch = records.find(function (record) {
        return record.id === newHashId;
      });
      if (hashMatch) {
        markActive(hashMatch.id);
      }
    });

    if ("IntersectionObserver" in window) {
      var headingRecords = records.filter(function (record) {
        return record.heading;
      });
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
            var visibleRecord = headingRecords.find(function (record) {
              return record.heading === visible[0].target;
            });
            if (visibleRecord) {
              markActive(visibleRecord.id);
            }
          }
        },
        {
          rootMargin: "-10% 0px -78% 0px",
          threshold: 0
        }
      );

      headingRecords.forEach(function (record) {
        observer.observe(record.heading);
      });
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initBlogSidebar);
  } else {
    initBlogSidebar();
  }
})();
