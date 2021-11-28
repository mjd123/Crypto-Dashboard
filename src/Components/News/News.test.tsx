import React from "react";
import { shallow, mount } from "enzyme";
import News from "./News";
import { Wrapper, Text } from "./styles";
import NewsProps from "./News";
import SingleNews from "./SingleNews/SingleNews";

// it("News renders without crashing", () => {
//   const mockData = {};
//   shallow(<News data={mockData} />);
// });

const mockData: any = {
  data: {
    topHeadlines: [
      {
        author: "Kris Holt",
        content:
          "Steam\r\n will no longer allow games that enable NFT\r\n (non-fungible token) and cryptocurrency\r\n trading through the blockchain. Steam's onboarding page\r\n for Steamworks users and partners now states t… [+1866 chars]",
        description:
          "Steam\r\n will no longer allow games that enable NFT\r\n (non-fungible token) and cryptocurrency\r\n trading through the blockchain. Steam's onboarding page\r\n for Steamworks users and partners now states that they shouldn't publish \"applications built on blockchain…",
        publishedAt: "2021-10-15T16:50:38Z",
        source: { id: "engadget", name: "Engadget" },
        title: "Steam bans games that allow cryptocurrency and NFT trading",
        url: "https://www.engadget.com/steam-ban-cryptocurrency-nft-trading-blockchain-valve-165038811.html",
        urlToImage:
          "https://s.yimg.com/os/creatr-uploaded-images/2021-09/a64ad380-122e-11ec-a13f-6c721f5bbb12",
      },
    ],
    shortHeadlines: {
      author: "Kris Holt",
      content:
        "Steam\r\n will no longer allow games that enable NFT\r\n (non-fungible token) and cryptocurrency\r\n trading through the blockchain. Steam's onboarding page\r\n for Steamworks users and partners now states t… [+1866 chars]",
      description:
        "Steam\r\n will no longer allow games that enable NFT\r\n (non-fungible token) and cryptocurrency\r\n trading through the blockchain. Steam's onboarding page\r\n for Steamworks users and partners now states that they shouldn't publish \"applications built on blockchain…",
      publishedAt: "2021-10-15T16:50:38Z",
      source: { id: "engadget", name: "Engadget" },
      title: "Steam bans games that allow cryptocurrency and NFT trading",
      url: "https://www.engadget.com/steam-ban-cryptocurrency-nft-trading-blockchain-valve-165038811.html",
      urlToImage:
        "https://s.yimg.com/os/creatr-uploaded-images/2021-09/a64ad380-122e-11ec-a13f-6c721f5bbb12",
    },
    cryptoHeadlines: {
      author: "Kris Holt",
      content:
        "Steam\r\n will no longer allow games that enable NFT\r\n (non-fungible token) and cryptocurrency\r\n trading through the blockchain. Steam's onboarding page\r\n for Steamworks users and partners now states t… [+1866 chars]",
      description:
        "Steam\r\n will no longer allow games that enable NFT\r\n (non-fungible token) and cryptocurrency\r\n trading through the blockchain. Steam's onboarding page\r\n for Steamworks users and partners now states that they shouldn't publish \"applications built on blockchain…",
      publishedAt: "2021-10-15T16:50:38Z",
      source: { id: "engadget", name: "Engadget" },
      title: "Steam bans games that allow cryptocurrency and NFT trading",
      url: "https://www.engadget.com/steam-ban-cryptocurrency-nft-trading-blockchain-valve-165038811.html",
      urlToImage:
        "https://s.yimg.com/os/creatr-uploaded-images/2021-09/a64ad380-122e-11ec-a13f-6c721f5bbb12",
    },
  },
};

test("News renders without crashing", () => {
  const mockData = {};
  expect(shallow(<News data={mockData} />)).toMatchSnapshot();
});

test(" News component accepts props", () => {
  const wrapper = mount(<News data={mockData} />);

  expect(wrapper.props().topHeadlines).toEqual(mockData.topHeadlines);
});

test(" News component renders without props", () => {
  const emptyMockData: any = {
    data: {
      topHeadlines: [{}],
      shortHeadlines: {},
      cryptoHeadlines: {},
    },
  };
  const wrapper = mount(<News data={emptyMockData} />);

  expect(wrapper.props().data.data.topHeadlines).toEqual([{}]);
});
