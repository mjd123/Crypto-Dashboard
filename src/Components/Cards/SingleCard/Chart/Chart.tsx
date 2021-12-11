import { useEffect, useState, memo, useMemo } from "react";
import { Line } from "@ant-design/charts";
import moment from "moment";

interface ChartProps {
  history: [{ price: number; priceDate: string | undefined }] | [];
  priceChange: number;
  expanded?: boolean | undefined;
  timeframe: string;
}
let chart = 0;
const Chart = memo(
  ({ history, priceChange, expanded, timeframe }: ChartProps) => {
    console.log(`chart= ${chart++}`);
    let data = history;

    const [lowestPrice, setLowestPrice] = useState(0);
    const [expandChart, setExpandChart] = useState<boolean | undefined>(false);

    useEffect(() => {
      data = [{ price: 0, priceDate: "" }];
    }, []);

    useEffect(() => {
      setLowestPrice(Math.min(...history.map((item: any) => item.price)));
    }, [history]);

    useEffect(() => {
      setExpandChart(expanded);
    }, [expanded]);

    const formatDate = useMemo(
      () => (v: string) => {
        switch (timeframe) {
          case "sevenDays":
            return moment(v).format("Do");

          case "oneMonth":
            return moment(v).format("Do");

          case "oneYearToDate":
            return moment(v).format("MMM");

          case "oneYear":
            return moment(v).format("MMM");

          case "fiveYears":
            return new Date(v).getFullYear();

          case "All":
            return new Date(v).getFullYear();

          default:
            return moment(v).format("hh a");
        }
      },
      [timeframe]
    );

    const color = () => {
      if (expandChart) {
        return "#5B8FF9";
      }
      if (priceChange >= 0) {
        return "green";
      } else {
        return "red";
      }
    };

    const labelDate = useMemo(
      () => (items: any) => {
        switch (timeframe) {
          case "sevenDays":
            return `Day: ${moment(items[0]?.data?.priceDate).format("Do")}`;
          case "oneMonth":
            return `Day: ${moment(items[0]?.data?.priceDate).format("Do MMM")}`;
          case "oneYearToDate":
            return `Month: ${moment(items[0]?.data?.priceDate).format(
              "Do MMM"
            )}`;
          case "oneYear":
            return `Month: ${moment(items[0]?.data?.priceDate).format(
              "Do MMM y"
            )}`;
          case "fiveYears":
            return `Year: ${moment(items[0]?.data?.priceDate).format(
              "Do MMM y"
            )}`;
          case "All":
            return `Year: ${moment(items[0]?.data?.priceDate).format(
              "Do MMM y"
            )}`;
          default:
            return `Time: ${moment(items[0]?.data?.priceDate).format("HH:MM")}`;
        }
      },
      [timeframe]
    );

    const config: any = {
      loading: false,
      Animation: false,
      data,
      meta: {
        price: {
          min: lowestPrice,
          formatter: (v: any, k?: number) =>
            v < 1 ? v.toFixed(2) : v.toFixed(0),
        },
        priceDate: {
          formatter: (v: any, k?: number) => formatDate(v),
          nice: true,
          tickInterval: 40,
          //maxTickCount: 5,
          showLast: true,
          exponent: 5,
        },
      },
      width: expandChart ? 300 : 75,
      height: expandChart ? 200 : 25,
      autoFit: true,
      padding: expandChart ? "10px" : "auto",
      xField: "priceDate",
      yField: "price",

      seriesField: "date",
      xAxis: expandChart ? true : false,
      yAxis: expandChart ? { position: "right" } : false,
      color: () => color(),
      lineWidth: 0.2,
      style: {
        stroke: () => color(),
        lineWidth: 0.2,
      },
      tooltip: {
        showMarkers: false,
        customContent: (date: string, items: any) => {
          return (
            <>
              {items && (
                <ul>
                  <h5 style={{ margin: 5 }}>{labelDate(items)}</h5>
                  <h5 style={{ margin: 5 }}>
                    {new Intl.NumberFormat("en", {
                      style: "currency",
                      currency: "USD",
                    }).format(items[0]?.data?.price?.toFixed(2))}
                  </h5>
                </ul>
              )}
            </>
          );
        },
      },
      smooth: true,
      animate: false,
      animation: expanded && {
        appear: {
          animation: "fade-in", // Effects of the first animation
          duration: 1000, // Duration of the first animation
        },
      },
    };

    return (
      <>
        {!expandChart && <Line {...config} />}
        {data && expandChart && <Line {...config} />}
      </>
    );
  }
);

export default Chart;
