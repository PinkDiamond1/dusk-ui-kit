<script>
  import { onDestroy, setContext, getContext } from "svelte";
  import DropDown from "@dusk-network/drop-down";
  import InfiniteScroll from "./InfiniteScroll.svelte";
  import contexts from "@dusk-network/helpers/contexts.js";
  import { getTable } from "./table.js";
  import { key } from "./key.js";
  import { createContext } from "./context.js";
  import "./styles.css";

  /**
   * Sets the data displayed in the Table.
   */
  export let data = [];

  /**
   * Sets the settings available in the Table.
   */
  export let settings = {};

  /**
   * Sets Table mobile breakpoint.
   * @type { "sm" | "md" | "lg" | "xl" | "xxl" }
   */
  export let mobileBreakpoint = "sm";

  /**
   * Sets the duration for the data load delay
   */
  export let duration = 2000;

  setContext(key, {});
  createContext();

  const table = getTable();
  const { rows, id, options, pageNumber, columns, activeRow } = getContext(key);

  export const dataRows = rows;

  $: {
    table.setRows(data);
    options.update(settings);
  }

  onDestroy(() => table.reset());

  setContext("DUK:drop-down:context", contexts.DROP_DOWN.TABLE);
  setContext("DUK:pagination:context", contexts.PAGINATION.TABLE);
</script>

<div id="{$id}" class="{$$props.class || ''} duk-table">
  <div class="duk-table__title">
    <slot name="title" />
  </div>
  <div class="duk-table__wrapper">
    <table
      class="duk-table__table"
      class:duk-table__table--sm="{mobileBreakpoint === 'sm'}"
      class:duk-table__table--md="{mobileBreakpoint === 'md'}"
      class:duk-table__table--lg="{mobileBreakpoint === 'lg'}"
      class:duk-table__table--xl="{mobileBreakpoint === 'xl'}"
      class:duk-table__table--xxl="{mobileBreakpoint === 'xxl'}"
    >
      <slot name="head" />
      <slot />
      <slot name="foot" />
    </table>
  </div>

  <div class="duk-table__actions">
    {#if $options.infinite === true}
      <InfiniteScroll
        duration="{duration}"
        pageNumber="{pageNumber}"
        items="{data}"
        itemsPerPage="{$options.rowsPerPage}"
        on:infifnite="{() => {
          columns.redraw();
          activeRow.set(null);
        }}"
      />
    {/if}
    <slot name="actions" />
    {#if $options.limiter === true}
      <DropDown
        dropUp="{true}"
        items="{data}"
        options="{[10, 20, 30, 40, 50]}"
        on:select="{(event) => {
          settings = { ...settings, rowsPerPage: event.detail };
          columns.redraw();
          activeRow.set(null);
        }}"
      />
    {/if}
  </div>
</div>
