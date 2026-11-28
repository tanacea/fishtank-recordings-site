<script setup lang="ts">
// 20% off an EP — lead capture. Slides in after a visitor has engaged
// (25 seconds or past the middle of the page), never blocks the page,
// and remembers a dismissal for 14 days. Any element with
// [data-ep-offer] reopens it. Each lead is emailed to Lu via formEndpoint.
import { ref, reactive, computed, onMounted, onBeforeUnmount } from 'vue';
import { formEndpoint, cta } from '../data/site';

const open = ref(false);
const state = ref<'idle' | 'sending' | 'sent' | 'error'>('idle');
const f = reactive({ name: '', email: '', phone: '', _honey: '' });
const valid = computed(() => f.name.trim().length > 1 && /.+@.+\..+/.test(f.email) && f.phone.replace(/\D/g, '').length >= 7);
const KEY = 'ft-ep-offer';
let timer: ReturnType<typeof setTimeout> | undefined;

function read(): { until?: number; done?: boolean } {
  try { return JSON.parse(localStorage.getItem(KEY) || '{}'); } catch { return {}; }
}
function write(v: object) { try { localStorage.setItem(KEY, JSON.stringify(v)); } catch { /* storage unavailable */ } }

function show() { if (!open.value) open.value = true; cleanup(); }
function onScroll() {
  const h = document.documentElement;
  if ((h.scrollTop + innerHeight) / h.scrollHeight > 0.55) show();
}
function onReopen(e: Event) {
  const t = (e.target as HTMLElement)?.closest?.('[data-ep-offer]');
  if (t) { e.preventDefault(); open.value = true; }
}
function cleanup() { clearTimeout(timer); removeEventListener('scroll', onScroll); }
function dismiss() { open.value = false; if (state.value !== 'sent') write({ until: Date.now() + 14 * 864e5 }); }

onMounted(() => {
  document.addEventListener('click', onReopen);
  const s = read();
  // Never auto-open on the booking page; the visitor is already converting.
  if (s.done || (s.until && s.until > Date.now()) || location.pathname.startsWith('/contact')) return;
  timer = setTimeout(show, 25000);
  addEventListener('scroll', onScroll, { passive: true });
});
onBeforeUnmount(() => { cleanup(); document.removeEventListener('click', onReopen); });

async function submit() {
  if (!valid.value || f._honey) return;
  state.value = 'sending';
  try {
    const res = await fetch(formEndpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        name: f.name, email: f.email, phone: f.phone,
        offer: '20% off an EP package (5 songs). Not valid on singles.',
        page: location.pathname,
        _subject: `New 20% EP lead: ${f.name}`,
        _template: 'table',
        _autoresponse: `Thanks for reaching out to The Fish Tank Recordings. Lucio will send your 20% EP code personally. The discount applies to EP packages (five songs), not singles. When you're ready, book your free Dive In visit, in person or on Google Meet: ${cta.href}`,
        _honey: f._honey,
      }),
    });
    state.value = res.ok ? 'sent' : 'error';
    if (res.ok) write({ done: true });
  } catch { state.value = 'error'; }
}
</script>

<template>
  <Transition name="ep">
    <aside v-if="open" class="ep" role="dialog" aria-labelledby="ep-title" aria-modal="false">
      <button class="ep__x" type="button" aria-label="Close" @click="dismiss">×</button>
      <template v-if="state !== 'sent'">
        <p class="ep__eyebrow">EP offer</p>
        <h2 id="ep-title" class="ep__h">Get <em>20% off</em> your EP.</h2>
        <p class="ep__p">Drop your name, email and phone, and we’ll send your code.</p>
        <form class="ep__form" @submit.prevent="submit" novalidate>
          <input v-model="f._honey" class="ep__hp" name="_honey" tabindex="-1" autocomplete="off" aria-hidden="true" />
          <label><span>Name</span><input v-model="f.name" name="name" autocomplete="name" placeholder="Name" required /></label>
          <label><span>Email</span><input v-model="f.email" name="email" type="email" autocomplete="email" placeholder="Email" required /></label>
          <label><span>Phone</span><input v-model="f.phone" name="phone" type="tel" autocomplete="tel" placeholder="Phone" required /></label>
          <button class="btn" type="submit" :disabled="!valid || state === 'sending'">{{ state === 'sending' ? 'Sending…' : 'Send my code →' }}</button>
        </form>
        <p class="ep__fine">EP packages (five songs) only. Not valid on singles.</p>
        <p v-if="state === 'error'" class="ep__err" role="alert">That didn’t go through. Email <a href="mailto:lrubino@me.com">lrubino@me.com</a> and mention the EP offer.</p>
      </template>
      <div v-else role="status">
        <p class="ep__eyebrow">You’re in</p>
        <h2 class="ep__h">Thanks, {{ f.name.split(' ')[0] }}.</h2>
        <p class="ep__p">Lucio will send your 20% EP code. Want to talk about the record now?</p>
        <a class="btn" :href="cta.href" target="_blank" rel="noopener">{{ cta.label }} →</a>
        <p class="ep__fine">{{ cta.micro }}</p>
      </div>
    </aside>
  </Transition>
