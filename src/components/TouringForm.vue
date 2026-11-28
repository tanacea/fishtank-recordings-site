<script setup lang="ts">
// Private inquiry from tour managers and artist teams. Goes straight to Lu.
import { reactive, ref, computed } from 'vue';
import { formEndpoint as endpoint } from '../data/site';

const needs = ['Band rehearsal', 'Record a song', 'Downtime on the deck', 'Session video and photos', 'Help finding a place to stay'];
const f = reactive({ artist: '', name: '', role: '', email: '', phone: '', show_date: '', venue: 'St. Augustine Amphitheatre', party: '', vehicles: '', notes: '', _honey: '' });
const picked = ref<string[]>(['Band rehearsal']);
const state = ref<'idle' | 'sending' | 'sent' | 'error'>('idle');
const valid = computed(() => f.artist.trim() && f.name.trim() && /.+@.+\..+/.test(f.email));

async function submit() {
  if (!valid.value || f._honey) return;
  state.value = 'sending';
  try {
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({ ...f, needs: picked.value.join(', '), _subject: `Touring artist inquiry: ${f.artist} (${f.show_date || 'date TBD'})`, _template: 'table' }),
    });
    state.value = res.ok ? 'sent' : 'error';
  } catch { state.value = 'error'; }
}
</script>

<template>
  <div v-if="state === 'sent'" class="done" role="status">
    <p class="eyebrow">Received</p>
    <h3>Thanks, {{ f.name.split(' ')[0] }}.</h3>
    <p>Lucio will be in touch about {{ f.artist }} directly. If the date is close, call or text <a href="tel:+19043777611">(904) 377-7611</a>.</p>
  </div>
  <form v-else class="form" @submit.prevent="submit" novalidate>
    <p class="hp"><label>Leave this empty <input v-model="f._honey" name="_honey" tabindex="-1" autocomplete="off" /></label></p>
    <div class="row">
      <label>Artist or band *<input v-model="f.artist" name="artist" required /></label>
      <label>Show date<input v-model="f.show_date" name="show_date" type="date" /></label>
    </div>
    <div class="row">
      <label>Your name *<input v-model="f.name" name="name" autocomplete="name" required /></label>
      <label>Your role<input v-model="f.role" name="role" placeholder="Tour manager, artist manager, artist…" /></label>
    </div>
    <div class="row">
      <label>Email *<input v-model="f.email" name="email" type="email" autocomplete="email" required /></label>
      <label>Phone<input v-model="f.phone" name="phone" type="tel" autocomplete="tel" /></label>
    </div>
    <div class="row">
      <label>Venue<input v-model="f.venue" name="venue" /></label>
      <label>Party size<input v-model="f.party" name="party" inputmode="numeric" placeholder="Band and crew" /></label>
    </div>
    <fieldset class="needs">
      <legend>What would help on the day?</legend>
      <label v-for="n in needs" :key="n" class="chk"><input v-model="picked" type="checkbox" :value="n" /> <span>{{ n }}</span></label>
    </fieldset>
    <label>Vehicles<input v-model="f.vehicles" name="vehicles" placeholder="e.g. one bus and a trailer" /></label>
    <label>Anything else<textarea v-model="f.notes" name="notes" rows="4" placeholder="Times, gear, privacy needs, the song you want to cut…"></textarea></label>
    <div class="actions">
      <button class="btn" type="submit" :disabled="!valid || state === 'sending'">{{ state === 'sending' ? 'Sending…' : 'Send to Lucio →' }}</button>
      <p class="hint">Private. Goes only to Lucio.</p>
    </div>
    <p v-if="state === 'error'" class="err" role="alert">That didn’t send. Call or text <a href="tel:+19043777611">(904) 377-7611</a>.</p>
  </form>
</template>

<style scoped>
.form { display: grid; gap: 1.1rem; }
.row { display: grid; gap: 1.1rem; }
@media (min-width: 640px) { .row { grid-template-columns: 1fr 1fr; } }
label { display: grid; gap: .45rem; font-family: var(--font-mono); font-size: .7rem; letter-spacing: .15em; text-transform: uppercase; color: var(--cream-dim); }
input, textarea { font: inherit; font-family: var(--font-body); font-size: 1rem; letter-spacing: 0; text-transform: none; background: var(--ink); color: var(--cream); border: 1px solid var(--line); border-radius: 4px; padding: .8rem 1rem; color-scheme: dark; }
input:focus, textarea:focus { outline: none; border-color: var(--amber); box-shadow: 0 0 0 3px rgba(240,164,58,.15); }
.needs { border: 1px solid var(--line); border-radius: 4px; padding: .9rem 1rem 1rem; margin: 0; display: flex; flex-wrap: wrap; gap: .6rem 1.2rem; }
.needs legend { font-family: var(--font-mono); font-size: .7rem; letter-spacing: .15em; text-transform: uppercase; color: var(--cream-dim); padding: 0 .4rem; }
.chk { display: flex; align-items: center; gap: .5rem; font-family: var(--font-body); font-size: .95rem; letter-spacing: 0; text-transform: none; color: var(--cream); }
.chk input { width: 1.05rem; height: 1.05rem; padding: 0; accent-color: var(--amber); }
.hp { position: absolute; left: -9999px; }
.actions { display: flex; align-items: center; gap: 1.2rem; flex-wrap: wrap; }
.btn[disabled] { opacity: .45; cursor: not-allowed; }
.hint { margin: 0; font-size: .85rem; color: var(--muted); }
.err { color: var(--red); margin: 0; }
.done { padding: 2rem 0; }
</style>
