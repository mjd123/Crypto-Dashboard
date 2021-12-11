import { Col } from "antd";
import { StyledRow, Wrapper } from "./styles";
import "antd/dist/antd.css";
import SingleNews from "./SingleNews/SingleNews";
import { useState, useEffect } from "react";
import Loading from "../../helpers/Loading";

export interface NewsProps {
  data?: { cryptoHeadlines: []; shortHeadlines: []; topHeadlines: [] };
}

const News = ({ data }: NewsProps) => {
  console.log(data);

  const [loading, setLoading] = useState(true);

  // if loading spinner should show
  useEffect(() => {
    if (data) {
      setLoading(false);
    } else {
      setLoading(true);
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
