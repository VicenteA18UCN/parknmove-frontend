module.exports = {
  testEnvironment: "jsdom",
  testTimeout: 10000, // Tiempo de espera en milisegundos
  transformIgnorePatterns: ["/node_modules/(?!axios).+\\.js$"],
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
  },
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.js"],
};
