import React from "react";
import { shallow, mount } from "enzyme";
import { render, screen } from "@testing-library/react";

import CloseButton from "./CloseButton";
import userEvent from "@testing-library/user-event";
import SingleCard from "../SingleCard";

test("CloseButton component renders without crashing", () => {
  shallow(<CloseButton />);
});
