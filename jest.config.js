const path = require('path');

module.exports = {
  rootDir: path.resolve(__dirname),
  projects: ['packages/*'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
};
