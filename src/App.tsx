import React, { useEffect, useState } from "react";
import GlobalCSS from "./styles/Global";
import "./App.css";
import Time from "./components/Time/Time";
import { App as Main } from "./styles/App";
import Cards from "./components/Cards/Cards";
import Author from "./components/Author/Author";
import News from "./components/News/News";
import ToggleCardExpandContext from "./contexts/ToggleCardExpandContext";
import { motion, useAnimation, useViewportScroll } from "framer-motion";
import useWindowDimensions from "./hooks/useWindowDimentions";
import Loading from "./helpers/Loading";
import { useQuery, gql } from "@apollo/client";

const BACKGROUND_DATA = gql`
  query Query {
    backgroundImage {
      urls {
        full
      }
      user {
        name
      }
    }
  }
`;

const App = () => {
  const { width } = useWindowDimensions();
  const newsControls = useAnimation();
  const cardControls = useAnimation();
  const scrollHeight = window.innerHeight;
  const { scrollY } = useViewportScroll();
  const [fadeComponent, setFadeComponent] = useState(false);

  const { loading, error, data } = useQuery(BACKGROUND_DATA);

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
      <Loading loading={loading} />
      <Main
        backgroundImage={
          !loading && error === undefined && data.backgroundImage.urls.full
        }
      >
        <Time />
        <ToggleCardExpandContext>
          <motion.div
            className="news"
            animate={newsControls}
            style={
              width <= 768
                ? { ...motionStyles, opacity: 0 }
                : { gridRow: "2 / 4", gridColumn: "1", opacity: 1 }
            }
          >
            <News />
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
            <Cards />
          </motion.div>
        </ToggleCardExpandContext>
        <Author name={!loading && data.backgroundImage.user.name} />
      </Main>
    </>
  );
};

export default App;
