<script>
  import { setContext, getContext, onMount } from "svelte";
  import contexts from "@dusk-network/helpers/contexts.js";
  import variants from "@dusk-network/helpers/variants.js";
  import { key } from "./key.js";

  export let variant = variants.TABLE.DEFAULT;
  export let dataKey = undefined;
  export let hidden = false;
  export let colspan = null;
  export let id = "__DUK-table-datum" + Math.random().toString(36);

  const { activeRow } = getContext(key);

  let context = getContext("DUK:table:row:datum:context");
  let h, ref, activeRowId;

  setContext("DUK:loading-indicator:context", contexts.LOADING_INDICATOR.DATUM);
  setContext("DUK:truncate-text:context", contexts.TRUNCATE_TEXT.DATUM);
  setContext("DUK:heading:context", contexts.HEADING.DATUM);
  setContext("DUK:chip:context", contexts.CHIP.DATUM);

  const setCellHeight = (el) => {
    if (el !== undefined && el !== null && el.hasAttribute("colspan")) {
      let dataRowIndex = Array.prototype.indexOf.call(
        el.parentNode.parentNode.children,
        el.parentNode,
      );
      let headRowIndex = dataRowIndex - 1;
      let headRows = el.parentNode.parentNode.previousElementSibling.childNodes[headRowIndex];
      let headRowChildren = headRows.childNodes.length;
      let headDataIndex = headRowChildren - 4;
      let headDataCell = headRows.childNodes[headDataIndex];

      if (headDataCell !== undefined && headDataCell !== null) {
        headDataCell.style.height = `${h}px`;
      }
    }
  };

  onMount(() => {
    if (ref && colspan && context === contexts.DATUM.ROW.BODY) {
      ref.parentNode.previousElementSibling.classList.add("duk-table__row--expand");
      ref.parentNode.classList.add("duk-table__row--extra-information");
      setCellHeight(ref);

      ref.parentNode.parentNode.parentNode.classList.add("duk-table__table--expandable");
    }
  });
  const handleClick = () => {
    if (ref && context === contexts.DATUM.ROW.BODY) {
      activeRowId = ref.parentNode.nextElementSibling.id;
      $activeRow === activeRowId ? activeRow.set(null) : activeRow.set(activeRowId);
    }
  };
</script>

<svelte:window on:resize="{setCellHeight(ref)}" />
{#if context === contexts.DATUM.ROW.HEAD}
  <th
    class="{$$props.class || ''} duk-table__datum duk-table__datum--head"
    class:duk-table__datum--cta="{variant === variants.TABLE.CTA}"
    class:duk-table__datum--success="{variant === variants.TABLE.SUCCESS}"
    class:duk-table__datum--warning="{variant === variants.TABLE.WARNING}"
    class:duk-table__datum--danger="{variant === variants.TABLE.DANGER}"
    class:duk-table__datum--sortable="{dataKey}"
    class:duk-table__datum--hidden="{hidden}"
    data-key="{dataKey}"
  >
    <div class="duk-table__datum--content">
      <slot />
    </div>
  </th>
{:else if context === contexts.DATUM.ROW.FOOT}
  <td
    class="{$$props.class || ''} duk-table__datum duk-table__datum--foot"
    class:duk-table__datum--cta="{variant === variants.TABLE.CTA}"
    class:duk-table__datum--success="{variant === variants.TABLE.SUCCESS}"
    class:duk-table__datum--warning="{variant === variants.TABLE.WARNING}"
    class:duk-table__datum--danger="{variant === variants.TABLE.DANGER}"
  >
    <slot />
  </td>
{:else if colspan}
  <td
    class="{$$props.class || ''} duk-table__datum"
    class:duk-table__datum--cta="{variant === variants.TABLE.CTA}"
    class:duk-table__datum--success="{variant === variants.TABLE.SUCCESS}"
    class:duk-table__datum--warning="{variant === variants.TABLE.WARNING}"
    class:duk-table__datum--danger="{variant === variants.TABLE.DANGER}"
    id="{id}"
    colspan="{colspan}"
    bind:this="{ref}"
    bind:clientHeight="{h}"
  >
    <div class="duk-table__datum--content">
      <slot />
    </div>
  </td>
{:else}
  <td
    class="{$$props.class || ''} duk-table__datum"
    class:duk-table__datum--cta="{variant === variants.TABLE.CTA}"
    class:duk-table__datum--success="{variant === variants.TABLE.SUCCESS}"
    class:duk-table__datum--warning="{variant === variants.TABLE.WARNING}"
    class:duk-table__datum--danger="{variant === variants.TABLE.DANGER}"
    class:duk-table__datum--extra-information="{hidden}"
    id="{id}"
    on:click="{handleClick}"
    bind:this="{ref}"
  >
    <div class="duk-table__datum--content">
      <slot />
    </div>
  </td>
{/if}
