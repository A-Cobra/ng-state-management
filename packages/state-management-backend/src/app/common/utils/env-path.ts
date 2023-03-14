import { existsSync } from 'fs';
import { resolve } from 'path';

export function getEnvPath(envFolderPath: string ): string {
  // what environment should the app use?
  const env: string | undefined = process.env.NODE_ENV;
  const envFilename = env ? `.env.${env}` : '.env.development';
  // by default use .env if no environment is provided
  let filePath = resolve(`${envFolderPath}/${envFilename}`);

  const configFileExists = existsSync(filePath);

  if (!configFileExists) {
    filePath = resolve(`${envFolderPath}/.env`);
  }
  return filePath;
}

