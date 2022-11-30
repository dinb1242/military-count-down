import { PartialType } from '@nestjs/swagger';
import { CreateAccidentWikiDto } from './create-accident-wiki.dto';

export class UpdateAccidentWikiDto extends PartialType(CreateAccidentWikiDto) {}
