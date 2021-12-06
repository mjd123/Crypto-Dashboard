import { mount } from "enzyme";
import Loading from "./Loading";

test("Loading renders if props true", () => {
  const wrapper = mount(<Loading loading={true} />);

  expect(wrapper.html()).not.toBe(null);
});

test("Loading doesnt render if props false", () => {
  const wrapper = mount(<Loading loading={false} />);

  expect(wrapper.html()).toBe(null);
});
