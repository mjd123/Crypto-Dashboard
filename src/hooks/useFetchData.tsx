import { useEffect, useState } from "react";
import axios from "axios";

export interface INews {
  cryptoHeadlines: [];
  shortHeadlines: [];
  topHeadlines: [];
  fetched?: boolean;
}

export interface IBackground {
  author?: string;
  fetched?: boolean;
  image?: string;
}

const useFetchData = (params: string | boolean | undefined) => {
  const [backgroundData, setBackgroundData] = useState<IBackground>();
  const [newsData, setNewsData] = useState<INews>();

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
