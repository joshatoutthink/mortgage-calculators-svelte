<script>
  import { createEventDispatcher } from "svelte";
  export let showResults;
  const dispatch = createEventDispatcher();
  function goBack() {
    dispatch("showForm");
  }
</script>

<div class="calculator-wrapper">
  {#if !showResults}
    <slot name="form">wheres the form</slot>
  {/if}

  {#if showResults}
    <slot name="results">wheres the results</slot>
    <button on:click={goBack}>&larr; Change Information</button>
  {/if}
</div>

<style lang="scss">
  button {
    margin-left: 20px;
    margin-bottom: 20px;
    background: var(--purple);
    appearance: none;
    border: none;
    font-size: 16px;
    color: white;
    padding: 8px 24px;
    line-height: 1.5;
    border-radius: 5px;
    &:hover {
      background: var(--orange);
    }
  }
</style>
