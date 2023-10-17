import { Event } from '../../types';
import commands from './commands';
import confirmation from './confirmation';
import help from './help';
import pagination from './pagination';

const events: Event<any>[] = [commands, help, pagination, confirmation];

export default events;
