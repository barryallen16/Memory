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
var questions = document.querySelectorAll('div[role="listitem"]');
var nativeInputValueSetter = Object.getOwnPropertyDescriptor(
  HTMLInputElement.prototype,
  "value"
).set;
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
    negPattern: undefined,
    negPossibleValues: undefined,
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
    value: "qwer",
    negPattern: undefined,
    negPossibleValues: undefined,
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
    value: "1324",
    negPattern: undefined,
    negPossibleValues: undefined,
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
    value: "123434",
    negPattern: undefined,
    negPossibleValues: undefined,
  },
  {
    patterns: ["whatsapp no", "whatsapp number"],
    value: "987654",
    negPattern: undefined,
    negPossibleValues: undefined,
  },
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
    value: "qewrrg",
    negPattern: undefined,
    negPossibleValues: undefined,
  },
  {
    patterns: ["year", "year of study"],
    negPattern: ["year of passing"],
    value: "4",
    ...(yearMapping["4"] && { possibleValues: yearMapping["4"] }),
    negPossibleValues: undefined,
  },
  {
    patterns: ["branch", "department", "stream"],
    ...(deptMapping["DS&AI"] && {
      value: deptMapping["DS&AI"]["value"],
      possibleValues: deptMapping["DS&AI"]["possibleValues"],
      negPattern: undefined,
      negPossibleValues: undefined,
    }),
  },
  {
    patterns: ["gender"],
    value: "Male",
    negPossibleValues: undefined,
    ...("Male" == "Male" && {
      negPossibleValues: ["female", "f"],
      possibleValues: ["male", "m"],
    }),
    ...("Male" == "Female" && { possibleValues: ["female", "f"] }),
    negPattern: undefined,
  },
  {
    patterns: ["semester"],
    value: "8",
    ...(semMapping["8"] && { possibleValues: semMapping["8"] }),
    negPattern: undefined,
    negPossibleValues: undefined,
  },
  {
    patterns: ["degree"],
    value: "btech",
    possibleValues: ["b.tech"],
    negPattern: undefined,
    negPossibleValues: undefined,
  },
  {
    patterns: ["section"],
    value: "B",
    negPattern: undefined,
    negPossibleValues: undefined,
  },
  {
    patterns: ["10%", "10 %", "10th%", "10th %", "10th percentage"],
    value: "63",
    negPattern: undefined,
    negPossibleValues: undefined,
  },
  {
    patterns: ["12%", "12 %", "12th%", "12th %", "12th percentage"],
    value: "87",
    negPattern: undefined,
    negPossibleValues: undefined,
  },
  {
    patterns: ["ug cgpa", "cgpa"],
    negPattern: ["pg cgpa"],
    value: "7.93",
    negPossibleValues: undefined,
  },
  {
    patterns: ["arrears"],
    value: "none",
    negPattern: undefined,
    negPossibleValues: undefined,
  },
  {
    patterns: ["date of birth"],
    value: "2004-11-16",
    negPattern: undefined,
    negPossibleValues: undefined,
  },
  {
    patterns: ["year of passing out", "year of passing"],
    value: "2026",
    possibleValues: ["2026"],
    negPattern: undefined,
    negPossibleValues: undefined,
  },
  {
    patterns: ["are you interested to attend the interview process"],
    value: "none",
    ...("yes" === "yes" && { value: "yes", possibleValues: ["yes"] }),
    negPattern: undefined,
    negPossibleValues: undefined,
  },
];
function normalizeString(str) {
  return str.toLowerCase().replace(/\s+/g, "");
}
questions.forEach((question) => {
  if (question.querySelector("span")) {
    var questionText = question.querySelector("span").innerText.toLowerCase();
    for (var mapping of fieldMappings) {
      if (mapping.patterns.some((pattern) => questionText.includes(pattern))) {
        if (
          mapping.negPattern &&
          mapping.negPattern.some((negPattern) =>
            questionText.includes(negPattern)
          )
        ) {
          continue;
        } else {
          var input = question.querySelector("input");
          var radios = question.querySelectorAll('[role="radio"]');
          var dropdown = question.querySelectorAll('[role="option"]');
          if (dropdown.length > 0) {
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
          } else if (radios.length > 0) {
            console.log("--radio fd: ", questionText);
            for (const radio of radios) {
              var radioValue = radio.getAttribute("data-value");
              if (mapping.possibleValues) {
                var normalized = normalizeString(radioValue);
                console.log("##normalized :", normalized);
                if (
                  mapping.negPossibleValues &&
                  mapping.negPossibleValues.includes(normalized)
                ) {
                  console.log("skipping ---", mapping.negPossibleValues);

                  continue;
                } else if (mapping.possibleValues.includes(normalized)) {
                  console.log("**found match :", normalized);
                  radio.click();
                  break;
                } else {
                  console.log(mapping);
                }
              }
            }
          } else if (input) {
            nativeInputValueSetter.call(input, mapping.value);
            input.dispatchEvent(new Event("input", { bubbles: true }));
            input.dispatchEvent(new Event("change", { bubbles: true }));
          } else {
            console.log("No input found for ", question);
          }
        }
      }
    }
  }
});
