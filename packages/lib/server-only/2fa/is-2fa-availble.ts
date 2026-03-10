import type { User } from '@prisma/client';

import { DOCUTRACKER_ENCRYPTION_KEY } from '../../constants/crypto';

type IsTwoFactorAuthenticationEnabledOptions = {
  user: User;
};

export const isTwoFactorAuthenticationEnabled = ({
  user,
}: IsTwoFactorAuthenticationEnabledOptions) => {
  return user.twoFactorEnabled && typeof DOCUTRACKER_ENCRYPTION_KEY === 'string';
};
