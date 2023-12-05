import { TimePicker, TimePickerProps } from 'antd';
import dayjs from 'dayjs';

const TimePickerAutoChange = (props: TimePickerProps) => {
  const onBlur = (elem: React.FocusEvent<HTMLInputElement>) => {
    // @ts-ignore
    const value = dayjs(elem.target.value, props?.format);
    if (value && value.isValid() && props.onChange) {
      props.onChange(value, elem.target.value);
    }
  };
  return <TimePicker {...props} onBlur={onBlur} dropdownClassName='time-picker-custom' showNow={false} allowClear={false} minuteStep={5} />;
};

export default TimePickerAutoChange;