// Shared Spotify iFrame API loader + "one song at a time" state for every
// SpotifyTracks list on a page (the credits page has one list per artist).
import { ref } from 'vue';

type Controller = {
  play: () => void; togglePlay: () => void; destroy: () => void;
  addListener: (ev: string, cb: (e: any) => void) => void;
};
type IFrameAPI = { createController: (el: HTMLElement, opts: object, cb: (c: Controller) => void) => void };

export const activeId = ref<string | null>(null);
export const playing = ref(false);
let controller: Controller | null = null;
let apiPromise: Promise<IFrameAPI> | null = null;

function loadApi(): Promise<IFrameAPI> {
  if (apiPromise) return apiPromise;
  apiPromise = new Promise((resolve, reject) => {
    (window as any).onSpotifyIframeApiReady = (api: IFrameAPI) => resolve(api);
    const s = document.createElement('script');
    s.src = 'https://open.spotify.com/embed/iframe-api/v1';
    s.async = true;
    s.onerror = () => { apiPromise = null; reject(new Error('spotify api')); };
    document.head.appendChild(s);
  });
  return apiPromise;
}

export function stop() {
  try { controller?.destroy(); } catch { /* already gone */ }
  controller = null; activeId.value = null; playing.value = false;
}

/** Mount Spotify's player for `id` inside `el` and start playback right away. */
export async function start(id: string, el: HTMLElement, height: number): Promise<boolean> {
  try {
    const api = await loadApi();
    if (activeId.value !== id) return true; // user moved on while loading
    const host = document.createElement('div');
    el.replaceChildren(host);
    api.createController(host, { uri: `spotify:track:${id}`, width: '100%', height }, (c) => {
      controller = c;
      let started = false;
      const kick = () => { if (!started && controller === c && activeId.value === id) c.play(); };
      c.addListener('ready', kick);
      c.addListener('playback_update', (e) => {
        if (activeId.value !== id) return;
        playing.value = !e.data.isPaused;
        if (!e.data.isPaused) started = true;
      });
      // Belt and braces: some browsers deliver 'ready' before the player can
      // accept play(), so nudge it a couple more times until it is playing.
      setTimeout(kick, 1200); setTimeout(kick, 2800);
    });
    return true;
  } catch { return false; }
}
