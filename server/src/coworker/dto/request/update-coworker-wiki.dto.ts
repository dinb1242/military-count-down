import { PartialType } from '@nestjs/swagger';
import { CreateCoworkerWikiDto } from './create-coworker-wiki.dto';

export class UpdateCoworkerWikiDto extends PartialType(CreateCoworkerWikiDto) {}
