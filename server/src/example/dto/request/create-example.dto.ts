import { Example } from '../../entities/example.entity';

export class CreateExampleDto {
  private title: string;
  private content: string;

  toEntity() {
    return new Example(this.title, this.content);
  }
}
