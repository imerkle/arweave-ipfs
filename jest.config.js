module.exports = {
    "roots": [
        "<rootDir>",
    ],
    "transform": {
        "^.+\\.tsx?$": "ts-jest",
    },
    "testRegex": "(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$",
    "moduleFileExtensions": [
        "ts",
        "tsx",
        "js",
        "jsx",
        "json",
        "node"
    ],
    "moduleDirectories": [
        "node_modules",
        "src"
    ],
    "collectCoverage": true,
    "coverageReporters": ["lcov"],
    "transformIgnorePatterns": ["<rootDir>/node_modules/"],
}