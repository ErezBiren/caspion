import { App } from 'electron';
import logger from 'electron-log';
import fs from 'fs';
import { EOL } from 'os';

declare module 'electron-log' {
  interface ElectronLog {
    getLastLines: (n: number) => string
  }
}

export default function CreateLogger(app: App) {
  logger.info(`Welcome to ${app.getName()} log`);
  logger.info(`Version: ${app.getVersion()}`);

  const onError = (error: Error) => {
    logger.error(error.message ? error.message : error);
    if (error.stack) logger.debug(error.stack);
  };
  logger.catchErrors({ onError });

  logger.getLastLines = (n) => {
    const lines = fs.readFileSync(logger.transports.file.getFile().path).toString().split(EOL);
    const lastLines = lines.slice(lines.length - n);
    return lastLines.join(EOL);
  };

  return logger;
}
