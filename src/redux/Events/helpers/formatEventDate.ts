import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { zonedTimeToUtc, utcToZonedTime } from 'date-fns-tz';

export const formatEventDate = ({
  date,
  timeZone,
  type,
}: {
  date: string;
  timeZone: string;
  type: 'card' | 'modal';
}) => {
  const dateFormat = type === 'card' ? "dd LLLL, HH'h'mm" : "EEEE dd LLLL 'à' HH'h'mm";
  const utcDate = zonedTimeToUtc(date, timeZone);
  const localDate = utcToZonedTime(utcDate, Intl.DateTimeFormat().resolvedOptions().timeZone);

  return `Le ${format(localDate, dateFormat, { locale: fr }).toLowerCase()}`;
};
