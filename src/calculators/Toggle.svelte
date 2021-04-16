<script>
  export let toggleSize;
  export let toggleActiveColor;
  export let toggleInactiveColor;
  export let toggleSwitchColor;
  export let label;
  export let isChecked;
</script>

<div
  class="toggle"
  style={`\
  ${toggleSize ? `--toggle-size: ${toggleSize}px;` : ""}\
  ${toggleActiveColor ? `--toggle-active-color: ${toggleActiveColor};` : ""}\
  ${
    toggleInactiveColor
      ? `--toggle-inactive-color: ${toggleInactiveColor};`
      : ""
  }\
  ${toggleSwitchColor ? `--toggle-switch-color: ${toggleSwitchColor};` : ""}\
  `}
>
  <label class="toggle__label">
    {label}
    <input
      type="checkbox"
      name=""
      id=""
      class="toggle__checkbox"
      bind:checked={isChecked}
    />
    <div class="toggle__wrapper">
      <div class="toggle__bg" />
      <div class="toggle__switch" />
    </div>
  </label>
</div>

<style lang="scss">
  .toggle {
    //we are setting private custom properties with the public properties and safe defaults to
    //improve refactoring later

    //setting the base font size which every thing is relative to.
    --_toggle-size: var(--toggle-size, 16px);
    //color of bg when the toggle is on
    --_toggle-active-color: var(--toggle-active-color, #44da60);
    //color of the bg whent the toggle is off
    --_toggle-inactive-color: var(--toggle-inactive-color, #efeff9);
    //the color of the circle that slides back and forth
    --_toggle-switch-color: var(--toggle-switch-color, white);

    position: relative;
    display: inline-block;
    font-size: var(--_toggle-size); //sets the size of the whole component
    box-sizing: border-box;
    * {
      box-sizing: inherit;
    }
  }
  input {
    width: 0;
    height: 0;
    display: none;
  }
  label {
    display: inline-flex;
    align-items: center;
  }

  input:checked ~ .toggle__wrapper {
    box-shadow: 0 0 0 2px var(--_toggle-active-color);
  }
  input:checked ~ .toggle__wrapper .toggle__switch {
    right: 0;
  }
  input:checked ~ .toggle__wrapper .toggle__bg {
    border: 1px solid var(--_toggle-active-color);
    transition: none;
    background: var(--_toggle-active-color);
  }
  input:checked ~ .toggle__wrapper .toggle__bg:after {
    transition-delay: 0.05s, 0s;
    opacity: 0;
    transform: scale(0);
  }
  .toggle__wrapper {
    margin-left: 1em;
    position: relative;
    height: 2em;
    width: 3.3em;
    overflow: visible;
    border-radius: 2.5em;
    box-shadow: 0 0 0 2px #dfdfdf; //border
  }
  .toggle__bg {
    overflow: hidden;
    position: absolute;
    z-index: 1;
    width: 100%;
    background: transparent;
    height: 100%;
    border-radius: 2.5em;
    transition: all 0s linear 0.2s;
  }
  .toggle__bg:after {
    transition: all 0.2s linear;
    transition-property: transform, opacity;
    transition-delay: 0s, 0.02s;
    content: "";
    position: absolute;
    border-radius: inherit;
    width: 103%;
    height: 103%;
    background: var(--_toggle-inactive-color);
    top: 0;
    left: 0;
    z-index: 2;
    transform-origin: 50% 50%;
    opacity: 1;
  }
  .toggle__switch {
    position: absolute;
    z-index: 200;
    border-radius: 50%;
    background: var(--_toggle-switch-color);
    width: 2em;
    height: 100%;
    box-shadow: 0.5px 1px 2px #dedede;
    right: calc(100% - 2em);
    transition: all 0.15s cubic-bezier(0.5, 1, 0.5, 1);
  }
</style>
