import CP from "@/components";

export interface ErrorProps {
  message: string;
  status: number;
  asset?: string;
}

const Error = ({ message, status, asset }: ErrorProps) => {
  return (
    <CP.Container>
      <CP.Typography variant="h1">{message}</CP.Typography>
      <CP.Typography variant="subtitle1">{status}</CP.Typography>
      {asset && (
        <CP.Styled.Div>
          <img src={asset} alt={message} />
        </CP.Styled.Div>
      )}
    </CP.Container>
  );
};

export default Error;
