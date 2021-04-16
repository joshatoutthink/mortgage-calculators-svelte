<script>
  import { createEventDispatcher } from "svelte";
  export let calculatorName;
  export let activeCalculatorName;
  const dispatch = createEventDispatcher();

  function setCalc() {
    dispatch("calcSet");
  }
</script>

<button
  on:click={setCalc}
  style="--select-button-color:{activeCalculatorName == calculatorName
    ? 'var(--grey-100)'
    : 'white'}"
>
  <div class="icon">
    <slot name="icon" />
  </div>
  <div class="">
    <slot name="name">calculatorname</slot>
  </div>
</button>

<style lang="scss">
  button {
    background: var(--select-button-color, white);
    border: 1px solid white;
    max-height: 130px;
    max-width: 130px;
    width: 100%;
    padding: 5px;
    aspect-ratio: 1/1;
    .icon {
      height: 75%;
      padding: 10px;
    }

    &:hover {
      background: var(--grey-200);
    }
  }
</style>
