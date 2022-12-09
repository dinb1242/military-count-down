import { PartialType } from '@nestjs/swagger';
import { CreateWikiDto } from './create-wiki.dto';

export class UpdateWikiDto extends PartialType(CreateWikiDto) {}
