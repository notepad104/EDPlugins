# EDPlugins
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/12cf1e007a9943b09071136a9f150f86)](https://www.codacy.com/app/tiagodanin/EDPlugins?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=SynkoDevelopers/EDPlugins&amp;utm_campaign=Badge_Grade) [![Build Status](https://travis-ci.org/SynkoDevelopers/EDPlugins.svg?branch=master)](https://travis-ci.org/SynkoDevelopers/EDPlugins)  [![CodeFactor](https://www.codefactor.io/repository/github/synkodevelopers/edplugins/badge)](https://www.codefactor.io/repository/github/synkodevelopers/edplugins) [![Known Vulnerabilities](https://snyk.io/test/github/SynkoDevelopers/EDPlugins/badge.svg?targetFile=package.json)](https://snyk.io/test/github/SynkoDevelopers/EDPlugins?targetFile=package.json)

Plugins for RobôED in NodeJS.

## Installation

Install with npm and Node9:

```sh
npm install
```

Define environment variables in .env, example:

```
telegram_token=ABCD:1234567890
giphy_token=1234567890
github_token=1234567890
log_chat=1234567890
DEBUG=bot*
username=mybot
webhook=true
webhook_reply=true
host=https://server.com/secret-path
secret_path=/secret-path
port=3000
run_mode=dev
admins=1234567890,0987654321
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
github_token=1234567890
log_chat=1234567890
DEBUG=bot*
username=mybot
webhook=true
webhook_reply=true
host=https://localhost:3000/secret-path
secret_path=/secret-path
port=3000
admins=1234567890,0987654321
run_mode=test
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
- [jformat](https://ghub.io/jformat): Python function str.format for JavaScript
- [json-stringify-safe](https://ghub.io/json-stringify-safe): Like JSON.stringify, but doesn&#39;t blow up on circular refs.
- [similarity](https://ghub.io/similarity): How similar are these two strings?
- [telegraf](https://ghub.io/telegraf): 📡 Modern Telegram bot framework

## Dev Dependencies

- [expect.js](https://ghub.io/expect.js): BDD style assertions for node and the browser.
- [mocha](https://ghub.io/mocha): simple, flexible, fun test framework

## License

MIT by Synko Developers
