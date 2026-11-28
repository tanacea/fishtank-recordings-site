<script setup lang="ts">
// Secondary "send a demo first" form on the Dive In page.
// Submissions are emailed to Lu through formEndpoint (see data/site.ts).
// No prices or budget ranges: pricing is discussed at the Dive In visit.
import { reactive, ref, computed } from 'vue';
import { formEndpoint as endpoint } from '../data/site';

const projectTypes = [
  'Full song production',
  'Artist assessment',
  'Recording session',
  'Mixing',
  'Mastering',
  'Film / TV scoring',
  'Commercial / ad music',
  'Voice-over',
  'Something else',
];

const f = reactive({
  name: '', email: '', phone: '', type: 'Full song production', songs: '', timeline: '', links: '', message: '', _honey: '',
});
const state = ref<'idle' | 'sending' | 'sent' | 'error'>('idle');
const valid = computed(() => f.name.trim() && /.+@.+\..+/.test(f.email) && f.message.trim().length > 9);

async function submit() {
  if (!valid.value || f._honey) return;
  state.value = 'sending';
  const body = JSON.stringify({ ...f, _subject: `New project inquiry: ${f.name}`, _template: 'table' });
  try {
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body,
    });
    state.value = res.ok ? 'sent' : 'error';
  } catch {
    state.value = 'error';
  }
}
</script>

<template>
  <div v-if="state === 'sent'" class="done" role="status">
    <p class="eyebrow">Received</p>
    <h3>Thanks, {{ f.name.split(' ')[0] }}. Lu will be in touch.</h3>
    <p>Usually within a day or two. If it's urgent, call <a href="tel:+19043777611">(904) 377-7611</a>.</p>
  </div>

  <form v-else name="project-inquiry" class="form" @submit.prevent="submit" novalidate>
    <p class="hp"><label>Leave this empty <input v-model="f._honey" name="_honey" tabindex="-1" autocomplete="off" /></label></p>

    <div class="row">
      <label>Name *<input v-model="f.name" name="name" required autocomplete="name" /></label>
      <label>Email *<input v-model="f.email" name="email" type="email" required autocomplete="email" /></label>
    </div>
    <div class="row">
      <label>Phone<input v-model="f.phone" name="phone" type="tel" autocomplete="tel" /></label>
      <label>What do you need?
        <select v-model="f.type" name="type"><option v-for="p in projectTypes" :key="p">{{ p }}</option></select>
      </label>
    </div>
    <div class="row">
      <label>How many songs?<input v-model="f.songs" name="songs" inputmode="numeric" placeholder="e.g. 1, or 5 for an EP" /></label>
      <label>Timeline<input v-model="f.timeline" name="timeline" placeholder="e.g. this spring" /></label>
    </div>
    <label>Links to demos / references<input v-model="f.links" name="links" placeholder="Voice memo, demo, Suno track, Dropbox, YouTube…" /></label>
    <label>Tell us about the project *<textarea v-model="f.message" name="message" rows="6" required placeholder="Genre, the artists you love the sound of, where the songs are at right now…" /></label>

    <div class="actions">
      <button class="btn" type="submit" :disabled="!valid || state === 'sending'">
        {{ state === 'sending' ? 'Sending…' : 'Send inquiry →' }}
      </button>
      <p class="hint">Goes straight to Lu. No mailing lists.</p>
    </div>
    <p v-if="state === 'error'" class="err" role="alert">
      That didn't send. Email <a href="mailto:lrubino@me.com">lrubino@me.com</a> or call (904) 377-7611.
    </p>
  </form>
</template>

<style scoped>
.form { display: grid; gap: 1.2rem; }
.row { display: grid; gap: 1.2rem; }
@media (min-width: 640px) { .row { grid-template-columns: 1fr 1fr; } .row--3 { grid-template-columns: 1fr 1fr 1fr; } }
label { display: grid; gap: .45rem; font-family: var(--font-mono); font-size: .7rem; letter-spacing: .15em; text-transform: uppercase; color: var(--cream-dim); }
input, select, textarea {
  font: inherit; font-family: var(--font-body); font-size: 1rem; letter-spacing: 0; text-transform: none;
  background: var(--ink); color: var(--cream); border: 1px solid var(--line); border-radius: 4px; padding: .85rem 1rem;
  transition: border-color .2s;
}
input:focus, select:focus, textarea:focus { outline: none; border-color: var(--amber); box-shadow: 0 0 0 3px rgba(240,164,58,.15); }
textarea { resize: vertical; }
.hp { position: absolute; left: -9999px; }
.actions { display: flex; align-items: center; gap: 1.2rem; flex-wrap: wrap; margin-top: .5rem; }
.btn[disabled] { opacity: .45; cursor: not-allowed; }
.hint { margin: 0; font-size: .85rem; color: var(--muted); }
.err { color: var(--red); margin: 0; }
.done { padding: 2rem 0; }
</style>
