// --- jest.config.js ---
export default {
  testEnvironment: "node",
  setupFiles: ["<rootDir>/jest.setup.js"],
  moduleFileExtensions: ["js", "json"],
  transform: {
    "^.+\\.js$": "babel-jest", // <-- transform tous les fichiers .js avec babel-jest
  },
  moduleNameMapper: {
    "^(\\.{1,2}/.*)\\.js$": "$1",
  },
};
