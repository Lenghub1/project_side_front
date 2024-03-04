import CP from "..";
import Button from "../button";
import { Top } from "@/styles/styled";

interface ButtonProps {
  icon?: string;
  onClick?: () => void;
}
interface HeaderProps {
  title?: string;
  prefix?: ButtonProps;
  suffix?: ButtonProps;
}

const CustomHeader = ({ title, prefix, suffix }: HeaderProps) => {
  return (
    <Top bg="#fff">
      <CP.Styled.Div width="50px">
        {prefix && (
          <Button
            variant="text"
            onClick={prefix?.onClick ? prefix.onClick : () => {}}
          >
            {prefix?.icon ? prefix.icon : ""}
          </Button>
        )}
      </CP.Styled.Div>

      <CP.Typography variant="title">{title ? title : ""}</CP.Typography>

      <CP.Styled.Div width="50px">
        {suffix && (
          <Button
            variant="text"
            onClick={suffix?.onClick ? suffix.onClick : () => {}}
          >
            {suffix?.icon ? suffix.icon : ""}
          </Button>
        )}
      </CP.Styled.Div>
    </Top>
  );
};

export default CustomHeader;
