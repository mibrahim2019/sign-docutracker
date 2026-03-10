import { env } from '../utils/env';

export const DOCUTRACKER_ENCRYPTION_KEY = env('NEXT_PRIVATE_ENCRYPTION_KEY');

export const DOCUTRACKER_ENCRYPTION_SECONDARY_KEY = env('NEXT_PRIVATE_ENCRYPTION_SECONDARY_KEY');

// if (typeof window === 'undefined') {
//   if (!DOCUTRACKER_ENCRYPTION_KEY || !DOCUTRACKER_ENCRYPTION_SECONDARY_KEY) {
//     throw new Error('Missing DOCUTRACKER_ENCRYPTION_KEY or DOCUTRACKER_ENCRYPTION_SECONDARY_KEY keys');
//   }

//   if (DOCUTRACKER_ENCRYPTION_KEY === DOCUTRACKER_ENCRYPTION_SECONDARY_KEY) {
//     throw new Error(
//       'DOCUTRACKER_ENCRYPTION_KEY and DOCUTRACKER_ENCRYPTION_SECONDARY_KEY cannot be equal',
//     );
//   }
// }

// if (DOCUTRACKER_ENCRYPTION_KEY === 'CAFEBABE') {
//   console.warn('*********************************************************************');
//   console.warn('*');
//   console.warn('*');
//   console.warn('Please change the encryption key from the default value of "CAFEBABE"');
//   console.warn('*');
//   console.warn('*');
//   console.warn('*********************************************************************');
// }
