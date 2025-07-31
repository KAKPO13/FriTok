import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  doc,
  getDoc,
} from "firebase/firestore";

// 🔐 Configuration Firebase (remplace par tes vrais paramètres)
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY!,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN!,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID!,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

type ItemData = {
  id: string;
  title: string;
  description: string;
  image_url: string;
  price: number;
};

// 🧠 OG dynamique via Firestore
export async function generateMetadata({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams?: { token?: string };
}): Promise<Metadata> {
  const docRef = doc(db, "items", params.id);
  const snapshot = await getDoc(docRef);
  const data = snapshot.data() as ItemData | undefined;

  if (!data) return {};

  const token = searchParams?.token;

  return {
    title: data.title,
    description: data.description,
    openGraph: {
      title: data.title,
      description: data.description,
      images: [{ url: data.image_url }],
      url: `https://fritok.com/share/item/${params.id}${token ? `?token=${token}` : ""}`,
    },
  };
}

// 🎨 Composant principal
export default async function ItemPage({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams?: { token?: string };
}) {
  const docRef = doc(db, "items", params.id);
  const snapshot = await getDoc(docRef);
  const data = snapshot.data() as ItemData | undefined;

  if (!data) return notFound();

  const { title, description, image_url, price } = data;
  const token = searchParams?.token;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="bg-white rounded-xl shadow-lg max-w-md w-full overflow-hidden">
        <Image
          src={image_url}
          alt={title}
          width={500}
          height={500}
          className="w-full object-cover"
        />
        <div className="p-4">
          <h1 className="text-xl font-bold">{title}</h1>
          <p className="text-sm text-gray-600 mt-2">{description}</p>
          <p className="text-lg text-pink-500 font-semibold mt-4">Prix : ${price}</p>
          {token && (
            <div className="mt-4 bg-indigo-50 p-2 rounded text-indigo-600 text-sm">
              🎉 Lien affilié activé ! Merci de partager ❤️
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

