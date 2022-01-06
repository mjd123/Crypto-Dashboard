import { ApolloServer, gql } from "apollo-server";
import { RESTDataSource } from "apollo-datasource-rest";
import moment from "moment";

class ImageData extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = "https://api.unsplash.com";
  }
  async getBackgroundImageData() {
    return await this.get(
      "/search/collections?page=1&query=nature",
      {},
      {
        headers: {
          "Accept-Version": "v1",
          "Access-Control-Allow-Origin": "*",
          Authorization:
            "Client-ID -QUGRRngEhuOPcct3E7Crph_s4lUnuu0uK96A6hPyf0",
          "Content-Type": "application/json",
        },
      }
    );
  }
}

class MainNewsData extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = "https://newsapi.org/v2";
  }
  async getMainCryptoNews() {
    return await this.get(
      "/everything?q=cryptocurrency, crypto&sortBy=relevancy&apiKey=906ae3787b214febbb021e4737277943&language=en"
    );
  }

  async getMainGeneralNews() {
    return await this.get(
      "/top-headlines?apiKey=906ae3787b214febbb021e4737277943&language=en&country=gb"
    );
  }
}

class ShortCryptoNews extends RESTDataSource {
  constructor() {
    super();
    this.baseURL =
      "https://cryptopanic.com/api/v1/posts/?auth_token=b873abe3fe7cee07d9efa9c51f40316c68d970ed";
  }
  async getShortCryptoNews() {
    return await this.get(
      "/?auth_token=b873abe3fe7cee07d9efa9c51f40316c68d970ed"
    );
  }
}

class CoinData extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = "https://api.coingecko.com/api/v3/coins";
  }
  async getCoinData() {
    return await this.get(
      "/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false"
    );
  }

  async getExtraCoinData() {
    return await this.get(
      "/markets?vs_currency=usd&ids=hex%2C%20thorchain%2C%20fantom&order=market_cap_desc&per_page=100&page=1&sparkline=false"
    );
  }

  async getCoinPriceHistory(
    coin: string = "bitcoin",
    timeframe: string = "yesterday"
  ) {
    let currentDate = moment().unix();

    let data: {} = {};

    const timeframes: Record<string, number> = {
      yesterday: moment().subtract(1, "days").unix(),
      sevenDays: moment().subtract(1, "weeks").unix(),
      oneMonth: moment().subtract(1, "month").unix(),
      oneYearToDate: moment().startOf("year").unix(),
      oneYear: moment().subtract(1, "years").unix(),
      fiveYears: moment().subtract(5, "years").unix(),
      All: 0,
    };

    //for (const timeframe in timeframes) {
    const response = await this.get(
      `/${coin}/market_chart/range?vs_currency=usd&from=${timeframes[timeframe]}&to=${currentDate}`
    );

    data = response.prices.map((x: number[]) => {
      return {
        priceDate: x[0],
        price: x[1],
      };
    });
    return data;
  }
}

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.

// define the schema type definition
const typeDefs = gql`
  type CoverPhoto {
    urls: Urls
    user: Name
  }

  type Urls {
    full: String
  }

  type Name {
    name: String
  }

  type Articles {
    author: String
    title: String
    url: String
    urlToImage: String
    content: String
  }

  type Results {
    title: String
    url: String
    slug: String
  }

  type Coin {
    id: String
    symbol: String
    name: String
    image: String
    current_price: Float
    total_volume: Float
    high_24h: Float
    low_24h: Float
    price_change_24h: Float
    price_change_percentage_24h: Float
    ath: Float
  }

  type DatePrice {
    priceDate: Float
    price: Float
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).
  type Query {
    backgroundImage: CoverPhoto
    generalNews: [Articles]
    mainCryptoNews: [Articles]
    shortCryptoNews: [Results]
    coinData: [Coin]
    coinPriceHistory(coin: String, timeframe: String): [DatePrice]
  }
`;

// Resolvers define the technique for fetching the types defined in the
// schema. This resolver retrieves books from the "books" array above.

// create the resolvers
const resolvers = {
  Query: {
    backgroundImage: async (_: any, __: any, { dataSources }: any) => {
      return dataSources.ImageData.getBackgroundImageData().then(
        (x: { results: [{ tags: any }] }) => {
          console.log(x);

          return x.results[0].tags[0].source.cover_photo;
        }
      );
    },
    generalNews: async (_: any, __: any, { dataSources }: any) => {
      return dataSources.MainNewsData.getMainGeneralNews().then(
        (x: { articles: [] }) => {
          return x.articles;
        }
      );
    },
    mainCryptoNews: async (_: any, __: any, { dataSources }: any) => {
      return dataSources.MainNewsData.getMainCryptoNews().then(
        (x: { articles: [] }) => {
          return x.articles;
        }
      );
    },
    shortCryptoNews: async (parent: any, __: any, { dataSources }: any) => {
      return dataSources.ShortCryptoNews.getShortCryptoNews().then(
        (x: { results: [] }) => {
          return x.results;
        }
      );
    },
    coinData: async (parent: any, __: any, { dataSources }: any) => {
      return dataSources.CoinData.getCoinData()
        .then((x: []) => {
          // console.log(x.filter((x: {}, i: number) => i <= 5));
          return x
            .filter((x: {}, i: number) => i <= 5)
            .filter(
              (x: { name: string }) =>
                x.name !== "Tether" && x.name !== "USD Coin"
            );
        })
        .then((x: []) => {
          return dataSources.CoinData.getExtraCoinData().then((y: []) => {
            console.log("xxxx");
            return [...x, ...y];
          });
        });
    },

    coinPriceHistory: async (
      _: any,
      args: any,
      { dataSources }: any,
      info: any
    ) => {
      return dataSources.CoinData.getCoinPriceHistory(
        info.variableValues.coin,
        info.variableValues.timeframe
      ).then((x: [{}]) => {
        return x;
      });
    },
  },
};

// todo break up file

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.

// define the Apollo Server instance
const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true,
  dataSources: () => {
    return {
      ImageData: new ImageData(),
      MainNewsData: new MainNewsData(),
      ShortCryptoNews: new ShortCryptoNews(),
      CoinData: new CoinData(),
    };
  },
});

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
