import {
  DatePickerProps as AntDatePickerProps,
  DatePicker as AntdDatePicker,
} from 'antd';
import dayjs from 'dayjs';
import IMask from 'imask';
import moment from 'moment';
import React from 'react';
import { DATE_FORMAT } from '../../../utils/unit';
const MASKED = IMask.createMask({
  blocks: {
    DD: { from: 1, mask: IMask.MaskedRange, to: 31 },
    MM: { from: 1, mask: IMask.MaskedRange, to: 12 },
    YYYY: { from: 1900, mask: IMask.MaskedRange, to: Number.MAX_VALUE },
  },
  format: (date: Date) => moment(date).format(DATE_FORMAT),
  mask: Date,
  parse: (date: string) => moment(date, DATE_FORMAT),
  pattern: DATE_FORMAT,
});
export type DatePickerProps = Omit<AntDatePickerProps, 'format' | 'picker' | 'onKeyDown'> & {
  showToday?: boolean;
}

const InputDatePicker = (props: DatePickerProps) => (
  <AntdDatePicker
    size='large'
    format={DATE_FORMAT}
    onKeyDown={(event: React.KeyboardEvent<HTMLInputElement>) => {
      const input = event.target as HTMLInputElement;
      input.value = MASKED.resolve(input.value);
    }}
    onBlur={event => {
      if (!props?.onChange) return;
      const input = event.target as HTMLInputElement;
      const isValid = moment(input.value, DATE_FORMAT, true).isValid();
      if (!isValid) return;
      const date = dayjs(input.value, DATE_FORMAT);
      props?.onChange(date, date.format());
    }}
    picker="date"
    placeholder={DATE_FORMAT.toLowerCase()}
    {...props}
  />
);

export default InputDatePicker;