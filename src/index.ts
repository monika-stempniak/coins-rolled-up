const data = require("./data");
interface Rolls {
  rolls: number,
  rest: number
}

type DenominationCoins = Record<number, number>;
type CoinRolls = Record<number, Rolls>;

const DENOMINATION_OF_COINS: Readonly<DenominationCoins> = {
  1: 40,
  2: 40,
  5: 30,
  10: 50,
  20: 20,
  50: 40,
}

const countCoinRolls = (coins: Array<number> = []): CoinRolls => {
  const allCoins: Record<number, number> = coins.reduce((acc: DenominationCoins, coin) => {
    acc[coin] = acc[coin] ? acc[coin] + 1 : 1;
    return acc;
  }, {});

  const rollsPerCoin: CoinRolls = {};
  for (const coin in allCoins) {
    rollsPerCoin[coin] = {
      rolls: Math.floor(allCoins[coin] / DENOMINATION_OF_COINS[coin]),
      rest: allCoins[coin] % DENOMINATION_OF_COINS[coin]
    }
  }

  return rollsPerCoin;
}

const result = countCoinRolls(data.coins);
console.log(result);
