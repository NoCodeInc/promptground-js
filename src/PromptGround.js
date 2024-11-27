import PromptRunResult from "./models/PromptRunResult.js";
import { ensureIsString, ensureObjectIsFlat } from "./utils/validation.js";

class PromptGround {
  constructor(apiKey, baseUrl = "https://api.promptground.io/v2") {
    this.apiKey = apiKey;
    this.baseUrl = baseUrl;
    this.context = {
      sdk: "javascript",
      "sdk-version": "1.1.1",
    };
  }

  async messages(alias, data = {}, version = null) {
    ensureIsString(alias, "alias");

    const url = `${this.baseUrl}/prompt/messages`;
    const headers = {
      Authorization: `Bearer ${this.apiKey}`,
      "Content-Type": "application/json",
    };
    const payload = {
      alias: alias,
      data: data,
    };

    if (version) {
      payload.version = version;
    }

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(payload),
      });
      const result = await response.json();
      if (response.ok && result.success) {
        return result.data.messages || [];
      } else {
        throw new Error(result.message || "Error fetching messages");
      }
    } catch (error) {
      console.error("PromptError:", error.message, {
        url,
        payload,
      });
      throw error;
    }
  }

  async run(alias, data = {}, metadata = {}, labels = [], model = null, version = null, response_format = null) {
    ensureIsString(alias, "alias");
    ensureObjectIsFlat(data, "data");
    ensureObjectIsFlat(metadata, "metadata");
    ensureObjectIsFlat(labels, "labels");

    const url = `${this.baseUrl}/prompt/run`;
    const headers = {
      Authorization: `Bearer ${this.apiKey}`,
      "Content-Type": "application/json",
    };
    const payload = {
      alias: alias,
      data: data,
      metadata: metadata,
      labels: labels,
      context: this.context,
    };

    if (version) {
      payload.version = version;
    }

    if (model) {
      payload.model = model;
    }

    if (response_format) {
      payload.response_format = response_format;
    }

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(payload),
      });
      const result = await response.json();
      if (response.ok && result.success) {
        const data = result.data || {};
        return new PromptRunResult(data.result || "", data.usage || {});
      } else {
        throw new Error(result.message || "Error running prompt");
      }
    } catch (error) {
      console.error("PromptError:", error.message, {
        url,
        payload,
      });
      throw error;
    }
  }
}

export default PromptGround;
