// ─────────────────────────────────────────────────────────────
// Single source of truth for site content.
// RULE: only publish credits that are confirmed. Anything unverified
// lives in `pendingCredits` (NOT rendered) until Lu confirms it.
// ─────────────────────────────────────────────────────────────

export const business = {
  name: 'The Fish Tank Recordings',
  shortName: 'The Fish Tank',
  owner: 'Lucio "Lu" Rubino',
  founded: 2002,
  street: '24 Althea Street',
  city: 'St. Augustine',
  region: 'FL',
  postal: '32084',
  country: 'US',
  setting: 'an elevated studio down a private drive overlooking the St. Augustine marsh',
  phone: '(904) 377-7611',
  phoneE164: '+19043777611',
  email: 'lrubino@me.com',
  url: 'https://thefishtankrecordings.com',
  social: {
    instagramStudio: 'https://www.instagram.com/thefishtankrecordings/',
    instagramLu: 'https://www.instagram.com/iamluciorubino/',
    facebook: 'https://www.facebook.com/The-Fish-Tank-Recording-Studio-155965524428172/',
    youtube: 'https://www.youtube.com/channel/UCJsmo1F_Nk4vph0CQJPo56w',
    spotifyLu: 'https://open.spotify.com/artist/1a7rwgPMYCZ1USZm6YZX7Z',
    spotifyStorySideB: 'https://open.spotify.com/artist/6YadZn1F4LMfrYPXzovR1w',
    spotifyGreyDazeInTime: 'https://open.spotify.com/track/09Gxf0vmUCUPB1LixAc2b9',
  },
};

// Spotify embeds (lazy-loaded). type: 'artist' | 'track' | 'album'
export const spotify = [
  { type: 'artist', id: '1a7rwgPMYCZ1USZm6YZX7Z', label: 'Lucio Rubino', sub: 'Solo' },
  { type: 'artist', id: '6YadZn1F4LMfrYPXzovR1w', label: 'StorySide:B', sub: 'Lead vocals · co-writer' },
  { type: 'track', id: '09Gxf0vmUCUPB1LixAc2b9', label: 'Grey Daze: “In Time”', sub: 'Chester Bennington’s first band' }, // TODO: swap to the Amends (2020) version Lu produced; this ID is the 1997 No Sun Today original
];

// ── Funnel ──────────────────────────────────────────────────
// Every page leads to one action: a free Dive In visit (in person or Google Meet).
export const cta = {
  label: 'Book Your Free Dive In Visit',
  short: 'Book a Free Dive In',
  href: 'https://calendly.com/luciorubino/divein',
  micro: 'Free, no pressure, no obligation.',
};
// No prices anywhere on the site. Lu discusses pricing in person.
export const packagesLine = 'Single and EP packages, with payment plans available. We’ll find the right fit at your free visit.';
export const genresLine = 'Singer-songwriter, rock, pop, country and metal.';

// Lead forms post here. FormSubmit forwards each submission to Lu by email
// (the first submission triggers a one-time activation email to lrubino@me.com).
// Override with PUBLIC_FORM_ENDPOINT (e.g. a MailerLite/Mailchimp-backed endpoint).
export const formEndpoint = import.meta.env.PUBLIC_FORM_ENDPOINT || 'https://formsubmit.co/ajax/lrubino@me.com';

export const nav = [
  { label: 'Production', href: '/song-production/' },
  { label: 'Services', href: '/services/' },
  { label: 'Credits', href: '/credits/' },
  { label: 'Lucio', href: '/lucio-rubino/' },
  { label: 'The Studio', href: '/studio/' },
  { label: 'Gear', href: '/gear/' },
];

// Verified, publishable credits. `source` = where it was confirmed.
export type Credit = {
  artist: string;
  work: string;
  year?: string;
  role: string;
  note?: string;
  label?: string;
  source: string;
  featured?: boolean;
};

