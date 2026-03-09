import { redirect } from 'react-router';

export const loader = () => {
  throw redirect('/signin');
};

export default function UnverifiedAccount() {
  return null;
}
