import dayjs from 'dayjs';
import 'dayjs/locale/it';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

declare module 'dayjs' {
  interface Dayjs {
    datetime: () => string;
  }
}

dayjs.locale('it');
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend((option, dayjsClass, dayjsFactory) => {
  dayjsClass.prototype.datetime = function () {
    return getDateTime(this);
  };
});

dayjs.tz.setDefault('Europe/Rome');

export function getReadableDate(date: string, capitalize = true) {
  const data = dayjs(date).format('dddd DD MMMM');

  return capitalize ? `${data.charAt(0).toUpperCase()}${data.slice(1)}` : data;

  //return dayjs.unix(date).format('dddd DD MMMM YYYY');
  //return dayjs(date).format('ddd DD MMMM').charAt(0).toUpperCase();
}

export function getSubOpeningDate(date: string) {
  return dayjs(date).subtract(20, 'days').format('dddd DD MMMM YYYY');
}

export function getDate(date: string) {
  //return dayjs.unix(date).format('dddd DD MMMM YYYY');
  return dayjs(date).format('DD MMM');
}

export function getTime(date: string) {
  //return dayjs.unix(date).format('dddd DD MMMM YYYY');
  return dayjs(date).format('ddd HH:mm');
}

function getDateTime(date: dayjs.Dayjs) {
  return date.format('DD/MM/YY HH:mm');
}

export const dt = dayjs;
