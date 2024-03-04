import type { Meta, StoryObj } from "@storybook/react";

import Component from "./Checkbox";

const meta: Meta<typeof Component> = {
  title: "Checkbox",
  component: Component,
  tags: ["autodocs"],
  argTypes: {}
};

export default meta;
type Story = StoryObj<typeof Component>;

export const Checkbox: Story = {
  args: {
    label: "선택"
  }
};
