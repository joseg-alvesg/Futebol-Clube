import { Request, Response, NextFunction } from 'express';

import Token from '../utils/token';

export default function tokenValidation(req: Request, res: Response, next: NextFunction) {
  const token = req.headers.authorization;
  if (!token) return res.status(401).json({ message: 'Token not found' });

  try {
    const decoded = Token.verify(token);
    req.body.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Token must be a valid token' });
  }
}
