import type { Meta, StoryObj } from "@storybook/react";

import Component from "./Typography";

const meta: Meta<typeof Component> = {
  title: "Typography",
  component: Component,
  tags: ["autodocs"],
  argTypes: {}
};

export default meta;
type Story = StoryObj<typeof Component>;

export const Typography: Story = {
  args: {
    children: "Hello"
  }
};
