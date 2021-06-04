import { format, isSameDay } from 'date-fns';
import { fr } from 'date-fns/locale';
import { zonedTimeToUtc, utcToZonedTime } from 'date-fns-tz';

export const formatEventDate = ({
  beginAt,
  finishAt,
  timeZone,
  type,
}: {
  beginAt: string;
  finishAt: string;
  timeZone: string;
  type: 'card' | 'modal';
}) => {
  const utcBeginAt = zonedTimeToUtc(beginAt, timeZone);
  const localBeginAt = utcToZonedTime(utcBeginAt, Intl.DateTimeFormat().resolvedOptions().timeZone);

  if (type === 'card') {
    return `Le ${format(localBeginAt, "dd LLLL, HH'h'mm", { locale: fr }).toLowerCase()}`;
  }

  const utcFinishAt = zonedTimeToUtc(finishAt, timeZone);
  const localFinishAt = utcToZonedTime(
    utcFinishAt,
    Intl.DateTimeFormat().resolvedOptions().timeZone,
  );

  if (isSameDay(localBeginAt, localFinishAt)) {
    return `Le ${format(localBeginAt, "EEEE dd LLLL 'de' HH'h'mm", {
      locale: fr,
    }).toLowerCase()} à ${format(localFinishAt, "HH'h'mm", { locale: fr }).toLowerCase()}`;
  }

  return `Du ${format(localBeginAt, "EEEE dd LLLL 'à' HH'h'mm", {
    locale: fr,
  }).toLowerCase()} au ${format(localFinishAt, "EEEE dd LLLL 'à' HH'h'mm", {
    locale: fr,
  }).toLowerCase()}`;
};
