import { gql, useQuery } from "@apollo/client";
import moment from "moment";
import { useEffect, useState } from "react";
import { CardTextWrapper, Text } from "../../styles";

interface PriceStatsProps {
  volume: number;
  range: { low: number | undefined; high: number | undefined };
  coinId: string;
}

const PRICE_DATA = gql`
  query ($coin: String, $timeframe: String) {
    coinPriceHistory(coin: $coin, timeframe: $timeframe) {
      priceDate
      price
    }
  }
`;

const PriceStats = ({ volume, range, coinId }: PriceStatsProps) => {
  const [openPrice, setOpenPrice] = useState<number | null>(null);
  const [closePrice, setclosePrice] = useState<number | null>(null);
  const { loading, error, data } = useQuery(PRICE_DATA, {
    variables: { coin: coinId, timeframe: "yesterday" },
  });

  const convertToInternationalCurrencySystem = (labelValue: number) => {
    // Nine Zeroes for Billions
    return Math.abs(Number(labelValue)) >= 1.0e9
      ? (Math.abs(Number(labelValue)) / 1.0e9).toFixed(2) + "B"
      : // Six Zeroes for Millions
      Math.abs(Number(labelValue)) >= 1.0e6
      ? (Math.abs(Number(labelValue)) / 1.0e6).toFixed(2) + "M"
      : // Three Zeroes for Thousands
      Math.abs(Number(labelValue)) >= 1.0e3
      ? (Math.abs(Number(labelValue)) / 1.0e3).toFixed(2) + "K"
      : Math.abs(Number(labelValue));
  };

  useEffect(() => {
    let endOfYeasterday = moment().subtract(2, "days").endOf("day");
    let beginningOfToday = moment().startOf("day");

    let todaysOpenPrice = 0;
    let yesterdaysClosingPrice = 0;

    data?.coinPriceHistory?.forEach(
      (date: { priceDate: number; price: number }) => {
        let yesterdayDiff = moment(date.priceDate).diff(
          moment(endOfYeasterday),
          "days"
        );
        let todayDifference = moment(date.priceDate).diff(
          moment(beginningOfToday),
          "days"
        );
        if (yesterdayDiff >= 0) {
          if (yesterdaysClosingPrice) {
            if (
              moment(date.priceDate).diff(
                moment(yesterdaysClosingPrice),
                "days"
              ) < 0
            ) {
              setclosePrice(date.price);
            }
          } else {
            setclosePrice(date.price);
          }
        }
        if (todayDifference >= 0) {
          if (todaysOpenPrice) {
            if (
              moment(date.priceDate).diff(moment(todaysOpenPrice), "days") < 0
            ) {
              setOpenPrice(date.price);
            }
          } else {
            setOpenPrice(date.price);
          }
        }
      }
    );
  }, [data]);

  return (
    <>
      <CardTextWrapper
        display="flex"
        flexDirection="row"
        justifyContent="space-evenly"
        marginBottom="1.5em"
      >
        <CardTextWrapper display="flex" flexDirection="column">
          <Text color="black" fontSize="0.7em">
            ${closePrice?.toFixed(2)}
          </Text>
          <Text color="black" fontSize="0.7em">
            prev
          </Text>
        </CardTextWrapper>
        <CardTextWrapper display="flex" flexDirection="column">
          <Text color="black" fontSize="0.7em">
            ${openPrice?.toFixed(2)}
          </Text>
          <Text color="black" fontSize="0.7em">
            open
          </Text>
        </CardTextWrapper>
        <CardTextWrapper display="flex" flexDirection="column">
          <Text color="black" fontSize="0.7em">
            {convertToInternationalCurrencySystem(volume)}
          </Text>
          <Text color="black" fontSize="0.7em">
            volume
          </Text>
        </CardTextWrapper>
        <CardTextWrapper display="flex" flexDirection="column">
          <Text color="black" fontSize="0.7em">
            ${range.low?.toFixed(2)} - ${range.high?.toFixed(2)}
          </Text>
          <Text color="black" fontSize="0.7em">
            days's range
          </Text>
        </CardTextWrapper>
      </CardTextWrapper>
    </>
  );
};

export default PriceStats;
