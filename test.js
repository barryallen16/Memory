document.addEventListener("DOMContentLoaded", () => {
  // --- Configuration & Selectors ---
  const copyBtn = document.getElementById("copy-btn");
  const homeBtn = document.getElementById("home-btn");
  const bmklt = document.getElementById("bmklt");
  const formContainer = document.querySelector(".grid"); // The container holding all inputs
  const checkboxSameNum = document.querySelector('input[type="checkbox"]');
  const createBtn = document.querySelector("button.button-white");
  const demoBtn = document.querySelector(".button.px-4.py-2.bg-white");
  const navbarToggle = document.querySelector(
    'button[aria-controls="navbar-menu"]'
  );
  const navbarMenu = document.getElementById("navbar-menu");

  const svgDefault = `<svg aria-label="Radial" viewBox="0 0 24 24" class="StyledIcon-sc-ofa7kd-0 RacMK w-6 h-6 text-amber-400/80 group-hover:text-amber-400 transition-all"><circle cx="12" cy="12" r="11" fill="none" stroke="#212121" stroke-width="2"></circle></svg>`;
  const svgSuccess = `<svg aria-label="Status is okay" viewBox="0 0 24 24" class="StyledIcon-sc-ofa7kd-0 RacMK w-6 h-6 text-green-400 transition-all"><path fill="none" stroke="#fff" stroke-width="2" d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10zM7 12l4 3 5-7"></path></svg>`;

  document.querySelectorAll(".group div.absolute").forEach((tooltip) => {
    tooltip.dataset.originalText = tooltip.innerText;
  });

  async function copyToClipboard(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      await navigator.clipboard.writeText(text);
      console.log("Content copied to clipboard via API");
      copyBtn.innerText = "Copied";
      setTimeout(() => {
        copyBtn.innerText = "Copy";
      }, 2000);
      return true;
    } else {
      throw new Error("Clipboard API unavailable");
    }
  }
  copyBtn.addEventListener("click", () => {
    copyToClipboard(bmklt.textContent);
  });
  navbarToggle.addEventListener("click", () => {
    document.getElementById("hamburger-open").classList.toggle("hidden");
    document.getElementById("hamburger-close").classList.toggle("hidden");
    navbarMenu.classList.toggle("block");
    navbarMenu.classList.toggle("hidden");
  });

  demoBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const elementToHide = document.querySelector("#hero");
    const elementToShow = document.querySelector("#demo-page");
    if (elementToHide) elementToHide.classList.add("hidden");
    if (elementToShow) elementToShow.classList.remove("hidden");
  });
  homeBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const elementToHide = document.querySelector("#demo-page");
    const elementToShow = document.querySelector("#hero");
    if (elementToHide) elementToHide.classList.add("hidden");
    if (elementToShow) elementToShow.classList.remove("hidden");
    navbarToggle.click();
  });

  checkboxSameNum.addEventListener("change", (e) => {
    const phoneInputGroup =
      findInputByPlaceholder("Phone no").closest(".group");

    if (!e.target.checked) {
      if (!document.getElementById("whatsapp-field")) {
        const waHTML = createInputHTML(
          "WhatsApp no",
          "number",
          "Add WhatsApp no",
          "whatsapp-field"
        );
        phoneInputGroup.insertAdjacentHTML("afterend", waHTML);

        const newField = document
          .getElementById("whatsapp-field")
          .querySelector("input");
        const tooltip = document
          .getElementById("whatsapp-field")
          .querySelector(".absolute");
        tooltip.dataset.originalText = "Add WhatsApp no";
        attachListener(newField);
      }
    } else {
      const waField = document.getElementById("whatsapp-field");
      if (waField) waField.remove();
    }

    checkAllFields();
  });

  document
    .querySelectorAll('input:not([type="checkbox"]), select')
    .forEach(attachListener);

  function attachListener(input) {
    input.addEventListener("input", () => {
      updateFieldUI(input);
      checkAllFields();
    });
    input.addEventListener("change", () => {
      updateFieldUI(input);
      checkAllFields();
    });
  }

  function updateFieldUI(input) {
    const group = input.closest(".group");
    const iconContainer = group.querySelector(".flex-shrink-0");
    const tooltip = group.querySelector(".absolute");
    const isFilled = input.value && input.value.trim() !== "";

    if (isFilled) {
      iconContainer.innerHTML = svgSuccess;

      const originalText = tooltip.dataset.originalText || "Add field";
      const fieldName = originalText.replace("Add ", "");
      tooltip.innerText = `Saved ${fieldName} !`;
    } else {
      iconContainer.innerHTML = svgDefault;
      if (tooltip.dataset.originalText) {
        tooltip.innerText = tooltip.dataset.originalText;
      }
    }
  }

  function checkAllFields() {
    const allInputs = document.querySelectorAll(
      '.grid input:not([type="checkbox"]), .grid select'
    );
    let allFilled = true;

    allInputs.forEach((el) => {
      if (!el.value || el.value.trim() === "") {
        allFilled = false;
      }
    });

    if (allFilled) {
      createBtn.removeAttribute("disabled");
      createBtn.classList.remove("opacity-50", "cursor-not-allowed");
      createBtn.classList.add(
        "opacity-100",
        "cursor-pointer",
        "hover:bg-gray-100"
      );
    } else {
      createBtn.setAttribute("disabled", "true");
      createBtn.classList.add("opacity-50", "cursor-not-allowed");
      createBtn.classList.remove(
        "opacity-100",
        "cursor-pointer",
        "hover:bg-gray-100"
      );
    }
  }

  createBtn.addEventListener("click", (e) => {
    if (createBtn.disabled) return;
    createBookmarkletHandler();
  });

  function createBookmarkletHandler() {
    console.log("Create Bookmarklet Clicked - Logic goes here");
    alert("Bookmarklet creation triggered!");
  }

  function findInputByPlaceholder(text) {
    return Array.from(document.querySelectorAll("input")).find(
      (i) => i.placeholder === text
    );
  }

  function createInputHTML(placeholder, type, tooltipText, id) {
    return `
        <div id="${id}" class="group relative bg-white/5 backdrop-blur-lg rounded-lg p-3 border border-white/10 hover:border-amber-400/50 transition-all duration-200 flex items-center justify-between cursor-pointer shadow-sm hover:shadow-amber-400/10">
            <input
              placeholder="${placeholder}"
              class="bg-transparent border-none focus:outline-none text-white placeholder-white/60 font-medium text-sm w-full truncate"
              type="${type}"
            />
            <div class="flex-shrink-0 ml-2">
              ${svgDefault}
            </div>
            <div class="absolute -top-7 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap shadow-lg border border-white/5">
              ${tooltipText}
            </div>
        </div>
        `;
  }
});