export const credits: Credit[] = [
  {
    artist: 'Paramore',
    work: 'All We Know Is Falling',
    year: '2005',
    label: 'Fueled by Ramen',
    role: 'Bass (every song except “Here We Go Again”)',
    note: 'RIAA Certified Platinum (2025) · single “Pressure” also Platinum',
    source: 'Album credits via Wikipedia; Forbes (RIAA Platinum, Aug 2025); Wikipedia discography (“Pressure” Platinum)',
    featured: true,
  },
  {
    artist: 'RED',
    work: 'Rated R: "Still Bleeding"',
    year: '2023',
    label: 'RED Entertainment / The Fuel Music',
    role: 'Co-writer, bass',
    source: 'Shazam credits',
    featured: true,
  },
  {
    artist: 'RED',
    work: 'Rated R: "Your Devil Is a Ghost"',
    year: '2023',
    label: 'RED Entertainment / The Fuel Music',
    role: 'Co-writer',
    source: 'Deezer writer credits',
  },
  {
    artist: 'Grey Daze (Chester Bennington of Linkin Park)',
    work: 'Amends: "In Time"',
    year: '2020',
    label: 'Loma Vista Recordings',
    role: 'Producer (track)',
    note: '#9 Billboard Top Rock Albums',
    source: 'Album credits (Wikipedia / Linkinpedia); Billboard',
    featured: true,
  },
  {
    artist: 'StorySide:B',
    work: '"Be Still"',
    year: '2008',
    label: 'Gotee Records',
    role: 'Lead vocals, co-writer',
    note: "BMI: one of 2008's Top 5 most-played songs on Christian radio",
    source: 'Lucio Rubino interview (Top40-Charts, 2012); Last.fm',
    featured: true,
  },
  {
    artist: 'StorySide:B',
    work: 'Two albums',
    year: '2003–2009',
    label: 'Gotee Records',
    role: 'Co-founder, lead vocals, guitar',
    source: 'Last.fm bio; Top40-Charts interview',
  },
  {
    artist: 'A Flock of Seagulls',
    work: 'Tour',
    year: '1998',
    role: 'Touring bassist',
    source: 'Lucio Rubino interview (Top40-Charts, 2012)',
  },
  {
    artist: 'Monkey the Fish',
    work: 'EMI recording deal',
    role: 'Member · co-producer (with Pete Thornton)',
    source: 'Lucio Rubino interview (Top40-Charts, 2012); co-production confirmed by Lu via Greg, Nov 2026',
  },
  {
    artist: 'Larry Coryell',
    work: '“Alabama Rhap Corollary,” “Mr. Miyake”',
    role: 'Producer',
    note: 'The “Godfather of Fusion” guitarist',
    source: 'Confirmed by Lu via Greg, Nov 2026; Lu’s Spotify playlist',
    featured: true,
  },
  {
    artist: 'STARSET',
    work: '“Trials,” “Manifest,” “Echo,” “Faultline” + 4 more',
    role: 'Contributor (8 songs)',
    source: 'Confirmed by Lu via Greg, Nov 2026; Lu’s Spotify playlist',
    featured: true,
  },
  {
    artist: 'RED',
    work: 'Rated R: “Tell Me How To Say Goodbye”',
    year: '2023',
    role: 'Contributor',
    source: 'Lu’s Spotify playlist',
  },
  {
    artist: 'Seventh Day Slumber',
    work: '“Addicted To My Pain”',
    role: 'Contributor',
    source: 'Lu’s Spotify playlist',
  },
  {
    artist: 'Manafest',
    work: '“Kamikaze”',
    role: 'Contributor',
    source: 'Lu’s Spotify playlist',
  },
  {
    artist: 'Jill Cunniff (Luscious Jackson)',
    work: 'Songwriting',
    role: 'Co-writer',
    source: 'Confirmed by Lu via Greg, Nov 2026',
  },
  {
    artist: 'RED',
    work: 'European tour',
    role: 'Touring musician',
    source: 'Confirmed by Lu via Greg, Nov 2026',
  },
  {
    artist: 'Disturbed',
    work: 'Live show',
    role: 'Performer (one show)',
    source: 'Confirmed by Lu via Greg, Nov 2026',
  },
  {
    artist: 'Lucio Rubino',
    work: 'Lucio Rubino (solo debut)',
    year: '2012',
    role: 'Artist, writer, producer',
    source: 'Something Else! review; Top40-Charts',
  },
  { artist: 'Manic Drive', work: 'Album', role: 'Producer', source: 'Top40-Charts interview; original site' },
  { artist: 'Todd Lombardo', work: 'Album', role: 'Producer', note: 'Grammy-nominated guitarist (Jerry Douglas)', source: 'Top40-Charts interview; original site' },
  { artist: 'Lindsey Dedge', work: 'Album', role: 'Producer', source: 'Top40-Charts interview; original site' },
  { artist: 'Lighthouse Music', work: 'Album', role: 'Producer', source: 'Top40-Charts interview; original site' },
];

