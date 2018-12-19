const OFF = 0, WARN = 1, ERROR = 2;

module.exports = {
    "extends": ["airbnb"],
    "parser": "babel-eslint",
    "parserOptions": {
        "ecmaVersion": 9,
        "sourceType": "module",
        "allowImportExportEverywhere": false,
        "codeFrame": false,
        "ecmaFeatures": {
            globalReturn: true,
            impliedStrict: true,
            jsx: true,
            arrowFunction: true
        }
    },
    "plugins": [
        "react"
    ],
    "env": {
        "es6": true,
        "browser": true
    },
    "rules": {
        "react/jsx-filename-extension": [WARN, {"extensions": [".js", ".jsx"]}],
        "react/prop-types": [ERROR, {ignore: ["children"]}],
        "react/jsx-indent": [OFF],
        "react/no-unused-prop-types": OFF,
        "react/forbid-prop-types": WARN,
        "import/prefer-default-export": "off"
    }
};