</template>

<style scoped>
.ep { position: fixed; z-index: 60; right: clamp(.75rem, 2vw, 1.5rem); bottom: clamp(.75rem, 2vw, 1.5rem); width: min(380px, calc(100vw - 1.5rem));
  background: var(--ink-2); border: 1px solid #5a4a38; border-radius: 8px; padding: 1.6rem 1.5rem 1.3rem; box-shadow: 0 24px 60px rgba(0,0,0,.55), 0 0 0 1px rgba(240,164,58,.08); }
.ep__x { position: absolute; top: .4rem; right: .6rem; background: none; border: 0; color: var(--muted); font-size: 1.6rem; line-height: 1; cursor: pointer; padding: .3rem .5rem; }
.ep__x:hover { color: var(--cream); }
.ep__eyebrow { margin: 0 0 .5rem; font-family: var(--font-mono); font-size: .66rem; letter-spacing: .2em; text-transform: uppercase; color: var(--amber); }
.ep__h { font-size: 1.7rem; margin: 0 0 .4rem; }
.ep__h em { color: var(--amber); }
.ep__p { margin: 0 0 1rem; font-size: .95rem; }
.ep__form { display: grid; gap: .65rem; }
.ep__form label { display: grid; gap: .25rem; }
.ep__form span { font-family: var(--font-mono); font-size: .62rem; letter-spacing: .16em; text-transform: uppercase; color: var(--cream-dim); }
.ep__form input { font: inherit; font-size: 1rem; background: var(--ink); color: var(--cream); border: 1px solid var(--line); border-radius: 4px; padding: .65rem .8rem; }
.ep__form input:focus { outline: none; border-color: var(--amber); box-shadow: 0 0 0 3px rgba(240,164,58,.15); }
.ep__form .btn { margin-top: .4rem; justify-content: center; }
.btn[disabled] { opacity: .45; cursor: not-allowed; }
.ep__hp { position: absolute; left: -9999px; width: 1px; height: 1px; }
.ep__fine { margin: .8rem 0 0; font-size: .75rem; color: var(--muted); }
.ep__err { margin: .6rem 0 0; font-size: .85rem; color: var(--red); }
@media (max-width: 600px) {
  .ep { left: .5rem; right: .5rem; bottom: .5rem; width: auto; padding: 1.1rem 1rem .9rem; }
  .ep__h { font-size: 1.35rem; }
  .ep__p { font-size: .85rem; margin-bottom: .7rem; }
  .ep__form { gap: .45rem; }
  .ep__form span { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0); }
  .ep__form input { padding: .55rem .7rem; }
  .ep__fine { margin-top: .5rem; }
}
@media (min-width: 601px) { .ep__form input::placeholder { color: transparent; } }
.ep-enter-active, .ep-leave-active { transition: transform .35s ease, opacity .35s ease; }
.ep-enter-from, .ep-leave-to { transform: translateY(20px); opacity: 0; }
@media (prefers-reduced-motion: reduce) { @media (max-width: 600px) {
  .ep { left: .5rem; right: .5rem; bottom: .5rem; width: auto; padding: 1.1rem 1rem .9rem; }
  .ep__h { font-size: 1.35rem; }
  .ep__p { font-size: .85rem; margin-bottom: .7rem; }
  .ep__form { gap: .45rem; }
  .ep__form span { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0); }
  .ep__form input { padding: .55rem .7rem; }
  .ep__fine { margin-top: .5rem; }
}
@media (min-width: 601px) { .ep__form input::placeholder { color: transparent; } }
.ep-enter-active, .ep-leave-active { transition: none; } }
</style>
