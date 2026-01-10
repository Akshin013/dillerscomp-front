"use client";
import { useState } from "react";

export default function UploadPage() {
  const [file, setFile] = useState(null);
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return alert("Выберите файл");

    const formData = new FormData();
    formData.append("image", file);

    setLoading(true);
    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      setUrl(data.url);
    } catch (err) {
      console.error(err);
      alert("Ошибка загрузки");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded shadow mt-10">
      <h2 className="text-2xl font-bold mb-4">Загрузка картинки</h2>
      <input type="file" onChange={handleFileChange} className="mb-4"/>
      <button
        onClick={handleUpload}
        disabled={loading}
        className="bg-blue-600 text-white p-2 rounded"
      >
        {loading ? "Загрузка..." : "Загрузить"}
      </button>

      {url && (
        <div className="mt-4">
          <p>Картинка загружена:</p>
          <img src={url} alt="Uploaded" className="mt-2 max-w-full"/>
        </div>
      )}
    </div>
  );
}
