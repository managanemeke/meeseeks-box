//@ts-ignore

/**
 * @link https://github.com/microsoft/TypeScript/blob/main/src/lib/es5.d.ts#L1137
 */
declare var JSON: {
  /**
   * Converts a JavaScript Object Notation (JSON) string into an object.
   * @param text A valid JSON string.
   * @param reviver A function that transforms the results. This function is called for each member of the object.
   * If a member contains nested objects, the nested objects are transformed before the parent object is.
   * @throws {SyntaxError} If `text` is not valid JSON.
   */
  parse(text: string, reviver?: (this: any, key: string, value: any) => any): any;
  /**
   * Converts a JavaScript value to a JavaScript Object Notation (JSON) string.
   * @param value A JavaScript value, usually an object or array, to be converted.
   * @param replacer A function that transforms the results.
   * @param space Adds indentation, white space, and line break characters to the return-value JSON text to make it easier to read.
   * @throws {TypeError} If a circular reference or a BigInt value is found.
   */
  stringify(value: any, replacer?: (this: any, key: string, value: any) => any, space?: string | number): string;
  /**
   * Converts a JavaScript value to a JavaScript Object Notation (JSON) string.
   * @param value A JavaScript value, usually an object or array, to be converted.
   * @param replacer An array of strings and numbers that acts as an approved list for selecting the object properties that will be stringified.
   * @param space Adds indentation, white space, and line break characters to the return-value JSON text to make it easier to read.
   * @throws {TypeError} If a circular reference or a BigInt value is found.
   */
  stringify(value: any, replacer?: (number | string)[] | null, space?: string | number): string;
}
