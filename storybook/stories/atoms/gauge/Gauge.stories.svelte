<script>
  import { Meta, Story } from "@storybook/addon-svelte-csf";
  // import results from "../../../../.jest-test-results.json";
  // import { withTests } from "@storybook/addon-jest";
  import Gauge from "@dusk-network/gauge";
  import meta from "../../meta.js";

  let minValue = 0;
  let maxValue = 20;
  let value = 6;
  let width = "200px";
  let tooltip = true;
</script>

<Meta
  title="Components/Atoms/Gauge"
  parameters="{{
    layout: 'centered',
    docs: {
      source: {
        type: 'code',
      },
    },
    jest: ['packages/atoms/gauge/Gauge.test.js'],
  }}"
  component="{Gauge}"
  argTypes="{meta('atoms/gauge/Gauge', {})}"
/>

<Story
  name="Default gauge"
  args="{{
    minValue: minValue,
    maxValue: maxValue,
    value: value,
    width: width,
    tooltip: tooltip,
  }}"
  let:args
>
  <Gauge {...args} />
</Story>
