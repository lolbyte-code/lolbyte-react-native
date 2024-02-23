const lbServiceBaseUrl = 'http://lolbyte.me/api/v4';
const defaultPatch = '11.11.1';
const communityDragonBaseUrl = 'https://cdn.communitydragon.org/latest';
var ddragonBaseUrl = `https://ddragon.leagueoflegends.com/cdn/${defaultPatch}`;
var runesBaseUrl = 'https://ddragon.leagueoflegends.com/cdn/img';
var runeUrls = new Map();
var spellUrls = new Map();

fetch('https://ddragon.leagueoflegends.com/api/versions.json', {
  method: 'GET',
})
  .then((response) => response.json())
  .then((json) => {
    console.log(json);
    ddragonBaseUrl = ddragonBaseUrl.replace(defaultPatch, json[0]);
    fetch(`${ddragonBaseUrl}/data/en_US/runesReforged.json`, {
      method: 'GET',
    })
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        json
          .flatMap((tree) => tree.slots.flatMap((slot) => slot.runes))
          .forEach((rune) =>
            runeUrls.set(rune.id, `${runesBaseUrl}/${rune.icon}`),
          );
      })
      .catch((error) => console.error(error));
    fetch(`${ddragonBaseUrl}/data/en_US/summoner.json`, {
      method: 'GET',
    })
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        Object.entries(json.data).forEach((entry) =>
          spellUrls.set(
            parseInt(entry[1].key),
            `${ddragonBaseUrl}/img/spell/${entry[1].image.full}`,
          ),
        );
      })
      .catch((error) => console.error(error));
  })
  .catch((error) => console.error(error));

export const getNotificationData = () =>
  `${lbServiceBaseUrl}/notifications?mobile`;

export const getSummonerData = (summonerName, summonerRegion) =>
  `${lbServiceBaseUrl}/summoners/${summonerName.replace(
    /\s/g,
    '',
  ).replace('#', "%23")}?region=${summonerRegion}&mobile`;

export const getRecentGamesData = (summonerId, summonerRegion, gameType) =>
  `${lbServiceBaseUrl}/recentGames/${summonerId}?region=${summonerRegion}&queueId=${gameType}&mobile`;

export const getRankedData = (summonerId, summonerRegion) =>
  `${lbServiceBaseUrl}/ranks/${summonerId}?region=${summonerRegion}&mobile`;

export const getStatisticsData = (summonerId, summonerRegion, gameType) =>
  `${lbServiceBaseUrl}/statistics/${summonerId}?region=${summonerRegion}&queueId=${gameType}&mobile`;

export const getCurrentGameData = (summonerId, summonerRegion) =>
  `${lbServiceBaseUrl}/current/${summonerId}?region=${summonerRegion}&useRiotIds=true&mobile`;

export const getMatchData = (matchId, summonerRegion, summonerId) =>
  `${lbServiceBaseUrl}/matches/${matchId}?summonerId=${summonerId}&region=${summonerRegion}&useRiotIds=true&mobile`;

export const getProfileIcon = (iconId) =>
  `${communityDragonBaseUrl}/profile-icon/${iconId}`;

export const getItemIcon = (itemId) =>
  `${ddragonBaseUrl}/img/item/${itemId}.png`;

export const getChampionIcon = (championId) =>
  `${communityDragonBaseUrl}/champion/${championId}/square`;

export const getRuneIcon = (runeId) => runeUrls.get(runeId);

export const getSpellIcon = (spellId) => spellUrls.get(spellId);
