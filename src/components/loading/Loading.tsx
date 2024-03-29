// Loading.tsx
import React from "react";
import { CircularProgress, Backdrop } from "@mui/material";

interface LoadingProps {
  isLoading: boolean;
}

const Loading: React.FC<LoadingProps> = ({ isLoading }) => {
  return (
    <Backdrop open={isLoading} style={{ zIndex: 9999 }}>
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};

export default Loading;
