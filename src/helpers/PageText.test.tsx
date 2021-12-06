import { shallow, mount } from "enzyme";
import { PageText } from "./PageText";

test("PageTest renders data", () => {
  const wrapper = shallow(<PageText className="class">{"text"}</PageText>);
  //   console.log(wrapper.debug());

  expect(wrapper.html()).not.toBe(null);
  expect(wrapper.text()).toBe("text");
  expect(wrapper.hasClass("class")).toEqual(true);
});
