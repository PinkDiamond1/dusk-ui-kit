# Dusk UI Kit - Organism - Table

[![Storybook](https://img.shields.io/badge/Storybook-Component_Playground-%23FF4785?style=flat&logo=storybook)](https://dusk-network.github.io/dusk-ui-kit/?path=/story/components-atoms-table)
[![Docs](https://img.shields.io/badge/Documentation-%235E35CF?style=flat)](https://dusk-network.github.io/dusk-ui-kit/docs/components/atoms/table)

## Installation

```
npm i -D @dusk-network/table
```

## Usage

<!-- MARKDOWN-AUTO-DOCS:START (CODE:src=../../../examples/src/organisms/table/Table_01.svelte) -->
<!-- The below code snippet is automatically added from ../../../examples/src/organisms/table/Table_01.svelte -->
```svelte
<script>
  import Table, { Row, Datum } from "@dusk-network/table";
  import { useQuery } from "@sveltestack/svelte-query";
  import { apiData } from "./data.js";

  const settings = {
    sortable: true,
    rowsPerPage: 10,
    infinite: true,
    limiter: true,
  };

  let rows;

  async function getTransactions() {
    return apiData;
  }

  const transactions = useQuery("content", getTransactions);
</script>

{#if $transactions.isLoading}
  <p>Loading...</p>
{:else if $transactions.isError}
  <p>Error: {$transactions.error}</p>
{:else}
  <Table
    data="{$transactions.data}"
    bind:dataRows="{rows}"
    settings="{settings}"
    mobileBreakpoint="lg"
  >
    <h3 slot="title">Recent transactions</h3>
    <thead slot="head">
      {#if rows}
        {#each $rows as _}
          <Row type="head">
            <Datum key="id">ID</Datum>
            <Datum key="first_name">Status</Datum>
            <Datum key="last_name">Time</Datum>
            <Datum key="email">Amount</Datum>
          </Row>
        {/each}
      {/if}
    </thead>
    <tbody>
      {#if rows}
        {#each $rows as row}
          <Row info="{true}">
            <Datum>{row.id}</Datum>
            <Datum>
              {row.status}
            </Datum>
            <Datum>
              {row.timeStamp}
            </Datum>
            <Datum>
              {row.amount}
            </Datum>
          </Row>
        {/each}
      {/if}
    </tbody>
  </Table>
{/if}
```
<!-- MARKDOWN-AUTO-DOCS:END -->
