<script>
  import { Meta, Story } from "@storybook/addon-svelte-csf";
  import { variants, sizes, icons } from "@dusk-network/helpers";
  import MessageBanner from "@dusk-network/message-banner";
  //import meta from "../../meta.js";

  const defaultDescription =
    " Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ullamcorper mus in id vitae, pellentesque. Hendrerit id fermentum viverra commodo.";
</script>

<Meta
  title="Components/Organisms/Message Banner"
  component="{MessageBanner}"
  parameters="{{
    layout: 'fullscreen',
    docs: {
      source: {
        type: 'code',
      },
    },
  }}"
  argTypes="{{
    variant: {
      options: Object.values(variants.MESSAGE_BANNER),
      control: {
        type: 'select',
      },
    },
    icon: {
      options: Object.values(icons),
      control: {
        type: 'select',
      },
    },
    iconSize: {
      options: Object.values(sizes.ICON),
      control: {
        type: 'radio',
      },
    },
  }}"
/>

<Story
  name="Standard message banner"
  args="{{
    description: defaultDescription,
    showBanner: true,
  }}"
  let:args
>
  <MessageBanner buttonLabel="Understood" showBanner="{args.showBanner}">
    <p>
      {args.description}
    </p>
  </MessageBanner>
</Story>
