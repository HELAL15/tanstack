import { useMutation, useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';

const Setting = () => {
  const { data: settings, isLoading } = useQuery({
    queryKey: ['setting'],
    queryFn: async () => {
      const response = await fetch(
        'https://backend.smartvision4p.com/hotel/public/api/setting'
      );
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    },
  });

  const processedSettings = useMemo(() => {
    if (!settings) return null;

    // Example: Memoizing site_name from the settings data
    return settings.data.site_name;
  }, [settings]);

  const { mutate } = useMutation<IProps, Error, IProps>({
    mutationFn: async (newSetting) => {
      const response = await fetch(
        'https://backend.smartvision4p.com/hotel/public/api/user/login',
        {
          method: 'POST',
          body: JSON.stringify(newSetting),
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    },
    onSettled: (data) => {
      console.log(data);
    },
  });

  interface IProps {
    account_type: string | undefined;
    email: string | undefined;
    password: string | undefined;
  }

  const formData: IProps = {
    account_type: 'user',
    email: '1ahmedhelal1@gmail.com',
    password: '23231212',
  };
  const handleSubmit = () => {
    mutate(formData);
  };

  return (
    <>
      {isLoading && <div>loading...</div>}
      {processedSettings && <div>{processedSettings}</div>}
      <button onClick={handleSubmit}>click me</button>
    </>
  );
};

export default Setting;
