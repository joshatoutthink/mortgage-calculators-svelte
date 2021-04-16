<script>
  export let id;
  export let label;
  export let field;
  export let style;
</script>

<div class="form-field" {style}>
  <label for={id}>
    <div class="label">
      {label}
    </div>
    <slot name="input">input goes here</slot>
  </label>
  <div class="validate">
    {#if field.error}
      <p class="">
        {field.errorMessage}
      </p>
    {:else}
      <p class="">&nbsp;</p>
    {/if}
  </div>
</div>

<style lang="scss">
  .form-field {
    width: var(--field-width, 50%);
    max-width: 50%;
    flex-basis: auto;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  label {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    display: block;
  }
  .label {
    font-size: 14px;
    font-weight: 500;
    width: 100%;
  }
</style>
