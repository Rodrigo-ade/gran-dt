import { getPlayers as getPlayersFromApi} from "../api/players.js";
import { mapPlayers } from "../mapping/players.js";

export async function getPlayers(){
  const players = mapPlayers(await getPlayersFromApi());
  return players;
}
