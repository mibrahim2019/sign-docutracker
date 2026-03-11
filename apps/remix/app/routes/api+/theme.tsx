import type { ActionFunctionArgs } from 'react-router';

export const action = (_args: ActionFunctionArgs) => {
  return new Response(null, { status: 204 });
};
