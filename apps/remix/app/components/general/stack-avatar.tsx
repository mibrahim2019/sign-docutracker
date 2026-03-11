import { RecipientStatusType } from '@docutracker/lib/client-only/recipient-type';
import { Avatar, AvatarFallback } from '@docutracker/ui/primitives/avatar';

const ZIndexes: { [key: string]: string } = {
  '10': 'z-10',
  '20': 'z-20',
  '30': 'z-30',
  '40': 'z-40',
  '50': 'z-50',
};

export type StackAvatarProps = {
  first?: boolean;
  zIndex?: string;
  fallbackText?: string;
  type: RecipientStatusType;
};

export const StackAvatar = ({ first, zIndex, fallbackText = '', type }: StackAvatarProps) => {
  let classes = '';
  let zIndexClass = '';
  const firstClass = first ? '' : '-ml-3';

  if (zIndex) {
    zIndexClass = ZIndexes[zIndex] ?? '';
  }

  switch (type) {
    case RecipientStatusType.UNSIGNED:
      classes = 'bg-dawn-900/40 text-dawn-400';
      break;
    case RecipientStatusType.OPENED:
      classes = 'bg-yellow-900/40 text-yellow-400';
      break;
    case RecipientStatusType.WAITING:
      classes = 'bg-water/20 text-water';
      break;
    case RecipientStatusType.COMPLETED:
      classes = 'bg-documenso-900/40 text-documenso-400';
      break;
    case RecipientStatusType.REJECTED:
      classes = 'bg-red-900/40 text-red-400';
      break;
    default:
      break;
  }

  return (
    <Avatar
      className={` ${zIndexClass} ${firstClass} h-10 w-10 border-2 border-solid border-border`}
    >
      <AvatarFallback className={classes}>{fallbackText}</AvatarFallback>
    </Avatar>
  );
};
