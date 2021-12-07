import { useEffect, useState } from "react";
import axios from "axios";

const useFetchData = (params: string | boolean | undefined) => {
  const [backgroundData, setBackgroundData] =
    useState<Record<string, string>>();
  const [newsData, setNewsData] = useState<{}>();

  useEffect(() => {
    const fetchBackgroundData = async () => {
      const response = await axios.get(`/api`, {
        params: {
          type: "background",
        },
      });
      if (response.data.backgroundData.fetched) {
        setBackgroundData(response.data.backgroundData);
      }
    };
    fetchBackgroundData();
  }, [params]);

  useEffect(() => {
    const fetchNewsData = async () => {
      const response = await axios.get(`/api`, {
        params: {
          type: "news",
        },
      });
      await setNewsData(response.data.newsData);
    };
    fetchNewsData();
  }, [params]);

  return {
    backgroundData,
    newsData,
  };
};

export default useFetchData;
