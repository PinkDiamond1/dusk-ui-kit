<script>
  import { Meta, Story } from "@storybook/addon-svelte-csf";
  // import { variants, states } from "@dusk-network/helpers";
  import Template from "@dusk-network/explorer-detail";
  // import results from "../../../../../.jest-test-results.json";
  // import { withTests } from "@storybook/addon-jest";
  import Navbar from "../_Navbar.svelte";
  import Footer from "../_Footer.svelte";
  import Card from "@dusk-network/card";
  import Content from "@dusk-network/content";
  import Search from "../_Search.svelte";
  import Breadcrumb, { Item } from "@dusk-network/breadcrumb";
  import SkeletonLoader from "@dusk-network/skeleton-loader";
  import Icon from "@dusk-network/icon";
  import TruncateText from "@dusk-network/truncate-text";
  import Table, { Row, Datum } from "@dusk-network/table";
  import "../../../i18n.svelte";
  import meta from "../../../meta";
  import { transactions } from "./data.js";
  import { number } from "svelte-i18n";

  // JSON.parse(latest.data);

  const transaction = JSON.parse(transactions).data.transactions;
  const transactionSettings = {
    sortable: false,
    rowsPerPage: 10,
    pagination: true,
    limiter: false,
  };

  let transactionRows;
</script>

<Meta
  title="Pages/Explorer/All Transactions"
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
      <Table
        class="explorer-homepage__blocks"
        data="{transaction}"
        settings="{transactionSettings}"
        bind:dataRows="{transactionRows}"
      >
        <div slot="title">
          <Breadcrumb href="javascript:;" on:exit="{() => {}}">
            <Item>Transactions</Item>
          </Breadcrumb>
        </div>
        <thead slot="head">
          <Row type="head">
            <Datum cols="4"><Icon name="pound-box-outline" /> <span>Transaction Hash</span></Datum>
            <Datum cols="1"><Icon name="cube-outline" /> <span>Block</span></Datum>
            <Datum cols="1">Method</Datum>
            <Datum cols="2"><Icon name="timer-sand" /> <span>Age</span></Datum>
            <Datum cols="2"><Icon name="crown-outline" /> <span>Reward</span></Datum>
            <Datum cols="2"><abbr title="Paid Transaction Fee">Tx Fee Paid</abbr></Datum>
          </Row>
        </thead>
        <tbody>
          {#if transactionRows}
            {#each $transactionRows as transaction}
              {#if transaction}
                <Row on:click="{() => alert('Row clicked')}">
                  {#if transaction}
                    <Datum cols="4">
                      <a
                        style="display:flex;column-gap: 8px"
                        href="{`/transaction?id=${transaction.blockhash}/details`}"
                      >
                        <Icon name="eye-circle-outline" />
                        <TruncateText width="quarter" text="{transaction.blockhash}" />
                      </a>
                    </Datum>
                    <Datum cols="1">??</Datum>
                    <Datum cols="1">
                      {transaction.txtype}
                    </Datum>
                    <Datum cols="2">??</Datum>
                    <Datum cols="2">??</Datum>
                    <Datum cols="2">
                      {$number(transaction.feepaid)}
                    </Datum>
                  {/if}
                </Row>
              {/if}
            {/each}
          {:else}
            <Row>
              <Datum cols="12">
                <span class="color-purple-500">No transactions found.</span>
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
        height="578px"
        extraSmallScreenHeight="578px"
        smallScreenHeight="578px"
        mediumScreenHeight="578px"
        largeScreenHeight="578px"
        extraLargeScreenHeight="578px"
        jumboScreenHeight="578px"
      />
    </svelte:fragment>
    <svelte:fragment slot="footer">
      <Footer />
    </svelte:fragment>
  </Template>
</Story>
