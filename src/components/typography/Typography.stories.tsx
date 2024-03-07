import type { Meta, StoryObj } from "@storybook/react";

import Component from "./Typography";

const meta: Meta<typeof Component> = {
  title: "Typography",
  component: Component,
  tags: ["autodocs"],
  argTypes: {
    children: {
      control: "text",
      defaultValue: "Typography",
      description:
        "Use typography to present your design and content as clearly and efficiently as possible."
    },
    color: {
      control: { type: "select" },
      defaultValue: "text.primary",
      options: ["text.primary", "text.secondary"]
    },
    variant: {
      control: { type: "select" },
      defaultValue: "body1",
      options: [
        "h1",
        "h2",
        "h3",
        "h4",
        "h5",
        "h6",
        "subtitle1",
        "subtitle2",
        "body1",
        "body2",
        "caption"
      ]
    }
  }
};

export default meta;
type Story = StoryObj<typeof Component>;

export const Typography: Story = {
  args: {
    children:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae, sint hic? Consequuntur officiis repellat ratione.",
    variant: "body1",
    color: "text.primary"
  }
};
