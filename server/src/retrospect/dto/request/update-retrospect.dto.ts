import { PartialType } from '@nestjs/swagger';
import { CreateRetrospectDto } from './create-retrospect.dto';

export class UpdateRetrospectDto extends PartialType(CreateRetrospectDto) {}
