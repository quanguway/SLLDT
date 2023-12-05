import { SearchOutlined } from '@ant-design/icons';
import { Input } from 'antd';
import _debounce from 'lodash/debounce';
import React, { useCallback, useEffect, useState } from 'react';

type Props = {
  value?: string;
  onSearchText?: (val: string) => void;
};
const InputSearchText = ({ value = '', onSearchText = () => undefined }: Props) => {
  const [text, setText] = useState(value);
  const onChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setText(e.target.value ?? '');
  };

  const debounce = useCallback(_debounce((text) => {
    onSearchText(text);
  }, 500), [onSearchText]);

  useEffect(() => {
    debounce(text);
  }, [text]);

  return (
    <div style={{width: '200px'}} className='common-input-search'>
      <Input
        size='large'
        placeholder={'Tìm kiếm'}
        suffix={<SearchOutlined />}
        type='text'
        value={text}
        onChange={onChange}
      />
    </div>
  );
};

export default InputSearchText;