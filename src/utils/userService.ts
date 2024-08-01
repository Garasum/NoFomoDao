// src/services/UserDataService.ts
import { db } from "../firebase-config";
import { collection, getDoc, addDoc, updateDoc, doc, DocumentData, DocumentReference, setDoc } from "firebase/firestore";

const userCollectionRef = collection(db, "users");

class UserDataService {
    addUser = (newUser: DocumentData): Promise<DocumentReference<DocumentData>> => {
        return addDoc(userCollectionRef, newUser);
    };

    updateUser = async (id: string, updatedUser: DocumentData): Promise<void> => {
        const userDoc = doc(db, "users", id);
        const docSnapshot = await getDoc(userDoc);

        if (docSnapshot.exists()) {
            return updateDoc(userDoc, updatedUser);
        } else {
            throw new Error(`Document with ID ${id} does not exist.`);
        }
    };

    getUser = async (id: string): Promise<DocumentData | null> => {
        const userDoc = doc(db, "users", id);
        const docSnapshot = await getDoc(userDoc);
        return docSnapshot.exists() ? (docSnapshot.data() as DocumentData) : null;
    };
}

export default new UserDataService();
