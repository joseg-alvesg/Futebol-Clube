import { Secret, sign, SignOptions, verify, JwtPayload } from 'jsonwebtoken';

export default class Token {
  private static secret: Secret = process.env.JWT_SECRET || 'secret';

  private static signOptions: SignOptions = {
    expiresIn: '7d',
    algorithm: 'HS256',
  };

  static sign(payload: JwtPayload): string {
    return sign(payload, this.secret, this.signOptions);
  }

  static verify(token: string): JwtPayload | string {
    try {
      return verify(token, this.secret);
    } catch (error) {
      throw new Error('Token must be a valid token');
    }
  }
}
