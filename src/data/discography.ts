// Source: Lucio Rubino's own Spotify playlist "Songs Lucio Rubino had a hand in"
// https://open.spotify.com/playlist/16iiQAB06ce6S0F8SGTJuN (95 tracks, pulled Nov 21, 2026)
// Roles per track aren't listed on the playlist, so the site describes these
// as songs Lu "had a hand in": writing, playing, producing, mixing or engineering.
export const playlistUrl = 'https://open.spotify.com/playlist/16iiQAB06ce6S0F8SGTJuN';
export const playlistId = '16iiQAB06ce6S0F8SGTJuN';

const raw: [string, string][] = [
  ['Pressure','Paramore'],['Innocent Consent','Caroline Carr'],['OTHER WORLDS THAN THESE','STARSET'],
  ['Tell Me How To Say Goodbye','RED'],['Emergency','Paramore'],["The Devil's Mind",'Caroline Carr'],
  ['In Time','Grey Daze'],['Long Gone Lullaby','Orlando Mendez'],['Goodbye Smoke and Whiskey','Ashley Estevez'],
  ['Digital Soldiers','J.T. Wilde'],['Vulnerable','Elizabeth Grace'],['Stranger','Another Day Dawns'],
  ['Enough','Eraina Joy'],['MANIFEST','STARSET'],['REVOLVE AROUND YOU',"Emily O'Neal"],['Memories','Eraina Joy'],
  ['Bleachless','Elizabeth Grace'],['Nothing Left to Fight (Pessimist)','Elizabeth Grace'],['My Only Hope','Elizabeth Grace'],
  ['Throwing Punches & Taking Hits','Elizabeth Grace'],['Dark','Peyton Lescher'],['Whatcha Gonna Do','Brandon Adams'],
  ['A BRIEF HISTORY OF THE FUTURE','STARSET'],['ECHO','STARSET'],['TRIALS','STARSET'],['Backyard Summertime','Brandon Adams'],
  ['Perfect Pharmaceutical','Pharmacose'],['Checked Out','Pharmacose'],['The Clearing','Pharmacose'],['20 Years Ago','Brandon Adams'],
  ['Bright','Elizabeth Grace'],['I Am a Pilgrim','Lucio Rubino'],["Fallin' from the Start",'Lucio Rubino'],['Be Still','StorySide:B'],
  ['My Heart','Paramore'],['Addicted To My Pain','Seventh Day Slumber'],['In the Light','StorySide:B'],['Emergency','The Ineloquent'],
  ['WHERE THE SKIES END','STARSET'],['Brighter','Paramore'],['PERFECT MACHINE','STARSET'],['Never Let This Go','Paramore'],
  ['Lost in You','Samantha Leigh'],['Devil in Red Shoes','Samantha Leigh'],['Scare Yourself','Flagship Romance'],
  ['Growing up so Fast','Flagship Romance'],['Kamikaze','Manafest'],['For a Woman (Like You)','J.T. Wilde'],
  ['Where We Go One We Go All 2.0','J.T. Wilde'],['Ashes of My Mojo','Delta Haints'],['Here We Go Again','Paramore'],
  ['FAULTLINE','STARSET'],['Drunk Me','Love, Lies and Fiction'],['Carnival','Jesabel'],['Set the Table','Lucio Rubino'],
  ['The Face of Love','Lucio Rubino'],['Alabama Rhap Corollary','Larry Coryell'],['Mr. Miyake','Larry Coryell'],
  ['Enjoy the Show','J.T. Wilde'],['Beautiful Black Sky','J.T. Wilde'],['Satellite','Love, Lies and Fiction'],
  ['Strutter','Love, Lies and Fiction'],['Blood and Sand','RAMONA + the RIOT'],['There Was A Time','Peyton Lescher'],
  ['Hey Sister!','RAMONA + the RIOT'],['2020','RAMONA + the RIOT'],['One Last Drag','J.T. Wilde'],
  ['Cars Hiss by My Window','Delta Haints'],['Living In The Matrixxx','J.T. Wilde'],['Tell Her I Love Her','Love, Lies and Fiction'],
  ['Dream Away the Lonely','Love, Lies and Fiction'],['Blue Morning Blue Day','Love, Lies and Fiction'],['Back Together','Jon Bailey'],
  ['MoonShine','Love, Lies and Fiction'],['The Sun Lights Up The Moon','Love, Lies and Fiction'],
  ['False Reality (feat. Longineu Parsons III)','Vilano'],['Front Porch Heartbreak','Orlando Mendez'],
  ['Dancing with Dakota','Love, Lies and Fiction'],['Second Chance','Caroline Carr'],['Fool Me Twice','Caroline Carr'],
  ['Smokin','Tumblur'],['Forfeit','Jolie'],['365 Days','Jolie'],['The Ghost of Us','Jolie'],['Here In My Heart','Big Dismal'],
  ['Cannibal Carnivore','Caroline Carr'],['Confessions of a Serial Dater','Caroline Carr'],['Sagittarius','Caroline Carr'],
  ['Cherry Bomb','Caroline Carr'],['Stuck On You','Paramore'],['Beautiful Mess','Ansley Trivedi'],['The Best Of Me','Lucio Rubino'],
  ['Real Talk','Eowyn Sage'],['what do i know?','feel trip.'],['Break Me Open','Circles Of Grace'],
];

// Name the big ones first, then everyone else alphabetically.
const headliners = ['Paramore','STARSET','RED','Grey Daze','Larry Coryell','Seventh Day Slumber','Manafest','StorySide:B','Lucio Rubino'];

const map = new Map<string, string[]>();
for (const [t, a] of raw) map.set(a, [...(map.get(a) ?? []), t]);

export const discography = [...map.entries()]
  .map(([artist, songs]) => ({ artist, songs, headliner: headliners.includes(artist) }))
  .sort((x, y) => {
    const ix = headliners.indexOf(x.artist), iy = headliners.indexOf(y.artist);
    if (ix > -1 || iy > -1) return (ix < 0 ? 99 : ix) - (iy < 0 ? 99 : iy);
    return x.artist.localeCompare(y.artist);
  });

export const trackCount = raw.length;
export const artistCount = map.size;
