# [![Firefox Send](./assets/icon.svg)](https://send.rooday.com/) ROODAY Send

**Docs:** [FAQ](docs/faq.md), [Encryption](docs/encryption.md), [Build](docs/build.md), [Docker](docs/docker.md), [Metrics](docs/metrics.md), [More](docs/)

---

## Table of Contents

* [What it does](#what-it-does)
* [Requirements](#requirements)
* [Development](#development)
* [Commands](#commands)
* [Configuration](#configuration)
* [Deployment](#deployment)
* [Android](#android)
* [License](#license)

---

## What it does

A file sharing experiment which allows you to send encrypted files to other users. This is a fork of the original Firefox Send that supports using Azure as a storage engine, as well as only accepts uploads from whitelisted users.

---

## Requirements

- [Node.js 12.x](https://nodejs.org/)
- [Redis server](https://redis.io/) (optional for development)
- [AWS S3](https://aws.amazon.com/s3/) or compatible service (optional)

---

## Development

To start an ephemeral development server, run:

```sh
npm install
npm start
```

Then, browse to http://localhost:8080

---

## Commands

| Command          | Description |
|------------------|-------------|
| `npm run format` | Formats the frontend and server code using **prettier**.
| `npm run lint`   | Lints the CSS and JavaScript code.
| `npm test`       | Runs the suite of mocha tests.
| `npm start`      | Runs the server in development configuration.
| `npm run build`  | Builds the production assets.
| `npm run prod`   | Runs the server in production configuration.

---

## Configuration

The server is configured with environment variables. See [server/config.js](server/config.js) for all options and [docs/docker.md](docs/docker.md) for examples.

---

## Deployment

see also [docs/deployment.md](docs/deployment.md)

---

## Android

The android implementation is contained in the `android` directory, and can be viewed locally for easy testing and editing by running `ANDROID=1 npm start` and then visiting <http://localhost:8080>. CSS and image files are located in the `android/app/src/main/assets` directory.

---

## License

[Mozilla Public License Version 2.0](LICENSE)

---
