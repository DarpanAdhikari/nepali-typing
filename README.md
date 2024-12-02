# Nepali Typer

A lightweight JavaScript package for typing Nepali words with intelligent suggestions. This package takes input from an editable text field and provides contextual suggestions for Nepali characters and words based on the input. The package supports both simple and complex character combinations, making it a powerful tool for Nepali typing.

## Features
- Dynamic suggestions based on the typed input.
- Smart word suggestions with modifiers and character combinations.
- Groups suggestions by their starting character for easier navigation.
- Supports context-sensitive word prediction using the left and right parts of the typed word.
- Works for both standard input fields and content-editable elements.

## Installation

To use this package, you can either:
1. Download the script and include it in your project.
2. Use a package manager like npm or yarn.
## Usage

### HTML Structure:
- **Input Field:** The field where the user types the Nepali text.
- **Suggestions Field:** A list container where the Nepali character suggestions will appear.

### Initialize Nepali Typer:
To initialize the Nepali Typer, call the `nepaliTyper()` function, passing the IDs of the input field and suggestion list.

## How It Works

1. **Input Detection:** When the user types in the input field, the package listens for the input and analyzes the text.
2. **Contextual Suggestions:** Based on the typed word, the package calculates possible Nepali characters or words, considering both the base characters and their modifiers.
3. **Suggestion Grouping:** Suggestions are grouped by their first character for easier navigation. If there are more than 10 suggestions, they will be grouped for easier access.
4. **Selection:** When the user clicks on a suggestion, the word is inserted into the text at the cursor's position.

### Key Functions:

- **`nepaliTyper(inputField, suggestionField)`**: Initializes the Nepali Typer functionality.
- **`getOptions(input)`**: Returns possible Nepali characters or words based on the input.
- **`translate(word)`**: Translates the word based on available options.
- **`groupByFirstCharacter(options)`**: Groups the suggestions by their first character for better user experience.

## Events

- **`input` Event on the Input Field**: Triggered when the user types in the input field.
- **`click` Event on Suggestion List**: Triggered when a suggestion is clicked to insert it into the input field.

## Example Use Case

Suppose you're building a Nepali text editor or chat interface. You can use this package to provide contextual suggestions for Nepali characters as the user types, making it easier for them to write in Nepali efficiently.

```html
<input type="text" id="inputField" placeholder="Type Nepali..."/>
<ul id="suggestionField"></ul>

<script type="module" src="script.js"></script>
```
```Javascript
import { speechToText } from 'https://unpkg.com/nepali-typing@latest/index.js';
nepaliTyper('inputField', 'suggestionField');
```

### Example Walkthrough:

1. **User types "ka"** in the input field.
2. **Suggestions** for possible words or characters like "क", "क्", "ख", etc., will appear in the suggestion list.
3. **User selects** one of the suggestions, and the input is updated with the selected word.

## License

MIT License