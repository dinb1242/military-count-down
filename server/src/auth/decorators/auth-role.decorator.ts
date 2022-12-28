import { SetMetadata } from '@nestjs/common';

export const REQUIRED_ADMIN = 'isAdmin';
export const RequiredAdmin = () => SetMetadata(REQUIRED_ADMIN, true);
