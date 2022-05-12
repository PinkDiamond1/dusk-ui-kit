<script>
  import DropDown from "@dusk-network/drop-down";

  const options = [
    { name: "option 1" },
    { name: "option 2" },
    { name: "option 3" },
    { name: "option 4" },
    { name: "option 5" },
  ];
  function onSelect() {
    //Triggered on new selected value
  }
</script>

<DropDown options="{options}" on:select="{onSelect}" />
