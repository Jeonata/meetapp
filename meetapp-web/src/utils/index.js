import { format } from 'date-fns';
import pt from 'date-fns/locale/pt';

const dateFormat = date => {
  return format(date, "d 'de' MMMM', às' HH:mm'h'", { locale: pt });
};

export { dateFormat };
