import { Col } from "antd";
import { StyledRow, Wrapper } from "./styles";
import "antd/dist/antd.css";
import SingleNews from "./SingleNews/SingleNews";
import { useState, useEffect } from "react";
import Loading from "../../helpers/Loading";

interface NewsProps {
  data?: Record<string, []>;
}

const News = ({ data }: NewsProps) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (data) {
      console.log(data);

      //toggleLoading(true);
      setLoading(true);
    } else {
      // toggleLoading(false);
      setLoading(false);
    }
  }, [data]);

  const loadingStyles = {
    minHeight: "50px",
    minWidth: "100px",
    height: "100%",
  };

  return (
    <Wrapper className="news-wrapper">
      <Loading loading={loading} />
      <StyledRow justify="center" align="middle" gutter={[12, 12]}>
        <Col className="gutter-row" span={24} style={{ ...loadingStyles }}>
          {data?.cryptoHeadlines && (
            <SingleNews id={0} news={data?.cryptoHeadlines} />
          )}
        </Col>

        <Col className="gutter-row" span={12} style={{ ...loadingStyles }}>
          {data?.shortHeadlines?.length && (
            <SingleNews
              news={data?.shortHeadlines?.filter((x, i) => i % 2 === 0)}
            />
          )}
        </Col>
        <Col className="gutter-row" span={12} style={{ ...loadingStyles }}>
          {data?.shortHeadlines?.length && (
            <SingleNews news={data?.shortHeadlines?.filter((x, i) => i % 2)} />
          )}
        </Col>
        <Col className="gutter-row" span={24} style={{ ...loadingStyles }}>
          {data?.topHeadlines?.length && (
            <SingleNews news={data?.topHeadlines} />
          )}
        </Col>
      </StyledRow>
    </Wrapper>
  );
};

export default News;
