import { initializeApp } from 'firebase/app';
import { addDoc, collection, doc, getDocs, getFirestore, setDoc } from 'firebase/firestore';
import { Vinyl } from '../types/vinyl';


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCVWb7nixMPhmn5poU2CUp6TyAkLGaILnI",
  authDomain: "checkpoint-3-1358f.firebaseapp.com",
  projectId: "checkpoint-3-1358f",
  storageBucket: "checkpoint-3-1358f.appspot.com",
  messagingSenderId: "1030061391898",
  appId: "1:1030061391898:web:6b8108c3a433a4e984d1a3"
};


const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const vinylDocuments = collection(db, 'vinyl');

export const addVinyl = async (vinyl: Vinyl) => {
	try {
		await addDoc(vinylDocuments, vinyl);
		console.log('Se añadió');
	} catch (error) {
		console.error(error);
	}
};

export const getVinyl = async () => {
	const querySnapshot = await getDocs(vinylDocuments);
	const vinyl: Vinyl[] = [];

	querySnapshot.docs.forEach((doc: any) => {
		const data: Omit<Vinyl, 'id'> = doc.data() as any;
		const vinylData = doc.data() as Vinyl;
		vinyl.push(vinylData);
	});
	console.log(vinyl);
	return vinyl;
};