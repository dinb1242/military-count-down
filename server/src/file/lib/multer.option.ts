import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import { BadRequestException } from '@nestjs/common';
import { diskStorage } from 'multer';
import { existsSync, mkdirSync } from 'fs';
import { randomUUID } from 'crypto';

export const multerOptions: MulterOptions = {
  // 파일에 대한 유효성을 검증한다.
  fileFilter: (request, file, callback) => {
    if (file.mimetype.match(/\/(jpg|jpeg|png)$/)) {
      callback(null, true);
    } else {
      callback(new BadRequestException('지원하지 않는 파일 형식입니다. currentType=' + file.mimetype), false);
    }
  },

  // 현 프로젝트의 public 디렉토리에 파일을 저장한다.
  // 만일, 해당 경로에 해당하는 디렉토리가 존재하지 않을 경우 새로 생성한다.
  // 파일명은 무작위 UUID + 기존 파일명이다.
  storage: diskStorage({
    destination: (request, file, callback) => {
      const uploadPath = 'public';

      if (!existsSync(uploadPath)) {
        mkdirSync(uploadPath);
      }

      callback(null, uploadPath);
    },
    filename: (req, file, callback) => {
      callback(null, randomUUID() + file.originalname);
    },
  }),
};
//
// export const createdFileUrl = (file): string => {
//   const serverAddr: string = getP
// }
