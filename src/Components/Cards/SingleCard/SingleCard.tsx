import { Text, CardTextWrapper } from "../styles";
import "antd/dist/antd.css";
import { Card } from "antd";
import Chart from "./Chart/Chart";
import { memo, useEffect, useState } from "react";
import CloseButton from "./CloseButton/CloseButton";
import DateButtons from "./DateButtons/DateButtons";
import PriceStats from "./PriceStats/PriceStats";

export interface IndividualCardProps {
  coinImage?: string | undefined;
  text: string;
  symbol: string;
  price: string | number;
  priceChange: number;
  history?: any;
  expanded?: boolean | undefined;
  totalVolume?: number;
  dayRange?: { low: number; high: number };
  keyId: number;
}

export const timeframeKeys: string[] = [
  "yesterday",
  "sevenDays",
  "oneMonth",
  "oneYearToDate",
  "oneYear",
  "fiveYears",
  "All",
];

const IndividualCard = memo(
  ({
    coinImage,
    text,
    symbol,
    price,
    priceChange,
    history,
    expanded,
    totalVolume,
    dayRange,
    keyId,
  }: IndividualCardProps) => {
    const [priceData, setPriceData] = useState<
      [{ price: number; priceDate: string | undefined }] | []
    >([]);
    const [expandCard, setExpandCard] = useState<boolean | undefined>(false);
    const [timeframe, setTimeframe] = useState("yesterday");
    const [defaultButtonHighlight, setDefaultButtonHighlight] = useState(true);

    useEffect(() => {
      //reset price data on props change
      setPriceData([]);
    }, [history, timeframe]);

    useEffect(() => {
      // parsing props.history date and price into human readable version
      history &&
        history[timeframe]?.map((x: number[], i: number) => {
          //setPriceData("");
          return setPriceData((priceData): any => [
            ...priceData,
            {
              priceDate: x[0], //new Date(x[0]).toISOString().slice(5, 10),
              price: x[1], // need to keep decimal places
            },
          ]);
        });
    }, [history, timeframe]);

    useEffect(() => {
      if (expanded) {
        setExpandCard(expanded);
      } else {
        setExpandCard(false);
      }
    }, [expanded]);

    // recieves data from DateButton to refresh props sent to Chart
    const timeframeChange = (data: string) => {
      setPriceData([]);
      setTimeframe(data);
      setDefaultButtonHighlight(false);
    };

    const gridStyleExpanded: {} = {
      display: "grid",
      gridTemplate: "50px  1fr/ 1fr",
      justifyItems: "center",
      alignItems: "center",
      textAlign: "center",
      padding: "10px",
      width: "100%",
      height: "100%",
      borderRadius: "10px",
    };

    const expandImageStyle = {
      gridArea: 0,
      gridRow: 0,
      alignSelf: "center",
      justifySelf: "center",
      maxWidth: "30px",
    };

    const cardBodyExpanded = {
      padding: 0,
      height: "100%",
      width: "100%",
      display: "grid",
      gridTemplateRows: "0px auto",
      gridTemplateColumns: "100%",
    };

    return (
      <>
        <Card
          data-testid="card"
          className={expandCard ? "expanded" : ""}
          style={
            expandCard
              ? gridStyleExpanded
              : {
                  borderRadius:
                    keyId === 0
                      ? "10px 10px 0 0"
                      : keyId === 7
                      ? "0 0 10px 10px"
                      : "",
                }
          }
          bodyStyle={expandCard ? cardBodyExpanded : {}}
          hoverable={expandCard ? false : true}
          cover={
            <img
              style={expandCard ? expandImageStyle : { width: "30px" }}
              alt="coin"
              src={coinImage}
            />
          }
        >
          {expandCard && <CloseButton />}
          <CardTextWrapper
            display="flex"
            flexDirection="column"
            marginBottom="0"
          >
            {!expandCard && <Text color="black">{text} </Text>}
            <Text color="black">{symbol.toUpperCase()}</Text>
          </CardTextWrapper>
          <CardTextWrapper
            className="chart-wrapper"
            marginBottom={expandCard ? "1.5em" : "0"}
            height={"auto"}
          >
            {history && (
              <Chart
                expanded={expandCard}
                history={priceData}
                priceChange={priceChange}
                timeframe={timeframe}
              />
            )}
          </CardTextWrapper>

          <CardTextWrapper
            className="price-wrapper"
            display="flex"
            flexDirection="column"
            gridRow={expandCard ? 3 : 0}
            marginBottom={expandCard ? "1.5em" : "0"}
          >
            <Text color="black">${price.toLocaleString("en")}</Text>
            <Text color={priceChange >= 0 ? "green" : "red"}>
              {priceChange >= 0 && "+"}
              {priceChange.toFixed(2)}%
            </Text>
          </CardTextWrapper>
          {expandCard && totalVolume && history && (
            <>
              <CardTextWrapper
                className="date-button-wrapper"
                display="flex"
                flexDirection="row"
                justifyContent="space-evenly"
                marginBottom="1.5em"
              >
                {timeframeKeys.map((item: string, i: number) => {
                  return (
                    <DateButtons
                      key={i}
                      timeframe={item}
                      timeframeData={timeframeChange}
                      initial={
                        item === "yesterday" && defaultButtonHighlight
                          ? true
                          : false
                      }
                      disabled={item === timeframe ? true : false}
                    />
                  );
                })}
              </CardTextWrapper>
              <PriceStats
                yesterdayPriceHistory={history.yesterday}
                volume={totalVolume}
                range={{
                  low: dayRange?.low,
                  high: dayRange?.high,
                }}
              />
            </>
          )}
        </Card>
      </>
    );
  }
);

export default IndividualCard;
