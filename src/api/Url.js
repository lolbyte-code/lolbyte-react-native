const BaseUrl = 'http://lolbyte.me:8080/api/v3';

export const getSummonerData = (summonerName, region) =>
  `${BaseUrl}/summoners/${region}/name/${summonerName}?gameType=0`;

export const getRankedData = (summonerId, region) =>
  `${BaseUrl}/summoners/${region}/summoner-id/${summonerId}/rank`;

export const getChampionData = (summonerId, region) =>
  `${BaseUrl}/summoners/${region}/summoner-id/${summonerId}/champions`;

export const getCurrentGameData = (summonerId, region) =>
  `${BaseUrl}/current/${region}/summoner-id/${summonerId}`;

export const getProfileIcon = (iconId) =>
  `https://cdn.communitydragon.org/latest/profile-icon/${iconId}`;

export const getChampionIcon = (championId) =>
  `https://cdn.communitydragon.org/latest/champion/${championId}/square`;
