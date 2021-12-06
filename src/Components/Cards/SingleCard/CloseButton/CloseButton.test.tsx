import CloseButton from "./CloseButton";
import { mount } from "enzyme";

test("SVG should be defined", () => {
  const wrapper = mount(<CloseButton />);
  expect(wrapper.find("svg")).toBeDefined();
});

test("CloseButton accepts click", () => {
  const handleClick = jest.fn();
  const wrapper = mount(<CloseButton onClick={handleClick} />);

  wrapper.props().onClick();
  // console.log(wrapper.debug());
  expect(handleClick.mock.calls.length).toEqual(1);
});
