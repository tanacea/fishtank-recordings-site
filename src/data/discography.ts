// Source: Lucio Rubino's own Spotify playlist "Songs Lucio Rubino had a hand in"
// https://open.spotify.com/playlist/16iiQAB06ce6S0F8SGTJuN (95 tracks, pulled Nov 21, 2026)
// Third field = Spotify track ID (from the playlist embed data, Nov 21, 2026).
// Roles per track aren't listed on the playlist, so the site describes these
// as songs Lu "had a hand in": writing, playing, producing, mixing or engineering.
export const playlistUrl = 'https://open.spotify.com/playlist/16iiQAB06ce6S0F8SGTJuN';
export const playlistId = '16iiQAB06ce6S0F8SGTJuN';

const raw: [string, string, string][] = [
  ["Pressure", "Paramore", '7mG2RbhyzGsjpQOz568d39'],
  ["Innocent Consent", "Caroline Carr", '464xCLSwwwMT8GWAve4cIt'],
  ["OTHER WORLDS THAN THESE", "STARSET", '0heufLGCARpOYKH2v8IMsj'],
  ["Tell Me How To Say Goodbye", "RED", '27IJWDIdTzD5WA2VvMPE3b'],
  ["Emergency", "Paramore", '3i4xZSH1kTLE22TUvUFMYo'],
  ["The Devil's Mind", "Caroline Carr", '6FiM3sJdZF0rX4Ys6Zjkcx'],
  ["In Time", "Grey Daze", '3VT6TJkD2V1Cwz60564IiZ'],
  ["Long Gone Lullaby", "Orlando Mendez", '3MhSlGRWdHgvp67bzbXOK4'],
  ["Goodbye Smoke and Whiskey", "Ashley Estevez", '2nrZcPREWyM8S7Q2JuDtAh'],
  ["Digital Soldiers", "J.T. Wilde", '3i74FJUHH1Sf7p8NpzixUo'],
  ["Vulnerable", "Elizabeth Grace", '4o5U2UqKdnXNrpg2DEBnkd'],
  ["Stranger", "Another Day Dawns", '5loax8p8FtJFhKuHQRFVc9'],
  ["Enough", "Eraina Joy", '36DzxryAjkw4jW2P8ks9Zb'],
  ["MANIFEST", "STARSET", '5CxHzMIN3ZOH8f18RdNYwO'],
  ["REVOLVE AROUND YOU", "Emily O'Neal", '1BDiHiKc3QnbjNsI5LiGxY'],
  ["Memories", "Eraina Joy", '37wjVlj0EMbAYBBOQqX4ew'],
  ["Bleachless", "Elizabeth Grace", '61jZlxHGgf2qM3Ehe0v6e3'],
  ["Nothing Left to Fight (Pessimist)", "Elizabeth Grace", '36EuM8mFZaNL3i2rW90udj'],
  ["My Only Hope", "Elizabeth Grace", '45F6oNn18SjHFHBnF41YvT'],
  ["Throwing Punches & Taking Hits", "Elizabeth Grace", '4OXILNSX5wgUePZSwEqHXV'],
  ["Dark", "Peyton Lescher", '2fTGxdVcZ402fqcjuUNuOF'],
  ["Whatcha Gonna Do", "Brandon Adams", '6k1vsUmvRJUR0NA85zsJth'],
  ["A BRIEF HISTORY OF THE FUTURE", "STARSET", '6OesbZ9Ddlhl0GsZp1gpJC'],
  ["ECHO", "STARSET", '47pmY6tTSpUV8gfj7Aqoe8'],
  ["TRIALS", "STARSET", '23wrmyJ1S2sjeh2dFN5P9k'],
  ["Backyard Summertime", "Brandon Adams", '32aOc2C81BmP4YYtvYXrlD'],
  ["Perfect Pharmaceutical", "Pharmacose", '3ze2pP9fLwXzZearmpCWwe'],
  ["Checked Out", "Pharmacose", '1FSyw49IavcHZkGsnVDSOL'],
  ["The Clearing", "Pharmacose", '0xiZbw5OU1M8GBE92vUNMa'],
  ["20 Years Ago", "Brandon Adams", '1TtiQO3x4jh60fFAQgKsvL'],
  ["Bright", "Elizabeth Grace", '2fCCxgdND8Dxj1xv0B8gKa'],
  ["I Am a Pilgrim", "Lucio Rubino", '2cYG549eJNwXJPe0SvCw8D'],
  ["Fallin' from the Start", "Lucio Rubino", '2uPCDxQjGIv0skDKUtLHRM'],
  ["Be Still", "StorySide:B", '0AhT6ukrkBdLQ12zyXdCCS'],
  ["My Heart", "Paramore", '5wWkbQ18TPaWq2GeJDF2O3'],
  ["Addicted To My Pain", "Seventh Day Slumber", '6HLDcdg83MxJUtojRv8DD3'],
  ["In the Light", "StorySide:B", '2kLVspx6nPZDSRR2Xt7k5y'],
  ["Emergency", "The Ineloquent", '7gMSNXQ2hi42LbqUT23AtW'],
  ["WHERE THE SKIES END", "STARSET", '5OLsgXCP3fgdwi35nFpfjF'],
  ["Brighter", "Paramore", '3GoNxPKPZPaAAZVQZ003TI'],
  ["PERFECT MACHINE", "STARSET", '03LbwYl3uqYBVMMWhMw4SJ'],
  ["Never Let This Go", "Paramore", '2itu79WbZhUCHX4jg0fyAd'],
  ["Lost in You", "Samantha Leigh", '2964apbSHNXbzYSxvUPAQ3'],
  ["Devil in Red Shoes", "Samantha Leigh", '7KWJhX8oZaVCqHOAGaspjh'],
  ["Scare Yourself", "Flagship Romance", '4Xi8WUbAtyhLAb0RgNm5dh'],
  ["Growing up so Fast", "Flagship Romance", '00SC00nCfheZzoAzZh7uni'],
  ["Kamikaze", "Manafest", '6nmEGhSiiBqH7Ub037af0F'],
  ["For a Woman (Like You)", "J.T. Wilde", '0zdXpdFSa3Mq7EDHBIw93s'],
  ["Where We Go One We Go All 2.0", "J.T. Wilde", '1DoLBB65Xr9LtYZMqOa3ba'],
  ["Ashes of My Mojo", "Delta Haints", '0fc635FuHYPygcRottL3wI'],
  ["Here We Go Again", "Paramore", '5Pp1H1mFlL6o63omITUvfn'],
  ["FAULTLINE", "STARSET", '0IxwQBOssiCZ5yAuaoYygK'],
  ["Drunk Me", "Love, Lies and Fiction", '2VpgMtsrsVQFjNwS4s0EWo'],
  ["Carnival", "Jesabel", '3d0Y02E2Jss1gFGmyis3UL'],
  ["Set the Table", "Lucio Rubino", '2ISq5sqB5pmiF1Bj51o8V8'],
  ["The Face of Love", "Lucio Rubino", '3WuuO4QeDnSJ1chaD4OBmO'],
  ["Alabama Rhap Corollary", "Larry Coryell", '6GOklvLEOge88Dg0L5vXeU'],
  ["Mr. Miyake", "Larry Coryell", '6mkq4ZHYJbwEMaKRMXIG1R'],
  ["Enjoy the Show", "J.T. Wilde", '7u4bzVVgwjgDy6zd2dS8Cr'],
  ["Beautiful Black Sky", "J.T. Wilde", '1mfJEk31t8H1CVDyyIScl5'],
  ["Satellite", "Love, Lies and Fiction", '0wFhxtOwOsUoDoMhESB38P'],
  ["Strutter", "Love, Lies and Fiction", '0q6tc0YSYeTRZsTNJccDHn'],
  ["Blood and Sand", "RAMONA + the RIOT", '0QHgJFtj10jZboyfzkyGNT'],
  ["There Was A Time", "Peyton Lescher", '5TOm0LPmSiO54CUhHa5Ijh'],
  ["Hey Sister!", "RAMONA + the RIOT", '2t9Yj6h5Qf0Bb1HPpHnacG'],
  ["2020", "RAMONA + the RIOT", '3cYzu8NcKIOXhpDvWCfCpu'],
  ["One Last Drag", "J.T. Wilde", '3yYxgHEgCT3V90m4miOYXR'],
  ["Cars Hiss by My Window", "Delta Haints", '77ykXjmiqK2QROhAltZtqm'],
  ["Living In The Matrixxx", "J.T. Wilde", '1f0itPWENjOophsZ1UOn4R'],
  ["Tell Her I Love Her", "Love, Lies and Fiction", '0g6DmBALN92Vwgtvl0UHeV'],
  ["Dream Away the Lonely", "Love, Lies and Fiction", '2ZKl7EIeSj6HdSro7Kp4qt'],
  ["Blue Morning Blue Day", "Love, Lies and Fiction", '4nmfSlE1m4yjVOI944XFhG'],
  ["Back Together", "Jon Bailey", '3za3SHwac2UUgu0qbovBmp'],
  ["MoonShine", "Love, Lies and Fiction", '4lmocWmIj2gLqGwH9Qqv8k'],
  ["The Sun Lights Up The Moon", "Love, Lies and Fiction", '3vDSrSaQPPEKX556j94cmT'],
  ["False Reality (feat. Longineu Parsons III)", "Vilano", '4DZ00o41dWa3MdSWcy5Wdx'],
  ["Front Porch Heartbreak", "Orlando Mendez", '3A2Oy3aXoq5irogOeoMVem'],
  ["Dancing with Dakota", "Love, Lies and Fiction", '2Jnv1DuAbs182nWQmfMCt3'],
  ["Second Chance", "Caroline Carr", '2LczK58Klek5ibsXjRwWvi'],
  ["Fool Me Twice", "Caroline Carr", '2RmMjDgokaiRs1wrZyGgC8'],
  ["Smokin", "Tumblur", '3TUbE15Lon9t0JqAQypBkG'],
  ["Forfeit", "Jolie", '5B64rf8uS69PIxtZc1EtnJ'],
  ["365 Days", "Jolie", '08huoRmoqmHGpxWdZVhKdx'],
  ["The Ghost of Us", "Jolie", '5yEOSaW9diOw41MBh7cKVV'],
  ["Here In My Heart", "Big Dismal", '4Bi9eC1jftzG7ERs6JsCrB'],
  ["Cannibal Carnivore", "Caroline Carr", '0c1WPGE32fqnwRV6jJyY9X'],
  ["Confessions of a Serial Dater", "Caroline Carr", '0j1o3AdgEPpvteNSjcDSYH'],
  ["Sagittarius", "Caroline Carr", '2F9iE9vzbRQ6pn2oqYrOC2'],
  ["Cherry Bomb", "Caroline Carr", '2KvoMXbjGWWJlXCR63JRE8'],
  ["Stuck On You", "Paramore", '5kdWRrbFpKOzvwyZa6GH9F'],
  ["Beautiful Mess", "Ansley Trivedi", '7lqAloZVPzhUgpxI5K3Ebq'],
  ["The Best Of Me", "Lucio Rubino", '1hBbaPF6aUxAHvQlU4OazZ'],
  ["Real Talk", "Eowyn Sage", '5OYfqYjIVRZdd7Syg8ogr6'],
  ["what do i know?", "feel trip.", '7hjCDUB7c835ZFY1IpZM4j'],
  ["Break Me Open", "Circles Of Grace", '2QbrxIiQWD1jMWaWzdElFu'],
];

// Name the big ones first, then everyone else alphabetically.
const headliners = ['Paramore','STARSET','RED','Grey Daze','Larry Coryell','Seventh Day Slumber','Manafest','StorySide:B','Lucio Rubino'];

export type Song = { title: string; id: string };
const map = new Map<string, Song[]>();
for (const [t, a, id] of raw) map.set(a, [...(map.get(a) ?? []), { title: t, id }]);
export const songId = (title: string, artist: string) => raw.find(([t, a]) => t === title && a === artist)?.[2] ?? '';

export const discography = [...map.entries()]
  .map(([artist, songs]) => ({ artist, songs, headliner: headliners.includes(artist) }))
  .sort((x, y) => {
    const ix = headliners.indexOf(x.artist), iy = headliners.indexOf(y.artist);
    if (ix > -1 || iy > -1) return (ix < 0 ? 99 : ix) - (iy < 0 ? 99 : iy);
    return x.artist.localeCompare(y.artist);
  });

export const trackCount = raw.length;
export const artistCount = map.size;
