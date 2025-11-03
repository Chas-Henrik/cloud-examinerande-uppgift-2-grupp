"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import EntryCard from "@/components/EntryCard";
import { Entry } from "@/types/database.types";
import Link from "next/link";

export default function DashboardPage() {
  const router = useRouter();
  const [entries, setEntries] = useState<Entry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadData() {
      try {
        const res = await fetch("/api/entries");
        if (!res.ok) {
          if (res.status === 401) {
            router.push("/login");
            return;
          }
          const errorData = await res.json();
          throw new Error(errorData.message || "Failed to load entries");
        }
        const { data } = await res.json();

        setEntries(data);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError(String(err) || "Failed to load entries");
        }
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="max-w-4xl mx-auto px-6 py-12">
          <p className="text-warm-gray text-center">Loading...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="max-w-4xl mx-auto px-6 py-12">
          <p className="text-red-600 text-center">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Header />

      <main
        className="max-w-4xl mx-auto py-12 px-[clamp(16px,5vw,80px)]"
      >
        <div className="flex flex-wrap items-center justify-between mb-12 gap-y-6">
          <div>
            <h2 className="text-3xl font-serif text-dark-brown mb-2">
              Your Entries
            </h2>
            <p className="text-warm-gray text-sm">
              {entries.length} {entries.length === 1 ? "entry" : "entries"}
            </p>
          </div>
          <Link href="/new-entry">
            <button className="btn-primary" style={{ minWidth: "160px" }}>
              New Entry
            </button>
          </Link>
        </div>

        {entries.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-warm-gray mb-6">
              You haven&apos;t written any entries yet.
            </p>
            <Link href="/new-entry">
              <button className="btn-secondary">Write your first entry</button>
            </Link>
          </div>
        ) : (
          <div className="space-y-8">
            {entries.map((entry) => (
              <EntryCard key={entry.id} entry={entry} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
