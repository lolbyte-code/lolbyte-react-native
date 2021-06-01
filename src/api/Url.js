const lbServiceBaseUrl = 'http://localhost:8080/api/v4';
const defaultPatch = '11.11.1';
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

export const getNotificationData = () =>
  `${lbServiceBaseUrl}/notifications?mobile`;

export const getSummonerData = (summonerName, summonerRegion) =>
  `${lbServiceBaseUrl}/summoners/${summonerName.replace(
    /\s/g,
    '',
  )}?region=${summonerRegion}&mobile`;

export const getRecentGamesData = (summonerId, summonerRegion, gameType) =>
  `${lbServiceBaseUrl}/recentGames/${summonerId}?region=${summonerRegion}&queueId=${gameType}&mobile`;

export const getRankedData = (summonerId, summonerRegion) =>
  `${lbServiceBaseUrl}/ranks/${summonerId}?region=${summonerRegion}&mobile`;

export const getStatisticsData = (summonerId, summonerRegion, gameType) =>
  `${lbServiceBaseUrl}/statistics/${summonerId}?region=${summonerRegion}&queueId=${gameType}&mobile`;

export const getCurrentGameData = (summonerId, summonerRegion) =>
  `${lbServiceBaseUrl}/current/${summonerId}?region=${summonerRegion}&mobile`;

export const getMatchData = (matchId, summonerRegion, summonerId) =>
  `${lbServiceBaseUrl}/matches/${matchId}?summonerId=${summonerId}&region=${summonerRegion}&mobile`;

export const getProfileIcon = (iconId) =>
  `https://cdn.communitydragon.org/latest/profile-icon/${iconId}`;

export const getItemIcon = (itemId) =>
  `${ddragonBaseUrl}/img/item/${itemId}.png`;

export const getChampionIcon = (championId) =>
  `https://cdn.communitydragon.org/latest/champion/${championId}/square`;
