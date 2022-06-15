<script context="module">
  import SourceCode from "@ui-kit-example";

  /**
   * @type {import('@sveltejs/kit').Load}
   */
  export async function load({ params, stuff }) {
    const meta = stuff.components[params.group][params.package][params.component];
    const Examples = await import("@dusk-network/dusk-ui-kit-examples");

    return {
      props: { meta, Examples, Code: SourceCode },
    };
  }
</script>

<script>
  import { Highlight } from "svelte-highlight";
  import RichText from "@dusk-network/rich-text";
  import { page } from "$app/stores";
  import { javascript } from "svelte-highlight/languages";
  import "svelte-highlight/styles/mellow-purple.css";

  export let meta;
  export let Examples;
  export let Code;

  const convertToClassCase = (s) => {
    let converted = s.replace(/-./g, (x) => x[1].toUpperCase());
    converted = converted.charAt(0).toUpperCase() + converted.slice(1);
    return converted;
  };

  const determineType = (prop) => {
    const typeTag = prop.tags.find(({ tag }) => tag === "type");
    let type;

    if (typeTag) ({ type } = typeTag);
    else if (prop.value && /^['"`].+?['"`]$/.test(prop.value)) {
      type = "string";
    } else {
      try {
        type = typeof JSON.parse(prop.value);
      } catch {
        type = "any";
      }
    }

    return type;
  };

  $: examples =
    Examples[$page.params.group] &&
    Examples[$page.params.group][convertToClassCase($page.params.package)];
  $: sources = Code[$page.params.group] && Code[$page.params.group][$page.params.package];
</script>

<RichText class="w-full max-w-full mb-10">
  <h1>{$page.params.component}</h1>

  <h2>Installation</h2>
  <pre>
    <code>
      npm i -D @dusk-network/{$page.params.package}
    </code>
  </pre>

  <h2>Props</h2>
  <table>
    <thead>
      <tr>
        <th>Name</th>
        <th>Type</th>
        <th>Required</th>
        <th>Default</th>
        <th>Description</th>
      </tr>
    </thead>
    <tbody>
      {#each Object.entries(meta.props) as prop}
        <tr>
          <td>{prop[0]}</td>
          <td>{determineType(prop[1])}</td>
          <td>{prop[1]["required"]}</td>
          <td>{prop[1]["value"]}</td>
          <td>{prop[1]["description"]}</td>
        </tr>
      {/each}
    </tbody>
  </table>
</RichText>

<RichText class="w-full max-w-full mb-10">
  <h2>Examples</h2>
</RichText>

{#if examples}
  {#each Object.entries(examples) as example, index}
    <RichText>
      <h3>Example {index + 1}</h3>
    </RichText>
    <div class="my-10">
      <svelte:component this="{example[1]}" />
    </div>
    <Highlight class="mb-10" language="{javascript}" code="{sources[example[0]]}" />
  {/each}
{:else}
  <RichText class="w-full max-w-full mb-10">
    <p>No examples found!</p>
  </RichText>
{/if}
