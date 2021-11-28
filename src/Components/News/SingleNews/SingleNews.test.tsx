import React from "react";
import { shallow, mount } from "enzyme";
import SingleNews from "./SingleNews";
import toJson from "enzyme-to-json";

const mockData = {
  news: [
    {
      title: "title",
      url: "url",
      description: "description",
      urlToImage: "urlToImage",
      content: "content",
    },
  ],
};

describe("component renders", () => {
  test("SingleNews renders without crashing", () => {
    const component = shallow(<SingleNews news={mockData.news} />);
    expect(toJson(component)).toMatchSnapshot();
  });
});

describe("test props", () => {
  test("SingleNews renders props", () => {
    const component = mount(<SingleNews news={mockData.news} />);
    const value = component.find("span").text();
    //console.log(value, mockData.news[0].title);

    expect(value).toEqual(mockData.news[0].title);
  });

  test("SingleNews renders without props", () => {
    const component = mount(<SingleNews news={[{}]} />);

    expect(toJson(component)).toMatchSnapshot();
  });

  test("check the type of value", () => {
    const component = mount(<SingleNews news={mockData.news} />);
    expect(component.props().news[0].title).toMatch("title");
  });
});
