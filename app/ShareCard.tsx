import React from "react";

interface Product {
  price: number;
  image: string;
  description: string;
  name: string;
}

interface ShareCardProps {
  thumbnail: string;
  title: string;
  videoUrl: string;
  product: Product;
  shareLink: string;
}

const ShareCard: React.FC<ShareCardProps> = ({
  thumbnail,
  title,
  videoUrl,
  product,
  shareLink,
}) => {
  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareLink);
    alert("Lien affilié copié !");
  };

  return (
    <div style={{
      maxWidth: 400,
      border: "1px solid #ddd",
      borderRadius: 8,
      padding: 16,
      fontFamily: "sans-serif",
      boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
    }}>
      {/* 🖼️ Thumbnail + Titre */}
      <img src={thumbnail} alt={title} style={{ width: "100%", borderRadius: 6 }} />
      <h2 style={{ fontSize: "1.2rem", margin: "8px 0" }}>{title}</h2>

      {/* 💬 Description + Prix */}
      <p>
        <strong>{product.name}</strong>: {product.description}<br />
        💸 <strong>{product.price.toLocaleString()} FCFA</strong>
      </p>

      {/* ▶️ Vidéo */}
      <video width="100%" controls style={{ borderRadius: 6, marginTop: 8 }}>
        <source src={videoUrl} type="video/mp4" />
        Ton navigateur ne supporte pas la lecture vidéo.
      </video>

      {/* 🔗 Bouton Copie */}
      <button
        onClick={copyToClipboard}
        style={{
          marginTop: 12,
          padding: "8px 12px",
          backgroundColor: "#007aff",
          color: "#fff",
          border: "none",
          borderRadius: 4,
          cursor: "pointer"
        }}
      >
        Copier le lien affilié
      </button>
    </div>
  );
};

export default ShareCard;


