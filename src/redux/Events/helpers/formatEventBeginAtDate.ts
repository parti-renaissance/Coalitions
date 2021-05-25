import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

export const formatEventBeginAtDate = ({ date, type }: { date: Date; type: 'card' | 'modal' }) => {
  const dateFormat = type === 'card' ? "dd LLLL, HH'h'mm" : "EEEE dd LLLL 'à' HH'h'mm";
  return `Le ${format(date, dateFormat, { locale: fr }).toLowerCase()}`;
};
