// jest.config.ts
import type { Config } from "@jest/types";

// Sync object
const config: Config.InitialOptions = {
  verbose: true,
  testPathIgnorePatterns: ["<rootDir>/node_modules/"],
  moduleNameMapper: {
    "^@src/(.*)": "<rootDir>/src/$1",
    "^@ds/(.*)": "<rootDir>/src/ds/$1",
    "^@domain/(.*)": "<rootDir>/src/domain/$1",
    "^@api/(.*)": "<rootDir>/src/api/$1",
    "^@constants/(.*)": "<rootDir>/src/constants/$1",
  },
};

export default config;
