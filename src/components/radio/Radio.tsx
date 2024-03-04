import { uuid } from "@/utils/commonUtil";
import {
  Radio as MuiRadio,
  RadioProps as MuiRadioProps,
  RadioGroup
} from "@mui/material";
import CP from "..";

export interface RadioProps extends MuiRadioProps {
  list: { label?: string; value: any }[];
  onChange?: (e: any) => void;
}

const Radio = ({ list, value, onChange, ...props }: RadioProps) => {
  return (
    <CP.Styled.RadioWrapper>
      <RadioGroup
        defaultValue={
          value ? value : list?.length > 0 ? list[0]?.value : undefined
        }
        name={`radio-${uuid()}`}
        onChange={(e, checked) => (onChange ? onChange(checked) : {})}
      >
        {list?.map((item) => {
          return (
            <label>
              <p>{item.label}</p>
              <MuiRadio value={item.value} />
            </label>
          );
        })}
      </RadioGroup>
    </CP.Styled.RadioWrapper>
  );
};

export default Radio;
