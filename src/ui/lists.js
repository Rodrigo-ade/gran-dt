export function showPlayersList(players, playerCallbackFunction) {
  players.forEach((player) => {
    createListedPlayer(player,playerCallbackFunction);
  });
}

function createListedPlayer(player, playerCallbackFunction) {
  const $playerContainer = document.createElement('a');
  $playerContainer.href = "#";
  $playerContainer.className = 'list-group-item list-group-item-action player m-1';

  const $playerData = document.createElement('div');
  $playerData.classList.add('row');

  const $playerNameContainer = document.createElement('div');
  $playerNameContainer.className = 'col-8 text-center';

  const $playerName = document.createElement('p');
  $playerName.classList.add('mb-1');

  const $namePlaceholder = document.createElement('strong');
  $namePlaceholder.textContent = player.name;

  const $extraData = document.createElement('div');
  $extraData.classList.add('col-4');

  const $teamContainer = document.createElement('div');
  $teamContainer.classList.add('col-3');

  const $team = document.createElement('span');
  $team.className = 'badge rounded-pill text-bg-primary team';
  $team.textContent = player.team;

  const $priceContainer = document.createElement('div');
  $priceContainer.classList.add('col-3');

  const $price = document.createElement('span');
  $price.className = 'badge rounded-pill text-bg-success price';
  $price.textContent = `${player.price} $`;

  $priceContainer.appendChild($price);
  $teamContainer.appendChild($team);
  $extraData.appendChild($teamContainer);
  $extraData.appendChild($priceContainer);

  $playerNameContainer.appendChild($playerName);
  $playerName.appendChild($namePlaceholder);


  $playerData.appendChild($playerNameContainer);
  $playerData.appendChild($extraData);

  $playerContainer.appendChild($playerData);
  $playerContainer.onclick = () => playerCallbackFunction(player.name,player.team,player.price);

  document.querySelector('.player-list').appendChild($playerContainer);
}
