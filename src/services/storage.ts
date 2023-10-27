/* eslint-disable @typescript-eslint/no-explicit-any */
import * as idb from 'idb-keyval'

class Storage {
  private _store?: idb.UseStore

  constructor(name?: string) {
    if (name) this._createStore(name)
  }

  use(widgetName: string) {
    if (!widgetName) throw new CreateStorageError()
    this._createStore(`widget-${widgetName}`)
  }

  get<T = any>(key: string): Promise<T | undefined> {
    this._throwIfStoreMissing()
    return idb.get<T>(key, this._store)
  }

  getMany<T = any>(keys: string[]): Promise<T[]> {
    this._throwIfStoreMissing()
    return idb.getMany<T>(keys, this._store)
  }

  set(key: string, value: any): Promise<void> {
    this._throwIfStoreMissing()
    return idb.set(key, value, this._store)
  }

  setMany(entries: [string, any][]): Promise<void> {
    this._throwIfStoreMissing()
    return idb.setMany(entries, this._store)
  }

  update<T = any>(
    key: string,
    updater: (oldValue: T | undefined) => T,
  ): Promise<void> {
    this._throwIfStoreMissing()
    return idb.update<T>(key, updater, this._store)
  }

  del(key: string): Promise<void> {
    this._throwIfStoreMissing()
    return idb.del(key, this._store)
  }

  delMany(keys: string[]): Promise<void> {
    this._throwIfStoreMissing()
    return idb.delMany(keys, this._store)
  }

  clear(): Promise<void> {
    this._throwIfStoreMissing()
    return idb.clear(this._store)
  }

  keys(): Promise<string[]> {
    this._throwIfStoreMissing()
    return idb.keys<string>(this._store)
  }

  values<T = any>(): Promise<T[]> {
    this._throwIfStoreMissing()
    return idb.values<T>(this._store)
  }

  entries<T = any>(): Promise<[string, T][]> {
    this._throwIfStoreMissing()
    return idb.entries<string, T>(this._store)
  }

  private _createStore(name: string) {
    this._store = idb.createStore(`slime2-${name}-db`, `slime2-${name}-store`)
  }

  private _throwIfStoreMissing() {
    if (!this._store) throw new MissingStorageError()
  }
}

export const widgetStorage = new Storage()

class CreateStorageError extends Error {
  constructor() {
    const message = 'Parameters missing from slime2.storage.create()'
    super(message)
    this.name = 'CreateStorageError'
  }
}

class MissingStorageError extends Error {
  constructor() {
    const message =
      "Storage must be created using slime2.storage.create('storage-name') before use."
    super(message)
    this.name = 'MissingStorageError'
  }
}
