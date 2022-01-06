import { Text, CardTextWrapper } from "../styles";
import "antd/dist/antd.css";
import { Card } from "antd";
import Chart from "./Chart/Chart";
import { memo, useEffect, useState } from "react";
import CloseButton from "./CloseButton/CloseButton";
import DateButtons from "./DateButtons/DateButtons";
import PriceStats from "./PriceStats/PriceStats";
import { gql, useQuery } from "@apollo/client";
import Loading from "../../../helpers/Loading";

export interface SingleCardProps {
  coinImage?: string | undefined;
  text: string;
  symbol: string;
  price: string | number;
  priceChange: number;
  expanded?: boolean | undefined;
  totalVolume?: number;
  dayRange?: { low: number; high: number };
  keyId: number;
  id: string;
}

const PRICE_DATA = gql`
  query ($coin: String, $timeframe: String) {
    coinPriceHistory(coin: $coin, timeframe: $timeframe) {
      priceDate
      price
    }
  }
`;

export const timeframeKeys: string[] = [
  "yesterday",
  "sevenDays",
  "oneMonth",
  "oneYearToDate",
  "oneYear",
  "fiveYears",
  "All",
];

const SingleCard = memo(
  ({
    coinImage,
    text,
    symbol,
    price,
    priceChange,
    expanded,
    totalVolume,
    dayRange,
    keyId,
    id,
  }: SingleCardProps) => {
    const [priceData, setPriceData] = useState<
      [{ price: number; priceDate: string | undefined }] | []
    >([]);
    const [expandCard, setExpandCard] = useState<boolean | undefined>(false);
    const [timeframe, setTimeframe] = useState("yesterday");
    const [defaultButtonHighlight, setDefaultButtonHighlight] = useState(true);
    const { loading, error, data } = useQuery(PRICE_DATA, {
      variables: { coin: id, timeframe: timeframe },
      pollInterval: 7000,
    });

    useEffect(() => {
      if (data && !loading) {
        setPriceData(data.coinPriceHistory);
      }
    }, [loading, data, error]);

    useEffect(() => {
      if (expanded) {
        setExpandCard(expanded);
      } else {
        setExpandCard(false);
      }
    }, [expanded]);

    // recieves data from DateButton to refresh props sent to Chart
    const timeframeChange = (data: string) => {
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
        {!expandCard && <Loading loading={loading} />}

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
            <Chart
              expanded={expandCard}
              history={priceData}
              priceChange={priceChange}
              timeframe={timeframe}
              loading={loading}
            />
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

          {expandCard && totalVolume && priceData && !loading && (
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
                coinId={id}
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

export default SingleCard;
