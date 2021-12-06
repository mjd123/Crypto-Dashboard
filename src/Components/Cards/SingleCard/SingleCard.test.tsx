import { getByTestId, render, screen, within } from "@testing-library/react";
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

test("simple SingleCard component data", () => {
  const wrapper = mount(
    <SingleCard
      expanded={false}
      // history={mockData.history}
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
      keyId={0}
    />
  );

  //console.log(wrapper.debug());
  expect(wrapper.find("span").at(0).text()).toContain(mockData.text);
  expect(wrapper.find("span").at(1).text()).toContain(
    mockData.symbol.toLocaleUpperCase()
  );
  expect(wrapper.find("span").at(2).text()).toContain(mockData.price);
  expect(wrapper.find("span").at(3).text()).toContain(
    mockData.priceChange.toFixed(2)
  );
});

test("complex SingleCard component data", () => {
  render(
    <SingleCard
      expanded={true}
      // history={mockData.history}
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
      keyId={0}
    />
  );

  //screen.debug();
  expect(screen.getByTestId("card")).toHaveClass("expanded");
  expect(
    screen.getByText(mockData.symbol.toLocaleUpperCase())
  ).toBeInTheDocument();
  expect(screen.getByTestId("card")).toHaveTextContent(`$${mockData.price}`);
  expect(
    screen.getByText(`+${mockData.priceChange.toFixed(2)}%`)
  ).toBeInTheDocument();
  expect(screen.getByAltText("coin")).toHaveAttribute(
    "src",
    mockData.coinImage
  );
});
