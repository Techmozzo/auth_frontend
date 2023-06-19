import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { get } from '../../services/fetch';

const useClasses = () => {
  const { engagementName, engagementId } = useParams();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    // declare the async data fetching function
    const fetchDat = async () => {
      setLoading(true);
      // get the data from the api
      const datax = await get({ endpoint: 'ENGAGEMENT', auth: true, param: engagementId });
      // convert data to json
      console.log('From Hooks ', datax?.data?.data?.engagement?.planning);
      setData(datax?.data?.data?.engagement?.planning);

      setLoading(false);
    };

    // call the function
    const result = fetchDat()
    // make sure to catch any error
      .catch(console.error);

    // ❌ don't do this, it won't work as you expect!
  }, []);
  return { planning: data, loading };
};

export default useClasses;
