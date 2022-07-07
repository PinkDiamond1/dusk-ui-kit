<script>
  import { onMount, afterUpdate, createEventDispatcher } from "svelte";
  import { getCookie, setCookie, deleteCookie } from "@dusk-network/helpers/cookie-utils.js";
  import { clickOutside } from "@dusk-network/helpers/scrim-utils.js";
  import DarkMode from "svelte-dark-mode";
  import Button from "@dusk-network/button";
  import Content from "@dusk-network/content";
  import Heading from "@dusk-network/heading";
  import RichText from "@dusk-network/rich-text";
  import Control from "@dusk-network/control";
  import Toggle from "@dusk-network/toggle";
  import Card from "@dusk-network/card";
  import Group from "@dusk-network/group";
  import Icon from "@dusk-network/icon";
  import "./styles.css";

  /**
   * Sets the `id` of the Cookie Banner if set, otherwise the ID is generated.
   * @type {string}
   */
  export let id = "__DUK-cookie-banner" + Math.random().toString(36);

  /**
   * Sets the cookie name for the Cookie Banner GDPR.
   */
  export let cookieName = "DUSK-GDPR";

  /**
   * Sets the cookie name for the Dark Mode
   */
  export let darkModeCookieName = "DUSK-A11Y";

  /**
   * Sets the configuration object used by the cookie.
   * Contains the cookie options as defined here: https://github.com/js-cookie/js-cookie#cookie-attributes
   */
  export let cookieConfig = {
    expires: 365,
  };

  /**
   * Sets the accept Button text.
   */
  export let acceptLabel;

  /**
   * Sets the settings Button text.
   */
  export let settingsLabel;

  /**
   * Sets the visibility of the banner
   */
  export let showBanner = false;

  /**
   * Sets the visibility of the settings modal
   */
  export let showSettings = false;

  /**
   * Sets the closing of the settings on the scrim
   */
  export let closeScrim = false;

  const dispatch = createEventDispatcher();

  let fields = {
    essential: true,
    tracking: false,
    analytics: false,
    marketing: false,
  };

  let theme;

  $: switchTheme = theme === "dark" ? "light" : "dark";
  $: isDarkMode = theme === "dark";

  onMount(() => {
    if (!cookieName) {
      throw new Error("cookieName is required");
    }

    const cookie = getCookie(cookieName);

    if (!cookie) {
      showBanner = true;
      return;
    }

    try {
      const settings = JSON.parse(cookie);
      fields = settings;
      dispatch("cookieOptions");
    } catch (e) {
      deleteCookie(cookieName, cookieConfig);
      showBanner = true;
    }
  });

  afterUpdate(() => {
    document.documentElement.className = theme;

    if (!darkModeCookieName) {
      throw new Error("cookieName is required");
    }

    const cookie = getCookie(darkModeCookieName);

    if (!cookie) {
      setCookie(darkModeCookieName, { theme }, cookieConfig);
    } else {
      deleteCookie(darkModeCookieName, cookieConfig);
      setCookie(darkModeCookieName, { theme }, cookieConfig);
    }
  });

  // const setCookie = () => {
  //   const expires = new Date();
  //   expires.setDate(expires.getDate() + cookieConfig.expires);
  //   const options = Object.assign({}, cookieConfig, { expires });
  //   Cookies.set(cookieName, JSON.stringify(fields), options);
  // };

  // const removeCookie = () => {
  //   const { path } = cookieConfig;
  //   Cookies.remove(cookieName, Object.assign({}, path ? { path } : {}));
  // };

  function closeSettingsScrim(bool) {
    if (bool) {
      dispatch("closeSettings");
    }
  }
</script>

<svelte:window
  on:keydown="{(event) => {
    if (event.key === 'Escape') {
      if (showSettings) {
        dispatch('closeSettings');
      }
    }
  }}"
