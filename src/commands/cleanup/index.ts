import { category } from '../../utils';
import deleteCmd from './delete';

export default category(
  {
    name: 'Cleanup',
    description: 'Commands used for cleaning up.',
    emoji: '🧹',
  },
  [deleteCmd]
);
