import { withKnobs, boolean, select } from "@storybook/addon-knobs";
import { variants, types } from "@dusk-network/helpers";
import DefaultView from "./storybook-views/Default.svelte";
import HeadingView from "./storybook-views/Heading.svelte";
import readme from "./readme.stories.md";

const tableVariants = variants.ATOM.TABLE;
const tableVariantDefault = variants.ATOM.TABLE.LIGHT;
const tableTypes = types.ATOM.TABLE;
const tableTypeDefault = types.ATOM.TABLE.BASE;

export default {
  title: "Components/Atoms/Table",
  parameters: {
    notes: readme,
  },
  decorators: [withKnobs],
};

export const Default = () => ({
  Component: DefaultView,
  props: {
    variant: select("Variant", tableVariants, tableVariantDefault),
    type: select("Type", tableTypes, tableTypeDefault),
    fixed: boolean("Fixed Layout", false),
    striped: boolean("Striped rows", true),
  },
});

export const WithHeading = () => ({
  Component: HeadingView,
  props: {
    variant: select("Variant", tableVariants, tableVariantDefault),
    type: select("Type", tableTypes, tableTypeDefault),
    fixed: boolean("Fixed Layout", false),
    striped: boolean("Striped rows", true),
  },
});
