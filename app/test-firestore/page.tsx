// src/app/test-firestore/page.tsx
"use client";

import { useEffect, useState } from "react";
import {
  getFirestore,
  doc,
  getDoc,
} from "firebase/firestore";
import { initializeApp, getApps } from "firebase/app";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY!,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN!,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID!,
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const db = getFirestore(app);

export default function TestFirestorePage() {
  const [item, setItem] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const docRef = doc(db, "video_playlist", "NHiOx1Ibp4WsHJvBkGbY"); // Remplace par un ID réel
        const snapshot = await getDoc(docRef);

        if (snapshot.exists()) {
          setItem(snapshot.data());
        } else {
          console.warn("Document non trouvé");
        }
      } catch (err) {
        console.error("Erreur Firestore", err);
      } finally {
        setLoading(false);
      }
    };

    fetchItem();
  }, []);

  if (loading) return <div>🔄 Chargement…</div>;

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">🔥 Test Firestore</h1>
      {item ? (
        <pre className="bg-gray-100 p-4 rounded-md">{JSON.stringify(item, null, 2)}</pre>
      ) : (
        <div className="text-red-500">❌ Aucun document trouvé.</div>
      )}
    </div>
  );
}
