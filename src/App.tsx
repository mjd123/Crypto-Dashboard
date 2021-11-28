import React, { useCallback, useContext, useEffect, useState } from "react";
import GlobalCSS from "./styles/Global";
import "./App.css";
import Time from "./Components/Time/Time";
import { App as Main } from "./styles/App";
import Cards from "./Components/Cards/Cards";
import Author from "./Components/Author/Author";
import useFetchData from "./hooks/useFetchData";
import News from "./Components/News/News";
import ToggleCardExpandContext, {
  CardContext,
} from "./Contexts/ToggleCardExpandContext";
import { motion, useAnimation, useViewportScroll } from "framer-motion";
import useWindowDimensions from "./hooks/useWindowDimentions";
import useInterval from "./hooks/useInterval";
import axios from "axios";
import Loading from "./helpers/Loading";

const App = () => {
  const [img, setImg] = useState("");
  const [news, setNews] = useState<{}>("");
  const { width } = useWindowDimensions();
  const [loading, setLoading] = useState<boolean | string>();
  let { backgroundData, newsData } = useFetchData(loading);
  const [priceDataStore, setpriceDataStore] = useState<Record<string, {}>>();
  const [coinDataStore, setCoinDataStore] =
    useState<Record<string, string | number>[]>();
  const newsControls = useAnimation();
  const cardControls = useAnimation();
  const scrollHeight = window.innerHeight;
  const { scrollY } = useViewportScroll();
  const [fadeComponent, setFadeComponent] = useState<boolean>(false);
  const [fetchTrigger, setFetchTrigger] = useState<boolean>(false);

  const getCoins = useCallback(async () => {
    let isMounted = true;
    const response = await axios.get(`/api`);

    if (isMounted) {
      if (response.data.fetched === true) {
        console.log("is mounted and theres data");
        // update only if data is new
        if (
          JSON.stringify(coinDataStore) !==
          JSON.stringify(response.data.coinOverview)
        ) {
          setCoinDataStore(response.data.coinOverview);
          setpriceDataStore(response.data.priceData);
        }
      }
    }
  }, [coinDataStore]);

  const trigger = () => {
    console.log("in trigger");

    setFetchTrigger(!fetchTrigger);
  };

  // useInterval(trigger, 6000);
  useInterval(getCoins, 6000);

  useEffect(() => {
    // check there is data
    console.log("check", backgroundData?.image);

    if (backgroundData && Object.keys(backgroundData).length) {
      setImg(backgroundData.image);
      console.log(img);
    }
    // pass to news component and let it break data down
    if (newsData && Object.keys(newsData).length) {
      setNews(newsData);
      console.log(newsData);
    }
  }, [backgroundData, newsData]);

  useEffect(() => {
    // check screensize
    if (width < 768) {
      return scrollY.onChange((v) => {
        if (v > scrollHeight / 2) {
          setFadeComponent(true);
        } else {
          setFadeComponent(false);
        }
      });
    }
  }, [scrollY]);

  useEffect(() => {
    // responsive animations
    if (width <= 768) {
      if (fadeComponent) {
        cardControls.start({
          opacity: 0,
          zIndex: 0,
          transition: { duration: 1 },
        });
        newsControls.start({
          opacity: 1,
          zIndex: 1,
          transition: { duration: 1 },
        });
      } else {
        newsControls.start({
          opacity: 0,
          zIndex: 0,
          transition: { duration: 1 },
        });
        cardControls.start({
          opacity: 1,
          zIndex: 1,
          transition: { duration: 1 },
        });
      }
    } else {
      newsControls.start({
        opacity: 1,
        zIndex: 1,
        transition: { duration: 1 },
      });
      cardControls.start({
        opacity: 1,
        zIndex: 1,
        transition: { duration: 1 },
      });
    }
  }, [fadeComponent, width]);

  const motionStyles: boolean | { [key: string]: string | number } = width <=
    768 && {
    display: "block",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    opacity: 0,
    zIndex: 0,
  };

  return (
    <>
      <GlobalCSS />
      <Loading loading={img ? false : true} />
      <Main backgroundImage={img}>
        <Time />
        <ToggleCardExpandContext>
          <motion.div
            className="news"
            animate={newsControls}
            style={
              width <= 768
                ? { ...motionStyles, opacity: 1 }
                : { gridRow: "2 / 4", gridColumn: "1", opacity: 1 }
            }
          >
            <News data={newsData} />
          </motion.div>

          <motion.div
            className="cards"
            animate={cardControls}
            style={
              width <= 768
                ? { ...motionStyles }
                : {
                    gridRow: "2 / 4",
                    gridColumn: "2",
                    justifySelf: "end",
                    opacity: 1,
                  }
            }
          >
            <Cards data={coinDataStore} history={priceDataStore} />
          </motion.div>
        </ToggleCardExpandContext>
        <Author name={backgroundData && backgroundData.author} />
      </Main>
    </>
  );
};

export default App;
