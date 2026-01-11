document.addEventListener("DOMContentLoaded", () => {
  // Mobile menu toggle
  const mobileMenuButton = document.getElementById("mobile-menu-button");
  const mobileMenu = document.getElementById("mobile-menu");
  11;
  if (mobileMenuButton && mobileMenu) {
    mobileMenuButton.addEventListener("click", () => {
      mobileMenu.classList.toggle("hidden");
    });
  }

  // Intersection Observer for animations
  const animatedElements = document.querySelectorAll(".animate-on-load");

  if (animatedElements.length > 0) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1, // Trigger when 10% of the element is visible
      }
    );

    animatedElements.forEach((element) => {
      observer.observe(element);
    });
  }

  // IDE logic
  const fileData = {
    "profile.py": {
      language: "python",
      icon: "fab fa-python icon-python",
      content: `class WaadHamoud:
    def __init__(self):
        self.name = "Waad Hamoud"
        self.title = "Software Developer"
        self.education = "B.Eng. in Computer Science"
        self.location = "Germany"
        self.email = "waad.hamoud94@gmail.com"
        self.linkedin = "www.linkedin.com/in/waad-hamoud"
        self.github = "https://github.com/Waadhmd"
        self.status = "Open to Work"

    def summary(self):
    return {
            "focus": "Backend Engineering & Full-stack development",
            "strengths": ["Analytical thinking", "Problem-solving", "Code quality"],
            "commitment": "Building reliable, high-quality products in fast-paced teams"
        }

me = WaadHamoud()
print(me.get_summary()),
`,
    },
    "skills.yaml": {
      language: "yaml",
      icon: "fas fa-file-alt icon-yaml",
      content: `frontend: [JavaScript, React, Next.js, HTML, CSS]
backend: [Python, Flask, FastAPI, RESTful APIs]
databases: [SQLite, PostgreSQL, SQLAlchemy]
languages: [Arabic: Native, English: Professional, German: B2]
`,
    },
    "experience.json": {
      language: "json",
      icon: "fas fa-code icon-json",
      content: `[
  {
    "company": "Masterschool", 
    "role": "Software Engineering Training", 
    "period": "may 2025 - jan 2026" ,
    "highlights": "Advanced Python, OOP, and RESTful API design"
  },
  {
    "company": "Tamakan Information Technology", 
    "role": "Junior Frontend Developer", 
    "period": "Jan 2023 - May 2023",
    "tech": "React, Nest.js, JWT, CRUD" 
  },
  {
    "company": "Contentpepper", 
    "role": "Frontend Developer Intern", 
    "period": "Jul 2022 - Sep 2022" ,
    "tech": "Next.js, API routes"
  },
  {
    "company": "MABCO",
    "role": "Application Support Specialist",
    "period": "2019 - 2021",
    "focus": "Data flow & performance optimization"
  }
]`,
    },
  };

  const sidebarItems = document.querySelectorAll(".sidebar-item");
  const tabContainer = document.getElementById("tab-container");
  const codeArea = document.getElementById("code-area");
  const lineNumbers = document.getElementById("line-numbers");
  const editorHeaderFileName = document.querySelector(
    ".editor-header-filename"
  );

  let openTabs = [];
  let activeTab = null;

  const renderTabs = () => {
    tabContainer.innerHTML = "";
    openTabs.forEach((filename) => {
      const tab = document.createElement("div");
      tab.className = `ide-tab ${activeTab === filename ? "active" : ""}`;
      tab.dataset.filename = filename;
      tab.innerHTML = `
                <i class="${fileData[filename].icon}"></i>
                <span class="ml-2">${filename}</span>
                <span class="close-icon ml-auto">&times;</span>
            `;
      tabContainer.appendChild(tab);
    });
  };

  const openFile = (filename) => {
    if (!openTabs.includes(filename)) {
      openTabs.push(filename);
    }
    activeTab = filename;
    renderFileContent();
    renderTabs();
  };

  const closeFile = (filename) => {
    const index = openTabs.indexOf(filename);
    if (index > -1) {
      openTabs.splice(index, 1);
    }

    if (activeTab === filename) {
      if (openTabs.length > 0) {
        activeTab = openTabs[openTabs.length - 1];
      } else {
        activeTab = null;
      }
    }
    renderFileContent();
    renderTabs();
  };

  const switchTab = (filename) => {
    activeTab = filename;
    renderFileContent();
    renderTabs();
  };

  const renderFileContent = () => {
    if (activeTab) {
      const file = fileData[activeTab];
      const content = file.content;
      const lines = content.split("\n").length;

      lineNumbers.innerHTML = Array.from(
        { length: lines },
        (_, i) => `<div>${i + 1}</div>`
      ).join("");

      codeArea.textContent = content;
      codeArea.className = `language-${file.language}`;

      // Re-highlight with Prism
      if (window.Prism) {
        Prism.highlightElement(codeArea);
      }
      // Update editor header filename
      editorHeaderFileName.textContent = activeTab;
    } else {
      lineNumbers.innerHTML = "";
      codeArea.textContent = "No file open";
      codeArea.className = "";
      editorHeaderFileName.textContent = "No file open"; // Updated this line
    }

    sidebarItems.forEach((item) => {
      if (item.dataset.filename === activeTab) {
        item.classList.add("selected");
      } else {
        item.classList.remove("selected");
      }
    });
  };

  // Event listener for sidebar file items
  sidebarItems.forEach((item) => {
    item.addEventListener("click", () => {
      const filename = item.dataset.filename;
      if (filename) {
        openFile(filename);
      }
    });
  });

  // Event listener for tab clicks
  tabContainer.addEventListener("click", (e) => {
    const tab = e.target.closest(".ide-tab");
    if (tab) {
      const filename = tab.dataset.filename;
      if (e.target.classList.contains("close-icon")) {
        closeFile(filename);
      } else {
        switchTab(filename);
      }
    }
  });

  // Event listener for sidebar folder collapse/expand
  document.querySelectorAll('[data-toggle="collapse"]').forEach((toggler) => {
    toggler.addEventListener("click", () => {
      const targetId = toggler.dataset.target;
      const targetElement = document.querySelector(targetId);
      const chevronIcon = toggler.querySelector(".chevron");

      if (targetElement && chevronIcon) {
        targetElement.classList.toggle("hidden");
        chevronIcon.classList.toggle("rotated");
      }
    });
  });

  // Open a default file
  openFile("profile.py");
});

