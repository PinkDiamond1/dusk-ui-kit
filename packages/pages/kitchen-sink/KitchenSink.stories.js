import {
  withKnobs,
  select,
  optionsKnob as options
} from "@storybook/addon-knobs";
import DefaultView from "./storybook-views/Default.svelte";
import readme from "./readme.stories.md";
import "@dusk/styles/tailwind.css";

export default {
  title: "Components/Pages/Kitchen Sink",
  parameters: {
    notes: readme
  },
  decorators: [withKnobs]
};

export const Default = () => ({
  Component: DefaultView
});
