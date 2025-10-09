import { getPackageJson } from 'helper-fns';

export const APP_ENVIRONMENTS = ['dev', 'test', 'stage', 'production'];
export const APP_LOGLEVELS = ['debug', 'info', 'warn', 'error'];

const packageJson = getPackageJson(process.cwd());

export const APP_NAME = packageJson.name;
export const SWAGGER_API_CURRENT_VERSION = packageJson.version;
export const SWAGGER_DESCRIPTION = packageJson.description!;
export const SWAGGER_TITLE = `${APP_NAME.toUpperCase()} API Documentation`;

export const SWAGGER_API_ENDPOINT = '/doc';
