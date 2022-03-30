<!-- import { variants } from "@dusk-network/helpers";
import Default from "./storybook-views/Default.svelte";
import Navbar from "@dusk-network/navbar";

export default {
  title: `Components/Organisms/Navbar`,
  component: Navbar,
  parameters: {
    layout: "fullscreen",
  },
  argTypes: {
    variant: {
      control: {
        type: "select",
        options: Object.values(variants.NAVBAR),
      },
    },
  },
};

const Template = (args) => ({
  Component: Default,
  props: {
    ...args,
  },
});

export const Basic = Template.bind({});
Basic.args = {
  variant: variants.NAVBAR.BRAND,
}; -->
<script>
  import { Meta, Story } from "@storybook/addon-svelte-csf";
  // import results from "../../../../.jest-test-results.json";
  // import { withTests } from "@storybook/addon-jest";
  import Navbar from "@dusk-network/navbar";
  import DropDown from "@dusk-network/drop-down";
  import Logo from "@dusk-network/logo";
  import Icon from "@dusk-network/icon";
  import Menu, { Item } from "@dusk-network/menu";
  import meta from "../../meta.js";
</script>

<Meta
  title="Components/Organisms/Navbar"
  component="{Navbar}"
  parameters="{{
    layout: 'fullscreen',
    docs: {
      source: {
        type: 'code',
      },
    },
    darkMode: {
      stylePreview: false,
    },
    // jest: ['packages/organisms/navbar/Navbar.test.js'],
  }}"
  argTypes="{meta('organisms/navbar/Navbar', {})}"
/>

<Story name="Standard navbar" args="{{}}" let:args>
  <Navbar
    appName="sb-demo"
    id="sb-example-nav"
    darkMode="{window.document.body.classList.contains('dark')}"
  >
    <svelte:fragment slot="logo">
      <Logo />
    </svelte:fragment>
    <svelte:fragment slot="networks">
      <Menu orientation="horizontal" name="Network Navigation">
        <Item>
          <DropDown options="{['Testnet', 'Mainnet']}" />
        </Item>
      </Menu>
    </svelte:fragment>
    <svelte:fragment slot="apps">
      <Menu orientation="horizontal" name="Portal Navigation">
        <Item href="javascript:;" active="{true}">Explorer</Item>
        <Item href="javascript:;">Wallet</Item>
        <Item href="javascript:;">Staking</Item>
      </Menu>
    </svelte:fragment>
    <svelte:fragment slot="links">
      <Menu orientation="horizontal" name="Developer Links">
        <Item href="https://shop.dusk.network">
          <Icon name="tshirt-crew-outline" /><span>Shop</span>
        </Item>
      </Menu>
    </svelte:fragment>
    <svelte:fragment slot="navigation">
      <Menu orientation="horizontal" name="App Navigation">
        <Item href="javascript:;">Chain Info</Item>
        <Item href="javascript:;" active>Blocks</Item>
        <Item href="javascript:;">Transactions</Item>
      </Menu>
    </svelte:fragment>
  </Navbar>
  <main id="dusk">
    <p>Some content</p>
  </main>
</Story>
