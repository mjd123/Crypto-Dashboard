import React from "react";
import { shallow, mount } from "enzyme";
import Time from "./Time";

import toJson from "enzyme-to-json";
import { Wrapper, Text } from "./styles";
import moment from "moment";

test("time renders time with given string", () => {
  const component = mount(<Time />);

  console.log(component);
  const text = component.find("span").text();

  expect(text).toEqual(moment().format("HH:mm:ss"));
  expect(typeof text).toBe("string");
});
