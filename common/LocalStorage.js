import Storage from 'react-native-storage';
import AsyncStorage from '@react-native-async-storage/async-storage';

const storage = new Storage({
  size: 10,
  storageBackend: AsyncStorage,
  defaultExpires: 1000 * 3600 * 24,
  enableCache: true,
});

export const saveLocalStorage = (key, data) => {
  storage.save({
    key,
    data,
    expires: 1000 * 3600 * 8,
  });
};

export const getLocalStorage = async key => {
  try {
    let result = await storage.load({
      key,
      autoSync: true,
      syncInBackground: true,
    });

    return result;
  } catch (error) {
    return '';
  }
};

export const removeLocalStorage = key => {
  storage.remove({key: key});
};
