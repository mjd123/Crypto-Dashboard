import { Text, Wrapper } from "./styles";

interface AuthorProps {
  name?: string | undefined;
}

const Author = ({ name }: AuthorProps) => {
  return (
    <Wrapper
      className="author-wrapper"
      justifyContent="start"
      alignItems="flex-end"
    >
      {name && <Text>Photo by: {name}</Text>}
    </Wrapper>
  );
};

export default Author;
