
# PromptGround SDK

A simple JavaScript SDK for interacting with the PromptGround API.

## Installation

Install the SDK using npm:

```bash
npm install promptground
```

## Usage

### Running a Prompt

To run a prompt and get the result, use the `run` method:

```javascript
import PromptGround from 'promptground';

// Initialize the PromptGround object
const pg = new PromptGround(apiKey="YOUR API KEY");

// Run a prompt
pg.run('Typo-grammar fixer', {
        text: 'this text explaining promptground but is not grammatically correct' 
}).then(result => {
    console.log(result.content);  // Outputs the corrected text
    console.log(result.usage);    // Outputs the usage details
}).catch(error => {
    console.error('Error running prompt:', error);
});
```

### Understanding the Response Object

The `run` method returns a `PromptRunResult` object with the following attributes:

- `content` (string): The actual output of the prompt.
- `usage` (object): The usage details which include:
  - `completion_tokens` (number): The number of tokens in the output.
  - `prompt_tokens` (number): The number of tokens in the input.
  - `total_tokens` (number): The total number of tokens (input + output).


### Fetching Messages

If you want to fetch only the messages and run the prompt on your side, you can use the `messages` method:

```javascript
pg.messages('Typo-grammar fixer', {
    text: 'this text explaining promptground but is not grammatically correct' 
}).then(messages => {
    console.log(messages);  // Outputs a list of messages
}).catch(error => {
    console.error('Error fetching messages:', error);
});
```

## Methods

### `messages(alias, data={}, version=null)`

Fetch messages from the PromptGround API.

**Parameters:**
- `alias` (string): The prompt alias as seen on your dashboard.
- `data` (object, optional): A flat object with key=value pairs used to substitute variables in the messages.
- `version` (string, optional): The specific prompt version ID to call. If not provided, the most recent prompt version will be used.

**Returns:**
- `array`: A list of messages. Each message is an object with `content` and `role`. For example, `[{content: "message content", role: "system"}]`. The `role` can be `system`, `user`, or `assistant`.

### `run(alias, data={}, metadata={}, labels=[], model=null, version=null, response_format=null)`

Run a prompt and return the result.

**Parameters:**
- `alias` (string): The prompt alias as seen on your dashboard.
- `data` (object, optional): A flat object with key=value pairs used to substitute variables in the messages.
- `metadata` (object, optional): Additional data to help you filter in the "Runs" dashboard. It should be a flat key-value object.
- `labels` (array, optional): An array for distinguishing different prompts and filtering them afterward in the "Runs" dashboard.
- `model` (string, optional): The model to use for the prompt. If not provided, the default model will be used.
- `version` (string, optional): The specific prompt version ID to call. If not provided, the most recent prompt version will be used.
- `response_format` (string, optional): The response format for the prompt (e.g. `json_object`).

**Returns:**
- `PromptRunResult`: The result of running the prompt.

## Handling Results

The result of the `run` method is a `PromptRunResult` object with the following attributes:
- `content` (string): The actual output.
- `usage` (object): The token usage details, which include:
  - `completion_tokens` (number): The number of tokens in the output.
  - `prompt_tokens` (number): The number of tokens in the input.
  - `total_tokens` (number): The total number of tokens (input + output).

## Exception Handling

Both `messages` and `run` methods will throw an `Error` if there is an issue with the API request. Be sure to handle these exceptions appropriately in your application.

## Contributions

If something is missing or you have any suggestions, please create an issue or open a pull request. For any questions or support, feel free to contact us.
