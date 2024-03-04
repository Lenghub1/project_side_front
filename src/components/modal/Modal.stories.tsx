import type { Meta, StoryObj } from "@storybook/react";

import Component from "./Modal";

const meta: Meta<typeof Component> = {
  title: "Modal",
  component: Component,
  tags: ["autodocs"],
  argTypes: {}
};

export default meta;
type Story = StoryObj<typeof Component>;

export const Modal: Story = {
  args: {}
};
