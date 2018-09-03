# EDPlugins [![Build Status](https://travis-ci.org/SynkoDevelopers/EDPlugins.svg?branch=master)](https://travis-ci.org/SynkoDevelopers/EDPlugins)

Plugins for RobôED in NodeJS.

## Installation

Install with npm and Node9:
```sh
npm install
```

and define environment variables in .env, example:

```
telegram_token=ABCD:1234567890
giphy_token=1234567890
DEBUG=bot*
webhook=true
webhook_reply=true
host=https://server.com/secret-path
secret_path=/secret-path
port=3000
test=false
```

Run the bot with the command:

```bash
npm run start
```

## Test & Development

Define environment variables in test/.env, example:

```
telegram_token=1234567890
giphy_token=1234567890
DEBUG=bot*
webhook=true
webhook_reply=true
host=https://localhost:3000/secret-path
secret_path=/secret-path
port=3000
test=true
```

Run test with the command:

```bash
npm run test
```

## Dependencies

- [9gag](https://ghub.io/9gag): Download 9GAG posts and comments
- [axios](https://ghub.io/axios): Promise based HTTP client for the browser and node.js
- [bytelabel](https://ghub.io/bytelabel): convert byte lengths into a nice formatted string
- [debug](https://ghub.io/debug): small debugging utility
- [env-cmd](https://ghub.io/env-cmd): Executes a command using the envs in the provided env file
- [gsearch](https://ghub.io/gsearch): Google autocomplete suggestions
- [jformat](https://ghub.io/jformat): Python function str.format for JavaScript
- [request](https://ghub.io/request): Simplified HTTP request client.
- [request-promise-native](https://ghub.io/request-promise-native): The simplified HTTP request client &#39;request&#39; with Promise support. Powered by native ES6 promises.
- [telegraf](https://ghub.io/telegraf): 📡 Modern Telegram bot framework

## Dev Dependencies

- [expect.js](https://ghub.io/expect.js): BDD style assertions for node and the browser.
- [mocha](https://ghub.io/mocha): simple, flexible, fun test framework

## License

MIT by Synko Developers
