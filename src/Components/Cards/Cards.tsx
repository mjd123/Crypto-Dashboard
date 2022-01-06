import { useEffect, useState, useContext, useRef } from "react";
import SingleCard from "./SingleCard/SingleCard";
import { Wrapper } from "./styles";
import { Row } from "antd";
import "antd/dist/antd.css";
import { CardContext } from "../../contexts/ToggleCardExpandContext";
import { AnimatePresence, motion } from "framer-motion";
import Loading from "../../helpers/Loading";
import { gql, useQuery } from "@apollo/client";

const COIN_DATA = gql`
  query {
    coinData {
      id
      symbol
      name
      image
      current_price
      high_24h
      low_24h
      price_change_24h
      price_change_percentage_24h
      ath
      total_volume
    }
  }
`;

const Cards = () => {
  const { cardStatus, toggleStatus } = useContext(CardContext);
  const [rowClicked, setRowClicked] = useState<number | null>(null);
  const [fadeComponent, setFadeComponent] = useState(false);
  const ref = useRef<HTMLInputElement | null>(null);
  const { loading, error, data } = useQuery(COIN_DATA, { pollInterval: 9000 });

  const expandRow = (
    e: MouseEvent | TouchEvent | PointerEvent,
    index: number
  ) => {
    e.preventDefault();
    e.stopPropagation();
    toggleStatus(index);
    setRowClicked(index);
  };

  return (
    <motion.div
      ref={ref}
      animate={{ width: " 100% " }}
      transition={{
        duration: 0.3,
        ease: "easeInOut",
      }}
    >
      <Wrapper className="cards-wrapper">
        <Loading loading={loading} />
        {!loading &&
          data &&
          error === undefined &&
          data.coinData.map((coin: Record<string, any>, i: number) => {
            return (
              <div key={i}>
                <AnimatePresence onExitComplete={() => setFadeComponent(true)}>
                  {cardStatus === null && !fadeComponent && (
                    <motion.div
                      onTap={(e) => expandRow(e, i)}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{
                        duration: 0.5,
                        ease: "easeInOut",
                      }}
                    >
                      <Row
                        gutter={0}
                        style={
                          i === 0
                            ? { borderRadius: "10px 10px 0 0 ", width: "100%" }
                            : { width: "100%" }
                        }
                        className="single-card-wrapper"
                      >
                        <SingleCard
                          id={coin.id}
                          keyId={i}
                          coinImage={coin.image}
                          price={coin.current_price}
                          priceChange={coin.price_change_percentage_24h}
                          totalVolume={coin.total_volume}
                          text={coin.name}
                          symbol={coin.symbol}
                        />
                      </Row>
                    </motion.div>
                  )}
                </AnimatePresence>

                <AnimatePresence onExitComplete={() => setFadeComponent(false)}>
                  {rowClicked === i && cardStatus === i && fadeComponent && (
                    <motion.div
                      onTap={(e) => expandRow(e, i)}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{
                        ease: "easeInOut",
                        duration: 0.3,
                        staggerChildren: 3,
                      }}
                    >
                      <Row
                        gutter={0}
                        style={{ height: "100%" }}
                        className="single-card-wrapper"
                      >
                        <SingleCard
                          id={coin.id}
                          expanded={rowClicked === i ? true : false}
                          keyId={i}
                          coinImage={coin.image}
                          price={coin.current_price}
                          priceChange={coin.price_change_percentage_24h}
                          text={coin.name}
                          symbol={coin.symbol}
                          totalVolume={coin.total_volume}
                          dayRange={{
                            low: coin.low_24h || 0,
                            high: coin.high_24h || 0,
                          }}
                        />
                      </Row>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
      </Wrapper>
    </motion.div>
  );
};

export default Cards;
