let clientId = 'yx4b80bom2ee47ta7wvzba6w9de807';
let clientSecret = 'beycxk4r8s1j1fl676slcpjinkcnao';

// twitch authorization request
function getTwitchAuthorization() {
  // grab secrets
  let url = `https://id.twitch.tv/oauth2/token?client_id=${clientId}&client_secret=${clientSecret}&grant_type=client_credentials`;

  return fetch(url, {
  method: "POST",
  })
  .then((res) => res.json())
  .then((data) => {
      return data;
  });
}
async function getHeaders()
{
    let authorizationObject = await getTwitchAuthorization();

    let { access_token, expires_in, token_type } = authorizationObject;

    //token_type first letter must be uppercase    
    token_type =
    token_type.substring(0, 1).toUpperCase() +
    token_type.substring(1, token_type.length);

    let authorization = `${token_type} ${access_token}`;

    let headers = {
      authorization,
      "Client-Id": clientId,
    };
    return headers
    
}
async function getTopGamesUnmerged(headers) {

    const endpoint = "https://api.twitch.tv/helix/games/top?first=20"

    const response = await fetch(endpoint, {
      headers,
    })
    // get json response 
    const json = await response.json()

    // filter out top ten games that have valid igdb ids
    let cnt = 0;
    let dataRtn = []
    for (let i =0; i < json.data.length; i++)
    {
      if (cnt >= 10)
      {
        i = json.data.length + 1
      }
      else if (json.data[i].igdb_id !== "")
      {
        // console.log(json.data[i])
        dataRtn.push(json.data[i])
        cnt += 1;
      }
    }
    // return the data to graphql
    return dataRtn
}

async function format(topTen, headers)
{
    // get top ten games data
    let formatedData = []
    // iterate through each top game and get genres, rating, platforms
    await Promise.all(topTen.map(async (ele) => {
        const gameEndpoint = `https://api.igdb.com/v4/games/${ele.igdb_id}?fields=genres,rating`
        const response = await fetch(gameEndpoint, {
            headers,
        })
        // // get game json response 
        const game = await response.json()
        const genreValid = game[0]?.genres || -1;
        // evaluate genre if it exists
        let genre = ''
        if (genreValid !== -1){
            //  get 1st genre name from endpoint 
            const genreEndpoint = `https://api.igdb.com/v4/genres/${game[0].genres[0]}?fields=name`
            const genreResp = await fetch(genreEndpoint, {
                headers,
            })
            // // get json response 
            const genreName = await genreResp.json()
            // assign genre
            genre = genreName[0]?.name || "null"

        }
        // if genre array is empty, return null
        else {
            genre = 'null'

        }
        formatedData.push({
            name: ele.name,
            box_art_url: ele.box_art_url,
            genre: genre,
            rating: game[0]?.rating || "null"
        })

    }));

    return formatedData
}
async function getTopTen() 
{
    // get auth token
    let headers = await getHeaders()
    // retreive top ten games
    let topTenUM = await getTopGamesUnmerged(headers)
    // get logo information
    let topTen = await format(topTenUM, headers)

    console.log(topTen)

}

getTopTen()
  
