import { Card } from "antd";
import { motion } from "framer-motion";
import { useState } from "react";
import { Text } from "../styles";

interface SingleNewsProps {
  news:
    | {
        title?: string;
        url?: string;
        urlToImage?: string;
        description?: string;
      }[];
  id?: number;
}

const variants = {
  fadeIn: { opacity: 1 },
  fadeOut: { opacity: 0 },
};

const SingleNews = ({ news, id }: SingleNewsProps) => {
  const [currentNewsItem, setCurrentNewsItem] = useState(0);
  const [fadeComponent, setFadeComponent] = useState(false);

  return (
    <motion.a
      initial={{ opacity: 1 }}
      animate={fadeComponent ? "fadeOut" : "fadeIn"}
      variants={variants}
      transition={{
        ease: "easeInOut",
        duration: 1,
        delay: fadeComponent ? 45 : 0.5,
      }}
      href={news[currentNewsItem]?.url}
      target="_blank"
      rel="noreferrer"
      style={{ display: "flex", height: "100%" }}
      onAnimationComplete={(definition) => {
        setFadeComponent(true);
        if (definition === "fadeOut") {
          setFadeComponent(false);
          setTimeout(() => {
            setCurrentNewsItem(
              currentNewsItem < news.length - 1 ? currentNewsItem + 1 : 0
            );
          }, 10);
        }
      }}
    >
      <Card
        bordered={false}
        hoverable={true}
        bodyStyle={{
          position: news[currentNewsItem]?.urlToImage ? "absolute" : "initial",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-around",
          alignItems: "center",
          textAlign: "center",
          height: "100%",
          minHeight: "50px",
          boxShadow: "inset 0 0 0 100vmax rgba(0, 0, 0, 0.6)",
          borderRadius: "10px",
          width: "100%",
        }}
        size="small"
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          borderRadius: "10px",
        }}
        cover={
          news[currentNewsItem]?.urlToImage && (
            <img
              style={{ borderRadius: "10px" }}
              alt={news[currentNewsItem].description}
              src={news[currentNewsItem].urlToImage}
            />
          )
        }
      >
        <Text color="white">{news[currentNewsItem]?.title}</Text>
      </Card>
    </motion.a>
  );
};

export default SingleNews;
