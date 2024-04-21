import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DashboardTable from 'common/components/molecules/DashboardTable';
import { useNavigate } from 'react-router-dom';

interface HomePageProps {
  accessToken: string | null;
  refreshToken: () => Promise<void>;
}

const HomePage: React.FC<HomePageProps> = ({ accessToken, refreshToken }) => {
  const [data, setData] = useState([]);
  const navigate=useNavigate();
console.log('accessToken',accessToken)
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!accessToken) {
          navigate('/login');
          return;
        }

        const headers = {
          Authorization: `Bearer ${accessToken}`,
        };

        const response = await axios.get('https://asia-northeast1-willeder-official.cloudfunctions.net/api/lists?page=0&size=1', { headers });
        setData(response.data?.data);
      } catch (error: any) { 
        console.error('Error fetching data:', error);
        if (error.response?.status === 401) {
          await refreshToken();
          fetchData();
        }
      }
    };

    fetchData();
  }, [accessToken, refreshToken]);
 

  return (
    <div className=''>
      <DashboardTable data={data} />
    </div>
  );
};

export default HomePage;
