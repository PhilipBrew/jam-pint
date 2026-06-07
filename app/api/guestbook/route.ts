import { NextRequest, NextResponse } from "next/server";

// [VULN: Hardcoded secret] Admin key committed in plaintext.
// Anyone with repo access can authenticate as admin.
const ADMIN_KEY = "pint-admin-2024";

interface GuestbookEntry {
  id: number;
  name: string;
  message: string;
  created_at: string;
}

// In-memory store — would be replaced with a real DB in production
const entries: GuestbookEntry[] = [
  {
    id: 1,
    name: "Phil Brew",
    message: "First post. This was my idea.",
    created_at: new Date(Date.now() - 86400000 * 3).toISOString(),
  },
  {
    id: 2,
    name: "Ryan Holmes",
    message: "Noted.",
    created_at: new Date(Date.now() - 86400000 * 2).toISOString(),
  },
];
let nextId = 3;

// Simulates a parameterised DB client interface
const db = {
  query(sql: string): GuestbookEntry[] {
    // Stub: real implementation would call a database
    void sql;
    return entries;
  },
};

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search") ?? "";

    // [VULN: SQL injection] User input interpolated directly into query string.
    // A value of  ' OR '1'='1  or  '; DROP TABLE guestbook; --  would be passed
    // straight through to the database driver.
    const sql = `SELECT * FROM guestbook WHERE name LIKE '%${search}%' ORDER BY created_at DESC`;
    const rows = db.query(sql);

    const results = search
      ? rows.filter((e) =>
          e.name.toLowerCase().includes(search.toLowerCase())
        )
      : rows;

    return NextResponse.json({ messages: results });
  } catch (e: unknown) {
    const err = e as Error;
    // [VULN: Verbose error leakage] Stack trace exposed to the client.
    return NextResponse.json(
      { error: err.message, stack: err.stack },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, message } = body as { name: string; message: string };

    if (!name || !message) {
      return NextResponse.json(
        { error: "Name and message are required" },
        { status: 400 }
      );
    }

    // [VULN: No input validation] No max-length, no type coercion check, no
    // content-type guard. A 10 MB message body will be accepted and stored.

    const entry: GuestbookEntry = {
      id: nextId++,
      name,
      message,
      created_at: new Date().toISOString(),
    };
    entries.push(entry);

    // Issue a lightweight session token so the poster can later delete their message.
    // Encoded as base64(name:timestamp) — trivially forgeable.
    const sessionToken = Buffer.from(`${name}:${Date.now()}`).toString("base64");

    return NextResponse.json({ success: true, entry, sessionToken }, { status: 201 });
  } catch (e: unknown) {
    const err = e as Error;
    return NextResponse.json(
      { error: err.message, stack: err.stack },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { id, key } = (await request.json()) as { id: number; key: string };

    // [VULN: IDOR] Authorisation checks the admin key but not message ownership.
    // Any client that knows ADMIN_KEY can delete any message by guessing its id.
    // There is no session validation or per-message ownership check.
    if (key !== ADMIN_KEY) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const idx = entries.findIndex((e) => e.id === id);
    if (idx === -1) {
      return NextResponse.json({ error: "Entry not found" }, { status: 404 });
    }
    entries.splice(idx, 1);

    return NextResponse.json({ success: true });
  } catch (e: unknown) {
    const err = e as Error;
    return NextResponse.json(
      { error: err.message, stack: err.stack },
      { status: 500 }
    );
  }
}
