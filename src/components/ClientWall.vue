<script setup lang="ts">
// Homepage client wall: one card per headline credit, each with a play
// button that loads that song from Lucio's playlist and starts it at once.
import { ref, nextTick } from 'vue';
import { activeId, playing, start, stop } from '../lib/spotify';

type C = { artist: string; credit: string; track: string; id: string };
const props = defineProps<{ items: C[] }>();
const slots: Record<string, HTMLElement | null> = {};
const fallback = ref<string | null>(null);

async function toggle(id: string) {
  if (activeId.value === id) { stop(); fallback.value = null; return; }
  stop(); activeId.value = id; fallback.value = null;
  await nextTick();
  const el = slots[id];
  if (el && !(await start(id, el, 80))) fallback.value = id;
}
</script>

<template>
  <ul class="cw">
    <li v-for="c in props.items" :key="c.id" :class="{ on: activeId === c.id }">
      <button class="cw__btn" :aria-pressed="activeId === c.id" :aria-label="`${activeId === c.id ? 'Stop' : 'Play'} ${c.track} by ${c.artist}`" @click="toggle(c.id)">
        <span class="cw__play" aria-hidden="true">
          <svg v-if="activeId !== c.id" viewBox="0 0 24 24"><path d="M8.5 6.2v11.6a.6.6 0 0 0 .9.5l9.2-5.8a.6.6 0 0 0 0-1L9.4 5.7a.6.6 0 0 0-.9.5z" /></svg>
          <span v-else-if="playing" class="cw__eq"><i></i><i></i><i></i></span>
          <svg v-else viewBox="0 0 24 24"><rect x="7.5" y="7.5" width="9" height="9" rx="1.2" /></svg>
        </span>
        <span class="cw__text">
          <span class="cw__artist">{{ c.artist }}</span>
          <span class="cw__credit">{{ c.credit }}</span>
          <span class="cw__track">▸ {{ c.track }}</span>
        </span>
      </button>
      <div v-if="activeId === c.id" :ref="(el) => (slots[c.id] = el as HTMLElement)" class="cw__slot">
        <iframe v-if="fallback === c.id" :title="`${c.track} by ${c.artist} on Spotify`" :src="`https://open.spotify.com/embed/track/${c.id}?theme=0`" width="100%" height="80" allow="autoplay; encrypted-media" />
      </div>
    </li>
  </ul>
</template>

<style scoped>
.cw { list-style: none; padding: 0; margin: 2.5rem 0 0; display: grid; gap: 1px; background: var(--line); border: 1px solid var(--line); border-radius: 6px; overflow: hidden; }
@media (min-width: 700px) { .cw { grid-template-columns: repeat(2, 1fr); } }
@media (min-width: 1100px) { .cw { grid-template-columns: repeat(3, 1fr); } }
.cw li { background: var(--ink-2); }
.cw__btn { width: 100%; display: grid; grid-template-columns: 2.6rem 1fr; gap: 1rem; align-items: center; background: none; border: 0; color: var(--cream); text-align: left; padding: 1.2rem 1.3rem; cursor: pointer; font: inherit; transition: background .2s; }
.cw__btn:hover { background: var(--ink-3); }
.cw__btn:focus-visible { outline: 2px solid var(--amber); outline-offset: -2px; }
.cw__play { width: 2.6rem; height: 2.6rem; border-radius: 50%; display: grid; place-items: center; background: #1ed760; color: #0e0c0a; transition: transform .15s, background .2s; }
.cw__play svg { width: 58%; height: 58%; fill: currentColor; }
.cw__btn:hover .cw__play { transform: scale(1.07); }
.on .cw__play { background: var(--amber); }
.cw__eq { display: flex; gap: 2px; align-items: flex-end; height: 42%; }
.cw__eq i { width: 3px; background: currentColor; border-radius: 1px; animation: eq .9s ease-in-out infinite; }
.cw__eq i:nth-child(2) { animation-delay: -.3s; } .cw__eq i:nth-child(3) { animation-delay: -.6s; }
@keyframes eq { 0%, 100% { height: 30%; } 50% { height: 100%; } }
@media (prefers-reduced-motion: reduce) { .cw__eq i { animation: none; height: 70%; } }
.cw__text { display: flex; flex-direction: column; min-width: 0; }
.cw__artist { font-family: var(--font-display); font-size: 1.25rem; line-height: 1.2; }
.cw__credit { font-size: .88rem; color: var(--cream-dim); margin-top: .15rem; }
.cw__track { font-family: var(--font-mono); font-size: .64rem; letter-spacing: .12em; text-transform: uppercase; color: var(--muted); margin-top: .35rem; }
.cw__slot { padding: 0 1.3rem 1.2rem; min-height: 80px; }
.cw__slot :deep(iframe) { border: 0; border-radius: 12px; display: block; }
</style>
