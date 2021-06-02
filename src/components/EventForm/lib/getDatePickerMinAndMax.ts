import { format } from 'date-fns';

const MAX_EVENT_DURATION_IN_DAYS = 3;

export const getDatePickerMinAndMax = ({
  beginAt,
  finishAt,
  forBeginAt,
}: {
  beginAt?: string;
  finishAt?: string;
  forBeginAt: boolean;
}): { min?: string; max?: string } | undefined => {
  const today = format(new Date(), "yyyy-MM-dd'T'HH:mm");

  if (forBeginAt) {
    let min = today;
    if (finishAt !== undefined && finishAt.length > 0) {
      const finishAtMinusMaxDuration = format(
        new Date(new Date().setDate(new Date(finishAt).getDate() - MAX_EVENT_DURATION_IN_DAYS)),
        "yyyy-MM-dd'T'HH:mm",
      );
      min = finishAtMinusMaxDuration > today ? finishAtMinusMaxDuration : today;
    }
    return {
      min,
      max: finishAt,
    };
  }

  let max = undefined;
  if (beginAt !== undefined && beginAt.length > 0) {
    const beginAtPlusMaxDuration = format(
      new Date(new Date().setDate(new Date(beginAt).getDate() + MAX_EVENT_DURATION_IN_DAYS)),
      "yyyy-MM-dd'T'HH:mm",
    );
    max = beginAtPlusMaxDuration;
  }
  return {
    min: beginAt !== undefined ? beginAt : today,
    max,
  };
};
