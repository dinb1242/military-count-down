import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('tb_test_example')
export class Example {
  constructor(title?: string, content?: string) {
    this.title = title;
    this.content = content;
  }

  @PrimaryGeneratedColumn()
  private id: number;

  @Column({ nullable: true })
  private title: string;

  @Column({ nullable: true })
  private content: string;

  // static from(title: string, content: string): Example {
  //   const example: Example = new Example();
  //   example.title = title;
  //   example.content = content;
  //   return example;
  // }
}
