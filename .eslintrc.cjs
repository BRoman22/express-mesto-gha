module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
  },
  extends: "airbnb-base",
  overrides: [
    {
      env: {
        node: true,
      },
      files: [".eslintrc.{js,cjs}"],
      parserOptions: {
        sourceType: "script",
      },
    },
  ],
  parserOptions: {
    ecmaVersion: "latest",
  },
  rules: {
    semi: ["error", "always"],
    quotes: ["error", "double"],
    "no-console": "off",
    "no-underscore-dangle": ["error", { allow: ["_id"] }],
    "import/extensions": "off",
    "import/prefer-default-export": "off",
    "trailing-comma": false,
  },
};
