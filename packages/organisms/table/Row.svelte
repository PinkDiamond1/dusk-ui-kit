<script>
  import { setContext, getContext, createEventDispatcher } from "svelte";
  import contexts from "@dusk-network/helpers/contexts.js";
  import variants from "@dusk-network/helpers/variants.js";
  import { key } from "./key.js";

  export let type = null;
  export let hidden = false;
  export let variant = variants.TABLE.DEFAULT;
  export let id = "__DUK-table-row" + Math.random().toString(36);
  export let data;

  const dispatch = createEventDispatcher();

  const { activeRow } = getContext(key);

  function getDatumContext(type) {
    let context = contexts.DATUM.ROW.BODY;
    if (type === "head") context = contexts.DATUM.ROW.HEAD;
    if (type === "foot") context = contexts.DATUM.ROW.FOOT;
    return context;
  }

  function handleClick(id) {
    if (data !== undefined) {
      activeRow.set(id);
      dispatch("selected", data);
    }
  }

  setContext("DUK:table:row:datum:context", getDatumContext(type));

  $: $activeRow, console.log($activeRow);
</script>

<tr
  class="{$$props.class || ''} duk-table__row"
  class:duk-table__row--cta="{variant === variants.TABLE.CTA}"
  class:duk-table__row--success="{variant === variants.TABLE.SUCCESS}"
  class:duk-table__row--warning="{variant === variants.TABLE.WARNING}"
  class:duk-table__row--danger="{variant === variants.TABLE.DANGER}"
  class:duk-table__row--active="{$activeRow === id}"
  class:duk-table__row--selected="{$activeRow === id}"
  class:duk-table__row--hidden="{hidden}"
  id="{id}"
  on:click="{handleClick(id)}"
>
  <slot />
</tr>
