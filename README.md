# Instructions for the Weather App

## Set-Up Guide
- [Installation](#installation)
- [Development Workflow](#development-workflow)
- [Extra Info](#extra-info)

**0. Before doing any of this, if you're using your own laptop/desktop, make sure you've got the latest versions of node and npm installed (npm v: 9.6.2 & node v: 18.0.0) :**

```sh
node -v
npm -v
```

## Installation
**1. Install the dependencies :**

Before the app can be run you will need to install the react icon library. This can be done using:

```sh
npm install react-icons
```

**2. Download the file into your working directory :**

## Development Workflow

**1. Generate a production build in `./build` :**

```sh
npm run build
```

**2. Start local production server with [serve](https://github.com/zeit/serve):**

```sh
npm start
```

> This simply serves up the contents of `./build`. Bear in mind, if you use this, the localhost port your server is running on will refresh, and you'll also need to restart it to see any changes you've made to the code in `src`.
