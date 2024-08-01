class PromptRunResult {
    /**
     * @param {string} content - The content of the result.
     * @param {Object} usage - The usage details of the result.
     */
    constructor(content, usage) {
        this.content = content;
        this.usage = usage;
    }

    toString() {
        return `PromptRunResult(content="${this.content}", usage=${JSON.stringify(this.usage)})`;
    }
}

export default PromptRunResult;