/>
<DarkMode bind:theme />
<div
  id="{id}"
  class="duk-cookie-banner"
  class:duk-cookie-banner--with-settings="{showSettings === true}"
>
  {#if showBanner === true}
    <div class="{$$props.class || ''} duk-cookie-banner__banner">
      <div class="duk-cookie-banner__disclaimer">
        <slot />
      </div>
      <div class="duk-cookie-banner__controls">
        <Group align="center">
          <Button
            variant="cta"
            on:click="{() => {
              Object.keys(fields).forEach((v) => (fields[v] = true));
              setCookie(cookieName, fields, cookieConfig);
              showBanner = false;
              dispatch('closeSettings');
            }}"
          >
            {acceptLabel}
          </Button>
          <Button on:click="{() => dispatch('openSettings')}">
            {settingsLabel}
          </Button>
        </Group>
      </div>
    </div>
  {/if}
  {#if showSettings === true}
    <div
      class="duk-cookie-banner__settings"
      use:clickOutside
      on:clickOutside="{closeSettingsScrim(closeScrim)}"
    >
      <Card>
        <Heading>
          <h2><strong>Settings</strong></h2>
          <svelte:fragment slot="button">
            <Button
              size="sm"
              circle="{true}"
              variant="brand"
              outline="{true}"
              on:click="{() => dispatch('closeSettings')}"
            >
              <Icon name="menu-burger-close" size="sm" />
            </Button>
          </svelte:fragment>
        </Heading>
        <Content>
          <RichText><strong>Cookies</strong></RichText>
          <Control
            name="essential"
            type="inline-fixed"
            width="full"
            label="Essential cookies"
            message="Used for privacy settings. Can't be turned off."
          >
            <Toggle
              name="essential"
              bind:value="{fields.essential}"
              checked="{true}"
              disabled="{true}"
            />
          </Control>
          <Control
            name="tracking"
            type="inline-fixed"
            width="full"
            label="Tracking cookies"
            message="Used for advertising purposes."
          >
            <Toggle
              name="tracking"
              bind:value="{fields.tracking}"
              checked="{fields.tracking}"
              on:change="{() => setCookie(cookieName, fields, cookieConfig)}"
              on:change="{() => dispatch('tracking', fields.tracking)}"
            />
          </Control>
          <Control
            name="analytics"
            type="inline-fixed"
            width="full"
            label="Analytics cookies"
            message="Used to enable Google Analytics."
          >
            <Toggle
              name="analytics"
              bind:value="{fields.analytics}"
              checked="{fields.analytics}"
              on:change="{() => setCookie(cookieName, fields, cookieConfig)}"
              on:change="{() => dispatch('analytics', fields.analytics)}"
            />
          </Control>
          <Control
            name="marketing"
            type="inline-fixed"
            width="full"
            label="Marketing cookies"
            message="Used for marketing data."
          >
            <Toggle
              name="marketing"
              bind:value="{fields.marketing}"
              checked="{fields.marketing}"
              on:change="{() => setCookie(cookieName, fields, cookieConfig)}"
              on:change="{() => dispatch('marketing', fields.marketing)}"
            />
          </Control>
          <RichText><strong>Dark Mode</strong></RichText>
          <Control
            name="darkMode"
            type="inline-fixed"
            width="full"
            label="Toggle dark mode"
            message="Used to toggle dark mode on and off."
          >
            <Toggle
              name="darkMode"
              id="__DUK-dark-mode"
              onIcon="brightness-4"
              offIcon="brightness-5"
              bind:checked="{isDarkMode}"
              on:click="{() => (theme = switchTheme)}"
              value="{isDarkMode ? true : false}"
            />
          </Control>
          <Group align="center">
            <Button
              variant="cta"
              on:click="{() => {
                setCookie(cookieName, fields, cookieConfig);
                showBanner = false;
                dispatch('closeSettings');
              }}"
            >
              Save
            </Button>
          </Group>
        </Content>
      </Card>
    </div>
  {/if}
</div>
