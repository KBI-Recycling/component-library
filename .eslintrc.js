// eslint react rules: https://www.npmjs.com/package/eslint-plugin-react

module.exports = {
  extends: ['eslint:recommended', 'plugin:react/recommended', 'react-app', 'google'
  ],
  "rules": {
    "arrow-parens": 0,
    "indent": [
      "error",
      2,
      {
        "MemberExpression": 1
      }
    ],
    "linebreak-style": 0,
    "max-len": [
      "error",
      {
        "code": 160
      }
    ],
    "react/prop-types": [
      2
    ],
    "react/jsx-tag-spacing": [
      2
    ],
    "require-jsdoc": 0,
    "no-invalid-this": 0,
    "react/display-name": 0
  }
};