import { useEffect, useState, useContext, useRef } from "react";
import SingleCard from "./SingleCard/SingleCard";
import { Wrapper } from "./styles";
import { Row } from "antd";
import "antd/dist/antd.css";
import ToggleCardExpandContext, {
  CardContext,
} from "../../Contexts/ToggleCardExpandContext";
import { AnimatePresence, motion } from "framer-motion";
import Loading from "../../helpers/Loading";

interface CardsProps {
  data?: Record<string, string | number>[] | undefined;
  history?: Record<string, {}> | undefined;
}

const Cards = ({ data, history }: CardsProps) => {
  const { cardStatus, toggleStatus } = useContext(CardContext);
  const [rowClicked, setRowClicked] = useState<number | null>(null);
  const [fadeComponent, setFadeComponent] = useState<boolean>(false);
  const ref = useRef<HTMLInputElement | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!data) {
      //toggleLoading(true);
      setLoading(true);
    } else {
      // toggleLoading(false);
      setLoading(false);
    }
  }, [data]);

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
        {history &&
          data &&
          data.map((coin: any, i: number) => {
            return (
              <>
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
                          key={i}
                          keyId={i}
                          history={history[coin.id]}
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
                          key={i}
                          expanded={rowClicked === i ? true : false}
                          keyId={i}
                          history={history[coin.id]}
                          coinImage={coin.image}
                          price={coin.current_price}
                          priceChange={coin.price_change_percentage_24h}
                          text={coin.name}
                          symbol={coin.symbol}
                          totalVolume={coin.total_volume}
                          dayRange={{
                            low: coin.low_24h | 0,
                            high: coin.high_24h | 0,
                          }}
                        />
                      </Row>
                    </motion.div>
                  )}
                </AnimatePresence>
              </>
            );
          })}
      </Wrapper>
    </motion.div>
  );
};

export default Cards;
