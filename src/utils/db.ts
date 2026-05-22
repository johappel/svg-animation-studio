import { CustomAsset } from "./types";

const DB_NAME = "SnoopyAnimationStudioDB";
const STORE_NAME = "custom_assets";
const DB_VERSION = 1;

export const initDb = (): Promise<IDBDatabase> => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onerror = () => {
      reject(new Error("Fehler beim Öffnen von IndexedDB"));
    };

    request.onsuccess = (event: any) => {
      resolve(event.target.result);
    };

    request.onupgradeneeded = (event: any) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: "id" });
      }
    };
  });
};

export const getCustomAssetsFromDB = async (): Promise<CustomAsset[]> => {
  try {
    const db = await initDb();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(STORE_NAME, "readonly");
      const store = transaction.objectStore(STORE_NAME);
      const request = store.getAll();

      request.onsuccess = () => {
        resolve(request.result || []);
      };

      request.onerror = () => {
        reject(new Error("Fehler beim Abrufen der Custom Assets"));
      };
    });
  } catch (error) {
    console.error("IndexedDB get error:", error);
    return [];
  }
};

export const saveCustomAssetToDB = async (asset: CustomAsset): Promise<void> => {
  try {
    const db = await initDb();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(STORE_NAME, "readwrite");
      const store = transaction.objectStore(STORE_NAME);
      const request = store.put(asset);

      request.onsuccess = () => {
        resolve();
      };

      request.onerror = () => {
        reject(new Error("Fehler beim Speichern des Custom Assets"));
      };
    });
  } catch (error) {
    console.error("IndexedDB save error:", error);
  }
};

export const deleteCustomAssetFromDB = async (id: string): Promise<void> => {
  try {
    const db = await initDb();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(STORE_NAME, "readwrite");
      const store = transaction.objectStore(STORE_NAME);
      const request = store.delete(id);

      request.onsuccess = () => {
        resolve();
      };

      request.onerror = () => {
        reject(new Error("Fehler beim Löschen des Custom Assets"));
      };
    });
  } catch (error) {
    console.error("IndexedDB delete error:", error);
  }
};

export const clearCustomAssetsInDB = async (): Promise<void> => {
  try {
    const db = await initDb();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(STORE_NAME, "readwrite");
      const store = transaction.objectStore(STORE_NAME);
      const request = store.clear();

      request.onsuccess = () => {
        resolve();
      };

      request.onerror = () => {
        reject(new Error("Fehler beim Leeren der Custom Assets"));
      };
    });
  } catch (error) {
    console.error("IndexedDB clear error:", error);
  }
};
