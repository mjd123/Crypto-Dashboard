import { Spin } from "antd";

interface LoadingProps {
  loading?: boolean;
}

const Loading = ({ loading }: LoadingProps) => {
  return (
    <>
      {loading && (
        <Spin
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 2,
          }}
        />
      )}
    </>
  );
};

export default Loading;
