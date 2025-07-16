/**
 * Find a radio button for a supplied answer choice
 * @param {any} btns list of radio buttons (answer options)
 * @param {any} btnValue answer choice
 * @returns {HTMLElement} a radio button with supplied btnValue's value attribute
 */
export function getRadioButton(
  btns: HTMLElement[],
  btnValue: number
): HTMLElement {
  const button = btns.find((r) => Number(r.getAttribute("value")) === btnValue);
  if (!button) throw new Error(`Could not find radio value=${btnValue}`);
  return button;
}
