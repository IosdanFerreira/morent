'use clients';
import React from 'react';
import Select from 'antd/lib/select';
import Space from 'antd/lib/space';

export default function SearchBar() {

  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
  };

  return (
    <Space wrap>
      <Select
        style={{ width: 220 }}
        defaultValue={'lucy'}
        size='large'
        onChange={handleChange}
        options={[
          { value: 'jack', label: 'Jack' },
          { value: 'lucy', label: 'Lucy' },
          { value: 'Yiminghe', label: 'yiminghe' },
          { value: 'disabled', label: 'Disabled', disabled: true },
        ]}
      />
    </Space>
  );
}
