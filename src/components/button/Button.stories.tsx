import type { Meta, StoryObj } from "@storybook/react";

import Component from "./Button";

const meta: Meta<typeof Component> = {
  title: "Button",
  component: Component,
  tags: ["autodocs"],
  argTypes: {
    children: {
      control: "text",
      defaultValue: "Button",
      description:
        "Buttons allow users to take actions, and make choices, with a single tap."
    },
    variant: {
      control: "select",
      options: ["contained", "outlined", "text"],
      defaultValue: "contained",
      description:
        "The Button component comes with 4 different variants that you can change it using the variant prop."
    },
    size: {
      control: "select",
      options: ["small", "medium", "large"],
      defaultValue: "medium",
      description:
        "The Button component comes with 3 different sizes that you can change it using the size prop."
    },

    fullWidth: {
      control: "boolean",
      defaultValue: false,
      options: [true, false]
    },

    color: {
      control: { type: "select" },
      defaultValue: "primary",
      options: [
        "primary",
        "secondary",
        "accent",
        "success",
        "info",
        "warning",
        "error"
      ]
    }
  }
};

export default meta;
type Story = StoryObj<typeof Component>;

export const Button: Story = {
  args: {
    children: "Button",
    variant: "contained",
    color: "primary"
  }
};
