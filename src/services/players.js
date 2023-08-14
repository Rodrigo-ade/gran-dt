import { getPlayers as getPlayersFromApi} from "../api/players.js";

export async function getPlayers(){
  const players = await getPlayersFromApi();
  return players;
}
