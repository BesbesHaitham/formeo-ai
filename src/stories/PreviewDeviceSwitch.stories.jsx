import { fn } from 'storybook/test';
import { useState } from 'react';
import PreviewDeviceSwitch from '../components/molecules/PreviewDeviceSwitch';

export default {
  title: 'Molecules/PreviewDeviceSwitch',
  component: PreviewDeviceSwitch,
  args: { onClick: fn(), onChange: fn() },
};

export const Default = {
  render: function PreviewDevicesStory() {
    const [device, setDevice] = useState('desktop');

    return <PreviewDeviceSwitch value={device} onChange={setDevice} />;
  },
};
