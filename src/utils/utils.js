export function isFlat(data) {
    /**
     * Check if the data object is flat, i.e., it doesn't have any nested lists or subobjects.
     *
     * @param {Object|Array} data - The data object to check.
     * @returns {boolean} - True if the data object is flat, False otherwise.
     */

    function isNested(value) {
        return typeof value === 'object' && value !== null;
    }

    if (Array.isArray(data) || typeof data === 'object' && data !== null) {
        for (let key in data) {
            if (data.hasOwnProperty(key)) {
                if (isNested(data[key])) {
                    return false;
                }
            }
        }
        return true;
    }

    return true;
}
