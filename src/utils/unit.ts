import { Dayjs } from 'dayjs';
import { Moment } from 'moment';
import { days } from '../pages/_ParentStudentAdvance/component/Calendar';
// import bcrypt from 'bcryptjs';


export const DATE_FORMAT = 'DD/MM/YYYY';

export const BORDER_STYLED = '1px solid #F1F1F1';

export const KEY_BCRYPT = 'anhthuxinhdepdangyeudethuongmuonchot';

export const MESSAGE = {
  _NUMBER_SCORE: 'The score is only within the range of 1 - 10 and has only 2 decimal places.'
};

export const textCapitalize = (text: string, separate: string = ' ') => {
  const strings: String[] = text.split(separate);
  const stringCapitalizes = strings.map(s => s.charAt(0).toUpperCase() + s.slice(1));

  return stringCapitalizes.join(separate);
};

export const checkNumberScore = (value: string | number) => {
  const number = Number(value);
  const decimalTwoNumber = value.toString().split('.');
  const checkDecimalTwoNumber = decimalTwoNumber.length < 2 || decimalTwoNumber.length === 2 && decimalTwoNumber[1].length <= 2;  

  return number >= 0 && number <= 10 && checkDecimalTwoNumber;
};

export const roundNumber = (number: number) => {
  return Math.round(number * 100) / 100;
};

// export const calculateAverage = (scores: any[]) => {
//   const scoresFilter = scores.filter(o => o !== '');  
//   const sum = (scoresFilter ?? []).reduce((a, b) => Number(a) + Number(b), 0);
//   return sum > 0 ? roundNumber(Number(sum) / scoresFilter.length) : 0;
// };

export const getDatesBetween = (from: Dayjs, to: Dayjs) => {
  if(!from || !to) return [];
  
  

  const dates: Dayjs[] = [from];
  let date: Dayjs = from;  
  do{
    date = date.add(1, 'day');
    dates.push(date);
  }
  while (date.isBefore(to));

  return dates;
};

export const getGender = (value: boolean) => {
  return value ? 'Nam': 'Nữ';
};

export const hexToRGB = (hex: string, alpha?: number) => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);

  return 'rgba(' + r + ', ' + g + ', ' + b + ', ' + alpha ?? 1 + ')';
};

export const getTimeToString = (hour: number, minute: number) => {
  return `${hour} giờ ${minute > 0 ? minute + ' phút' : ''}`;
};

export const getDayOfWeek = (date: Moment) => {
  return days.find((o: any) => o.value === date.day())?.label;
};

export const getTalentByScore = (value: any) => {

  switch(true) {
    case value >= 9 && value <= 10:
      return 'Hoàn thành xuất sắc';
    case value >= 7:
      return 'Hoàn thành tốt';
    case value >= 5:
      return 'Hoàn thành';
    case value > 0 && value <= 4:
      return 'Chưa hoàn thành';
    default: 
      return '';
  }
};

export function timeoutPromise(ms: number, promise: any) {
  return new Promise((resolve, reject) => {
    const timeoutId = setTimeout(() => {
      reject(new Error('promise timeout'));
    }, ms);
    promise.then(
      (res: any) => {
        clearTimeout(timeoutId);
        resolve(res);
      },
      (err: any) => {
        clearTimeout(timeoutId);
        reject(err);
      }
    );
  });
}
export function fetchApiTimeout(url: string, timeout: number) {
  const controller = new AbortController();
  return Promise.race([fetch(url, {
    signal: controller.signal
  }), new Promise(resolve => {
    setTimeout(() => {
      resolve('request was not fulfilled in time');
      controller.abort();
      fetchApiTimeout(url, timeout);
    }, timeout);
  })]);
}

// export const bcryptEncode = (text: string) => {
//   // const salt = bcrypt.genSaltSync(KEY_BCRYPT);
//   return bcrypt.hash(text, KEY_BCRYPT);
// };

export const configTimeout = {
  timeout: 10000
};