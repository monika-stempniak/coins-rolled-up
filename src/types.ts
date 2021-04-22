interface Rolls {
  rolls: number,
  rest: number
}

export type DenominationCoins = Record<number, number>;
export type CoinRolls = Record<number, Rolls>;