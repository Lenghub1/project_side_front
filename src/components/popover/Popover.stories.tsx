import type { Meta, StoryObj } from "@storybook/react";

import { useState } from "react";
import CP from "..";
import Component from "./Popover";

const meta: Meta<typeof Component> = {
  title: "Popover",
  component: Component,
  tags: ["autodocs"],
  argTypes: {}
};

export default meta;
type Story = StoryObj<typeof Component>;

export const Popover = () => {
  const [isPopover, setIsPopover] = useState<{
    open: boolean;
    direction: "right" | "left" | "bottom";
  }>({
    open: false,
    direction: "left"
  });

  const openPopover = (direction: "right" | "left" | "bottom") => {
    setIsPopover({ open: true, direction: direction });
  };

  return (
    <CP.Styled.Flex>
      <CP.Button onClick={() => openPopover("right")}>right</CP.Button>
      <CP.Button onClick={() => openPopover("left")}>left</CP.Button>
      <CP.Button onClick={() => openPopover("bottom")}>bottom</CP.Button>

      <CP.Popover
        open={isPopover.open}
        direction={isPopover.direction}
        onClose={() => setIsPopover({ ...isPopover, open: false })}
      >
        <CP.Styled.Div padding={"10px"} width="60vw" height="30vw">
          <h1> {isPopover.direction} </h1>
        </CP.Styled.Div>
      </CP.Popover>
    </CP.Styled.Flex>
  );
};
