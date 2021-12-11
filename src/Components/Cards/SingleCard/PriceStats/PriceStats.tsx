import moment from "moment";
import { useEffect, useState } from "react";
import { CardTextWrapper, Text } from "../../styles";

interface PriceStatsProps {
  yesterdayPriceHistory: [];
  volume: number;
  range: { low: number | undefined; high: number | undefined };
}

const PriceStats = ({
  yesterdayPriceHistory,
  volume,
  range,
}: PriceStatsProps) => {
  const [openPrice, setOpenPrice] = useState<number | null>(null);
  const [closePrice, setclosePrice] = useState<number | null>(null);

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

    yesterdayPriceHistory.forEach((date) => {
      let yesterdayDiff = moment(date[0]).diff(moment(endOfYeasterday), "days");
      let todayDifference = moment(date[0]).diff(
        moment(beginningOfToday),
        "days"
      );
      if (yesterdayDiff >= 0) {
        if (yesterdaysClosingPrice) {
          if (
            moment(date[0]).diff(moment(yesterdaysClosingPrice), "days") < 0
          ) {
            setclosePrice(date[1]);
          }
        } else {
          setclosePrice(date[1]);
        }
      }
      if (todayDifference >= 0) {
        if (todaysOpenPrice) {
          if (moment(date[0]).diff(moment(todaysOpenPrice), "days") < 0) {
            setOpenPrice(date[1]);
          }
        } else {
          setOpenPrice(date[1]);
        }
      }
    });
  }, [yesterdayPriceHistory]);

  return (
    <>
      <CardTextWrapper
        display="flex"
        flexDirection="row"
        justifyContent="space-evenly"
        marginBottom="1.5em"
      >
        <CardTextWrapper display="flex" flexDirection="column">
          <Text color="black" fontSize="0.9em">
            ${closePrice?.toFixed(2)}
          </Text>
          <Text color="black" fontSize="0.9em">
            prev
          </Text>
        </CardTextWrapper>
        <CardTextWrapper display="flex" flexDirection="column">
          <Text color="black" fontSize="0.9em">
            ${openPrice?.toFixed(2)}
          </Text>
          <Text color="black" fontSize="0.9em">
            open
          </Text>
        </CardTextWrapper>
        <CardTextWrapper display="flex" flexDirection="column">
          <Text color="black" fontSize="0.9em">
            {convertToInternationalCurrencySystem(volume)}
          </Text>
          <Text color="black" fontSize="0.9em">
            volume
          </Text>
        </CardTextWrapper>
        <CardTextWrapper display="flex" flexDirection="column">
          <Text color="black" fontSize="0.9em">
            ${range.low} - ${range.high}
          </Text>
          <Text color="black" fontSize="0.9em">
            days's range
          </Text>
        </CardTextWrapper>
      </CardTextWrapper>
    </>
  );
};

export default PriceStats;
