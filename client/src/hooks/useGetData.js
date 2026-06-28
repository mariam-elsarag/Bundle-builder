import { useEffect, useState } from "react";
import axiosInstance from "../services/axiosInstance";

function useGetData(endpoint, setValue) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(endpoint);
      const fetchedData = response.data;
      setData(fetchedData || []);
      if (setValue) {
        setValue(fetchedData);
      }
    } catch (err) {
      setError(err?.response?.data);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, [endpoint]);

  return { data, setData, loading, fetchData, error };
}

export default useGetData;
