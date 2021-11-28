import { Button } from "antd";

interface DateButtonsProps {
  timeframe: string;
  timeframeData: (data: string) => void;
  initial: boolean;
  disabled: boolean;
}

const DateButtons = ({
  timeframe,
  timeframeData,
  initial,
  disabled,
}: DateButtonsProps) => {
  const shortenText: { [key: string]: string } = {
    yesterday: "1D",
    sevenDays: "7D",
    oneMonth: "1M",
    oneYearToDate: "YTD",
    oneYear: "1Y",
    fiveYears: "5Y",
    All: "ALL",
  };

  return (
    <Button
      className={"ant-btn-primary:focus"}
      style={
        initial
          ? {
              color: "#40a9ff",
              borderColor: "#40a9ff",
              fontSize: "0.9em",
              cursor: "default",
            }
          : { fontSize: "0.9em" }
      }
      shape="round"
      size={"small"}
      onClick={(e) => {
        console.log("disabled", disabled);

        if (!disabled) {
          timeframeData(timeframe);
          e.preventDefault();
          e.stopPropagation();
        }
      }}
    >
      {shortenText[timeframe]}
    </Button>
  );
};

export default DateButtons;
