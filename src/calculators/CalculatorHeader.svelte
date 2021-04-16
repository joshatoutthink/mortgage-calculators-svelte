<script>
  export let title;
  export let subtitle;
</script>

<header class="">
  <h2 class="">
    {title}
  </h2>
  <h3 class="">
    {subtitle}
  </h3>
</header>

<style lang="scss">
  header {
    position: relative;
    padding: 10px 20px;
    background: white;
  }
  h2 {
    position: relative;
    padding-bottom: 10px;
    margin-bottom: 0.5em;
  }
  h2:after {
    position: absolute;
    top: 100%;

    left: 0;
    content: "";
    width: 80px;
    height: 3px;
    background: var(--orange);
  }
  h3 {
    font-weight: 400;
  }
</style>
