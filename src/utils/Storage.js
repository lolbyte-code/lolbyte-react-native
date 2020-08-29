import AsyncStorage from '@react-native-community/async-storage';

const getFromStorage = async (key) => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.log(e);
  }
};

const setToStorage = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.log(e);
  }
};

const addToStorage = (key, item, limit) => {
  limit = typeof limit !== 'undefined' ? limit : 8;
  getFromStorage(key).then((values) => {
    if (values == null) {
      values = [item];
      return;
    }
    values = values.slice(0, limit);
    if (values.some((value) => value === item)) {
      return;
    }
    values.unshift(item);
    setToStorage(key, values);
  });
};

const removeFromStorage = (key, condition) => {
  getFromStorage(key).then((values) => {
    if (values == null) {
      return;
    }
    values = values.filter((value) => condition(value));
    setToStorage(values);
  });
};

const hasInStorage = (key, condition) => {
  getFromStorage(key).then((values) => {
    if (values === null) {
      return false;
    }
    if (values.some((value) => condition(value))) {
      return true;
    }
    return false;
  });
};

export {getFromStorage, addToStorage, removeFromStorage, hasInStorage};
