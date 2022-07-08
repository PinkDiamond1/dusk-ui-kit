<script>
  import variants from "@dusk-network/helpers/variants.js";
  import Button from "@dusk-network/button";
  import Group from "@dusk-network/group";
  import Icon from "@dusk-network/icon";
  import "./styles.css";

  /**
   * Sets the Icon.
   */
  export let icon;

  /**
   * Sets the Icon.
   * @type {"xs" | "sm" | "lg" | "xl" | "xxl" | "xxxl" }
   */
  export let iconSize = "xxxl";

  /**
   * Sets the Button text.
   */
  export let buttonLabel;

  /**
   * Sets the Message Banner variant.
   * * @type {"brand" | "cta" | "info" | "success" | "warning" | "danger" }
   */
  export let variant = variants.MESSAGE_BANNER.BRAND;

  export let showBanner = true;
</script>

<div class="duk-message-banner">
  {#if showBanner === true}
    <div
      class="{$$props.class || ''} duk-message-banner__banner"
      class:duk-message-banner__banner--brand="{variant === variants.MESSAGE_BANNER.BRAND}"
      class:duk-message-banner__banner--warning="{variant === variants.MESSAGE_BANNER.WARNING}"
      class:duk-message-banner__banner--danger="{variant === variants.MESSAGE_BANNER.DANGER}"
    >
      {#if icon}
        <div class="duk-message-banner__icon">
          <Icon name="{icon}" size="{iconSize}" />
        </div>
      {/if}
      <div class="duk-message-banner__disclaimer">
        <slot />
      </div>
      <div class="duk-message-banner__controls">
        <Group align="center">
          <Button
            variant="{variant}"
            on:click="{() => {
              showBanner = false;
            }}"
          >
            {buttonLabel}
          </Button>
        </Group>
      </div>
    </div>
  {/if}
</div>
