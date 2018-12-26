module.exports = {
  rootDir: ".",
  transform: {
    "^.+\\.tsx?$": "ts-jest"
  },
  testMatch: ["<rootDir>/src/**/?(*.)+(spec|test).ts?(x)"],
  collectCoverageFrom: [
    "<rootDir>/src/**/*.ts",
    "!<rootDir>/src/**/*.d.ts",
    "!<rootDir>/src/**/*.spec.ts",
    "!<rootDir>/src/**/*.test.ts",
    "!<rootDir>/src/**/__*__/*"
  ],
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json"],
  testEnvironment: "node",
  cacheDirectory: "<rootDir>/.cache/unit"
};
