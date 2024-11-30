export default {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    moduleNameMapper: {
      '^@/(.*)$': '<rootDir>/src/$1',
      '^(\\.{1,2}/.*)\\.js$': '$1',
      '\\.(css|scss)$': 'identity-obj-proxy',
    },
    transform: {
      '^.+\\.tsx?$': [
        'ts-jest',
        {
          useESM: true,
           tsconfig: 'tsconfig.json',
          jsx: 'react-jsx'
        },
      ],
    },
    extensionsToTreatAsEsm: ['.ts', '.tsx'], 
    setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'], 
    moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'],

  };