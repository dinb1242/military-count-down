import { Controller } from '@nestjs/common';
import { RetrospectService } from './retrospect.service';

@Controller('retrospect')
export class RetrospectController {
  constructor(private readonly retrospectService: RetrospectService) {}
}
