const lolbyteBaseUrl = 'http://lolbyte.me:8080/api/v3';
const defaultPatch = '10.16.1';
var ddragonBaseUrl = `https://ddragon.leagueoflegends.com/cdn/${defaultPatch}`;

fetch('https://ddragon.leagueoflegends.com/api/versions.json', {
  method: 'GET',
})
  .then((response) => response.json())
  .then((json) => {
    console.log(json);
    ddragonBaseUrl = ddragonBaseUrl.replace(defaultPatch, json[0]);
  })
  .catch((error) => console.error(error));

export const getSummonerData = (summonerName, summonerRegion) =>
  `${lolbyteBaseUrl}/summoners/${summonerRegion}/name/${summonerName.replace(
    /\s/g,
    '',
  )}?gameType=0`;

export const getRankedData = (summonerId, summonerRegion) =>
  `${lolbyteBaseUrl}/summoners/${summonerRegion}/summoner-id/${summonerId}/rank`;

export const getChampionData = (summonerId, summonerRegion) =>
  `${lolbyteBaseUrl}/summoners/${summonerRegion}/summoner-id/${summonerId}/champions`;

export const getCurrentGameData = (summonerId, summonerRegion) =>
  `${lolbyteBaseUrl}/current/${summonerRegion}/summoner-id/${summonerId}`;

export const getMatchData = (matchId, summonerRegion, summonerId) =>
  `${lolbyteBaseUrl}/matches/${summonerRegion}/match-id/${matchId}?summonerId=${summonerId}`;

export const getProfileIcon = (iconId) =>
  `https://cdn.communitydragon.org/latest/profile-icon/${iconId}`;

export const getItemIcon = (itemId) =>
  `${ddragonBaseUrl}/img/item/${itemId}.png`;

export const getSplash = (championId) =>
  `https://cdn.communitydragon.org/latest/champion/${championId}/splash-art`;

export const getChampionIcon = (championId) =>
  `https://cdn.communitydragon.org/latest/champion/${championId}/square`;
