import React from "react";
import { mount, shallow } from "enzyme";
import Time from "./Time";

test("time renders time with given string", () => {
  const component = mount(<Time />);
  const text = component.find("span").text();
  expect(typeof text).toBe("string");
});
