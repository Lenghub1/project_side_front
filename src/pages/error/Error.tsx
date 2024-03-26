import CP from "@/components";
import { predefinedError, ErrorResponse } from "./error.data";

const Error = ({ status, message, asset }: ErrorResponse) => {
  if (!message || !asset) {
    predefinedError.filter((error) => {
      if (error.status === status) {
        if (!message) message = error.message;
        if (!asset) asset = error.asset;
      }
    });
  }

  return (
    <CP.Container>
      <CP.Typography variant="h3">{message}</CP.Typography>
      <CP.Typography variant="h6">{status}</CP.Typography>
      {asset && (
        <CP.Container maxWidth="sm">
          <img src={asset} alt={message} />
        </CP.Container>
      )}
    </CP.Container>
  );
};

export default Error;
