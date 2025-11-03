"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import EntryCard from "@/components/EntryCard";
import { Entry } from "@/types/database.types";
import Link from "next/link";
import EditModal from "@/components/EditModal";

export default function DashboardPage() {
  const router = useRouter();
  const [entries, setEntries] = useState<Entry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editingEntryId, setEditingEntryId] = useState<string | null>(null);


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
  useEffect(() => {
    loadData();
  }, [router]);

  const deleteEntry = async (id : string) => {
    console.log("Deleting entry with id:", id);
    try {
      const response = await fetch(`/api/entries/${id}`, {
        method: 'DELETE',
      }); 

      if (!response.ok) {
        alert('Failed to delete entry');
        return;
      }

      alert('Entry deleted successfully');
      loadData();

    } catch (err) { 
      if (err instanceof Error) {
        alert(`Error: ${err.message}`);
      } else {
        alert('An unknown error occurred');
      }
    } 
  };

  const editEntry = (id : string) => {
    if (!isEditing) {
      setIsEditing(true);
      setEditingEntryId(id);
    } 
  };

  const saveEditedEntry = async (editedEntry : Entry) => {
    try {
      const response = await fetch(`/api/entries/${editedEntry.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title: editedEntry.title, content: editedEntry.content }),
      });

      if (!response.ok) {
        alert('Failed to save changes');
        return;
      }

      alert('Entry updated successfully');  
      setIsEditing(false);
      setEditingEntryId(null);
      loadData();
    } catch (err : unknown) {
      if (err instanceof Error) {
        alert( `${err.message}`);
      } else {
        alert('An unknown error occurred');
      }
    }
  };

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
              <EntryCard key={entry.id} entry={entry} handleDelete={deleteEntry} handleEdit={editEntry} />
            ))}
          </div>
        )}
        {isEditing && editingEntryId &&
            <EditModal entry={entries.find(e => e.id === editingEntryId)} onCancel={() => {setIsEditing(false); setEditingEntryId(null)}} onSave={saveEditedEntry}/> 
        }
      </main>
    </div>
  );
  
};
