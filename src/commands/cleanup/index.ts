import { category } from '../../utils';
import clean from './clean';
import delete_ from './delete';

export default category(
  {
    name: 'Cleanup',
    description: 'Commands used for cleaning up.',
    emoji: '🧹',
  },
  [delete_, clean]
);
