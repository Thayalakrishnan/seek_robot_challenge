{
  "preset": "ts-jest",
  "testEnvironment": "node",
  "moduleFileExtensions": ["ts", "js", "json", "node"],
  "testMatch": [
    "**/tests/**/*.test.ts",
    "**/src/**/*.test.ts"
  ],
  "transform": {
    "^.+\\.tsx?$": "ts-jest"
  },
  "clearMocks": true,
  "collectCoverageFrom": [
    "src/**/*.ts",
    "!sr"
  ],
  "globals": {
    "ts-jest": {
      "diagnostics": {
        "ignoreCodes": [
          151002
        ]
      }
    }
  }
}
