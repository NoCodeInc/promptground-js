class PromptGround {
  constructor(apiKey, baseUrl = "https://api.promptground.io/v1") {
    this.apiKey = apiKey;
    this.baseUrl = baseUrl;
  }

  async prompt(alias, data = {}, defaultResponse = null, version = null) {
    const url = `${this.baseUrl}/prompt`;
    let body = {
      alias: alias,
      data: data,
    };

    if (version) {
      body["version"] = version;
    }

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${this.apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      const result = await response.json();
      if (response.ok && result.success) {
        return result.data.prompt || "";
      } else {
        if (defaultResponse !== null) {
          return defaultResponse;
        }
        throw new Error(result.message || "Error fetching prompt");
      }
    } catch (error) {
      console.error("PromptError:", error.message);
      throw error;
    }
  }
}

export default PromptGround;
