import { mount } from "enzyme";
import DateButtons from "./DateButtons";

const mockData = { timeframe: "1D", timeframeData: jest.fn() };
const component = mount(
  <DateButtons
    timeframe={mockData.timeframe}
    timeframeData={mockData.timeframeData}
  />
);
describe("passing props", () => {
  test("DateButtons accepts props", () => {
    expect(typeof component.props().timeframe).toBe("string");
  });
});

describe("click", () => {
  test("DateButtons accepts click", () => {
    component.simulate("click");

    expect(mockData.timeframeData).toHaveBeenCalled();
  });
});
