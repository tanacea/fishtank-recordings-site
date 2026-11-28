<script setup lang="ts">
// Gift certificate request. No prices on the site, so this is a request,
// not a checkout: Lu receives it by email, sets the amount with the buyer,
// takes payment and sends the certificate.
import { reactive, ref, computed } from 'vue';
import { formEndpoint as endpoint } from '../data/site';

const gifts = ['A recording session', 'Full-song production', 'An Artist Assessment', 'Not sure yet, help me choose'];
const f = reactive({ name: '', email: '', phone: '', recipient: '', gift: gifts[0], occasion: '', needed_by: '', format: 'Email a printable certificate', message: '', _honey: '' });
const state = ref<'idle' | 'sending' | 'sent' | 'error'>('idle');
const valid = computed(() => f.name.trim().length > 1 && /.+@.+\..+/.test(f.email) && f.recipient.trim().length > 0);

async function submit() {
  if (!valid.value || f._honey) return;
  state.value = 'sending';
  try {
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        ...f,
        request: 'Gift certificate',
        _subject: `Gift certificate request: ${f.name} for ${f.recipient}`,
        _template: 'table',
        _autoresponse: `Thanks for thinking of The Fish Tank Recordings. Lucio will be in touch to choose the right gift for ${f.recipient}, settle the amount and arrange payment, then send the certificate.`,
      }),
    });
    state.value = res.ok ? 'sent' : 'error';
  } catch { state.value = 'error'; }
}
</script>

<template>
  <div v-if="state === 'sent'" class="done" role="status">
    <p class="eyebrow">Request received</p>
    <h3>Thanks, {{ f.name.split(' ')[0] }}.</h3>
    <p>Lucio will reach out to choose the right gift for {{ f.recipient }}, settle the amount and arrange payment. Then the certificate is on its way.</p>
  </div>
  <form v-else class="form" @submit.prevent="submit" novalidate>
    <p class="hp"><label>Leave this empty <input v-model="f._honey" name="_honey" tabindex="-1" autocomplete="off" /></label></p>
    <div class="row">
      <label>Your name<input v-model="f.name" name="name" autocomplete="name" required /></label>
      <label>Who is it for?<input v-model="f.recipient" name="recipient" placeholder="Their name" required /></label>
    </div>
    <div class="row">
      <label>Your email<input v-model="f.email" name="email" type="email" autocomplete="email" required /></label>
      <label>Your phone<input v-model="f.phone" name="phone" type="tel" autocomplete="tel" /></label>
    </div>
    <label>What would you like to give?
      <select v-model="f.gift" name="gift"><option v-for="g in gifts" :key="g">{{ g }}</option></select>
    </label>
    <div class="row">
      <label>Occasion<input v-model="f.occasion" name="occasion" placeholder="Birthday, holidays, graduation…" /></label>
      <label>Needed by<input v-model="f.needed_by" name="needed_by" type="date" /></label>
    </div>
    <label>Certificate
      <select v-model="f.format" name="format"><option>Email a printable certificate</option><option>Mail a printed certificate</option></select>
    </label>
    <label>Anything Lucio should know?<textarea v-model="f.message" name="message" rows="3" placeholder="What they play, what they’ve been writing, the sound they love…"></textarea></label>
    <div class="actions">
      <button class="btn" type="submit" :disabled="!valid || state === 'sending'">{{ state === 'sending' ? 'Sending…' : 'Request a gift certificate →' }}</button>
      <p class="hint">No payment now. Lucio follows up personally.</p>
    </div>
    <p v-if="state === 'error'" class="err" role="alert">That didn’t go through. Email <a href="mailto:lrubino@me.com">lrubino@me.com</a> with “Gift certificate” in the subject.</p>
  </form>
</template>

<style scoped>
.form { display: grid; gap: 1.2rem; }
.row { display: grid; gap: 1.2rem; }
@media (min-width: 640px) { .row { grid-template-columns: 1fr 1fr; } }
label { display: grid; gap: .45rem; font-family: var(--font-mono); font-size: .7rem; letter-spacing: .15em; text-transform: uppercase; color: var(--cream-dim); }
input, select, textarea { font: inherit; font-family: var(--font-body); font-size: 1rem; letter-spacing: 0; text-transform: none;
  background: var(--ink); color: var(--cream); border: 1px solid var(--line); border-radius: 4px; padding: .85rem 1rem; transition: border-color .2s; color-scheme: dark; }
input:focus, select:focus, textarea:focus { outline: none; border-color: var(--amber); box-shadow: 0 0 0 3px rgba(240,164,58,.15); }
textarea { resize: vertical; }
.hp { position: absolute; left: -9999px; }
.actions { display: flex; align-items: center; gap: 1.2rem; flex-wrap: wrap; margin-top: .5rem; }
.btn[disabled] { opacity: .45; cursor: not-allowed; }
.hint { margin: 0; font-size: .85rem; color: var(--muted); }
.err { color: var(--red); margin: 0; }
.done { padding: 2rem 0; }
</style>
