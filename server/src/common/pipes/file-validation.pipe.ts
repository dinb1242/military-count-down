import { ArgumentMetadata, PipeTransform } from '@nestjs/common';

export class FileValidationPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata): any {
    console.log(value);
    return true;
  }
}
