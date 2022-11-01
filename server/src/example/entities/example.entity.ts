import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('tb_example')
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
}
