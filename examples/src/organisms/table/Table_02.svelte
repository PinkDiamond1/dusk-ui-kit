<script>
  import Table, { Row, Datum } from "@dusk-network/table";
  import Icon from "@dusk-network/icon";
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
            <Datum key="id">
              <Icon name="key-outline" />
              ID</Datum
            >
            <Datum key="first_name">Status</Datum>
            <Datum key="last_name">Time</Datum>
            <Datum key="email">Amount</Datum>
            <Datum hidden="{true}" />
          </Row>
        {/each}
      {/if}
    </thead>
    <tbody>
      {#if rows}
        {#each $rows as row, i}
          <Row
            active="{i === 2 ? true : false}"
            info="{true}"
            data="{row}"
            on:selected="{(event) => console.log(event.detail)}"
          >
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
          <Row hidden="{true}">
            <Datum colspan="4">
              <p>Extra information</p>
            </Datum>
          </Row>
        {/each}
      {/if}
    </tbody>
  </Table>
{/if}
