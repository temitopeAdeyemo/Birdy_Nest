import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';

@Injectable({})
export class AuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log('here.....');

    const authHeader = req.headers.authorization;
    console.log(authHeader);

    if (!authHeader) {
      return res.status(401).json({ message: 'No auth' });
    }

    // const token = authHeader.split(' ')[1];
    // if (!token) {
    //   return res.status(401).send('No token');
    // }

    // jwt.verify(token, 'secret');
    next();
  }
}
