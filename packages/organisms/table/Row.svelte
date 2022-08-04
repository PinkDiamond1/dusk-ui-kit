<script>
  import { onMount, setContext, getContext, createEventDispatcher } from "svelte";
  import contexts from "@dusk-network/helpers/contexts.js";
  import variants from "@dusk-network/helpers/variants.js";
  import { key } from "./key.js";

  export let type = null;
  export let hidden = false;
  export let variant = variants.TABLE.DEFAULT;
  export let id = "__DUK-table-row" + Math.random().toString(36);
  export let data;
  export let info = false;
  export let active;

  const dispatch = createEventDispatcher();

  const { activeRow } = getContext(key);

  let ref;

  function getDatumContext(type) {
    let context = contexts.DATUM.ROW.BODY;
    if (type === "head") context = contexts.DATUM.ROW.HEAD;
    if (type === "foot") context = contexts.DATUM.ROW.FOOT;
    return context;
  }

  const setActiveHeadRow = (el) => {
    if (el !== undefined && el !== null) {
      let rowIndex = Array.prototype.indexOf.call(el.parentNode.children, el);
      if (el.parentNode.previousElementSibling) {
        let filterArr = Array.prototype.filter.call(
          el.parentNode.previousElementSibling.childNodes,
          (n) => n.nodeType === 1,
        );
        let selectedHeadRow = filterArr[rowIndex];

        filterArr.forEach((element) => {
          if (element.classList) {
            if (element.classList.contains("duk-table__header-row--selected")) {
              element.classList.remove("duk-table__header-row--selected");
            }
          }
        });
        selectedHeadRow.classList.add("duk-table__header-row--selected");
      }
    }
  };
  const setActiveExtraInfoHeadRow = (el) => {
    if (el !== undefined && el !== null) {
      let rowIndex = Array.prototype.indexOf.call(el.parentNode.children, el);
      if (el.parentNode.previousElementSibling) {
        let filterArr = Array.prototype.filter.call(
          el.parentNode.previousElementSibling.childNodes,
          (n) => n.nodeType === 1,
        );
        let selectedHeadRow = el.parentNode.previousElementSibling.childNodes[rowIndex];

        filterArr.forEach((element) => {
          if (element.classList) {
            if (element.classList.contains("duk-table__header-row--selected")) {
              element.classList.remove("duk-table__header-row--selected");
            }
          }
        });
        selectedHeadRow.classList.add("duk-table__header-row--selected");
      }

      el.parentNode.childNodes.forEach((element) => {
        if (element.classList) {
          if (element.classList.contains("duk-table__body-row--selected")) {
            element.classList.remove("duk-table__body-row--selected");
          }
        }
      });
      el.classList.add("duk-table__body-row--selected");
      el.nextElementSibling.classList.add("duk-table__body-row--selected");
    }
  };

  function handleClick(id) {
    if (data !== undefined) {
      if (!info) {
        activeRow.set(id);
        setActiveHeadRow(ref);
      } else {
        setActiveExtraInfoHeadRow(ref);
      }
      dispatch("selected", data);
    }
  }

  onMount(() => {
    if (active !== undefined && active) {
      handleClick(id);
    }
  });

  setContext("DUK:table:row:datum:context", getDatumContext(type));
</script>

<tr
  class="{$$props.class || ''} duk-table__row"
  class:duk-table__row--cta="{variant === variants.TABLE.CTA}"
  class:duk-table__row--success="{variant === variants.TABLE.SUCCESS}"
  class:duk-table__row--warning="{variant === variants.TABLE.WARNING}"
  class:duk-table__row--danger="{variant === variants.TABLE.DANGER}"
  class:duk-table__row--active="{$activeRow === id}"
  class:duk-table__row--selected="{$activeRow === id && data !== undefined}"
  class:duk-table__row--hidden="{hidden}"
  id="{id}"
  on:click="{handleClick(id)}"
  bind:this="{ref}"
>
  <slot />
</tr>
