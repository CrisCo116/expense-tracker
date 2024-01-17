module.exports = {
    // The transform option tells Jest 
    // to use babel-jest for any .js or .jsx files.
    transform: {
        "^.+\\.(js|jsx)$": "babel-jest"
    },
    // The testMatch config helps Jest locate your test files.
    testMatch: [
        "**/tests/**/*.test.(js|jsx|ts|tsx)",
        "**/?(*.)(spec|test).(js|jsx|ts|tsx)"
    ],
    transformIgnorePatterns: [
        "<rootDir>/node_modules/"
    ],
    babel: {
        "presets": ["@babel/preset-react"]
    }
}
