/**
 * This function is used to move cursor position to only allowing editing numbers in fields that have a suffix
 * Currently only used in the "Time Left to Pay on Original Loan" field in Refinance Savings calculator (input adds ' Months' to end of value)
 *
 * @param {* the input DOM element} el
 * @param {* string of the modifying suffix} suffix
 */

function setSelectionRange(el, suffix) {
  el.setSelectionRange(el.value.length - suffix.length, el.value.length - suffix.length);
}

function setCursorPosition(el, suffix) {
  el.addEventListener('focus', () => setSelectionRange(el, suffix));
  el.addEventListener('click', () => setSelectionRange(el, suffix));
}

export default setCursorPosition;
