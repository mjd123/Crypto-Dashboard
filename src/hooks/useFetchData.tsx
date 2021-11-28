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

        console.log(backgroundData);
      }
    };
    fetchBackgroundData();
  }, []);

  useEffect(() => {
    const fetchNewsData = async () => {
      console.log("news called");
      const response = await axios.get(`/api`, {
        params: {
          type: "news",
        },
      });
      setNewsData(response.data.newsData);
      console.log(newsData, " news function");
    };
    fetchNewsData();
  }, [params]);

  return {
    backgroundData,
    newsData,
  };
};

export default useFetchData;
