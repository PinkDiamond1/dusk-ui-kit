<script context="module">
  /**
   * @type {import('@sveltejs/kit').Load}
   */
  export async function load({ fetch }) {
    const res = await fetch("/components.json");

    if (res.ok) {
      const components = await res.json();
      return {
        stuff: {
          components,
        },
        props: {
          components,
        },
      };
    }
  }
</script>

<script>
  import "./styles.css";
  import { QueryClient, QueryClientProvider } from "@sveltestack/svelte-query";
  import "@dusk-network/styles/tailwind.css";
  import "svelte-highlight/styles/github-dark.css";
  import Nav from "$lib/Nav.svelte";
  import Template from "@dusk-network/default";
  import Footer from "@dusk-network/footer";
  import CookieBanner from "@dusk-network/cookie-banner";
  import { settings } from "$lib/store";

  export let components;

  const queryClient = new QueryClient();
  const cookieConfig = {
    expires: 365,
  };

  let showSettings = false;

  settings.subscribe((value) => {
    showSettings = value;
  });
</script>

<Template>
  <svelte:fragment slot="navbar">
    <Nav
      components="{components}"
      on:settings="{() => {
        settings.update(() => true);
      }}"
    />
  </svelte:fragment>
  <QueryClientProvider client="{queryClient}">
    <section>
      <slot />
    </section>
  </QueryClientProvider>
  <svelte:fragment slot="footer">
    <Footer type="minimal" variant="brand" />
    <CookieBanner
      cookieConfig="{cookieConfig}"
      acceptLabel="Accept All"
      settingsLabel="Settings"
      on:closeSettings="{() => settings.update(() => false)}"
      on:openSettings="{() => settings.update(() => true)}"
      on:tracking="{(event) => {
        console.log(event.detail);
      }}"
      on:analytics="{(event) => {
        console.log(event.detail);
      }}"
      on:marketing="{(event) => {
        console.log(event.detail);
      }}"
      showSettings="{showSettings}"
    >
      <p>
        We and selected partners and related companies, use cookies and similar technologies as
        specified in our <a href="https://dusk.network/footer-pages/privacy-policies"
          >Privacy Policy</a
        >. You agree to consent to the use of these technologies by clicking Accept All, or by
        continuing to browse this website. You can learn more about how we use cookies and set
        cookie preferences in Settings.
      </p>
    </CookieBanner>
  </svelte:fragment>
</Template>
