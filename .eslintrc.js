module.exports = {
  "extends": "eslint:recommended",
  "env": {
    "browser": true,
    "node": true,
    "commonjs": true,
    "es6": true,
    "jquery": true
  },
  "plugins": [
    "import",
    "html"
  ],
  "settings": {
    "html/html-extensions": [".vue"],
  },
  "parserOptions": {
    "sourceType": "module"
  },
  "rules": {
    "indent": [
      "error",
      2
    ],
    "quotes": [
      "error",
      "single"
    ],
    "semi": [
      "error",
      "always"
    ]
  }
};
