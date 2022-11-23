import { PartialType } from '@nestjs/swagger';
import { CreateCoworkerDto } from './create-coworker.dto';

export class UpdateCoworkerDto extends PartialType(CreateCoworkerDto) {}
