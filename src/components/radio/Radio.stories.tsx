import type { Meta, StoryObj } from "@storybook/react";

import Component from "./Radio";

const meta: Meta<typeof Component> = {
  title: "Radio",
  component: Component,
  tags: ["autodocs"],
  argTypes: {}
};

export default meta;
type Story = StoryObj<typeof Component>;

export const Radio: Story = {
  args: {
    list: [
      { label: "A", value: "a" },
      { label: "B", value: "b" }
    ]
  }
};
