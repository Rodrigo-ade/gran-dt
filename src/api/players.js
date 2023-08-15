export async function getPlayers(){
  const URL = '../../assets/players.json';
  return fetch(URL)
    .then((response) => response.json())
    .then((jsonResponse) => jsonResponse.results);
}
