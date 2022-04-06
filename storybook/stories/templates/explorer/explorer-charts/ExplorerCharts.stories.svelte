<script>
  import { Meta, Story } from "@storybook/addon-svelte-csf";
  import Template from "@dusk-network/explorer-charts";
  // import results from "../../../../../.jest-test-results.json";
  // import { withTests } from "@storybook/addon-jest";
  import meta from "../../../meta";
  import Placeholder from "../../_Placeholder.svelte";
</script>

<Meta
  title="Components/Templates/Explorer/Charts"
  component="{Template}"
  parameters="{{
    layout: 'fullscreen',
    docs: {
      source: {
        type: 'code',
      },
    },
    // jest: ['packages/templates/explorer-charts/ExplorerCharts.test.js'],
  }}"
  argTypes="{meta('templates/explorer-charts/ExplorerCharts', {})}"
/>

<Story name="Loaded State" args="{{}}" let:args>
  <Template>
    <svelte:fragment slot="navbar">
      <Placeholder text="Navbar" height="104px" />
    </svelte:fragment>
    <svelte:fragment slot="control-panel">
      <Placeholder text="Control Panel" height="150px" />
    </svelte:fragment>
    <svelte:fragment slot="map">
      <Placeholder text="Node Map" height="350px" />
    </svelte:fragment>
    <svelte:fragment slot="market-data">
      <Placeholder text="Market Charts" height="400px" />
    </svelte:fragment>
    <svelte:fragment slot="blockchain-data">
      <Placeholder text="Blockchain Charts" height="1000px" />
    </svelte:fragment>
    <svelte:fragment slot="footer">
      <Placeholder text="Footer" height="108px" />
    </svelte:fragment>
  </Template>
</Story>
