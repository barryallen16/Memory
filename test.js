document.addEventListener("DOMContentLoaded", () => {
  const copyBtn = document.getElementById("copy-btn");
  const homeBtn = document.getElementById("home-btn");
  const bmklt = document.getElementById("bmklt");
  const checkboxSameNum = document.querySelector('input[type="checkbox"]');
  const bkmltBtn = document.querySelector("button.button-white");
  const demoBtn = document.querySelector(".button.px-4.py-2.bg-white");
  const bkmltText = document.querySelector("#demo-page h3");
  const demoPage = document.querySelector("#demo-page");

  var yearMapping = {
    1: ["i", "1", "firstyear"],
    2: ["ii", "2", "secondyear"],
    3: ["iii", "3", "thirdyear", "prefinalyear"],
    4: ["iv", "4", "fourthyear", "finalyear"],
  };
  var semMapping = {
    1: ["i", "1"],
    2: ["ii", "2"],
    3: ["iii", "3"],
    4: ["iv", "4"],
    5: ["v", "5"],
    6: ["vi", "6"],
    7: ["vii", "7"],
    8: ["8", "viii"],
  };
  var deptMapping = {
    CSE: {
      value: "CSE",
      possibleValues: ["cse", "c.s.e", "computerscienceengineering"],
    },
    CFIS: {
      value: "CFIS",
      possibleValues: [
        "cse",
        "cfis",
        "cyberforensicsandinformationalsecurity",
        "cybersecurity",
      ],
    },
    AI: {
      value: "Artificial Intelligence",
      possibleValues: ["ai", "artificialintelligence"],
      negPossibleValues: [
        "artificialintelligenceanddatascience",
        "ds&ai",
        "ai&ds",
        "artificialintelligence&datascience",
        "aids",
      ],
    },
    IT: {
      value: "Information Technology",
      possibleValues: ["it", "Information technology"],
    },
    "DS&AI": {
      value: "DS & AI",
      possibleValues: [
        "artificialintelligenceanddatascience",
        "ds&ai",
        "ai&ds",
        "artificialintelligence&datascience",
        "aids",
      ],
    },
  };

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
    saveToStorage("same_whatsapp_toggle", e.target.checked);
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
      saveToStorage("WhatsApp no", "");
    }

    checkAllFields();
  });

  function getFieldKey(input) {
    if (input.type === "checkbox") return "same_whatsapp_toggle";
    if (input.placeholder === "DOB") return "dob";

    if (input.tagName === "SELECT") {
      const defaultOpt = input.querySelector("option[disabled]");
      return defaultOpt ? defaultOpt.innerText.trim() : "unknown_select";
    }

    return input.placeholder ? input.placeholder.trim() : "unknown_input";
  }

  function saveToStorage(key, value) {
    if (!key) return;
    localStorage.setItem("form_data_" + key, value);
  }

  function getFromStorage(key) {
    console.log(localStorage.getItem("form_data_" + key));
    return localStorage.getItem("form_data_" + key);
  }

  function loadPersistedData() {
    const savedCheckboxState = getFromStorage("same_whatsapp_toggle");

    if (savedCheckboxState === "false") {
      checkboxSameNum.checked = false;
      checkboxSameNum.dispatchEvent(new Event("change"));
    } else {
      checkboxSameNum.checked = true;
    }

    const allInputs = document.querySelectorAll("input, select");

    allInputs.forEach((input) => {
      if (input.type === "checkbox") return;

      const key = getFieldKey(input);
      const savedValue = getFromStorage(key);
      if (savedValue !== null && savedValue !== "") {
        input.value = savedValue;
        updateFieldUI(input);
      }
    });

    checkAllFields();
  }
  function attachListener(input) {
    input.addEventListener("input", () => {
      const key = getFieldKey(input);
      saveToStorage(key, input.value);
      updateFieldUI(input);
      checkAllFields();
    });
    input.addEventListener("change", () => {
      const key = getFieldKey(input);

      const val = input.type === "checkbox" ? input.checked : input.value;
      console.log("--listingin checkbox", val);
      saveToStorage(key, val);

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
      bkmltBtn.removeAttribute("disabled");
      bkmltBtn.classList.remove("opacity-50", "cursor-not-allowed");
      bkmltBtn.classList.add(
        "opacity-100",
        "cursor-pointer",
        "hover:bg-gray-100"
      );
    } else {
      bkmltBtn.setAttribute("disabled", "true");
      bkmltBtn.classList.add("opacity-50", "cursor-not-allowed");
      bkmltBtn.classList.remove(
        "opacity-100",
        "cursor-pointer",
        "hover:bg-gray-100"
      );
    }
  }

  function getAllFormData() {
    const keyMap = {
      Name: "name",
      "Reg no": "regNo",
      "College name": "college",
      Degree: "degree",
      Dept: "dept",
      Section: "section",
      Year: "year",
      Semester: "semester",
      "Year of passing": "yop",
      "No of Arrears": "arrears",
      "10th %": "tenPercent",
      "12th %": "twelvePercent",
      "Phone no": "phone",
      "Email id": "email",
      Gender: "gender",
      "WhatsApp no": "whatsapp", // The dynamic field
      dob: "dob",
      CGPA: "cgpa",
      "Always attend interview?": "interview",
      // Special case for date input
    };

    const data = {};

    const inputs = document.querySelectorAll("input, select");
    inputs.forEach((input) => {
      if (input.type === "checkbox") return;
      let identifier = "";
      if (input.placeholder === "DOB") {
        identifier = "dob";
      } else if (input.tagName === "SELECT") {
        const defaultOpt = input.querySelector("option[disabled]");
        identifier = defaultOpt ? defaultOpt.innerText.trim() : "";
      } else {
        identifier = input.placeholder ? input.placeholder.trim() : "";
      }
      const variableName = keyMap[identifier];
      if (variableName) {
        data[variableName] = input.value;
      }
    });
    const checkboxSameNum = document.querySelector('input[type="checkbox"]');
    if (checkboxSameNum && checkboxSameNum.checked && data.phone) {
      data.whatsapp = data.phone;
    }
    return data;
  }

  bkmltBtn.addEventListener("click", (e) => {
    if (bkmltBtn.disabled) return;
    console.log("bkml btn pressed.");
    e.preventDefault();

    demoPage.classList.remove("hidden", "mt-24");
    demoPage.classList.add("mt-12");
    demoPage.scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "start",
    });
    const finalData = getAllFormData();
    // console.log("Captured Data:", finalData);
    const result = createBkmklt(finalData);
    console.log("--res ");
    console.log(result);
    if (bkmltText.innerText === "Your Demo Bookmarklet") {
      bkmltText.innerText = "Your Bookmarklet";
    }
  });

  function createBkmklt(data) {
    const bkmkltWithPlaceholders = `javascript:var yearMapping = {1: ["i", "1", "firstyear"],2: ["ii", "2", "secondyear"],3: ["iii", "3", "thirdyear", "prefinalyear"],4: ["iv", "4", "fourthyear", "finalyear"],};var semMapping = {1: ["i", "1"],2: ["ii", "2"],3: ["iii", "3"],4: ["iv", "4"],5: ["v", "5"],6: ["vi", "6"],7: ["vii", "7"],8: ["8", "viii"],};var deptMapping = {CSE: {value: "CSE",possibleValues: ["cse", "c.s.e", "computerscienceengineering"],},CFIS: {value: "CFIS",possibleValues: ["cse","cfis","cyberforensicsandinformationalsecurity","cybersecurity",],},AI: {value: "Artificial Intelligence",possibleValues: ["ai", "artificialintelligence"],negPossibleValues: ["artificialintelligenceanddatascience","ds&ai","ai&ds","artificialintelligence&datascience","aids",],},IT: {value: "Information Technology",possibleValues: ["it", "Information technology"],},"DS&AI": {value: "DS & AI",possibleValues: ["artificialintelligenceanddatascience","ds&ai","ai&ds","artificialintelligence&datascience","aids",],},};var questions = document.querySelectorAll('div[role="listitem"]');var nativeInputValueSetter = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype,"value").set;var fieldMappings = [{patterns: ["college name","your college name","college","university name","your university name","institution name","name of your college","name of your university","educational institution","name of institution","college/university","institute name",],value: "Dr. M.G.R. Educational and Research Institute",possibleValues: ["Dr. M.G.R. Educational and Research Institute","dr.m.g.r.educationalandresearchinstitute","dr.m.g.r.educational&researchinstitute","Dr. M.G.R. Educational & Research Institute","dr.mgr.educationalandresearchinstitute",],},{patterns: ["your name","name","student name","full name","complete name","name of student","applicant name","candidate name","participant name",],value: ${JSON.stringify(String(data.name))},},{patterns: ["reg no","reg. no.","register number","register no","registration number","student id","student number","university id","college id","roll number","roll no",],value: ${JSON.stringify(String(data.regNo))},},{patterns: ["your phone no","contact no","phone number","contact number","mobile number","mobile no",],value: ${JSON.stringify(String(data.phone))},},{ patterns: ["whatsapp no", "whatsapp number"], value: ${JSON.stringify(String(data.whatsapp))} },{patterns: ["email","your email","email address","email id","e-mail","personal email id","mail id",],value: ${JSON.stringify(String(data.email))},},{patterns: ["year", "year of study"],negPattern: ["year of passing"],value: ${JSON.stringify(String(data.year))},...(yearMapping[${JSON.stringify(String(data.year))}] && { possibleValues: yearMapping[${JSON.stringify(String(data.year))}] }),},{patterns: ["branch", "department", "stream"],...(deptMapping[${JSON.stringify(String(data.dept))}] && {value: deptMapping[${JSON.stringify(String(data.dept))}]["value"],possibleValues: deptMapping[${JSON.stringify(String(data.dept))}]["possibleValues"],}),},{patterns: ["gender"],value: ${JSON.stringify(String(data.gender))},...(${JSON.stringify(String(data.gender))}== "Male" && {negPossibleValues: ["female", "f"],possibleValues: ["male", "m"],}),...(${JSON.stringify(String(data.gender))} == "Female" && {possibleValues: ["female", "f"],}),},{patterns: ["semester"],value: ${JSON.stringify(String(data.semester))},...(semMapping[${JSON.stringify(String(data.semester))}] && {possibleValues: semMapping[${JSON.stringify(String(data.semester))}],}),},{ patterns: ["degree"], value: "btech", possibleValues: ["b.tech"] },{ patterns: ["section"], value: ${JSON.stringify(String(data.section))} },{ patterns: ["10%", "10 %", "10th percentage"], value: ${JSON.stringify(String(data.tenPercent))} },{ patterns: ["12%", "12 %", "12th percentage"], value: ${JSON.stringify(String(data.twelvePercent))} },{patterns: ["ug cgpa", "cgpa"],negPattern: ["pg cgpa"],value: ${JSON.stringify(String(data.cgpa))},},{ patterns: ["arrears"], value: ${JSON.stringify(String(data.arrears))} },{ patterns: ["date of birth"], value: ${JSON.stringify(String(data.dob))} },{patterns: ["year of passing out", "year of passing"],value: ${JSON.stringify(String(data.yop))},possibleValues: toString([${data.yop}]),},{patterns: ["are you interested to attend the interview process"],value:"none",...(${JSON.stringify(String(data.interview))} === "yes" && {value: "yes",possibleValues: ["yes"]})}];function normalizeString(str) {return str.toLowerCase().replace(/\s+/g, "");}questions.forEach((question) => {if (question.querySelector("span")) {var questionText = question.querySelector("span").innerText.toLowerCase();for (var mapping of fieldMappings) {if (mapping.patterns.some((pattern) => questionText.includes(pattern))) {if (mapping.negPattern &&mapping.negPattern.some((negPattern) =>questionText.includes(negPattern))) {continue;} else {var input = question.querySelector("input");var radios = question.querySelectorAll('[role="radio"]');var dropdown = question.querySelectorAll('[role="option"]');if (dropdown) {dropdown.forEach((option) => {option.setAttribute("aria-selected", "false");option.setAttribute("tabindex", "-1");});for (option of dropdown) {var optionValue = option.getAttribute("data-value");if (mapping.possibleValues) {var normalized = normalizeString(optionValue);if (mapping.possibleValues.includes(normalized)) {option.setAttribute("aria-selected", "true");option.setAttribute("tabindex", "0");option.click();setTimeout(() => {option.click();}, 100);}}}} else if (radios) {for (const radio of radios) {var radioValue = radio.getAttribute("data-value");if (mapping.possibleValues) {var normalized = normalizeString(radioValue);if (mapping.negPossibleValues &&mapping.negPossibleValues.includes(normalized)) {continue;}if (mapping.possibleValues.includes(normalized)) {radio.click();break;}}}} else if (input) {nativeInputValueSetter.call(input, mapping.value);input.dispatchEvent(new Event("input", { bubbles: true }));input.dispatchEvent(new Event("change", { bubbles: true }));} else {console.log("No input found for ", question);}}}}}});`;
    return bkmkltWithPlaceholders;
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

  document
    .querySelectorAll('input:not([type="checkbox"]), select')
    .forEach(attachListener);

  loadPersistedData();
});
