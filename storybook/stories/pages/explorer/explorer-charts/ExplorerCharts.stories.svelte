<script>
  import { Meta, Story } from "@storybook/addon-svelte-csf";
  // import { variants, states } from "@dusk-network/helpers";
  import Template from "@dusk-network/explorer-charts";
  // import results from "../../../../../.jest-test-results.json";
  // import { withTests } from "@storybook/addon-jest";
  import SkeletonLoader from "@dusk-network/skeleton-loader";
  import Icon from "@dusk-network/icon";
  import Card from "@dusk-network/card";
  import Content from "@dusk-network/content";
  import Chart from "@dusk-network/chart";
  import Heading from "@dusk-network/heading";
  import RichText from "@dusk-network/rich-text";
  import Statistic from "@dusk-network/statistic";
  import Group from "@dusk-network/group";
  import Navbar from "../_Navbar.svelte";
  import Footer from "../_Footer.svelte";
  import Search from "../_Search.svelte";
  import meta from "../../../meta";
  import { marketData } from "./data.js";

  const prices = JSON.parse(marketData).prices;
  const marketCaps = JSON.parse(marketData).market_caps;

  const mapData = {
    markers: [
      { long: 5, lat: 52, count: 55 },
      { long: -78, lat: 41, count: 77 },
      { long: -70, lat: 53, count: 10 },
    ],
  };

  let priceData = {};
  priceData.title = undefined;
  priceData.xKey = "date";
  priceData.yKey = "price";
  priceData.groups = prices.map((group) => {
    return {
      [priceData.xKey]: group[0],
      [priceData.yKey]: group[1],
    };
  });

  let marketCapData = {};
  marketCapData.title = undefined;
  marketCapData.xKey = "date";
  marketCapData.yKey = "price";
  marketCapData.groups = marketCaps.map((group) => {
    return {
      [marketCapData.xKey]: group[0],
      [marketCapData.yKey]: group[1],
    };
  });
</script>

<Meta
  title="Pages/Explorer/Charts"
  component="{Template}"
  parameters="{{
    layout: 'fullscreen',
    docs: {
      source: {
        type: 'code',
      },
    },
    darkMode: {
      stylePreview: false,
    },
    // jest: ['packages/templates/explorer-charts/ExplorerCharts.test.js'],
  }}"
  argTypes="{meta('templates/explorer-charts/ExplorerCharts', {})}"
/>

