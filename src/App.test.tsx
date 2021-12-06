import { shallow, mount } from "enzyme";
import App from "./App";

test("App renders without crashing", () => {
  const wrapper = shallow(<App />);
  expect(wrapper.html()).not.toBe(null);
});
