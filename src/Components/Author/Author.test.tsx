import React from "react";
import { shallow, mount } from "enzyme";
import Author from "./Author";
import { Wrapper, Text } from "./styles";
import toJson from "enzyme-to-json";

test("Author renders time with given string", () => {
  const mockProps = {
    name: "string",
  };
  const component = mount(<Author name={mockProps.name} />);
  const text = component.find("span").text();

  expect(typeof text).toBe("string");
  expect(text).toEqual("Photo by: string");
});
