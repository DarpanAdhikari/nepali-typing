export async function nepaliTyper(inputField,suggestionField){
    const suggestions = document.getElementById(suggestionField),
  input = document.getElementById(inputField);
  const base = {
    a: ["अ"],
    aa: ["अ", "आ"],
    u: ["उ", "ऊ"],
    e: ["ए"],
    k: ["क", "क्"],
    ka: ["क"],
    kh: ["ख", "ख्"],
    kha: ["ख"],
    g: ["ग", "ग्"],
    ga: ["ग"],
    gh: ["घ", "घ्"],
    gha: ["घ"],
    ch: ["च", "च्"],
    cha: ["च"],
    chh: ["छ", "छ्"],
    chha: ["छ"],
    j: ["ज", "ज्"],
    ja: ["ज"],
    jh: ["झ", "झ्"],
    jha: ["झ"],
    n: ["ङ", "ङ्", "ञ", "ञ्", "ण", "ण्", "न", "न्"],
    na: ["न"],
    t: ["त", "ट", "त्", "ट्"],
    ta: ["त", "ट"],
    th: ["थ", "ठ", "थ्", "ठ्"],
    tha: ["थ", "ठ"],
    d: ["द", "ड", "द्", "ड्"],
    da: ["द", "ड"],
    dh: ["ध", "ढ", "ध्", "ढ्"],
    dha: ["ध", "ढ"],
    p: ["प", "प्"],
    pa: ["प"],
    ph: ["फ", "फ्"],
    pha: ["फ"],
    b: ["ब", "ब्"],
    ba: ["ब"],
    bh: ["भ", "भ्"],
    bha: ["भ"],
    m: ["म", "म्"],
    ma: ["म"],
    y: ["य", "य्"],
    ya: ["य"],
    r: ["र", "र्"],
    ra: ["र"],
    l: ["ल", "ल्"],
    la: ["ल"],
    v: ["व", "व्"],
    va: ["व"],
    sh: ["श", "ष", "श्", "ष्"],
    sha: ["श", "ष"],
    s: ["स", "स्"],
    sa: ["स"],
    h: ["ह", "ह्"],
    ha: ["ह"],
    x: ["क्ष", "क्ष्"],
    xa: ["क्ष"],
    tr: ["त्र", "त्र्"],
    gy: ["ज्ञ", "ज्ञ्"],
    gya: ["ज्ञ"],
    shri: ["श्री", "श्रि"],
    om: ["ॐ"],
    an: ["ऽ"],
  };
  
  const modifiers = {
    a: ["ा"],
    i: ["ि", "ी", "इ", "ई"],
    u: ["ु", "ू"],
    e: ["े"],
    ai: ["ै"],
    o: ["ो"],
    au: ["ौ"],
    m: ["ं"],
    h: ["ः"],
    rhi: ["ृ"],
    rhii: ["ॄ"],
    lrhi: ["ॢ"],
    lrhii: ["ॣ"],
  };
  
  function getOptions(input) {
    const options = [];
    if (base[input]) {
      options.push(...base[input]);
    }
    for (let mod in modifiers) {
      if (input.endsWith(mod)) {
        const baseChars = base[input.slice(0, input.length - mod.length)] || [];
        const modifierChars = modifiers[mod];
        baseChars.forEach((b) => {
          if (!b.includes("्")) {
            modifierChars.forEach((m) => {
              options.push(b + m);
            });
          }
        });
      }
    }
    return options;
  }
  
  function isExcluded(option) {
    const excludeStrings = ["श्री", "श्रि", "ॐ", "ऽ"];
    for (let excludeStr of excludeStrings) {
      if (option.includes(excludeStr)) {
        return true;
      }
    }
    const excludeChars = ["अ", "आ", "ऊ","क्","ख्","ग्","क्ष", "क्ष्","ई","ण्","ङ्","ञ्","घ्","च्","झ्","ट्","ढ्","ठ्","ड्","ह्","त्र्","ज्ञ्","य्","ल्","व्","श्","फ्","ष्","ब्"];
    for (let i = 1; i < option.length - 1; i++) {
      if (excludeChars.includes(option[i])) {
        return true;
      }
    }
   if (["ऊ", "ङ", "ङ्", "ञ", "ञ्", "ण", "ण्"].includes(option[0])) {
    return true;
   }
    return false;
  }
  
  function translate(word) {
    let translations = getOptions(word);
    if (translations.length === 0) {
      for (let i = 1; i <= word.length; i++) {
        const prefix = word.slice(0, i);
        const suffix = word.slice(i);
        const prefixOptions = getOptions(prefix);
        const suffixTranslations = translate(suffix);
        prefixOptions.forEach((p) => {
          suffixTranslations.forEach((s) => {
            translations.push(p + s);
          });
        });
      }
    }
    translations = translations.filter((option) => !isExcluded(option));
    return [...new Set(translations)].sort((a, b) => a.length - b.length);
  }
  
  function groupByFirstCharacter(options) {
    const grouped = {};
    options.forEach((option) => {
      const firstChar = option[0];
      if (!grouped[firstChar]) {
        grouped[firstChar] = [];
      }
      grouped[firstChar].push(option);
    });
    return grouped;
  }
  
  function showGroupedOptions(character, groupedOptions) {
    suggestions.innerHTML = "";
    let backButton = document.createElement("li");
    backButton.textContent = "Back";
    backButton.className = "group-char optionsBack";
    backButton.addEventListener("click", () => {
      showGroupedOptionsList(groupedOptions);
    });
    suggestions.appendChild(backButton);
    const options = groupedOptions[character];
    options.forEach((value) => {
      let listItem = document.createElement("li");
      listItem.textContent = value;
      suggestions.appendChild(listItem);
    });
  }
  
  function showGroupedOptionsList(groupedOptions) {
    suggestions.innerHTML = "";
    Object.keys(groupedOptions).forEach((char) => {
      let listItem = document.createElement("li");
      const count = groupedOptions[char].length;
      listItem.textContent = `${char} (${count})`;
      listItem.classList.add("group-char");
      listItem.addEventListener("click", () => {
        showGroupedOptions(char, groupedOptions);
      });
      suggestions.appendChild(listItem);
    });
  }
  
  function getWordAtCursorPosition(inputText, cursorPos) {
    const leftPart = inputText.slice(0, cursorPos);
    const rightPart = inputText.slice(cursorPos);
    
    const leftWordMatch = leftPart.match(/(\w+)$/);
    const rightWordMatch = rightPart.match(/^(\w+)/);
    
    const leftWord = leftWordMatch ? leftWordMatch[0] : '';
    const rightWord = rightWordMatch ? rightWordMatch[0] : '';
    const wordRange = leftWordMatch ? { start: cursorPos - leftWord.length, end: cursorPos } : null;
    
    return { leftWord, rightWord, wordRange };
  }
  
  function getInputValue(inputElement) {
    if (inputElement.isContentEditable) {
      return inputElement.innerText;
    } else {
      return inputElement.value;
    }
  }
  
  function showSuggestions(e) {
    suggestions.innerHTML = "";
    const inpValue = getInputValue(input).trim().toLowerCase();
    const cursorPos = getCursorPosition(input);
    const { leftWord, rightWord, wordRange } = getWordAtCursorPosition(inpValue, cursorPos);
    
    let translations = [];
    if (leftWord) {
      translations = translate(leftWord);
    } else if (rightWord) {
      translations = translate(rightWord);
    }
    
    if (translations.length > 0) {
      const groupedOptions = groupByFirstCharacter(translations);
      if (translations.length > 10) {
        showGroupedOptionsList(groupedOptions);
      } else {
        translations.forEach((value) => {
          let listItem = document.createElement("li");
          listItem.textContent = value;
          suggestions.appendChild(listItem);
        });
      }
    }
  }
  
  function getCursorPosition(inputElement) {
    if (inputElement.isContentEditable) {
      const selection = window.getSelection();
      return selection.anchorOffset;
    } else {
      return inputElement.selectionStart;
    }
  }
  
  input.addEventListener("input", showSuggestions);
  input.addEventListener("click", showSuggestions);
  suggestions.addEventListener("click", (e) => {
    const clickedItem = e.target;
    if (!clickedItem.classList.contains("group-char")) {
      const inpValue = getInputValue(input).trim();
      const cursorPos = getCursorPosition(input);
      const { leftWord, rightWord, wordRange } = getWordAtCursorPosition(inpValue, cursorPos);
    
      if (wordRange) {
        const selectedOption = clickedItem.textContent;
        const newValue = inpValue.slice(0, wordRange.start) + selectedOption + inpValue.slice(wordRange.end);
        if (input.isContentEditable) {
          input.innerText = newValue;
        } else {
          input.value = newValue;
        }
    
        input.selectionStart = input.selectionEnd = wordRange.start + selectedOption.length;
      }
    }
  });
  document.addEventListener('keydown', function(event) {
    if (event.key === 'Enter' || event.key === '.') {
      event.preventDefault();
  
      if (input.isContentEditable) {
        input.innerHTML += "।";
        const range = document.createRange();
        const selection = window.getSelection();
        range.selectNodeContents(input);
        range.collapse(false);
        selection.removeAllRanges();
        selection.addRange(range);
        
      } else {
        input.value += "।";
        input.setSelectionRange(input.value.length, input.value.length);
      }
    }
  });
}