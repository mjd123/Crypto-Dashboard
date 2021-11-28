import { Card } from "antd";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { useState } from "react";
import useFetchData from "../../../hooks/useFetchData";
import { Text } from "../styles";

interface SingleNewsProps {
  news:
    | {
        title?: string;
        url?: string;
        urlToImage?: string;
        description?: string;
      }
    | never[];
  id?: number;
}

const variants = {
  fadeIn: { opacity: 1 },
  fadeOut: { opacity: 0 },
};

const SingleNews = ({ news, id }: SingleNewsProps) => {
  //const [newsItems, setNewsItems] = useState<any>([]);
  const [currentNewsItem, setCurrentNewsItem] = useState(0);
  const [fadeComponent, setFadeComponent] = useState(false);

  const [fetchTrigger, setFetchTrigger] = useState<boolean>();
  const { newsData } = useFetchData(fetchTrigger);
  let newsItems: any = news;

  useEffect(() => {
    if (id === 0 && currentNewsItem === newsItems.length - 1) {
      setFetchTrigger(true);
    } else {
      setFetchTrigger(false);
    }
  }, [news]);

  return (
    <>
      {newsItems && (
        <motion.a
          initial={{ opacity: 1 }}
          animate={fadeComponent ? "fadeOut" : "fadeIn"}
          variants={variants}
          transition={{
            ease: "easeInOut",
            duration: 1,
            delay: fadeComponent ? 45 : 0.5,
          }}
          href={newsItems[currentNewsItem]?.url}
          target="_blank"
          rel="noreferrer"
          style={{ display: "flex", height: "100%" }}
          onAnimationComplete={(definition) => {
            setFadeComponent(true);
            if (definition === "fadeOut") {
              setFadeComponent(false);
              setTimeout(() => {
                setCurrentNewsItem(
                  currentNewsItem < newsItems.length - 1
                    ? currentNewsItem + 1
                    : 0
                );
              }, 10);
            }
          }}
        >
          <Card
            bordered={false}
            hoverable={true}
            bodyStyle={{
              position: newsItems[currentNewsItem]?.urlToImage
                ? "absolute"
                : "initial",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-around",
              alignItems: "center",
              textAlign: "center",
              height: "100%",
              minHeight: "50px",
              boxShadow: "inset 0 0 0 100vmax rgba(0, 0, 0, 0.6)",
              borderRadius: "10px",
            }}
            size="small"
            style={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
              borderRadius: "10px",
            }}
            cover={
              newsItems[currentNewsItem]?.urlToImage && (
                <img
                  style={{ borderRadius: "10px" }}
                  alt={newsItems[currentNewsItem].description}
                  src={newsItems[currentNewsItem].urlToImage}
                />
              )
            }
          >
            <Text color="white">{newsItems[currentNewsItem]?.title}</Text>
          </Card>
        </motion.a>
      )}
    </>
  );
};

export default SingleNews;
