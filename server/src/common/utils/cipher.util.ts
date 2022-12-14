import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import * as CryptoJS from 'crypto-js';

const encKey = process.env.ENC_KEY;

@Injectable()
export class CipherUtils {
  public static async hash(plainText: string): Promise<string> {
    const saltRounds = 10;
    return await bcrypt.hash(plainText, saltRounds);
  }

  public static async hashMatches(plainText: string, hashedText: string): Promise<boolean> {
    return await bcrypt.compare(plainText, hashedText);
  }

  public static async encodeByAES56(data: string): Promise<string> {
    const cipher = CryptoJS.AES.encrypt(data, CryptoJS.enc.Utf8.parse(encKey), {
      iv: CryptoJS.enc.Utf8.parse(''),
      padding: CryptoJS.pad.Pkcs7,
      mode: CryptoJS.mode.CBC,
    });
    return cipher.toString();
  }

  public static async decodeByAES256(data: string): Promise<string> {
    const cipher = CryptoJS.AES.decrypt(data, CryptoJS.enc.Utf8.parse(encKey), {
      iv: CryptoJS.enc.Utf8.parse(''),
      padding: CryptoJS.pad.Pkcs7,
      mode: CryptoJS.mode.CBC,
    });
    return cipher.toString(CryptoJS.enc.Utf8);
  }
}
