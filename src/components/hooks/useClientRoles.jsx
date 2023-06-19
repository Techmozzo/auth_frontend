import { useEffect, useState } from 'react';
import { get } from '../../services/fetch';

const useClientRoles = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    // declare the async data fetching function
    const fetchDat = async () => {
      setLoading(true);
      // get the data from the api
      const datax = await get({ endpoint: 'CLIENT_ROLES', auth: true });
      // convert data to json
      setData(datax?.data?.data?.roles);

      setLoading(false);
    };

    // call the function
    const result = fetchDat()
    // make sure to catch any error
      .catch(console.error);

    // ❌ don't do this, it won't work as you expect!
  }, []);
  return { clientroles: data, loading };
};

export default useClientRoles;
