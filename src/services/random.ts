export default abstract class Random {
  // generate a random number between min (included) and max (excluded)
  static number(min: number, max: number): number {
    return Math.random() * (max - min) + min
  }

  // generate a random integer between min (included) and max (included)
  static integer(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min
  }

  static boolean(): boolean {
    return Math.random() < 0.5
  }

  static percent(percentage: number): boolean {
    return Math.random() < percentage / 100
  }

  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  static index(array: Array<any>): number {
    return Math.floor(Math.random() * array.length)
  }

  static item<T>(array: Array<T>): T {
    return array[this.index(array)]
  }
}
