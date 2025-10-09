export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      APP_PORT: number;
      APP_PREFIX: string;
      APP_NAME: string;
      NODE_ENV:
        | 'dev'
        | 'development'
        | 'stage'
        | 'staging'
        | 'test'
        | 'testing'
        | 'prod'
        | 'production';

      DB_HOST: string;
      DB_PORT: number;
      DB_USERNAME: string;
      DB_PASSWORD: string;
      DB_DATABASE: string;
    }
  }
}
