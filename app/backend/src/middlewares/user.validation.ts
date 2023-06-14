import { Request, Response, NextFunction } from 'express';

export default function validateLogin(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'All fields must be filled' });
  }

  const regex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
  if (!regex.test(email) || password.length <= 5) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }

  next();
}
