(function () {
  "use strict";

  window.MathJax = {
    loader: {
      load: ["[tex]/ams"]
    },
    tex: {
      inlineMath: [["$", "$"]],
      displayMath: [["$$", "$$"]],
      processEscapes: true,
      packages: { "[+]": ["ams"] },
      macros: {
        mathplus: "{+}"
      }
    },
    output: {
      displayOverflow: "linebreak",
      linebreaks: {
        inline: true,
        width: "100%",
        lineleading: 0.25
      }
    },
    options: {
      skipHtmlTags: ["script", "noscript", "style", "textarea", "pre", "code", "tt"]
    },
    startup: {
      ready: function () {
        MathJax.startup.defaultReady();
        MathJax.startup.promise.then(function () {
          document.documentElement.classList.add("mathjax-ready");
        });
      }
    }
  };

  var script = document.createElement("script");
  script.src = "https://cdn.jsdelivr.net/npm/mathjax@4/tex-chtml.js";
  script.defer = true;
  script.onerror = function () {
    document.documentElement.classList.add("mathjax-failed");
  };
  document.head.appendChild(script);
})();
