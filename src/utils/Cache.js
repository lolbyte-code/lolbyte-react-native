export class SimpleCache {
  constructor() {
    this.cache = {};
  }

  set(key, value) {
    this.cache[key] = value;
  }

  get(key) {
    return this.cache[key];
  }

  contains(key) {
    return key in this.cache;
  }
}
