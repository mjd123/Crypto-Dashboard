const fetch = require("node-fetch");
const express = require("express");
const CoinGecko = require("coingecko-api");
const CoinGeckoClient = new CoinGecko();
const moment = require("moment");
const NewsAPI = require("newsapi");
const newsApi = new NewsAPI("906ae3787b214febbb021e4737277943");
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 3002;
const app = express();
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());

let apiData = {
  backgroundData: { image: "", author: "", fetched: false },
  priceData: {},
  coinOverview: [],
  newsData: {
    topHeadlines: {},
    shortHeadlines: {},
    fetched: false,
  },
  fetched: false,
};

const timeframes = {
  yesterday: moment().subtract(1, "days").unix(),
  sevenDays: moment().subtract(1, "weeks").unix(),
  oneMonth: moment().subtract(1, "month").unix(),
  oneYearToDate: moment().startOf("year").unix(),
  oneYear: moment().subtract(1, "years").unix(),
  fiveYears: moment().subtract(5, "years").unix(),
  All: 0,
};

app.get("/api", (req, res) => {
  res.json(apiData);

  // run functions depending on req
  switch (req.query.type) {
    case "background":
      console.log("background func called");
      return getBackgroundImage();

    case "news":
      return getNews().then(
        ([cryptoHeadlines, topHeadlines, shortHeadlines]) => {
          apiData.newsData.cryptoHeadlines = cryptoHeadlines.articles;
          apiData.newsData.topHeadlines = topHeadlines.articles;
          apiData.newsData.shortHeadlines = shortHeadlines.results;
          apiData.newsData.fetched = true;
        }
      );

    default:
      break;
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});

const getBackgroundImage = async () => {
  try {
    const response = await fetch(
      "https://api.unsplash.com/search/collections?page=1&query=nature",
      {
        method: "GET",
        headers: {
          "Accept-Version": "v1",
          "Access-Control-Allow-Origin": "*",
          Authorization:
            "Client-ID -QUGRRngEhuOPcct3E7Crph_s4lUnuu0uK96A6hPyf0",
          "Content-Type": "application/json",
        },
      }
    );
    const image = await response.json();

    apiData.backgroundData.image =
      // get random image
      image.results[
        Math.floor(Math.random() * image.results.length - 1)
      ].cover_photo.urls.full;
    apiData.backgroundData.author = image.results[0].cover_photo.user.name;
    apiData.backgroundData.fetched = true;
  } catch (error) {
    console.error(error, "err");
  }
};

const getNews = async () => {
  let [cryptoHeadlinesResponse, topHeadlinesResponse, shortHeadlinesResponse] =
    await Promise.all([
      newsApi.v2.everything({
        //sources: "bbc-news,the-verge",
        language: "en",
        sortBy: "relevancy",
        q: "cryptocurrency, crypto",
        //domains: "techcrunch.com,the-verge",
      }),
      newsApi.v2.topHeadlines({
        language: "en",
        country: "gb",
      }),
      fetch(
        "https://cryptopanic.com/api/v1/posts/?auth_token=b873abe3fe7cee07d9efa9c51f40316c68d970ed"
      ),
    ]);

  const cryptoHeadlines = await cryptoHeadlinesResponse;
  const topHeadlines = await topHeadlinesResponse;
  const shortHeadlines = await shortHeadlinesResponse.json();

  return [cryptoHeadlines, topHeadlines, shortHeadlines];
};

const getCoinPriceHistory = async (coin, timeframe) => {
  console.log(coin, timeframe, "coin,timw");
  const calcDates = () => {
    let currentDate = moment().unix();
    let fromDate = timeframe;
    return [currentDate, fromDate];
  };
  const [currentDate, fromDate] = calcDates();

  let data = await CoinGeckoClient.coins.fetchMarketChartRange(
    encodeURI(`${coin}`),
    {
      from: timeframe,
      to: currentDate,
    }
  );
  return data.data.prices;
};

// get hex, rune and fantom data
const getAllCoinsWithData = async () => {
  let data = await CoinGeckoClient.coins.markets({
    ids: ["hex", "thorchain", "fantom"],
  });
  data.data.forEach((item) => {
    apiData.coinOverview.push(item);
  });
};

// get all coins data
const getAllCoinData = async () => {
  getAllCoinsWithData();
  const coin = await CoinGeckoClient.coins.markets();

  apiData.coinOverview.push(
    ...coin.data
      // set amount of coins
      .filter((x, i) => i <= 5)
      // remove tether and usdc from array
      .filter((x) => x.name !== "Tether" && x.name !== "USD Coin")
  );
  //order in regards to marketcap
  apiData.coinOverview.sort((a, b) => (a.market_cap < b.market_cap ? 1 : -1));

  // loop through coins and attach historic price data to each
  for (const data of apiData.coinOverview) {
    apiData.priceData[data.id] = {};

    // get timeframe data for each coin
    for (const timeframe in timeframes) {
      //console.log(timeframe, "time");
      apiData.priceData[data.id][timeframe] = await getCoinPriceHistory(
        data.id,
        timeframes[timeframe]
      );
    }
  }

  return coin;
};

// update apiData
const updateData = async () => {
  console.log("func running");
  apiData.priceData = {};
  apiData.coinOverview = [];
  // apiData.newsData.cryptoHeadlines = {};
  // apiData.newsData.topHeadlines = {};
  // apiData.newsData.shortHeadlines = {};
  apiData.fetched = false;
  // console.log(apiData, "check object empty");
  try {
    // fetch background image once
    // if (!apiData.backgroundData.fetched) {
    //   getBackgroundImage();
    //   apiData.backgroundData.fetched = true;
    // }
    // getNews();
    await getAllCoinData();

    //if (apiData.coinOverview && apiData.priceData) {
    apiData.fetched = true;
    //}

    // .then(([cryptoHeadlines, topHeadlines, shortHeadlines]) => {
    //   apiData.newsData.cryptoHeadlines = cryptoHeadlines.articles;
    //   apiData.newsData.topHeadlines = topHeadlines.articles;
    //   apiData.newsData.shortHeadlines = shortHeadlines.results;
    //   apiData.newsData.fetched = true;
    // })
    // .catch((error) => {
    //   console.log(error);
    // });

    console.log(apiData.fetched, "apiData.fetched ");
  } catch (error) {
    console.log(error, "final error");
    apiData.fetched = false;
  } finally {
    console.log(apiData.backgroundData, "overview");
  }
};

// run on interval
setInterval(updateData, 180000);

// run once
updateData();
