import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('tb_test_example')
export class Example {
  @PrimaryGeneratedColumn()
  private id: number;

  @Column()
  private title: string;

  @Column()
  private content: string;

  static from(title: string, content: string): Example {
    const example: Example = new Example();
    example.title = title;
    example.content = content;
    return example;
  }
}
