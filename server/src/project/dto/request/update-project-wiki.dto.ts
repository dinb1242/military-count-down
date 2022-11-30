import { PartialType } from '@nestjs/swagger';
import { CreateProjectWikiDto } from './create-project-wiki.dto';

export class updateProjectWikiDto extends PartialType(CreateProjectWikiDto) {}
