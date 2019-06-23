import { AuthGuard as Passport } from '@nestjs/passport'
export const AuthGuard = Passport('Bearer');