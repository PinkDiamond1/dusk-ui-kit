<script>
  import { Meta, Story } from "@storybook/addon-svelte-csf";
  import CookieBanner from "@dusk-network/cookie-banner";
  //import meta from "../../meta.js";

  // const defaultConfig = {
  //   cookieConfig: {
  //     domain: window.location.hostname,
  //     path: "/",
  //   },
  //   choices: {
  //     necessary: {
  //       label: "Required cookies",
  //       description:
  //         "These can not be turned off as they are used to control all the other cookies.",
  //       value: true,
  //     },
  //     marketing: false,
  //     tracking: false,
  //     analytics: {
  //       label: "Analytics cookies",
  //       description:
  //         "Used to control Google Analytics, a 3rd party tool offered by Google to track user behavior.",
  //       value: true,
  //     },
  //   },
  // };
  const defaultDescription =
    "We use cookies to to analyze our traffic. We also share information about your use of our site with our analytics partners who may combine it with other information that you’ve provided to them or that they have collected from your use of their services.";

  // function deleteCookie(name, path, domain) {
  //   if (getCookie(name)) {
  //     document.cookie =
  //       name +
  //       "=" +
  //       (path ? ";path=" + path : "") +
  //       (domain ? ";domain=" + domain : "") +
  //       ";expires=Thu, 01 Jan 1970 00:00:01 GMT";
  //   }
  // }

  // function getCookie(name) {
  //   return document.cookie.split(";").some((c) => {
  //     return c.trim().startsWith(name + "=");
  //   });
  // }

  // const COOKIE_NAME = "_dusk-SB-CB-DEMO";
</script>

<Meta
  title="Components/Organisms/Cookie Banner"
  component="{CookieBanner}"
  parameters="{{
    layout: 'fullscreen',
    docs: {
      source: {
        type: 'code',
      },
    },
  }}"
  argTypes="{{
    // deleteCookie: {
    //   table: {
    //     disable: true,
    //   },
    // },
    // config: {
    //   table: {
    //     disable: true,
    //   },
    // },
    // cookie: {
    //   table: {
    //     disable: true,
    //   },
    // },
    // class: {
    //   table: {
    //     disable: true,
    //   },
    // },
    // id: {
    //   table: {
    //     disable: true,
    //   },
    // },
    // use: {
    //   table: {
    //     disable: true,
    //   },
    // },
  }}"
/>

<Story
  name="Standard cookie banner"
  args="{{
    //deleteCookie: deleteCookie(COOKIE_NAME),
    description: defaultDescription,
    // config: defaultConfig,
    //cookie: COOKIE_NAME,
    showBanner: true,
    showSettings: true,
  }}"
  let:args
>
  <CookieBanner
    acceptLabel="Accept"
    settingsLabel="Settings"
    showBanner="{args.showBanner}"
    showSettings="{args.showSettings}"
  >
    <p>
      {args.description}
    </p>
  </CookieBanner>
</Story>