// Credits confirmed by Lu but still missing specifics. Fill these in to
// sharpen the credits page: Coryell record title/year, Starset role,
// Cunniff song titles, RED tour year + instrument, Disturbed show/year.
export const pendingCredits: { artist: string; claim: string }[] = [];

export const marquee = ['Paramore', 'STARSET', 'RED', 'Grey Daze', 'Larry Coryell', 'Seventh Day Slumber', 'Manafest', 'StorySide:B', 'A Flock of Seagulls', 'Jill Cunniff', 'Manic Drive', 'Todd Lombardo'];

// TODO(before launch): entries marked paraphrased:true are condensed versions.
// Replace with the EXACT wording from the old /testimonials page (copy from
// Squarespace) so nobody is quoted saying words they didn't write.
export const testimonials = [
  {
    quote:
      'A world-class studio. Comfort, style and cutting-edge gear that pushes a session somewhere unusually creative. I can’t imagine a better place to record my album.',
    name: 'Todd Lombardo',
    role: 'Grammy-nominated songwriter · guitarist for Jerry Douglas',
    paraphrased: true,
  },
  {
    quote:
      'After 20 years of recording, this was my most creative and best-sounding experience. Lu’s talent goes far beyond engineering, from the sound to shaping the song itself. My favorite collaborator.',
    name: 'Jeremy Thomas',
    role: 'Singer / songwriter',
    paraphrased: true,
  },
  {
    quote: 'Lu is arguably the most talented artist/composer in NE Florida.',
    name: 'Michael Arbuthnot',
    role: 'TV host & producer',
    paraphrased: false,
  },
  {
    quote:
      'Lu took our client’s first notes, wrote and produced custom music for their TV spots, and hit the nail on the head.',
    name: 'Mike Rolandelli',
    role: 'Creative partner, RFR',
    paraphrased: true,
  },
];


export const gear = [
  {
    group: 'System & Monitoring',
    items: [
      'Avid Pro Tools HD / Ultimate',
      'Avid 192 interface',
      'Digidesign 192 I/O',
      'Apple Mac Pro, dual 6-core, 48GB',
      'ADAM SX7 monitors',
      'Yamaha NS-10',
      'Personal monitor mixes for 5 players',
    ],
  },
  {
    group: 'Console & Outboard',
    items: [
      'SSL Origin mixing console',
      'Shadow Hills Dual Vandergraph',
      'Elysia Nvelope',
      'API 512b',
      'Empirical Labs EL8X Distressors',
      'A-Designs MM2EQ Hammer stereo tube EQ',
    ],
  },
  {
    group: 'Microphones',
    items: [
      'FLEA U47 Next',
      'Royer R-101 ribbon',
      'AEA R88 stereo ribbon',
      'Sennheiser 421 mkII (×2)',
      'Sennheiser e609',
      'Shure SM57 (×3)',
      'Shure Beta 87a',
      'Shure Beta 58',
      'Shure SM58',
    ],
  },
  {
    group: 'Instruments',
    items: [
      'Fender P-Bass',
      'PRS SE Baritone',
      'Collings 290 electric',
      'Banning Telecaster',
      'Music Man StingRay 5 fretless',
      'Fender Dennis Heartfield 6-string bass',
      'Zon Sonus 4-string bass',
      'Dingwall 5-string',
      'Taylor 514ce acoustic',
      'Bella upright double bass',
      'Fender Dobro',
      'Squier Mustang',
      'Dean Banjotar',
      'Dean acoustic bass',
      'Medicine Man drums',
    ],
  },
];

// Before-and-after examples: a client's rough demo next to the finished record.
// Lu is sending these with each artist's permission. Each `demo`/`final` is an
// audio URL (mp3 in /public/audio/ or a hosted file). Empty = section hidden
// on the live site (a placeholder shows on the dev site only).
export type BeforeAfter = { artist: string; song: string; started: string; demo: string; final: string; spotifyId?: string };
export const beforeAfter: BeforeAfter[] = [];
