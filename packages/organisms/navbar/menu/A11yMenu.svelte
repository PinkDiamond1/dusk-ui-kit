<script>
  import { setContext, createEventDispatcher } from "svelte";
  // import { getCookie, setCookie, deleteCookie } from "@dusk-network/helpers/cookie-utils.js";
  // import DarkMode from "svelte-dark-mode";
  import Menu, { Item } from "@dusk-network/menu";
  // import Toggle from "@dusk-network/toggle";
  import Button from "@dusk-network/button";
  import Icon from "@dusk-network/icon";
  import contexts from "@dusk-network/helpers/contexts.js";

  /**
   * Sets the cookie name for the Cookie Banner.
   */
  // export let cookieName = "DUSK-A11Y";

  /**
   * Sets the configuration object used by the cookie.
   * Contains the cookie options as defined here: https://github.com/js-cookie/js-cookie#cookie-attributes
   */
  // export let cookieConfig = {
  //   expires: 365,
  // };

  const dispatch = createEventDispatcher();

  // let theme;

  // $: switchTheme = theme === "dark" ? "light" : "dark";
  // $: isDarkMode = theme === "dark";

  // afterUpdate(() => {
  //   document.documentElement.className = theme;

  //   if (!cookieName) {
  //     throw new Error("cookieName is required");
  //   }

  //   const cookie = getCookie(cookieName);

  //   if (!cookie) {
  //     setCookie(cookieName, { theme }, cookieConfig);
  //   } else {
  //     deleteCookie(cookieName, cookieConfig);
  //     setCookie(cookieName, { theme }, cookieConfig);
  //   }
  // });

  setContext("DUK:menu:context", contexts.MENU.NAVBAR);
</script>

<!-- <DarkMode bind:theme /> -->

<Menu orientation="horizontal" class="duk-navbar__a11y-menu">
  <Item>
    <Button variant="default" label="settings" on:click="{() => dispatch('settings')}">
      <Icon name="cog-outline" />
    </Button>
  </Item>
  <!-- <Item>
    <Toggle
      type="switch"
      variant="brand-invert"
      name="dark_mode"
      id="__DUK-dark-mode"
      onIcon="brightness-4"
      offIcon="brightness-5"
      bind:checked="{isDarkMode}"
      on:click="{() => (theme = switchTheme)}"
      value="{isDarkMode ? true : false}"
    />
  </Item> -->
</Menu>
