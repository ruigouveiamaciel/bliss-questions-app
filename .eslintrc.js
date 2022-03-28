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
  },
  settings: {
    react: {
      version: "detect",
    },
  },
};
