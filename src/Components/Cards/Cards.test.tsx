import React from "react";
import { shallow, mount } from "enzyme";
import Cards from "./Cards";
import useFetch from "../../hooks/useFetchData";

import toJson from "enzyme-to-json";
import SingleCard from "./SingleCard/SingleCard";

const mockData = [
  {
    id: "bitcoin",
    symbol: "btc",
    name: "Bitcoin",
    image:
      "https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1547033579",
    current_price: 61173,
    market_cap: 1153049002571,
    market_cap_rank: 1,
    fully_diluted_valuation: 1284097717417,
    total_volume: 43757353911,
    high_24h: 61406,
    low_24h: 58369,
    price_change_24h: 2515.05,
    price_change_percentage_24h: 4.28768,
    market_cap_change_24h: 46031325301,
    market_cap_change_percentage_24h: 4.15814,
    circulating_supply: 18856843,
    total_supply: 21000000,
    max_supply: 21000000,
    ath: 67277,
    ath_change_percentage: -9.11356,
    ath_date: "2021-10-20T14:54:17.702Z",
    atl: 67.81,
    atl_change_percentage: 90073.1045,
    atl_date: "2013-07-06T00:00:00.000Z",
    roi: null,
    last_updated: "2021-10-28T12:11:07.552Z",
  },
];

jest.mock("../../hooks/useFetchData", () => ({
  __esModule: true,
  default: () => mockData,
}));

describe("Card wont fail without component", () => {
  const component = mount(<Cards />);
  test("Cards component renders without crashing", () => {
    const children = component.find("Wrapper");

    expect(children).toHaveLength(1);
  });
});
