import { collection, addDoc } from "firebase/firestore";
export const docRef = await addDoc(collection(db, "users"), {
  first: "Ada",
  last: "Lovelace",
  born: 1815,
});
console.log("Document written with ID: ", docRef.id);
