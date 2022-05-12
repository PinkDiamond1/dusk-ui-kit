<script>
  import { Meta, Story } from "@storybook/addon-svelte-csf";
  // import results from "../../../../.jest-test-results.json";
  // import { withTests } from "@storybook/addon-jest";
  import DropDown from "@dusk-network/drop-down";
  import meta from "../../meta.js";

  // console.log(meta('atoms/drop-down/DropDown'));
</script>

<Meta
  title="Components/Atoms/Drop Down"
  parameters="{{
    layout: 'centered',
    docs: {
      source: {
        type: 'code',
      },
    },
    jest: ['packages/atoms/drop-down/DropDown.test.js'],
  }}"
  component="{DropDown}"
  argTypes="{meta('atoms/drop-down/DropDown', {
    onSelect: {
      action: 'onSelect',
    },
  })}"
/>

<Story
  name="Standard drop down"
  args="{{ options: ['option 1', 'option 2', 'option 3', 'option 4', 'option 5'] }}"
  let:args
>
  <DropDown {...args} on:select="{args.onSelect}" />
</Story>

<Story
  name="Standard drop up"
  args="{{ dropUp: true, options: ['option 1', 'option 2', 'option 3', 'option 4', 'option 5'] }}"
  let:args
>
  <DropDown {...args} on:select="{args.onSelect}" />
</Story>

<Story
  name="Using array of objects"
  args="{{
    options: [
      { name: 'option 1' },
      { name: 'option 2' },
      { name: 'option 3' },
      { name: 'option 4' },
      { name: 'option 5' },
    ],
  }}"
  let:args
>
  <DropDown {...args} on:select="{args.onSelect}" />
</Story>

<Story name="No options" args="{{ options: [] }}" let:args>
  <DropDown {...args} on:select="{args.onSelect}" />
</Story>
