import { AnimatePresence, motion } from "framer-motion";
import React from "react";

interface WrapperProps {
  className?: string;
  justifyContent?: string;
  alignItems?: string;
  display?: string;
  flexDirection?: string;
  gridRow?: number;
  marginBottom?: string;
  marginRight?: string;
  marginLeft?: string;
  height?: string;
  children: React.ReactNode;
}

export const Wrapper: React.FC<WrapperProps> = ({ className, children }) => {
  return (
    <AnimatePresence>
      <motion.div
        className={className}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{
          duration: 0.3,
          ease: "easeInOut",
        }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export default Wrapper;
