import CP from "@/components";
import { InformationProvider, Data } from "@/utils/interfaces/Information";

const InformationForm = ({
  data,
  direction,
  fullwidth,
}: InformationProvider) => {
  const renderInputs = (data: { [key: string]: string | Data }) => {
    return Object.entries(data).map(([key, value]) => {
      if (typeof value === "string") {
        return <CP.Input key={key} value={value} />;
      } else {
        return (
          <CP.Styled.Flex>
            <CP.Input />
            {renderInputs(value)}
          </CP.Styled.Flex>
        );
      }
    });
  };

  return (
    <CP.Container>
      <CP.Styled.Flex direction="column" padding="0 0 2rem">
        {renderInputs(data)}
      </CP.Styled.Flex>
    </CP.Container>
  );
};

export default InformationForm;
