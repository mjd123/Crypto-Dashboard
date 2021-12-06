import { useContext } from "react";
import { CloseOutlined } from "@ant-design/icons";
import { CardContext } from "../../../../Contexts/ToggleCardExpandContext";

interface CloseButtonProps {
  onClick?: () => void;
}

const CloseButton: React.FC<CloseButtonProps> = (props: CloseButtonProps) => {
  const { cardStatus, toggleStatus } = useContext(CardContext);
  return (
    <CloseOutlined
      data-testid="close-button"
      style={{
        position: "absolute",
        top: "10px",
        right: "10px",
        width: "30px",
        cursor: "pointer",
      }}
      onClick={(e) => {
        toggleStatus(null);
        e.preventDefault();
        e.stopPropagation();
      }}
    />
  );
};

export default CloseButton;
