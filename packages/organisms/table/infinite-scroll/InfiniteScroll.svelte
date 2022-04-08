<script>
  import { createEventDispatcher } from "svelte";
  import LoadingIndicator from "@dusk-network/loading-indicator";
  import Button from "@dusk-network/button";

  /**
   * Sets the data used by Infinite.
   */
  export let items = [];

  /**
   * Sets the number of items per page.
   */
  export let itemsPerPage = 10;

  /**
   * Sets the page number og Pagination
   */
  export let pageNumber = 1;

  export let variant = "brand";

  const dispatch = createEventDispatcher();

  const nextPage = (number) => {
    pageNumber.set(number);
    dispatch("infinite");
  };

  $: pageCount = Array.from(Array(Math.ceil(items.length / itemsPerPage)).keys());

  let scrollY;
  let loading = false;

  $: {
    console.log(scrollY, window.innerHeight, document.documentElement.scrollHeight);
    if (scrollY + 1 + window.innerHeight >= document.documentElement.scrollHeight) {
      if ($pageNumber < pageCount.length && $pageNumber % 3 !== 0) {
        loading = true;
        setTimeout(() => {
          loading = false;
          nextPage($pageNumber + 1);
        }, 5000);
      }
    }
  }
</script>

<svelte:window bind:scrollY />

<div class="{$$props.class || ''} duk-infinite-scroll">
  {#if loading}
    <LoadingIndicator variant="{variant}" />
  {/if}

  {#if $pageNumber % 3 === 0 && !loading}
    <Button on:click="{() => nextPage($pageNumber + 1)}">Load More</Button>
  {/if}
</div>
