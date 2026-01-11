  javascript: (function () {
    var questions = document.querySelectorAll('div[role="listitem"]');
    var nativeInputValueSetter = Object.getOwnPropertyDescriptor(
      HTMLInputElement.prototype,
      "value"
    ).set;
    function inputValues(question, mapping) {
      var input = question.querySelector("input");
      var radios = question.querySelectorAll('[role="radio"]');
      var dropdown = question.querySelectorAll('[role="option"]');
      if (dropdown) {
        dropdown.forEach((option) => {
          option.setAttribute("aria-selected", "false");
          option.setAttribute("tabindex", "-1");
        });
        for (option of dropdown) {
          var optionValue = option.getAttribute("data-value");
          if (mapping.possibleValues) {
            var normalized = normalizeString(optionValue);
            if (mapping.possibleValues.includes(normalized)) {
              option.setAttribute("aria-selected", "true");
              option.setAttribute("tabindex", "0");
              option.click();
              setTimeout(() => {
                option.click();
              }, 100);
            }
          }
        }
      }
      if (radios) {
        for (const radio of radios) {
          var radioValue = radio.getAttribute("data-value");
          // console.log("--", radioValue);
          if (mapping.possibleValues) {
            var normalized = normalizeString(radioValue);
            console.log("--", normalized, "---", typeof normalized);
            console.log(mapping.possibleValues);
            mapping.possibleValues.forEach((value) => console.log(value));
            if (mapping.possibleValues.includes(normalized)) {
              console.log("yes");
              radio.click();
              break;
            }
          }
          if (mapping.patterns.includes("year of passing out")) {
            console.log(radioValue);
            var normalized = normalizeString(radioValue);
            console.log(normalized);
          }
          if (mapping.patterns.includes("gender")) {
            var normalized = normalizeString(radioValue);
            if (normalized == "female") {
              continue;
            }
          }
          if (mapping.patterns.includes("degree")) {
            var radioValue = normalizeString(radioValue).replace(".", "");
            if (
              radioValue.includes(mapping.value.toLowerCase()) ||
              mapping.value.toLowerCase().includes(radioValue)
            ) {
              radio.click();
              break;
            }
          } else if (
            radioValue.includes(mapping.value.toLowerCase()) ||
            mapping.value.toLowerCase().includes(radioValue)
          ) {
            radio.click();
            break;
          }
        }
      }
      if (input) {
        nativeInputValueSetter.call(input, mapping.value);
        input.dispatchEvent(new Event("input", { bubbles: true }));
        input.dispatchEvent(new Event("change", { bubbles: true }));
      } else {
        console.log("No input found for ", question);
      }
      const done = true;
      return done;
    }
    var fieldMappings = [
      {
        patterns: [
          "college name",
          "your college name",
          "college",
          "university name",
          "your university name",
          "institution name",
          "name of your college",
          "name of your university",
          "educational institution",
          "name of institution",
          "college/university",
          "institute name",
        ],
        value: "Dr. M.G.R. Educational and Research Institute",
        possibleValues: [
          "Dr. M.G.R. Educational and Research Institute",
          "dr.m.g.r.educationalandresearchinstitute",
          "dr.m.g.r.educational&researchinstitute",
          "Dr. M.G.R. Educational & Research Institute",
          "dr.mgr.educationalandresearchinstitute",
        ],
      },
      {
        patterns: [
          "your name",
          "name",
          "student name",
          "full name",
          "complete name",
          "name of student",
          "applicant name",
          "candidate name",
          "participant name",
        ],
        value: "Jayadithya",
      },
      {
        patterns: [
          "reg no",
          "reg. no.",
          "register number",
          "register no",
          "registration number",
          "student id",
          "student number",
          "university id",
          "college id",
          "roll number",
          "roll no",
        ],
        value: "221191101064",
      },
      {
        patterns: [
          "your phone no",
          "contact no",
          "phone number",
          "contact number",
          "mobile number",
          "mobile no",
        ],
        value: "6369605616",
      },
      { patterns: ["whatsapp no", "whatsapp number"], value: "6369605616" },
      {
        patterns: [
          "email",
          "your email",
          "email address",
          "email id",
          "e-mail",
          "personal email id",
          "mail id",
        ],
        value: "rjayadithya16@gmail.com",
      },
      {
        patterns: ["year", "year of study"],
        negPattern: ["year of passing"],
        value: "4",
        possibleValues: ["iv", "4"],
      },
      {
        patterns: ["branch", "department", "stream"],
        value: "DS & AI",
        possibleValues: [
          "artificialintelligenceanddatascience",
          "ds&ai",
          "ai&ds",
          "artificialintelligence&datascience",
          "aids",
        ],
      },
      {
        patterns: ["gender"],
        value: "Male",
        negPossibleValues: ["female", "f"],
        possibleValues: ["male", "m"],
      },
      { patterns: ["semester"], value: "8", possibleValues: ["8", "viii"] },
      { patterns: ["degree"], value: "btech", possibleValues: ["b.tech"] },
      { patterns: ["section"], value: "b" },
      { patterns: ["10%", "10th percentage"], value: "63%" },
      { patterns: ["12%", "12th percentage"], value: "87%" },
      { patterns: ["ug cgpa", "cgpa"], negPattern: ["pg cgpa"], value: "7.93" },
      { patterns: ["arrears"], value: "none" },
      { patterns: ["date of birth"], value: "2004-11-16" },
      {
        patterns: ["year of passing out", "year of passing"],
        value: "2026",
        possibleValues: [2026, "2026"],
      },
    ];
    function normalizeString(str) {
      return str.toLowerCase().replace(/\s+/g, "");
    }
    questions.forEach((question) => {
      if (question.querySelector("span") != null) {
        var questionText = question.querySelector("span").innerText.toLowerCase();
        console.log(questionText);
        for (var mapping of fieldMappings) {
          if (
            mapping.negPattern &&
            mapping.patterns.some((pattern) => questionText.includes(pattern)) &&
            !mapping.negPattern.some((negativePattern) =>
              questionText.includes(negativePattern)
            )
          ) {
            result = inputValues(question);
            if (result) break;
          }
        }
      }
    });
  })();
