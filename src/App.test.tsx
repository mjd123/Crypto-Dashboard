import React from "react";
import { shallow, mount } from "enzyme";
import App from "./App";
import { render, screen } from "@testing-library/react";
import toJson from "enzyme-to-json";
import Author from "./Components/Author/Author";
import Time from "./Components/Time/Time";
import News from "./Components/News/News";
import Cards from "./Components/Cards/Cards";

describe("renders without crashing", () => {
  test("App renders without crashing", () => {
    shallow(<App />);
  });
  test("Author renders without crashing", () => {
    shallow(<Author />);
  });
  test("Time renders without crashing", () => {
    shallow(<Time />);
  });
  test("News renders without crashing", () => {
    mount(<News />);
  });
  test("Cards renders without crashing", () => {
    mount(<Cards />);
  });
});
