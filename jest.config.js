require('dotenv').config()

module.exports = {
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  testRegex: '\\.spec\\.tsx?$',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  moduleDirectories: ['node_modules'],
  moduleNameMapper: {
    '\\.(css|less|sass|scss|png|svg|jpg|jpeg|webp)$':
      '<rootDir>/.jest/styleMock.js',
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/.jest/tsconfig.json',
    },
  },
}
process.env.TZ = 'Europe/London'
