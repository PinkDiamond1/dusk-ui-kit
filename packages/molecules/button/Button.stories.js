import { action } from "@storybook/addon-actions";
import { variants, sizes, icons } from "@dusk-network/helpers";
import DefaultView from "./storybook-views/Default.svelte";
import Button from "@dusk-network/button";

export const actionsData = {
  onClick: action("onClick fired"),
};

export default {
  title: `Components/Molecules/Button`,
  component: Button,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    onClick: { action: "onClick" },
    variant: {
      control: {
        type: "select",
        options: Object.values(variants.BUTTON),
      },
    },
    size: {
      control: {
        type: "radio",
        options: Object.values(sizes.BUTTON),
      },
    },
    circle: {
      control: {
        type: "boolean",
        options: [true, false],
      },
    },
    block: {
      control: {
        type: "boolean",
        options: [true, false],
      },
    },
    href: {
      control: {
        type: "text",
      },
    },
    buttonText: {
      table: {
        disable: true,
      },
    },
    icon: {
      table: {
        disable: true,
      },
    },
  },
};

const Template = (args) => ({
  Component: DefaultView,
  props: {
    ...args,
  },
  on: {
    ...actionsData,
  },
});

export const Basic = Template.bind({});
Basic.args = {
  variant: variants.BUTTON.BRAND,
  size: sizes.BUTTON.LARGE,
  buttonText: "Hi I'm a Button",
  outline: false,
  block: false,
  context: null,
};

export const WithIcon = Template.bind({});
WithIcon.args = {
  variant: variants.BUTTON.BRAND,
  size: sizes.BUTTON.LARGE,
  buttonText: null,
  outline: false,
  context: null,
  icon: icons.PLUS_CIRCLE_OUTLINE,
};

export const WithIconAndText = Template.bind({});
WithIconAndText.args = {
  variant: variants.BUTTON.BRAND,
  size: sizes.BUTTON.LARGE,
  buttonText: "Hi I'm a Button with an icon",
  outline: false,
  context: null,
  icon: icons.PLUS_CIRCLE_OUTLINE,
};
