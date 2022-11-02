import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('tb_example')
export class Example {
  constructor(title?: string, content?: string) {
    this.title = title;
    this.content = content;
  }

  @PrimaryGeneratedColumn()
  readonly id: number;

  @Column({ nullable: true })
  readonly title: string;

  @Column({ nullable: true })
  readonly content: string;
}
