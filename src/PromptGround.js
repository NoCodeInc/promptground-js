// Importing the crypto module for creating HMAC signatures
import crypto from "crypto";

class PromptGround {
  constructor(apiKey, apiSecret, baseUrl = "https://api.promptground.io/v1") {
    this.apiKey = apiKey;
    this.apiSecret = apiSecret;
    this.baseUrl = baseUrl;
    this.accessToken = null;
    this.obtainingAccessToken = false; // Flag to prevent multiple simultaneous token requests
  }

  createSignature(key, secretKey, timestamp) {
    const data = `${key}#${secretKey}#${timestamp}`;
    return crypto.createHmac("sha256", secretKey).update(data).digest("hex");
  }

  async obtainAccessToken() {
    if (this.accessToken) return;
    if (this.obtainingAccessToken) return;
    this.obtainingAccessToken = true;

    const timestamp = Math.floor(Date.now() / 1000);
    const signature = this.createSignature(
      this.apiKey,
      this.apiSecret,
      timestamp
    );
    const url = `${this.baseUrl}/token`;
    const payload = { key: this.apiKey, signature, timestamp };

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      if (response.ok && data.success) {
        this.accessToken = data.data.token;
      } else {
        throw new Error(data.message || "Error obtaining access token");
      }
    } catch (error) {
      console.error("AccessTokenError:", error.message);
      throw error;
    } finally {
      this.obtainingAccessToken = false;
    }
  }

  async prompt(alias, data = {}, defaultResponse = null) {
    if (!this.accessToken) {
      await this.obtainAccessToken();
    }

    const url = `${this.baseUrl}/prompt`;
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${this.accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ alias, data }),
      });
      const result = await response.json();
      if (response.ok && result.success) {
        return result.data.prompt;
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
