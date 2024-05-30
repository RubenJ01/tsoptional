module.exports = {
    clearMocks: true,
    coverageDirectory: "coverage",
    moduleFileExtensions: ["js", "json", "ts", "tsx", "node"],
    testEnvironment: "jsdom",
    testMatch: ["**/src/**/*.test.ts", "**/src/**/*.spec.ts"],
    testPathIgnorePatterns: ["/node_modules/"],
    testURL: "http://localhost",
    verbose: true,
    transform: {
      "^.+\\.tsx?$": "ts-jest"
    },
  };