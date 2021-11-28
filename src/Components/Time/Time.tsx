import { useEffect, useState } from "react";
import { Text, Wrapper } from "./styles";
import moment from "moment";
import useInterval from "../../hooks/useInterval";
import { useCallback } from "react";

const Time = () => {
  const [time, setTime] = useState(new Date().toLocaleTimeString());

  const updateTime = useCallback(() => {
    setTime(moment().format("HH:mm:ss"));
  }, [time]);

  useInterval(updateTime, 500);

  return (
    <Wrapper className="time-wrapper" justifyContent="start" alignItems="start">
      <Text className="time" fontSize="40px">
        {time}
      </Text>
    </Wrapper>
  );
};

export default Time;
