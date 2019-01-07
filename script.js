const CHAR_WIDTH = 7;
const INVALID_INPUT_BORDER = '1px solid rgba(255, 0, 0, 0.4)';
const PLAY_BUTTON = '\u25ba';
const PAUSE_BUTTON = '\u2759\u2759';
const SELECTED_COUNTER_INDEX = 0;

let fooMax = null;

/**
 * Toggles interactivity of web page fieldset attributes and updates
 * display to reflect interactivity status
 * 
 * @returns nothing
 */
function toggleInteractivity() {
    let toggleButton = document.getElementById('toggle');
    let playButtonInstruction = document.getElementById('playButtonInstruction');
    if (toggleButton.innerText === PLAY_BUTTON) {
        toggleButton.innerText = PAUSE_BUTTON;
        updateFieldsetsState(disabled=false);
        playButtonInstruction.innerText = '';
    } else {
        toggleButton.innerText = PLAY_BUTTON;
        updateFieldsetsState(enable=true);
        playButtonInstruction.innerText = 'Press play to interact';
    }
}

/**
 * Updates disabled status of web page fieldset attributes
 *
 * @param {disabled} desired disabled status
 * @returns nothing
 */
function updateFieldsetsState(disabled) {
    let fieldsets = document.getElementsByTagName('fieldset')
    for (var i = 0; i < fieldsets.length; i++) {
        if (disabled) {
            fieldsets[i].disabled = disabled;
            fieldsets[i].style.opacity = '0.5';

        } else {
            fieldsets[i].disabled = disabled;
            fieldsets[i].style.opacity = '1';
        } 
    }

}

/**
 * Search text for term and output findings
 *
 * @returns nothing
 */
function searchText() {
    let searchTerm = document.getElementById('searchTerm');
    let searchableText = document.getElementById('searchableText');
    let searchOccurrence = document.getElementById('searchOccurrence');

    if (validateSearchInputs(searchTerm, searchableText)) {
        occurrenceIndices = findIndicesOfString(searchTerm.value, searchableText.value);
        displaySearchResults(searchOccurrence, occurrenceIndices);
        restoreSearchBoxStyle(searchTerm, searchableText);
    } else {
        searchOccurrence.value = 'Please fill in highlighted field(s)';
    }

    resizeTextarea(searchOccurrence);
}

/**
 * Determine if search textareas are populated and update border 
 * style accordingly
 *
 * @param {searchTerm} search term textarea
 * @param {searchableText} searchable text textarea
 * @returns {valid}
 */
function validateSearchInputs(searchTerm, searchableText) {
    restoreSearchBoxStyle(searchTerm, searchableText);
    let valid = true;

    if (searchTerm.value === '') {
        valid = false;
        searchTerm.style.border = INVALID_INPUT_BORDER;
    }

    if (searchableText.value === '') {
        valid = false;
        searchableText.style.border = INVALID_INPUT_BORDER;
    }

    return valid;
}

/**
 * Restore textareas style
 *
 * @param {searchTerm} search term textarea
 * @param {searchableText} searchable text textarea
 * @returns nothing
 */
function restoreSearchBoxStyle(searchTerm, searchableText) {
    searchTerm.style.removeProperty('border');
    searchableText.style.removeProperty('border');
}

/**
 * Finds occurrence indices of string within other string
 *
 * @param {strToFind} string to search for
 * @param {strToSearchThrough} string to search through
 * @returns {occurrenceIndices} list of indices strToFind was
 *  found within strToSearchThrough
 */
function findIndicesOfString(strToFind, strToSearchThrough) {
    let startIndex = 0;
    let index = 0;
    let occurrenceIndices = [];

    while ((index = strToSearchThrough.indexOf(strToFind, startIndex)) > -1) {
        occurrenceIndices.push(index);
        startIndex = index + strToFind.length;
    }
    return occurrenceIndices;
}

/**
 * Output search findings in searchOccurrence textarea
 *
 * @param {searchOccurrence} output textarea
 * @param {occurrenceIndices} list of indices string was found at
 * @returns nothing
 */
function displaySearchResults(searchOccurrence, occurrenceIndices) {
    if (occurrenceIndices.length === 0) {
        searchOccurrence.value = 'No matches found';
    } else {
        let searchOccurrenceOutput = '';
        for (var i = 0; i < occurrenceIndices.length; i++) {
            searchOccurrenceOutput += `${occurrenceIndices[i]}, `;
        }
        searchOccurrence.value = searchOccurrenceOutput.replace(/, $/, '');
    }
}

/**
 * Resizes given textarea box to handle multiple lines
 *
 * @param {textarea} textarea to resize
 * @returns nothing
 */
function resizeTextarea(textarea) {
    textarea.style.height = 'auto';
    textarea.style.height = textarea.scrollHeight + 'px';
}

/**
 * Determine max value of foo counter
 *
 * @return nothing
 */
function parseFooLimit() {
    let configuredFooLimit = parseInt(document.getElementById('fooLimit').value);
    if (isNaN(configuredFooLimit)) {
        fooMax = null;
    } else {
        fooMax = configuredFooLimit;
    }
}

/**
 * Increment value of selected counter
 *
 * @param {incrementValue} value to increment selected counter by
 * @return nothing
 */
function incrementCounter(incrementValue) {
    counter = determineCounterToUpdate()
    currentCount = parseInt(counter.value);
    counter.value = currentCount + incrementValue;
    updateSelectedCounter();
    resizeCounter(counter);
}

/**
 * Determine counter to increment based on configured foo counter
 * limit and current foo counter value
 *
 * @return counter to increment
 */
function determineCounterToUpdate() {
    let fooCounter = document.getElementById('fooCounter');
    let barCounter = document.getElementById('barCounter');

    if (fooMax === null) {
        return fooCounter;
    }

    if (fooMax <= parseInt(fooCounter.value)) {
        return barCounter;
    } else {
        return fooCounter;
    }
}

/**
 * Update counter class value, which changes appearance
 *
 * @return nothing
 */
function updateSelectedCounter() {
    currentSelectedCounter = document.getElementsByClassName('selectedCounter')[SELECTED_COUNTER_INDEX];
    newSelectedCounter = determineCounterToUpdate();

    if (currentSelectedCounter !== newSelectedCounter) {
        currentSelectedCounter.className = 'unselectedCounter';
        newSelectedCounter.className = 'selectedCounter';
    }
}

/**
 * Resize counter to display entire value
 *
 * @param {counter} counter to resize
 * @return nothing
 */
function resizeCounter(counter) {
    counter.style.width = `${counter.value.length * CHAR_WIDTH}px`;
}

/**
 * Generate multiplcation table up to maxValue
 *
 * @param {maxValue} maximum value to calculate multiplcation table for
 * @return nothing
 */
function generateMultiplicationTable(maxValue) {
    let multTable = document.getElementById('multiplicationTable');
    for (let i = 1; i <= maxValue; i++) {
        let newFactor = document.createElement('p');
        for (let j = i; j <= maxValue; j++) {
            newFactor.appendChild(document.createTextNode(`${i} x ${j} = ${i * j} `));
        }
        multTable.appendChild(newFactor);
    }
}