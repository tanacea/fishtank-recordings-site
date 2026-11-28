<script setup lang="ts">
// Tap-to-play Spotify list. Renders a fast, crawlable list of songs; tapping
// a play button loads Spotify's player for that song and starts it at once
// (one song at a time across the whole page).
import { ref, nextTick, onBeforeUnmount } from 'vue';
import { activeId, playing, start, stop } from '../lib/spotify';

type T = { title: string; artist: string; id: string; note?: string };
const props = defineProps<{ tracks: T[]; compact?: boolean }>();
const slots: Record<string, HTMLElement | null> = {};
const fallback = ref<string | null>(null); // plain embed if the Spotify API can't load

async function toggle(id: string) {
  if (activeId.value === id) { stop(); fallback.value = null; return; }
  stop();
  activeId.value = id; fallback.value = null;
  await nextTick();
  const el = slots[id];
  if (el && !(await start(id, el, props.compact ? 80 : 152))) fallback.value = id;
}
onBeforeUnmount(() => { if (props.tracks.some((t) => t.id === activeId.value)) stop(); });
</script>

<template>
  <ul class="sp" :class="{ 'sp--compact': props.compact }">
    <li v-for="t in props.tracks" :key="t.id" :class="{ on: activeId === t.id }">
      <button class="sp__row" :aria-pressed="activeId === t.id"
        :aria-label="`${activeId === t.id ? 'Stop' : 'Play'} ${t.title} by ${t.artist}`" @click="toggle(t.id)">
        <span class="sp__btn" aria-hidden="true">
          <svg v-if="activeId !== t.id" viewBox="0 0 24 24"><path d="M8.5 6.2v11.6a.6.6 0 0 0 .9.5l9.2-5.8a.6.6 0 0 0 0-1L9.4 5.7a.6.6 0 0 0-.9.5z" /></svg>
          <span v-else-if="playing" class="sp__eq"><i></i><i></i><i></i></span>
          <svg v-else viewBox="0 0 24 24"><rect x="7.5" y="7.5" width="9" height="9" rx="1.2" /></svg>
        </span>
        <span class="sp__text">
          <span class="sp__title">{{ t.title }}</span>
          <span class="sp__artist">{{ t.artist }}<template v-if="t.note"> · {{ t.note }}</template></span>
        </span>
        <svg class="sp__logo" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="12" fill="#1ed760"/><path d="M6.5 9.4c3.7-1.1 7.9-.8 11 1M7 12.6c3-.9 6.4-.6 9 .9M7.6 15.6c2.4-.6 5-.4 7 .8" stroke="#0e0c0a" stroke-width="1.6" stroke-linecap="round" fill="none"/></svg>
      </button>
      <div v-if="activeId === t.id" class="sp__player" :class="{ 'sp__player--c': props.compact }">
        <div :ref="(el) => (slots[t.id] = el as HTMLElement)" class="sp__slot">
          <iframe v-if="fallback === t.id"
            :title="`${t.title} by ${t.artist} on Spotify`"
            :src="`https://open.spotify.com/embed/track/${t.id}?utm_source=generator&theme=0`"
            width="100%" :height="props.compact ? 80 : 152"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" />
        </div>
      </div>
    </li>
  </ul>
</template>

<style scoped>
.sp { list-style: none; margin: 0; padding: 0; border-top: 1px solid var(--line); }
.sp li { border-bottom: 1px solid var(--line); }
.sp__row { width: 100%; display: grid; grid-template-columns: 2.25rem 1fr 22px; gap: 1rem; align-items: center;
  background: none; border: 0; color: var(--cream); text-align: left; padding: .85rem .5rem; cursor: pointer; font: inherit; transition: background .2s; }
.sp__row:hover { background: var(--ink-3); }

/* Round play button */
.sp__btn { width: 2.25rem; height: 2.25rem; border-radius: 50%; display: grid; place-items: center;
  background: #1ed760; color: #0e0c0a; box-shadow: 0 2px 10px rgba(30,215,96,.18);
  transition: transform .15s ease, box-shadow .2s, background .2s; }
.sp__btn svg { width: 58%; height: 58%; fill: currentColor; }
.sp__row:hover .sp__btn { transform: scale(1.08); box-shadow: 0 3px 16px rgba(30,215,96,.35); }
.sp__row:active .sp__btn { transform: scale(.96); }
.sp__row:focus-visible { outline: 2px solid var(--amber); outline-offset: 2px; }
.on .sp__btn { background: var(--amber); box-shadow: 0 2px 14px rgba(240,164,58,.35); }

/* Playing: little equalizer */
.sp__eq { display: flex; gap: 2px; align-items: flex-end; height: 42%; }
.sp__eq i { width: 3px; background: currentColor; border-radius: 1px; animation: eq .9s ease-in-out infinite; }
.sp__eq i:nth-child(2) { animation-delay: -.3s; } .sp__eq i:nth-child(3) { animation-delay: -.6s; }
@keyframes eq { 0%, 100% { height: 30%; } 50% { height: 100%; } }
@media (prefers-reduced-motion: reduce) { .sp__eq i { animation: none; height: 70%; } }

.sp__text { display: flex; flex-direction: column; min-width: 0; }
.sp__title { font-family: var(--font-display); font-size: 1.2rem; line-height: 1.25; }
.sp__artist { font-family: var(--font-mono); font-size: .68rem; letter-spacing: .1em; text-transform: uppercase; color: var(--cream-dim); margin-top: .2rem; }
.sp__logo { width: 22px; height: 22px; opacity: .55; transition: opacity .2s; }
.sp__row:hover .sp__logo, .on .sp__logo { opacity: 1; }
.sp__player { padding: 0 .5rem 1rem; }
.sp__slot { min-height: 152px; border-radius: 12px; background: var(--ink-3); overflow: hidden; }
.sp__player--c .sp__slot { min-height: 80px; }
.sp__slot :deep(iframe) { border: 0; border-radius: 12px; display: block; }

/* Compact (credits page) */
.sp--compact { border-top: 0; }
.sp--compact li { border-bottom: 0; }
.sp--compact .sp__row { padding: .3rem .25rem; grid-template-columns: 1.6rem 1fr; gap: .7rem; border-radius: 6px; }
.sp--compact .sp__btn { width: 1.6rem; height: 1.6rem; }
.sp--compact .sp__logo, .sp--compact .sp__artist { display: none; }
.sp--compact .sp__title { font-family: var(--font-body); font-size: .92rem; color: var(--cream-dim); }
.sp--compact .sp__row:hover { background: var(--ink-3); }
.sp--compact .sp__row:hover .sp__title, .sp--compact .on .sp__title { color: var(--cream); }
.sp--compact .sp__player { padding: .3rem 0 .8rem; }
</style>
