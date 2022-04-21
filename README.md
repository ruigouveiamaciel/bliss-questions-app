# Introduction

A polls application develop as part of the recruitment process for Bliss Applications.

### Table of Contents

- [Setting up the development enviroment](#setting-up-the-development-enviroment)
- [Building the project](#building-the-project)
- [Dependencies Used](#dependencies-used)

## Setting up the development enviroment

1. Install [Node.js](https://nodejs.org/en/) 14 or higher.

2. Install [yarn](https://classic.yarnpkg.com/lang/en/docs/install/#debian-stable).

3. Download the repository and change into its directory:
```
git clone https://github.com/ruigouveiamaciel/bliss-questions-app.git
cd bliss-questions-app
```

4. Checkout the development branch (or any other branch you want to work on).
```
git checkout develop
```

5. Install dependencies
```
yarn
```

6. Done! You can start editing and committing file now, your development enviroment is setup! To start the development server run the following command:
```
yarn start
```

## Building the project

1. Install [Node.js](https://nodejs.org/en/) 14 or higher.

2. Install [yarn](https://classic.yarnpkg.com/lang/en/docs/install/#debian-stable).

3. Download the repository and change into its directory:
```
git clone https://github.com/ruigouveiamaciel/bliss-questions-app.git
cd bliss-questions-app
```

4. Checkout the main branch (or any other branch you want to work on).
```
git checkout main
```

5. Install dependencies
```
yarn
```

6. Build the project with the following command:
```
yarn build
```

7. Done! Your project has been built into the `build/` directory and it's ready to be served. As an example, you can host the built project with the following commands:
```
cd build
npx serve
```

## Dependencies Used

- [Font Awesome Icons](https://fontawesome.com/)
- [Axios](https://axios-http.com/)
- [React](https://reactjs.org/)
- [ESLint](https://eslint.org/)
- [Prettier](https://prettier.io/)
