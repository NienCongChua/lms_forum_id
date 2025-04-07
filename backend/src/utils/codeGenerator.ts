/**
 * Generates a random numeric code of specified length
 * @param length The length of the code to generate (default: 8)
 * @returns A string containing the generated numeric code
 */
export function generateNumericCode(length: number = 8): string {
  // Generate a random number between 0 and 9 for each digit
  let code = '';
  for (let i = 0; i < length; i++) {
    code += Math.floor(Math.random() * 10).toString();
  }
  
  return code;
}
