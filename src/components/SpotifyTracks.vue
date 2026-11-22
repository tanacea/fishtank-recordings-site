<script setup lang="ts">
// Tap-to-play Spotify list. Renders a fast, crawlable list of songs and only
// loads Spotify's player for the song someone taps.
import { ref } from 'vue';

type T = { title: string; artist: string; id: string; note?: string };
const props = defineProps<{ tracks: T[]; compact?: boolean }>();
const active = ref<string | null>(null);
</script>

<template>
  <ul class="sp" :class="{ 'sp--compact': props.compact }">
    <li v-for="t in props.tracks" :key="t.id" :class="{ on: active === t.id }">
      <button class="sp__row" :aria-pressed="active === t.id" @click="active = active === t.id ? null : t.id">
        <span class="sp__icon" aria-hidden="true">{{ active === t.id ? '■' : '▶' }}</span>
        <span class="sp__text">
          <span class="sp__title">{{ t.title }}</span>
          <span class="sp__artist">{{ t.artist }}<template v-if="t.note"> · {{ t.note }}</template></span>
        </span>
        <svg class="sp__logo" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="12" fill="#1ed760"/><path d="M6.5 9.4c3.7-1.1 7.9-.8 11 1M7 12.6c3-.9 6.4-.6 9 .9M7.6 15.6c2.4-.6 5-.4 7 .8" stroke="#0e0c0a" stroke-width="1.6" stroke-linecap="round" fill="none"/></svg>
      </button>
      <div v-if="active === t.id" class="sp__player">
        <iframe
          :title="`${t.title} by ${t.artist} on Spotify`"
          :src="`https://open.spotify.com/embed/track/${t.id}?utm_source=generator&theme=0`"
          width="100%" height="152" loading="lazy"
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" />
      </div>
    </li>
  </ul>
</template>

<style scoped>
.sp { list-style: none; margin: 0; padding: 0; border-top: 1px solid var(--line); }
.sp li { border-bottom: 1px solid var(--line); }
.sp__row { width: 100%; display: grid; grid-template-columns: 1.6rem 1fr 22px; gap: 1rem; align-items: center;
  background: none; border: 0; color: var(--cream); text-align: left; padding: 1rem .5rem; cursor: pointer; font: inherit; transition: background .2s; }
.sp__row:hover { background: var(--ink-3); }
.sp__icon { color: #1ed760; font-size: .8rem; }
.sp__text { display: flex; flex-direction: column; min-width: 0; }
.sp__title { font-family: var(--font-display); font-size: 1.2rem; line-height: 1.25; }
.sp__artist { font-family: var(--font-mono); font-size: .68rem; letter-spacing: .1em; text-transform: uppercase; color: var(--cream-dim); margin-top: .2rem; }
.sp__logo { width: 22px; height: 22px; opacity: .55; transition: opacity .2s; }
.sp__row:hover .sp__logo, .on .sp__logo { opacity: 1; }
.sp__player { padding: 0 .5rem 1rem; }
.sp__player iframe { border: 0; border-radius: 12px; background: var(--ink-3); }
.sp--compact { border-top: 0; }
.sp--compact li { border-bottom: 0; }
.sp--compact .sp__row { padding: .35rem 0; grid-template-columns: 1.1rem 1fr; }
.sp--compact .sp__logo, .sp--compact .sp__artist { display: none; }
.sp--compact .sp__title { font-family: var(--font-body); font-size: .92rem; color: var(--cream-dim); }
.sp--compact .sp__row:hover { background: none; }
.sp--compact .sp__row:hover .sp__title, .sp--compact .on .sp__title { color: var(--cream); }
.sp--compact .sp__icon { font-size: .62rem; }
.sp--compact .sp__player { padding: .3rem 0 .8rem; }
</style>
