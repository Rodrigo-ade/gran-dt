import { getPlayers } from "./services/players.js";
import { showPlayersList } from "./ui/lists.js";

function playerCallbackFunction (name,team,price){
  console.log(name,team,price);
};

showPlayersList(await getPlayers(), playerCallbackFunction);
