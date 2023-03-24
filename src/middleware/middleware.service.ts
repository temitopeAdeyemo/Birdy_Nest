import { Inject, Injectable, NestMiddleware, Scope } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
// import { Request } from 'express';
import { REQUEST } from '@nestjs/core';

@Injectable({ scope: Scope.REQUEST })
export class AuthMiddleware implements NestMiddleware {
  constructor(
    private jwtService: JwtService,
    private config: ConfigService,
    @Inject(REQUEST) private readonly request: Request,
  ) {}
  use(req: Request, res: Response, next: NextFunction) {
    console.log('here.....');

    const authHeader = req.headers.authorization;
    console.log(authHeader);

    if (!authHeader) {
      return res.status(401).json({ message: 'No auth' });
    }

    const token = authHeader.split(' ')[1];

    if (!token) {
      return res.status(401).json({ message: 'No Token' });
    }

    try {
      const dec = this.jwtService.verify(token, {
        secret: this.config.get('JWT_SECRET'),
      });
      console.log(dec);

      // this.request.user = dec;
      next();
    } catch (error) {
      return res.status(401).json({ message: error.message });
    }
  }
}
