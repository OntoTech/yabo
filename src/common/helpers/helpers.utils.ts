import { format } from 'date-fns-tz';

export const HelperUtils = {
  isDev(): boolean {
    return process.env.NODE_ENV.startsWith('dev');
  },
  isProd(): boolean {
    return process.env.NODE_ENV.startsWith('prod');
  },
  getTimeInUtc(date: Date | string): Date {
    const newDate = date instanceof Date ? date : new Date(date);

    return new Date(format(newDate, 'yyyy-MM-dd HH:mm:ss.SSS'));
  },
  parseBase64ToJson(base64: string) {
    return JSON.parse(Buffer.from(base64, 'base64').toString());
  },
  arraysIntersect<T extends string | number | symbol>(a: T[], b: T[]) {
    const setA = new Set(a);
    const setB = new Set(b);
    return [...setA].some((value) => setB.has(value));
  },
};
