import React from "react";
import { shallow, mount } from "enzyme";
import News from "./News";
import { getByText, render, screen, waitFor } from "@testing-library/react";

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

test(" News component accepts props", async () => {
  const { container } = render(<News data={mockData.data} />);
  await waitFor(() => {
    expect(container.getElementsByClassName("ant-spin-dot").length).toBe(1);
  });
});

test(" News component renders without props", async () => {
  const { container } = render(<News />);
  expect(container.getElementsByClassName("ant-spin-dot").length).toBe(0);
});
