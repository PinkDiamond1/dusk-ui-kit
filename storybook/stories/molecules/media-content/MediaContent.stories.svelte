<script>
  import { Meta, Story } from "@storybook/addon-svelte-csf";
  // import results from "../../../../.jest-test-results.json";
  // import { withTests } from "@storybook/addon-jest";
  import MediaContent from "@dusk-network/media-content";
  import Heading from "@dusk-network/heading";
  import RichText from "@dusk-network/rich-text";
  import meta from "../../meta.js";

  let reverse = true;
</script>

<Meta
  title="Components/Molecules/Media Content"
  component="{MediaContent}"
  parameters="{{
    layout: 'padded',
    docs: {
      source: {
        type: 'code',
      },
    },
    jest: ['packages/molecules/media-content/MediaContent.test.js'],
  }}"
  argTypes="{meta('molecules/media-content/MediaContent', {})}"
/>

<Story name="default story" args="{{}}" let:args>
  <MediaContent valign="top">
    <svelte:fragment slot="text">
      <RichText>
        <h3>Heading</h3>
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quasi, vitae ipsam saepe
          incidunt atque, dolores repellendus asperiores autem sunt minus esse est laboriosam. Quo
          enim assumenda, atque veniam ex neque.
        </p>
      </RichText>
    </svelte:fragment>
    <svelte:fragment slot="media">
      <img src="https://picsum.photos/id/1/400/300" alt="picsum" />
    </svelte:fragment>
  </MediaContent>
</Story>

<Story name="Reversed display" args="{{ reverse: reverse }}" let:args>
  <MediaContent {...args}>
    <svelte:fragment slot="text">
      <Heading align="center">
        <h3>Heading</h3>
      </Heading>
      <RichText align="center">
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quasi, vitae ipsam saepe
          incidunt atque, dolores repellendus asperiores autem sunt minus esse est laboriosam. Quo
          enim assumenda, atque veniam ex neque.
        </p>
      </RichText>
    </svelte:fragment>
    <svelte:fragment slot="media">
      <img src="https://content.dusk.network/uploads/wallet_109fda512d.png" alt="wallet cli" />
    </svelte:fragment>
  </MediaContent>
</Story>
