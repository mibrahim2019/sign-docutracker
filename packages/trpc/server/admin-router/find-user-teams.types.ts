import { z } from 'zod';

import { ZFindResultResponse, ZFindSearchParamsSchema } from '@docutracker/lib/types/search-params';
import { TeamMemberRoleSchema } from '@docutracker/prisma/generated/zod/inputTypeSchemas/TeamMemberRoleSchema';
import OrganisationSchema from '@docutracker/prisma/generated/zod/modelSchema/OrganisationSchema';
import TeamSchema from '@docutracker/prisma/generated/zod/modelSchema/TeamSchema';

export const ZFindUserTeamsRequestSchema = ZFindSearchParamsSchema.extend({
  userId: z.number(),
});

export const ZFindUserTeamsResponseSchema = ZFindResultResponse.extend({
  data: TeamSchema.pick({
    id: true,
    name: true,
    url: true,
    createdAt: true,
  })
    .extend({
      teamRole: TeamMemberRoleSchema,
      organisation: OrganisationSchema.pick({
        id: true,
        name: true,
        url: true,
      }),
    })
    .array(),
});

export type TFindUserTeamsRequest = z.infer<typeof ZFindUserTeamsRequestSchema>;
export type TFindUserTeamsResponse = z.infer<typeof ZFindUserTeamsResponseSchema>;
