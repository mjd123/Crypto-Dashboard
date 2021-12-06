import React from "react";
import { shallow, mount } from "enzyme";
import SingleNews from "./SingleNews";
import toJson from "enzyme-to-json";
import {
  getAllByTestId,
  getByTestId,
  render,
  screen,
  waitFor,
} from "@testing-library/react";

const mockData = {
  news: {
    title: "title",
    url: "url",
    description: "description",
    urlToImage: "urlToImage",
    content: "content",
  },
};

test("should render the component only when the condition passes", () => {
  const wrapper = mount(<SingleNews news={mockData.news} />);
  expect(wrapper.html()).not.toBe(null);
});

test("should return null when the condition fails", () => {
  const wrapper = mount(<SingleNews news={{}} />);
  expect(wrapper.html()).toBe(null);
});
