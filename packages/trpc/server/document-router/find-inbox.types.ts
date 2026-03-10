// import type { OpenApiMeta } from 'trpc-to-openapi';
import type { z } from 'zod';

import { ZDocumentManySchema } from '@docutracker/lib/types/document';
import { ZFindResultResponse, ZFindSearchParamsSchema } from '@docutracker/lib/types/search-params';

export const ZFindInboxRequestSchema = ZFindSearchParamsSchema;

export const ZFindInboxResponseSchema = ZFindResultResponse.extend({
  data: ZDocumentManySchema.array(),
});

export type TFindInboxResponse = z.infer<typeof ZFindInboxResponseSchema>;
