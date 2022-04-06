<script>
  import { Meta, Story } from "@storybook/addon-svelte-csf";
  // import { variants, states } from "@dusk-network/helpers";
  import Template from "@dusk-network/explorer-detail";
  // import results from "../../../../../.jest-test-results.json";
  // import { withTests } from "@storybook/addon-jest";
  import Navbar from "../_Navbar.svelte";
  import Footer from "../_Footer.svelte";
  import Search from "../_Search.svelte";
  import Card from "@dusk-network/card";
  import Content from "@dusk-network/content";
  import Breadcrumb, { Item } from "@dusk-network/breadcrumb";
  import SkeletonLoader from "@dusk-network/skeleton-loader";
  import Icon from "@dusk-network/icon";
  import DateText from "@dusk-network/date-text";
  import Table, { Row, Datum } from "@dusk-network/table";
  import meta from "../../../meta";
  import "../../../i18n.svelte";
  import { blocks as blockData } from "./data.js";
  import { number } from "svelte-i18n";

  // JSON.parse(latest.data);

  const blocks = JSON.parse(blockData).data.blocks;
  const blockSettings = {
    sortable: false,
    rowsPerPage: 10,
    pagination: true,
    limiter: false,
  };

  let blockRows;
</script>

<Meta
  title="Pages/Explorer/All Blocks"
  component="{Template}"
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
    // jest: ['packages/templates/explorer-list/ExplorerList.test.js'],
  }}"
  argTypes="{meta('templates/explorer-list/ExplorerList', {})}"
/>

<Story name="Loaded State" args="{{}}" let:args>
  <Template>
    <svelte:fragment slot="navbar">
      <Navbar />
    </svelte:fragment>
    <svelte:fragment slot="detail-details">
      <Card>
        <Content>
          <Search />
        </Content>
      </Card>
    </svelte:fragment>
    <svelte:fragment slot="detail-list">
      <Table data="{blocks}" settings="{blockSettings}" bind:dataRows="{blockRows}">
        <div slot="title">
          <Breadcrumb href="javascript:;" on:exit="{() => {}}">
            <Item>Blocks</Item>
          </Breadcrumb>
        </div>
        <thead slot="head">
          <Row type="head">
            <Datum cols="1"><Icon name="cube-outline" /> <span>Block</span></Datum>
            <Datum cols="2"><Icon name="timer-sand" /> <span>Finalised</span></Datum>
            <Datum cols="2"><Icon name="gas-station-outline" /> <span>Gas used</span></Datum>
            <Datum cols="2"><Icon name="gas-limit" /> <span>Gas limit</span></Datum>
            <Datum cols="2"><Icon name="gas-average" /> <span>Gas avg. price</span></Datum>
            <Datum cols="1"><abbr title="Transactions">#Txns</abbr></Datum>
            <Datum cols="2"><Icon name="crown-outline" /> <span>Reward</span></Datum>
          </Row>
        </thead>
        <tbody>
          {#if blockRows}
            {#each $blockRows as block}
              <Row on:click="{() => alert('Row clicked')}">
                {#if block}
                  <Datum cols="1">
                    <a
                      style="display:flex;column-gap: 8px"
                      href="{`/block?id=${block.header.hash}/details`}"
                    >
                      <Icon name="eye-circle-outline" /> <span>{block.header.height}</span>
                    </a>
                  </Datum>
                  <Datum cols="2">
                    <DateText time="{block.header.timestamp}" />
                  </Datum>
                  <Datum cols="2">
                    {$number(block.transactions[0].gasprice)}
                  </Datum>
                  <Datum cols="2">
                    {$number(block.transactions[0].gaslimit)}
                  </Datum>
                  <Datum cols="2">??</Datum>
                  <Datum cols="1">
                    {block.transactions.length}
                  </Datum>
                  <Datum cols="2">
                    {$number(block.header.reward)}
                  </Datum>
                {/if}
              </Row>
            {/each}
          {:else}
            <Row>
              <Datum cols="12">
                <span class="color-purple-500">No blocks found.</span>
              </Datum>
            </Row>
          {/if}
        </tbody>
      </Table>
    </svelte:fragment>
    <svelte:fragment slot="footer">
      <Footer />
    </svelte:fragment>
  </Template>
</Story>

<Story name="Loading State" args="{{}}" let:args>
  <Template>
    <svelte:fragment slot="navbar">
      <Navbar />
    </svelte:fragment>
    <svelte:fragment slot="list">
      <SkeletonLoader
        rounded="{true}"
        height="602px"
        extraSmallScreenHeight="602px"
        smallScreenHeight="602px"
        mediumScreenHeight="602px"
        largeScreenHeight="602px"
        extraLargeScreenHeight="602px"
        jumboScreenHeight="602px"
      />
    </svelte:fragment>
    <svelte:fragment slot="footer">
      <Footer />
    </svelte:fragment>
  </Template>
</Story>
