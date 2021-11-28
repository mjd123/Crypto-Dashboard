import { mount, shallow } from "enzyme";
import SingleCard from "./SingleCard";

const mockData = {
  history: {
    yesterday: [[0, 0]],
    sevenDays: [[0, 0]],
    oneMonth: [[0, 0]],
    oneYear: [[0, 0]],
    oneYearToDate: [[0, 0]],
    fiveYears: [[0, 0]],
    All: [[0, 0]],
  },
  coinImage:
    "https://assets.coingecko.com/coins/images/4128/large/Solana.jpg?1635329178",
  price: 206.29,
  priceChange: 0.30213,
  totalVolume: 2106026459,
  text: "Solana",
  symbol: "sol",
};

describe("passing props", () => {
  test("SingleCard component renders complex without crashing", () => {
    const component = shallow(
      <SingleCard
        expanded={true}
        history={mockData.history}
        coinImage={mockData.coinImage}
        price={mockData.price}
        priceChange={mockData.priceChange}
        text={mockData.text}
        symbol={mockData.symbol}
        totalVolume={mockData.totalVolume}
        dayRange={{
          low: 0,
          high: 0,
        }}
      />
    );
    expect(component).toMatchSnapshot();
  });

  test("SingleCard component renders simple without crashing", () => {
    const component = shallow(
      <SingleCard
        history={mockData.history}
        coinImage={mockData.coinImage}
        price={mockData.price}
        priceChange={mockData.priceChange}
        totalVolume={mockData.totalVolume}
        text={mockData.text}
        symbol={mockData.symbol}
      />
    );
    expect(component).toMatchSnapshot();
  });
});
