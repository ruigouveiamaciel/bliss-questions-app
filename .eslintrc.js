module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    "plugin:promise/recommended",
    "plugin:react/recommended",
    "google",
    "prettier",
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: [
    "promise",
    "import",
    "react",
    "react-hooks",
    "prettier",
    "jsx-a11y",
  ],
  rules: {
    "prettier/prettier": "error",
    "react/react-in-jsx-scope": "off",
    "require-jsdoc": "off",
    "promise/catch-or-return": "off",
  },
  settings: {
    react: {
      version: "detect",
    },
  },
};
