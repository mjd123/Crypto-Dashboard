import { Carousel, Col, Row } from "antd";

export interface CardRowProps {}

export const CardRow: React.FC<CardRowProps> = ({ children }) => {
  return <Row>{children}</Row>;
};

export default CardRow;
