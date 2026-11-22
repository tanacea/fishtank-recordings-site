<script setup lang="ts">
// "Lite" SoundCloud player: renders a fast, crawlable track list and only
// loads the heavy SoundCloud iframe when someone presses play.
import { ref } from 'vue';

const props = defineProps<{ tracks: { title: string; artist: string; url: string }[] }>();
const active = ref<string | null>(null);

const src = (url: string) =>
  `https://w.soundcloud.com/player/?url=${encodeURIComponent(url)}&color=%23f0a43a&auto_play=true&hide_related=true&show_comments=false&show_user=true&show_reposts=false&visual=false`;
</script>

<template>
  <ol class="tl">
    <li v-for="(t, i) in props.tracks" :key="t.url" :class="{ on: active === t.url }">
      <button class="tl__row" :aria-pressed="active === t.url" @click="active = active === t.url ? null : t.url">
        <span class="tl__n">{{ String(i + 1).padStart(2, '0') }}</span>
        <span class="tl__icon" aria-hidden="true">{{ active === t.url ? '■' : '▶' }}</span>
        <span class="tl__title">{{ t.title }}</span>
        <span class="tl__artist">{{ t.artist }}</span>
        <span class="tl__bars" aria-hidden="true"><i /><i /><i /><i /></span>
      </button>
      <div v-if="active === t.url" class="tl__player">
        <iframe :title="`${t.title} by ${t.artist}`" width="100%" height="120" allow="autoplay" :src="src(t.url)" loading="lazy" />
      </div>
    </li>
  </ol>
</template>

<style scoped>
.tl { list-style: none; margin: 0; padding: 0; border-top: 1px solid var(--line); }
.tl li { border-bottom: 1px solid var(--line); }
.tl__row {
  width: 100%; display: grid; grid-template-columns: 2.5rem 1.6rem 1fr auto 2rem; align-items: center; gap: 1rem;
  background: none; border: 0; color: var(--cream); text-align: left; padding: 1.15rem .5rem; cursor: pointer; font: inherit;
  transition: background .2s;
}
.tl__row:hover { background: var(--ink-3); }
.tl__n { font-family: var(--font-mono); font-size: .75rem; color: var(--muted); }
.tl__icon { color: var(--amber); font-size: .8rem; }
.tl__title { font-family: var(--font-display); font-size: 1.25rem; }
.tl__artist { font-family: var(--font-mono); font-size: .75rem; letter-spacing: .08em; color: var(--cream-dim); text-transform: uppercase; }
.tl__bars { display: flex; gap: 3px; height: 16px; align-items: flex-end; opacity: 0; }
.tl__bars i { width: 3px; background: var(--amber); height: 30%; }
.on .tl__bars { opacity: 1; }
.on .tl__bars i { animation: eq .9s ease-in-out infinite alternate; }
.on .tl__bars i:nth-child(2) { animation-delay: .2s; }
.on .tl__bars i:nth-child(3) { animation-delay: .4s; }
.on .tl__bars i:nth-child(4) { animation-delay: .1s; }
@keyframes eq { from { height: 20%; } to { height: 100%; } }
.tl__player { padding: 0 .5rem 1rem; }
.tl__player iframe { border: 0; border-radius: 4px; }
@media (max-width: 640px) {
  .tl__row { grid-template-columns: 2rem 1.2rem 1fr; }
  .tl__artist { grid-column: 3; font-size: .68rem; }
  .tl__bars { display: none; }
}
</style>
