<!-- src/routes/+page.svelte (hero) -->
<script lang="ts">
  import PageTransition from '$lib/components/html/PageTransition.svelte'
</script>

<PageTransition>
  <!-- top-left quadrant -->
  <div class="quadrant tl">
    <p class="eyebrow">About Me</p>
  </div>

  <!-- top-right quadrant -->
  <div class="quadrant tr">
    <!-- decorative / empty -->
  </div>

  <!-- bottom-left quadrant -->
  <div class="quadrant bl">
    <!-- decorative / empty -->
  </div>

  <!-- bottom-right quadrant -->
  <div class="quadrant br">
    <h1>About Me</h1>
    <p>The Coolest Web Dev</p>
  </div>
</PageTransition>

<style>
  .quadrant {
    padding: 2rem;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    color: white;
  }

  .tl { justify-content: flex-start; align-items: flex-start; }
  .tr { justify-content: flex-start; align-items: flex-end; }
  .bl { justify-content: flex-end;   align-items: flex-start; }
  .br { justify-content: flex-end;   align-items: flex-end; }

  h1 {
    font-size: clamp(2rem, 5vw, 4rem);
    font-weight: 300;
    letter-spacing: -0.02em;
    margin: 0;
    animation: slide-up 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.4s both;
  }

  p {
    font-size: 0.875rem;
    opacity: 0.5;
    margin: 0.5rem 0 0;
    animation: slide-up 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.5s both;
  }

  @keyframes slide-up {
    from { opacity: 0; translate: 0 12px; }
    to   { opacity: 1; translate: 0 0; }
  }
</style>