<Story name="Loaded State" args="{{ isLoading: false }}" let:args>
  <Template isError="{args.isError}" isLoading="{args.isLoading}">
    <svelte:fragment slot="navbar">
      <Navbar />
    </svelte:fragment>
    <svelte:fragment slot="control-panel">
      <Card>
        <Content>
          <Search />
          <Group grid="{true}">
            <Statistic title="DUSK Price">
              <svelte:fragment slot="icon">
                <Icon name="dusk-ticker" variant="brand" size="xxxl" />
              </svelte:fragment>
              <p>$0,2947 (<span class="text-green-500">+1.76%</span>)</p>
            </Statistic>
            <Statistic title="Estimated Total Staked">
              <svelte:fragment slot="icon">
                <Icon name="database" variant="brand" size="xxxl" />
              </svelte:fragment>
              <p>100.000.000 DUSK</p>
            </Statistic>
            <Statistic title="Market Cap">
              <svelte:fragment slot="icon">
                <Icon name="chart-areaspline" variant="brand" size="xxxl" />
              </svelte:fragment>
              <p>$108.048.497</p>
            </Statistic>
            <Statistic title="Transactions">
              <svelte:fragment slot="icon">
                <Icon name="pound-box-outline" variant="brand" size="xxxl" />
              </svelte:fragment>
              <p>150786</p>
            </Statistic>
            <Statistic title="Average Gas Price">
              <svelte:fragment slot="icon">
                <Icon name="gauge" variant="brand" size="xxxl" />
              </svelte:fragment>
              <p>1.54 DUSK</p>
            </Statistic>
            <Statistic title="Provisioners">
              <svelte:fragment slot="icon">
                <Icon name="contacts" variant="brand" size="xxxl" />
              </svelte:fragment>
              <p>88,880</p>
            </Statistic>
          </Group>
        </Content>
      </Card>
    </svelte:fragment>
    <svelte:fragment slot="map">
      <Card>
        <Chart aspectRatio="1.7" type="world-map" data="{mapData}" />
      </Card>
    </svelte:fragment>
    <svelte:fragment slot="market-data">
      <Heading><h2>Market Data</h2></Heading>
      <Card>
        <Heading>
          <h3>Dusk Price</h3>
        </Heading>
        <Content>
          <RichText>
            <h4>$0.23 <small class="success">+2%</small></h4>
          </RichText>
          <div style="height: 65px">
            <Chart type="line" data="{priceData}" />
          </div>
        </Content>
      </Card>
      <Card>
        <Heading>
          <h3>Dusk Market Cap</h3>
        </Heading>
        <Content>
          <RichText>
            <h4>$92.44 M</h4>
          </RichText>
          <div style="height: 65px">
            <Chart type="bar-horizontal" data="{marketCapData}" />
          </div>
        </Content>
      </Card>
    </svelte:fragment>
    <!-- <svelte:fragment slot="blockchain-data" let:isLoading>
      <Heading><h2>Blockchain Data</h2></Heading>
      <Card>
        <Heading>
          <h3>Transaction per second</h3>
        </Heading>
        <Content>
          Chart here
        </Content>
      </Card>
      <Card>
        <Heading>
          <h3>Average Block Time</h3>
        </H>
        <Content>
          Chart here
        </Content>
      </Card>
      <Card>
        <Heading>
          <h3>Average Gas Price</h3>
        </Heading>
        <Content>
          Chart here
        </Content>
      </Card> 
    </svelte:fragment>-->
    <svelte:fragment slot="footer">
      <Footer />
    </svelte:fragment>
  </Template>
</Story>

<Story
  name="Loading State"
  args="{{ isLoading: { map: true, market_data: true, blockchain_data: true } }}"
  let:args
>
  <Template isError="{args.isError}" isLoading="{args.isLoading}">
    <svelte:fragment slot="navbar">
      <Navbar />
    </svelte:fragment>
    <svelte:fragment slot="map">
      <SkeletonLoader
        rounded="{true}"
        height="656px"
        extraSmallScreenHeight="656px"
        smallScreenHeight="404px"
        mediumScreenHeight="404px"
        largeScreenHeight="320px"
        extraLargeScreenHeight="320px"
        jumboScreenHeight="320px"
      />
    </svelte:fragment>
    <svelte:fragment slot="market-data">
      <SkeletonLoader
        rounded="{true}"
        height="656px"
        extraSmallScreenHeight="656px"
        smallScreenHeight="404px"
        mediumScreenHeight="404px"
        largeScreenHeight="320px"
        extraLargeScreenHeight="320px"
        jumboScreenHeight="320px"
      />
    </svelte:fragment>
    <!-- <svelte:fragment slot="blockchain-data" let:isLoading>
      <Heading><h2>Blockchain Data</h2></Heading>
      <Card>
        <Heading>
          <h3>Transaction per second</h3>
        </Heading>
        <Content>
          Chart here
        </Content>
      </Card>
      <Card>
        <Heading>
          <h3>Average Block Time</h3>
        </H>
        <Content>
          Chart here
        </Content>
      </Card>
      <Card>
        <Heading>
          <h3>Average Gas Price</h3>
        </Heading>
        <Content>
          Chart here
        </Content>
      </Card> 
    </svelte:fragment>-->
    <svelte:fragment slot="footer">
      <Footer />
    </svelte:fragment>
  </Template>
</Story>
