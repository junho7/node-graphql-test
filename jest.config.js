module.exports = {
  testEnvironment: "node",
  globals: {
    "ts-jest": {
      useESM: true,
    },
  },
  transform: {
    "^.+\\.jsx?$": "babel-jest", 
  },
  moduleNameMapper: {
    "^(\\.{1,2}/.*)\\.js$": "$1",
  },
};
