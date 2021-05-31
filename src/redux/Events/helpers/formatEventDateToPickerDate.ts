import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { zonedTimeToUtc, utcToZonedTime } from 'date-fns-tz';

export const formatEventDateToPickerDate = ({
  date,
  timeZone,
}: {
  date: string;
  timeZone: string;
}) => {
  const pickerDateFormat = "yyyy-MM-dd'T'HH:mm";

  const utcDate = zonedTimeToUtc(date, timeZone);
  const localDate = utcToZonedTime(utcDate, timeZone);

  return format(localDate, pickerDateFormat, { locale: fr });
};

export const formatPickerDateToEventDate = ({
  date,
  timeZone,
}: {
  date: string;
  timeZone: string;
}) => {
  const eventDateFormat = 'yyyy-MM-dd HH:mm:ss';

  const utcDate = zonedTimeToUtc(date, timeZone);
  const localDate = utcToZonedTime(utcDate, timeZone);

  return format(localDate, eventDateFormat, { locale: fr });
};
