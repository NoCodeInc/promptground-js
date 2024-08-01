import { isFlat } from './utils.js';

export function ensureObjectIsFlat(data, name = "data") {
    /**
     * Ensure that the provided object is flat.
     *
     * @param {Object|Array} data - The data object to check.
     * @param {string} [name="data"] - The name of the data object for error messaging.
     * @throws {Error} - If the data object is not flat.
     */
    if (typeof data === 'string' || !isFlat(data)) {
        throw new Error(`\`${name}\` must be flat.`);
    }
}

export function ensureIsString(data, name = 'data') {
    /**
     * Ensure that the provided data is a string.
     *
     * @param {any} data - The data to check.
     * @param {string} [name='data'] - The name of the data for error messaging.
     * @throws {TypeError} - If the data is not a string.
     */
    if (typeof data !== 'string') {
        throw new TypeError(`The \`${name}\` must be a string`);
    }
}
