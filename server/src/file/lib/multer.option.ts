import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import { BadRequestException } from '@nestjs/common';

export const multerOptions: MulterOptions = {
  // 파일에 대한 유효성을 검증한다.
  fileFilter: (request, file, callback) => {
    if (file.mimetype.match(/\/(jpg|jpeg|png)$/)) {
      callback(null, true);
    } else {
      callback(new BadRequestException('지원하지 않는 파일 형식입니다. currentType=' + file.mimetype), false);
    }
  }
};