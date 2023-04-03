let clientId = "yx4b80bom2ee47ta7wvzba6w9de807"
let clientSecret =  "ewq7gsy0jieaecmdrcoxgf479n9i46"

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

async function getLikedGames(liked, headers)
{
    // get top ten games data
    let formatedData = []
    count = 0;
    await Promise.all(liked.map(async (like) => {
        const gameEndpoint = `https://api.igdb.com/v4/games/${like}?fields=name,cover,genres,rating`
        const response = await fetch(gameEndpoint, {
            headers,
        })
        // get game json response 
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

        // get cover art 
        const coverValid = game[0]?.cover || -1;
        // evaluate genre if it exists
        let coverUrl = ''
        if (coverValid !== -1){
            //  get 1st genre name from endpoint 
            const coverEndpoint = `https://api.igdb.com/v4/covers/${game[0].cover}?fields=url`
            const coverResp = await fetch(coverEndpoint, {
                headers,
            })
            // // get json response 
            const coverData = await coverResp.json()
            // assign genre
            coverUrl = coverData[0].url.split("//")[1]

        }
        // if genre array is empty, return null
        else {
            coverUrl = 'null'

        }

        // console.log(game[0].name)
        // get cover art url
        formatedData.push({
            id: count,
            name: game[0].name,
            box_art_url: coverUrl,
            genre: genre,
            rating: game[0]?.rating || "null",
            igdb_id: like
        })
        count +=1;
    }))
    console.log(formatedData)
}

async function main(data) {
    let headers = await getHeaders()
    // retreive top ten games
    // get logo information
    let topTen = await getLikedGames(data.likes, headers)
}
let data = {
    likes: [ '115', '114795' ]
}
main(data)