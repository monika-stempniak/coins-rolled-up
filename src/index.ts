import { coins as data } from "./data";
import { DenominationCoins, CoinRolls } from "./types";
import { DENOMINATION_OF_COINS } from "./constants";

export const countCoinRolls = (listOfCoins: Array<number> = [], denomination: DenominationCoins): CoinRolls | null => {
  let coins = [...listOfCoins];
  if (listOfCoins.some(coin => !Number.isInteger(coin))) {
    coins = listOfCoins.filter(coin => Number.isInteger(coin));
  }

  if (coins.length === 0) return null;

  const allCoins: Record<number, number> = coins.reduce((acc: DenominationCoins, coin) => {
    acc[coin] = acc[coin] ? acc[coin] + 1 : 1;
    return acc;
  }, {});

  const rollsPerCoin: CoinRolls = {};
  for (const coin in allCoins) {
    const numberOfRolls = Math.floor(allCoins[coin] / denomination[coin]);
    const restOfCoins = allCoins[coin] % denomination[coin];
    rollsPerCoin[coin] = {
      rolls: isNaN(numberOfRolls) ? 0 : numberOfRolls,
      rest: isNaN(restOfCoins) ? allCoins[coin] : restOfCoins,
    }
  }

  return rollsPerCoin;
}

const result = countCoinRolls(data, DENOMINATION_OF_COINS);

console.log('*******Arranged coins*******');
console.log(result);
console.log('****************************');
