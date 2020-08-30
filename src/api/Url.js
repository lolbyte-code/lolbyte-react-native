import ApiUrl from './Constants';

export const getSummonerData = (name, region) =>
  `${ApiUrl}/summoners/${region}/name/${name}?gameType=0`;

export const getRankedData = (id, region) =>
  `${ApiUrl}/summoners/${region}/summoner-id/${id}/rank`;

export const getChampionData = (id, region) =>
  `${ApiUrl}/summoners/${region}/summoner-id/${id}/champions`;

export const getProfileIcon = (id) =>
  `https://cdn.communitydragon.org/latest/profile-icon/${id}`;

export const getChampionIcon = (id) =>
  `https://cdn.communitydragon.org/latest/champion/${id}/square`;
