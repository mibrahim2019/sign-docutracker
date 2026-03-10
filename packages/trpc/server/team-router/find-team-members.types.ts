import { z } from 'zod';

import { ZFindResultResponse, ZFindSearchParamsSchema } from '@docutracker/lib/types/search-params';
import { OrganisationMemberRole, TeamMemberRole } from '@docutracker/prisma/generated/types';
import OrganisationMemberSchema from '@docutracker/prisma/generated/zod/modelSchema/OrganisationMemberSchema';

export const ZFindTeamMembersRequestSchema = ZFindSearchParamsSchema.extend({
  teamId: z.number(),
});

export const ZFindTeamMembersResponseSchema = ZFindResultResponse.extend({
  data: OrganisationMemberSchema.pick({
    id: true,
    createdAt: true,
    userId: true,
  })
    .extend({
      teamRole: z.nativeEnum(TeamMemberRole),
      organisationRole: z.nativeEnum(OrganisationMemberRole),
      email: z.string(),
      name: z.string().nullable(),
      avatarImageId: z.string().nullable(),
    })
    .array(),
});

export type TFindTeamMembersResponse = z.infer<typeof ZFindTeamMembersResponseSchema>;
