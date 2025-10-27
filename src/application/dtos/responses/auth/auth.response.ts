import { ApiProperty } from '@nestjs/swagger';

export class UserRoleResponse {
  @ApiProperty({
    description: 'Role ID',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  id!: string;

  @ApiProperty({
    description: 'Role name',
    example: 'admin',
  })
  name!: string;
}

export class UserAuthResponse {
  @ApiProperty({
    description: 'User ID',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  id!: string;

  @ApiProperty({
    description: 'User email address',
    example: 'user@example.com',
  })
  email!: string;

  @ApiProperty({
    description: 'User first name',
    example: 'John',
  })
  firstName!: string;

  @ApiProperty({
    description: 'User last name',
    example: 'Doe',
  })
  lastName!: string;

  @ApiProperty({
    description: 'Whether user email is verified',
    example: true,
    required: false,
  })
  emailVerified?: boolean;

  @ApiProperty({
    description: 'User roles',
    type: [UserRoleResponse],
  })
  roles!: UserRoleResponse[];
}

export class AuthTokenResponse {
  @ApiProperty({
    description: 'JWT access token',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
  })
  accessToken!: string;

  @ApiProperty({
    description: 'Refresh token for getting new access tokens',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  refreshToken!: string;

  @ApiProperty({
    description: 'User information',
    type: UserAuthResponse,
  })
  user!: UserAuthResponse;
}

export class OtpRequiredResponse {
  @ApiProperty({
    description: 'Indicates that OTP verification is required',
    example: true,
  })
  requiresOtp!: true;

  @ApiProperty({
    description: 'User ID for OTP verification',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  userId!: string;

  @ApiProperty({
    description: 'Message explaining OTP requirement',
    example: 'Please provide your 2FA code to complete login',
  })
  message!: string;
}

export class EmailVerificationRequiredResponse {
  @ApiProperty({
    description: 'Indicates that email verification is required',
    example: true,
  })
  requiresEmailVerification!: true;

  @ApiProperty({
    description: 'User ID for email verification',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  userId!: string;

  @ApiProperty({
    description: 'Email address that needs verification',
    example: 'user@example.com',
  })
  email!: string;

  @ApiProperty({
    description: 'Message explaining email verification requirement',
    example: 'Please verify your email address to complete registration',
  })
  message!: string;
}

export class RefreshTokenResponse {
  @ApiProperty({
    description: 'New JWT access token',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
  })
  accessToken!: string;

  @ApiProperty({
    description: 'New refresh token',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  refreshToken!: string;

  @ApiProperty({
    description: 'User ID',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  userId!: string;
}
