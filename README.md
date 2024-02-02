# PromptGround SDK

A simple Node.js SDK for interacting with the PromptGround API.

## Installation

Install the SDK using npm:

```bash
npm install promptground
```

## Usage

Here's how you can use the SDK in your Node.js application:

```javascript
import PromptGround from 'promptground';

const pg = new PromptGround("your_api_key_id", "your_api_secret");

async function getPrompt() {
    try {
        const prompt = await pg.prompt('welcome-user', { name: 'PromptGround' });
        console.log(prompt); // Outputs "Welcome to PromptGround"
    } catch (error) {
        console.error(error);
    }
}

getPrompt();
```