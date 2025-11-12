"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import ImageContainerList from "@/components/ImageContainerList";

export default function NewEntryPage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [images, setImages] = useState<string[] | null>(null);
  const [files, setFiles] = useState<File[] | null>(null);  
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const fileInputRef = useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    async function checkAuth() {
      const res = await fetch('/api/users/current');
      if (!res.ok) {
        router.push("/login");
        return;
      }
    }

    checkAuth();
  }, [router]);

  const handleAddImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("Inside handle add image")
    const file = e.target.files?.[0];
    if (!file) return;
    setFiles(prev => prev ? [...prev, file] : [file]);
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result as string;
      setImages(prev => prev ? [...prev, base64] : [base64]);
    };
    if (fileInputRef.current) fileInputRef.current.value = "";
    reader.readAsDataURL(file);
  };

  const handleRemoveImage = (index: number) => {
    setImages(prev => prev ? prev.filter((_, i) => i !== index) : prev);
    setFiles(prev => prev ? prev.filter((_, i) => i !== index) : prev);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!title.trim() || !content.trim()) {
      setError("Title and content are required");
      return;
    }

    if (files && files.length > 0) {
    
    }

    setLoading(true);

    try {
      const res = await fetch("/api/entries", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, content }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to create entry");
      }

      const entryData = await res.json();
      const entryId = entryData.data.id;

      const fileUploadRes = await Promise.all(
        (files || []).map((file) => {
          const formData = new FormData();
          formData.append("image", file);
          return fetch(`/api/entries/${entryId}/images`, {
            method: "POST",
            body: formData.get("image") as Blob,
          });
      }));

      if (fileUploadRes.some(res => !res.ok)) {
        alert("Failed to upload one or more images");
      } 

      router.push("/dashboard");
    } catch (err: unknown) {
      let message = "Failed to create entry";
      if (err instanceof Error) {
        message = err.message;
      } else if (typeof err === "string") {
        message = err;
      } else {
        try {
          message = JSON.stringify(err);
        } catch {
          // keep default message
        }
      }
      setError(message);
      setLoading(false);
    }
  };

  const displayDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="min-h-screen">
      <Header />

      <main className="max-w-3xl mx-auto px-6 py-12">
        <div className="mb-8">
          <button
            onClick={() => router.back()}
            className="text-warm-gray hover:text-dark-brown text-sm mb-4"
          >
            ← Back to entries
          </button>
          <h1 className="text-4xl font-serif text-dark-brown mb-2">
            New Entry
          </h1>
          <p className="text-warm-gray text-sm">{displayDate}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="title"
              className="block text-sm mb-2 text-dark-brown font-medium"
            >
              Title
            </label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="input-field text-xl font-serif"
              placeholder="Give your entry a title..."
              required
              disabled={loading}
            />
          </div>

          <div>
            <label
              htmlFor="content"
              className="block text-sm mb-2 text-dark-brown font-medium"
            >
              Content
            </label>
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="input-field min-h-[400px] resize-y leading-relaxed"
              placeholder="Write your thoughts..."
              required
              disabled={loading}
            />
          </div>
          {images && (
            <ImageContainerList images={images} onImageDelete={(index) => handleRemoveImage(index)} isEdit={true}/>
          )}
            <>
              <label
                htmlFor="image-upload"
                className="btn-primary mb-4 inline-block"
              >
                Add image
              </label>
              <input
                id="image-upload"
                type="file"
                accept="image/*"
                onChange={handleAddImage}
                ref={fileInputRef}
                className="hidden"
              />
            </>


          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-sm text-sm">
              {error}
            </div>
          )}

          <div className="flex gap-4">
            <button type="submit" className="btn-primary" disabled={loading}>
              {loading ? "Saving..." : "Save Entry"}
            </button>
            <button
              type="button"
              onClick={() => router.back()}
              className="btn-secondary"
              disabled={loading}
            >
              Cancel
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