// Tech Stack Terminal Logic
document.addEventListener("DOMContentLoaded", () => {
  const techTerminal = document.getElementById("tech-terminal");
  const techStackSection = document.getElementById("tech-stack");

  if (!techStackSection) return;

  const commands = [
    {
      text: "> pip install backend-stack...",
      done: true,
      icons: ["python", "leaf", "database"],
    },
    {
      text: "> npm install frontend-tools...",
      done: true,
      icons: ["react", "js", "css3-alt"],
    },
    { text: "status: All systems operational.", pulse: true },
  ];

  const iconClasses = {
    python: "fab fa-python text-blue-400",
    leaf: "fas fa-leaf text-green-500",
    database: "fas fa-database text-slate-400",
    react: "fab fa-react text-cyan-400",
    js: "fab fa-js text-yellow-400",
    "css3-alt": "fab fa-css3-alt text-blue-500",
  };

  let animated = false;

  function typeCommand(command, onComplete) {
    let i = 0;
    const speed = 50; // Milliseconds per character
    const lineContainer = document.createElement("div");
    techTerminal.appendChild(lineContainer);

    const textSpan = document.createElement("span");
    lineContainer.appendChild(textSpan);

    function type() {
      if (i < command.text.length) {
        textSpan.textContent += command.text.charAt(i);
        i++;
        setTimeout(type, speed);
      } else {
        if (command.done) {
          const doneSpan = document.createElement("span");
          doneSpan.className = "text-green-400";
          doneSpan.textContent = " [Done]";
          textSpan.appendChild(doneSpan);
        }
        if (command.icons) {
          const iconsContainer = document.createElement("div");
          iconsContainer.className = "flex gap-4 items-center mt-2 mb-4";
          command.icons.forEach((iconKey) => {
            const iconElement = document.createElement("i");
            iconElement.className = iconClasses[iconKey];
            iconsContainer.appendChild(iconElement);
          });
          techTerminal.appendChild(iconsContainer);
        }
        if (command.pulse) {
          lineContainer.classList.add("pulse");
        }
        if (onComplete) {
          onComplete();
        }
      }
    }
    type();
  }

  const observer = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting && !animated) {
        animated = true;
        let i = 0;
        function nextCommand() {
          if (i < commands.length) {
            typeCommand(commands[i], () => {
              i++;
              nextCommand();
            });
          }
        }
        nextCommand();
      }
    },
    { threshold: 0.5 }
  );

  observer.observe(techStackSection);
});
