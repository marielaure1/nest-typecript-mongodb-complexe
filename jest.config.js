module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    moduleNameMapper: {
      '^@modules/(.*)$': '<rootDir>/src/modules/$1',
      '^@controllers/(.*)$': '<rootDir>/src/controllers/$1',
      '^@services/(.*)$': '<rootDir>/src/services/$1',
      '^@config/(.*)$': '<rootDir>/src/config/$1',
      '^@jobs/(.*)$': '<rootDir>/src/jobs/$1',
      '^@constants/(.*)$': '<rootDir>/src/common/constants/$1',
      '^@decorators/(.*)$': '<rootDir>/src/common/decorators/$1',
      '^@dtos/(.*)$': '<rootDir>/src/common/dtos/$1',
      '^@enums/(.*)$': '<rootDir>/src/common/enums/$1',
      '^@exceptions/(.*)$': '<rootDir>/src/common/exceptions/$1',
      '^@guards/(.*)$': '<rootDir>/src/common/guards/$1',
      '^@helpers/(.*)$': '<rootDir>/src/common/helpers/$1',
      '^@interceptors/(.*)$': '<rootDir>/src/common/interceptors/$1',
      '^@interfaces/(.*)$': '<rootDir>/src/common/interfaces/$1',
      '^@middlewares/(.*)$': '<rootDir>/src/common/middleware/$1',
      '^@pipes/(.*)$': '<rootDir>/src/common/pipes/$1',
      '^@serializers/(.*)$': '<rootDir>/src/common/serializers/$1',
      '^@entities/(.*)$': '<rootDir>/src/common/entities/$1',
    },
  };
  