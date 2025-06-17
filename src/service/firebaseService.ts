// src/services/firebaseService.ts
import AsyncStorage from '@react-native-async-storage/async-storage';
import {STORAGE_KEYS} from '../utils/constants';
import config from './config.json';
import {initializeApp} from 'firebase/app';
import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  updateDoc,
  onSnapshot,
  serverTimestamp,
} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: config.apiKey,
  authDomain: config.authDomain,
  projectId: config.projectId,
  storageBucket: config.storageBucket,
  messagingSenderId: config.messagingSenderId,
  appId: config.appId,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

class FirebaseService {
  private userId: string | null = null;

  // create UUID
  private generateUUID(): string {
    const chars = '0123456789abcdef';
    const uuidArr: string[] = new Array(36);

    for (let i = 0; i < 36; i++) {
      if (i === 8 || i === 13 || i === 18 || i === 23) {
        uuidArr[i] = '-';
      } else if (i === 14) {
        // UUID versiyon 4
        uuidArr[i] = '4';
      } else if (i === 19) {
        // UUID varyant: 8, 9, a veya b
        const rand = Math.floor(Math.random() * 16); // [0–15]
        const variant = (rand % 4) + 8; // [8–11]
        uuidArr[i] = chars[variant];
      } else {
        const rand = Math.floor(Math.random() * 16); // [0–15]
        uuidArr[i] = chars[rand];
      }
    }

    return uuidArr.join('');
  }

  // create or get User ID
  async getUserId(): Promise<string> {
    if (this.userId) {
      return this.userId;
    }

    try {
      let storedUserId = await AsyncStorage.getItem(STORAGE_KEYS.USER_ID);

      if (!storedUserId) {
        storedUserId = this.generateUUID();
        await AsyncStorage.setItem(STORAGE_KEYS.USER_ID, storedUserId);
      }

      this.userId = storedUserId;
      return this.userId;
    } catch (error) {
      console.error('Error getting user ID:', error);
      throw error;
    }
  }

  // Get user's favorites document reference
  private async getUserFavoritesDoc() {
    const userId = await this.getUserId();
    return doc(db, 'favorites', userId);
  }

  // Initialize user's favorites document if not exists
  private async initializeUserFavorites() {
    const docRef = await this.getUserFavoritesDoc();
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      await setDoc(docRef, {
        userId: await this.getUserId(),
        favList: [],
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
    }
  }

  // add to favorites
  async addToFavorites(mealId: string, mealData: any): Promise<void> {
    try {
      await this.initializeUserFavorites();
      const docRef = await this.getUserFavoritesDoc();

      // First, get current favorites
      const docSnap = await getDoc(docRef);
      const currentData = docSnap.data();
      const currentFavList = currentData?.favList || [];

      // Check if already exists
      const existingIndex = currentFavList.findIndex(
        (item: any) => item.mealId === mealId,
      );

      if (existingIndex !== -1) {
        // Already exists, don't add again
        return;
      }

      // Create new favorite item
      const favoriteItem = {
        mealId,
        mealData,
        addedAt: Date.now(), // Use timestamp number
      };

      // Add to the array
      const updatedFavList = [...currentFavList, favoriteItem];

      // Update the document
      await updateDoc(docRef, {
        favList: updatedFavList,
        updatedAt: serverTimestamp(),
      });
    } catch (error) {
      console.error('Error adding to favorites:', error);
      throw error;
    }
  }

  // remove from favorites
  async removeFromFavorites(mealId: string): Promise<void> {
    try {
      const docRef = await this.getUserFavoritesDoc();
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        return;
      }

      const data = docSnap.data();
      const favList = data?.favList || [];

      // Filter out the item to remove
      const updatedFavList = favList.filter(
        (item: any) => item.mealId !== mealId,
      );

      // Update the document
      await updateDoc(docRef, {
        favList: updatedFavList,
        updatedAt: serverTimestamp(),
      });
    } catch (error) {
      console.error('Error removing from favorites:', error);
      throw error;
    }
  }

  // get user's favorites
  async getFavorites(): Promise<any[]> {
    try {
      const docRef = await this.getUserFavoritesDoc();
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        return [];
      }

      const data = docSnap.data();
      return data?.favList || [];
    } catch (error) {
      console.error('Error getting favorites:', error);
      throw error;
    }
  }

  // Check if recipe is favorite
  async isFavorite(mealId: string): Promise<boolean> {
    try {
      const docRef = await this.getUserFavoritesDoc();
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        return false;
      }

      const data = docSnap.data();
      const favList = data?.favList || [];

      return favList.some((item: any) => item.mealId === mealId);
    } catch (error) {
      console.error('Error checking favorite status:', error);
      return false;
    }
  }

  // Real-time favorites listener
  subscribeFavorites(callback: (favorites: any[]) => void): () => void {
    let unsubscribe: (() => void) | null = null;

    this.getUserId().then(async () => {
      const docRef = await this.getUserFavoritesDoc();

      // Initialize document if it doesn't exist
      await this.initializeUserFavorites();

      unsubscribe = onSnapshot(
        docRef,
        docSnap => {
          if (docSnap.exists()) {
            const data = docSnap.data();
            const favList = data?.favList || [];
            callback(favList);
          } else {
            callback([]);
          }
        },
        error => {
          console.error('Error in favorites listener:', error);
          callback([]);
        },
      );
    });

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }
}

export const firebaseService = new FirebaseService();
