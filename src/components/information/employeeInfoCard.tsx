import CP from "@/components";

export const InformationSection: React.FC<{
  title: string;
  children: React.ReactNode;
}> = ({ title, children }) => (
  <CP.Styled.Flex style={{ marginTop: "20px" }}>
    <CP.Styled.Flex
      justify="flex-start"
      items="flex-start"
      style={{ marginLeft: "20px" }}
      direction="column"
      gap="20px"
    >
      <CP.Typography variant="h6">{title}</CP.Typography>
      <CP.Styled.Flex
        justify="flex-start"
        items="flex-start"
        direction="column"
        width="100%"
        gap="20px"
      >
        {children}
      </CP.Styled.Flex>
    </CP.Styled.Flex>
  </CP.Styled.Flex>
);

export const InformationItem: React.FC<{ label: string; value: string }> = ({
  label,
  value,
}) => (
  <CP.Styled.Flex justify="flex-start" direction="column" items="flex-start">
    <CP.Typography>{label}</CP.Typography>
    <CP.Typography>{value}</CP.Typography>
  </CP.Styled.Flex>
);
