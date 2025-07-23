/**
 * Compares arrays when order of the elements isn't important
 * @param init array A
 * @param given array B
 * @returns true if values in arrays are true
 */
export function arrayCompare<T>(init: T[], given: T[]): boolean {
  return init.length === given.length && init.every((el) => given.includes(el));
}
