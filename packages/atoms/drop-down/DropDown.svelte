<script>
  // FIXME Remove dependency on Icon (and remove from icon library too).
  import { createEventDispatcher, onMount, getContext } from "svelte";
  import contexts from "@dusk-network/helpers/contexts.js";
  import Icon from "@dusk-network/icon";
  import "./styles.css";

  /**
   * Used as an array to hold the DropDown options
   */
  export let options = [];

  /**
   * Used to indicate the selected option
   */
  export let selectedIndex = 0;

  /**
   * Sets the opened direction of the DropDown to up when true
   */
  export let dropUp = false;

  /**
   * Disables to the DropDown when true
   */
  export let disabled = false;

  const dispatch = createEventDispatcher();
  const context = getContext("DUK:drop-down:context");

  let selectedOption = options[selectedIndex];
  let isOpen = false;

  function selectOption(value) {
    selectedOption = value;
    isOpen = false;
    dispatch("select", value);
  }

  onMount(() => {
    if (!disabled) {
      if (options.length === 0) {
        disabled = true;
        selectedOption = "No options";
      } else {
        disabled = false;
      }
      selectOption(selectedOption);
    }
  });

  $: selectedIndex, (selectedOption = options[selectedIndex]);
</script>

<div
  class="{$$props.class || ''} duk-drop-down"
  class:duk-drop-down--drop-up="{dropUp === true}"
  class:duk-drop-down--disabled="{disabled === true}"
  class:duk-drop-down--menu="{context === contexts.DROP_DOWN.MENU}"
>
  <div class="duk-drop-down__layout">
    <button type="button" class="duk-drop-down__button" on:click="{() => (isOpen = !isOpen)}">
      <span class="duk-drop-down__selected">
        {#if typeof selectedOption !== "object"}
          <span class="duk-drop-down__selected-label">{selectedOption}</span>
        {:else}
          <span class="duk-drop-down__selected-label">{selectedOption.name}</span>
        {/if}
      </span>
      <span class="duk-drop-down__button-icon" class:duk-drop-down__button-icon--open="{isOpen}">
        <Icon name="menu-down-outline" />
      </span>
    </button>
    {#if isOpen && options}
      <div class="duk-drop-down__options">
        <ul
          tabindex="-1"
          role="listbox"
          aria-activedescendant="__DUK-drop-down-item-{options.indexOf(selectedOption)}"
          class="duk-drop-down__list"
        >
          {#each options as option, i}
            <li
              id="__DUK-drop-down-item-{i}"
              role="option"
              class="duk-drop-down__item"
              on:click="{() => selectOption(option)}"
            >
              <div class="duk-drop-down__item-layout">
                {#if typeof option !== "object"}
                  <span
                    class="duk-drop-down__item-label"
                    class:duk-drop-down__item-label--selected="{option === selectedOption}"
                    >{option}</span
                  >
                {:else}
                  <span
                    class="duk-drop-down__item-label"
                    class:duk-drop-down__item-label--selected="{option.name ===
                      selectedOption.name}">{option.name}</span
                  >
                {/if}
              </div>
            </li>
          {/each}
        </ul>
      </div>
    {/if}
  </div>
</div>
