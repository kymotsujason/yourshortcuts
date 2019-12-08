# Your Shortcuts

This is a personal project I created to use at my work for the purpose of improving response times through pre-recorded responses using inbrowser techniques in the form of a Chrome extension. Your Shortcuts is a Chrome extension meant to provide a shortcut key in a text input field that displays a list of key (shortcut) terms used to identify what response should be pasted.

# Purpose

While my work does have a pre-existing solution for pre-recorded responses, this solution is extremely cluttered due to the responses being available globally (Canada and US have different responses, but we'll see each others recorded responses) and not having the access to add my own responses. There's no convenient search bar either, meaning the scrollbar would just keep getting smaller. Not to mention, why not use an in-text shortcut key? Thus, here's my solution.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to use the extension.

Important note: The extension has been set to open only on google.com. The reason is because it was developed for an internal website that isn't really accessible to the public. Thus, Google.

### Prerequisites

What things you need to install the software and how to install them

```
Chrome      - Download and install from the official Chrome website
Node.js 10+ - Download and install from the official Node.js website
npm         - Comes bundled with Node.js
```

### Installing

A step by step series of examples that tell you how to get a development env running

1. Clone/download the entire repository

```
git clone https://github.com/kymotsujason/yourshortcuts.git
```

2. Navigate to the root directory and install the npm packages

```
cd yourshortcuts & npm install
```

3. Start the project using npm

```
npm run start
```

Note: You may need to remove the Chrome code to get past any errors. I had originally used both Chrome and a database to get around this issue.

## Tests

Due to the small scale of this project and niche target audience (ie. me), tests are unnecessary

## Deployment

To utilize this extension, here are the steps on adding the extension to Chrome.

1. If you've made any changes, make sure to re-build the extension

```
npm run build
```

2. Open Chrome to the extensions page and enable dev mode at the top right

```
chrome://extensions
```

3. Click "Load Unpacked" and select the build folder

## Built With

* [Node.js](https://nodejs.org/) - JavaScript runtime engine to run the project
* [npm](https://www.npmjs.com/) - Package manager for extended functionality, bundled with Node.js
* [React](https://reactjs.org/) - Web framework used for GUI

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests to us.

## Versioning

We use [SemVer](http://semver.org/) for versioning.

## Authors

* **Jason Yue** - *Initial work* - [kymotsujason](https://github.com/kymotsujason)

See also the list of [contributors](https://github.com/kymotsujason/yourshortcuts/graphs/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details