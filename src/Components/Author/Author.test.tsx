import { mount } from "enzyme";
import Author from "./Author";

test("Author renders", () => {
  const wrapper = mount(<Author />);
  expect(wrapper.html()).not.toBe(null);
});

test("Author renders props", () => {
  const wrapper = mount(<Author name={"name"} />);
  expect(wrapper.html()).not.toBe(null);
  expect(wrapper.find("span").text()).toContain("name");
});
