<script>
  import Template from "@dusk-network/default";
  import "./styles.css";

  /**
   * Toggles the template global loading state if a boolean, otherwise an object that maps to the slots
   * that are loading.
   *
   * @type { "boolean" | "object" }
   */
  export let isLoading = false;

  /**
   * Toggles the template error state.
   */
  export let isError = false;
</script>

<Template
  class="{$$props.class || ''} duk-template-explorer-charts"
  $$restProps="{$$restProps}"
  isLoading="{isLoading}"
  isError="{isError}"
>
  <svelte:fragment slot="navbar">
    <slot name="navbar" />
  </svelte:fragment>
  <svelte:fragment slot="loading">
    <slot name="loading" />
  </svelte:fragment>
  <svelte:fragment slot="error">
    <slot name="error" />
  </svelte:fragment>
  <section class="duk-template__container">
    <div class="duk-template-explorer-charts__control-panel">
      <slot name="control-panel" isLoading="{isLoading['control-panel']}" />
    </div>
  </section>
  <section class="duk-template__container">
    <div class="duk-template-explorer-charts__map">
      <slot name="map" isLoading="{isLoading['map']}" />
    </div>
  </section>
  <section class="duk-template__container">
    <div class="duk-template-explorer-charts__market-data">
      <slot name="market-data" isLoading="{isLoading['market_data']}" />
    </div>
  </section>
  <section class="duk-template__container">
    <div class="duk-template-explorer-charts__blockchain-data">
      <slot name="blockchain-data" isLoading="{isLoading['blockchain_data']}" />
    </div>
  </section>
  <svelte:fragment slot="footer">
    <slot name="footer" />
  </svelte:fragment>
</Template>
