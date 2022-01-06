import { Col } from "antd";
import { StyledRow, Wrapper } from "./styles";
import "antd/dist/antd.css";
import SingleNews from "./SingleNews/SingleNews";
import Loading from "../../helpers/Loading";
import { gql, useQuery } from "@apollo/client";

const SHORT_NEWS = gql`
  query ShortCryptoNews {
    shortCryptoNews {
      title
      url
      slug
    }
  }
`;

const MAIN_CRYPTO_NEWS = gql`
  query {
    mainCryptoNews {
      author
      title
      url
      urlToImage
      content
    }
  }
`;

const GENERAL_NEWS = gql`
  query {
    generalNews {
      author
      title
      url
      urlToImage
      content
    }
  }
`;

const News = () => {
  const {
    loading: shortCryptoNewsLoading,
    error: shortCryptoNewsError,
    data: shortCryptoNewsData,
  } = useQuery(SHORT_NEWS, { pollInterval: 120000 });
  const {
    loading: mainCryptoNewsLoading,
    error: mainCryptoNewsError,
    data: mainCryptoNewsData,
  } = useQuery(MAIN_CRYPTO_NEWS, { pollInterval: 120000 });
  const {
    loading: generalNewsLoading,
    error: generalNewsError,
    data: generalNewsData,
  } = useQuery(GENERAL_NEWS, { pollInterval: 120000 });

  const loadingStyles = {
    minHeight: "50px",
    minWidth: "100px",
    height: "100%",
  };

  return (
    <Wrapper className="news-wrapper">
      <Loading
        loading={
          shortCryptoNewsLoading && mainCryptoNewsLoading && generalNewsLoading
        }
      />
      <StyledRow justify="center" align="middle" gutter={[12, 12]}>
        <Col className="gutter-row" span={24} style={{ ...loadingStyles }}>
          {mainCryptoNewsError === undefined && !mainCryptoNewsLoading && (
            <SingleNews id={0} news={mainCryptoNewsData?.mainCryptoNews} />
          )}
        </Col>

        <Col className="gutter-row" span={12} style={{ ...loadingStyles }}>
          {shortCryptoNewsError === undefined && !shortCryptoNewsLoading && (
            <SingleNews
              news={shortCryptoNewsData?.shortCryptoNews?.filter(
                (x: any, i: number) => i % 2 === 0
              )}
            />
          )}
        </Col>
        <Col className="gutter-row" span={12} style={{ ...loadingStyles }}>
          {shortCryptoNewsError === undefined && !shortCryptoNewsLoading && (
            <SingleNews
              news={shortCryptoNewsData?.shortCryptoNews?.filter(
                (x: any, i: number) => i % 2
              )}
            />
          )}
        </Col>
        <Col className="gutter-row" span={24} style={{ ...loadingStyles }}>
          {generalNewsError === undefined && !generalNewsLoading && (
            <SingleNews news={generalNewsData?.generalNews} />
          )}
        </Col>
      </StyledRow>
    </Wrapper>
  );
};

export default News;
