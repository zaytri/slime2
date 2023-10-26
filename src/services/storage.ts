/* eslint-disable @typescript-eslint/no-explicit-any */
import * as idb from 'idb-keyval'

class Storage {
  private clientStore: idb.UseStore

  constructor(name: string) {
    this.clientStore = idb.createStore(`${name}-db`, `${name}-store`)
  }

  get<T = any>(key: string): Promise<T | undefined> {
    return idb.get<T>(key, this.clientStore)
  }

  getMany<T = any>(keys: string[]): Promise<T[]> {
    return idb.getMany<T>(keys, this.clientStore)
  }

  set(key: string, value: any): Promise<void> {
    return idb.set(key, value, this.clientStore)
  }

  setMany(entries: [string, any][]): Promise<void> {
    return idb.setMany(entries, this.clientStore)
  }

  update<T = any>(
    key: string,
    updater: (oldValue: T | undefined) => T,
  ): Promise<void> {
    return idb.update<T>(key, updater, this.clientStore)
  }

  del(key: string): Promise<void> {
    return idb.del(key, this.clientStore)
  }

  delMany(keys: string[]): Promise<void> {
    return idb.delMany(keys, this.clientStore)
  }

  clear(): Promise<void> {
    return idb.clear(this.clientStore)
  }

  keys(): Promise<string[]> {
    return idb.keys<string>(this.clientStore)
  }

  values<T = any>(): Promise<T[]> {
    return idb.values<T>(this.clientStore)
  }

  entries<T = any>(): Promise<[string, T][]> {
    return idb.entries<string, T>(this.clientStore)
  }
}

export const clientStorage = new Storage('slime2-client')
