import type { Config as ConfigInterface } from '@lib/config/config.interface';
import { User as UserEntity } from '@entities';
import { Request, Response, NextFunction } from 'express';

export {};

declare global {
  namespace Express {
    export interface Request {
      realIp?: string;
      idx?: string;
      ip: string;
    }

    // interface User extends UserEntity {}
    interface User extends UserInfoHeader {}
  }

  export type Configs = ConfigInterface;

  export type NestifyRequest = Request;
  export type NestifyResponse = Response;
  export type NestifyNextFunction = NextFunction;
}
