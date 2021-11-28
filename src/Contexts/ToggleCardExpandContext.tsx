import React, { createContext, useState } from "react";

interface ToggleCardExpandContext {
  cardStatus: number | null;
  toggleStatus: (state: number | null) => void;
}

const contextDefaultValues: ToggleCardExpandContext = {
  cardStatus: null,
  toggleStatus: (data: number | null) => {},
};

export const CardContext =
  createContext<ToggleCardExpandContext>(contextDefaultValues);

const ExpandCardProvider: React.FC = ({ children }) => {
  const [cardStatus, setCardStatus] = useState<number | null>(
    contextDefaultValues.cardStatus
  );

  const toggleStatus = (data: number | null) => setCardStatus(data);
  return (
    <CardContext.Provider
      value={{
        cardStatus,
        toggleStatus,
      }}
    >
      {children}
    </CardContext.Provider>
  );
};

export default ExpandCardProvider;
