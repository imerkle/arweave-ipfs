module.exports = {
    "roots": [
        "<rootDir>",
    ],
    "transform": {
        "^.+\\.tsx?$": "ts-jest"
    },
    "testRegex": "(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$",
    "moduleFileExtensions": [
        "ts",
        "js"
    ],
    "moduleDirectories": [
        "node_modules",
        "src"
    ],
    "collectCoverage": true,
    "coverageReporters": ["lcov"]
}