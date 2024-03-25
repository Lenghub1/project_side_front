import React from "react";
import CP from "@/components";

const EmployerInformation = () => {
  return (
    <CP.Container>
      <CP.Styled.Flex>
        <CP.Input label="First Name" />
        <CP.Input label="First Name" />
      </CP.Styled.Flex>
      <CP.Styled.Flex>
        <CP.Input label="Comapany Name" />
      </CP.Styled.Flex>
    </CP.Container>
  );
};

export default EmployerInformation;
