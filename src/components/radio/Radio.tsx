import { uuid } from "@/utils/commonUtil";
import {
  Radio as MuiRadio,
  RadioProps as MuiRadioProps,
  RadioGroup
} from "@mui/material";
import CP from "..";
import { ColorPalette } from "@/@type/common";

/**
 * * Ignore the interface warning below as we extended another color palette
 */
export interface RadioProps extends MuiRadioProps {
  list: { label?: string; value: any }[];
  onChange?: (e: any) => void;
  color?: ColorPalette;
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
              <MuiRadio value={item.value} {...props} />
              <CP.Typography color="text.secondary">{item.label}</CP.Typography>
            </label>
          );
        })}
      </RadioGroup>
    </CP.Styled.RadioWrapper>
  );
};

export default Radio;
