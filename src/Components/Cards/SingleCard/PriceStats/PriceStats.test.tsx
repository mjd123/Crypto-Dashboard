import { mount } from "enzyme";
import PriceStats from "./PriceStats";

const mockData = { prev: 0, open: 1, volume: 2, range: { low: 0, high: 10 } };

const component = mount(
  <PriceStats
    prev={mockData.prev}
    open={mockData.open}
    volume={mockData.volume}
    range={{ low: mockData.range.low, high: mockData.range.high }}
  />
);
describe("passing props", () => {
  test("PriceStats accepts props", () => {
    expect(component.props()).toEqual(mockData);
  });
  test("PriceStats returns correct props", () => {
    for (let i = 0; i < 7; i++) {
      expect(typeof component.find("span").at(i).text()).toBe("string");
    }
  });
});
