import ApiUrl from './Constants';

export const getSummonerData = (summonerName, region) =>
  `${ApiUrl}/summoners/${region}/name/${summonerName}?gameType=0`;

export const getRankedData = (summonerId, region) =>
  `${ApiUrl}/summoners/${region}/summoner-id/${summonerId}/rank`;

export const getChampionData = (summonerId, region) =>
  `${ApiUrl}/summoners/${region}/summoner-id/${summonerId}/champions`;

export const getProfileIcon = (iconId) =>
  `https://cdn.communitydragon.org/latest/profile-icon/${iconId}`;

export const getChampionIcon = (championId) =>
  `https://cdn.communitydragon.org/latest/champion/${championId}/square`;
