import { DenominationCoins, CoinRolls } from "./types";
import { countCoinRolls } from "./";

const coinsMock: Array<number> = [5, 1, 2, 2, 1, 1, 1, 1, 1, 1, 1, 2, 1, 5, 2, 5, 2, 2, 1, 5, 1, 5, 2, 1, 1];
const DENOMINATION_OF_COINS_MOCK: DenominationCoins = {
  1: 4,
  2: 4,
  5: 3,
}

describe("countCoinRolls function", () => {
  const countCoins = (data: Array<number>) => countCoinRolls(data, DENOMINATION_OF_COINS_MOCK);
  const rolledUpCoins: CoinRolls = {
    1: { rolls: 3, rest: 1 },
    2: { rolls: 1, rest: 3 },
    5: { rolls: 1, rest: 2 }
  };

it("should return an object with arranged coins", () => {
    expect(countCoins(coinsMock)).toEqual(rolledUpCoins);
  });

it("should return null if there are no coins", () => {
    expect(countCoins([])).toBe(null);
  });

it("should count coins with no denomination equivalent as rest", () => {
    const noDenominationCoins: number[] = [7, 8, 8, 8];
    const rolledUpNoDenominationCoins: CoinRolls = {
      7: { rolls: 0, rest: 1 },
      8: { rolls: 0, rest: 3 },
    };
    expect(countCoins([...coinsMock, ...noDenominationCoins])).toEqual({...rolledUpCoins, ... rolledUpNoDenominationCoins});
  });

it("should filter out coins that are not integers", () => {
    const falsyCoins: any = ["4", 5.2, "xx", NaN, null];
    expect(countCoins([...coinsMock, ...falsyCoins])).toEqual(rolledUpCoins);
  });
});