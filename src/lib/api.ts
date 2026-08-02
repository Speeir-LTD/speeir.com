import { NextResponse } from "next/server";

export const errorResponse = (message: string, status: number) =>
  NextResponse.json({ success: false, error: message }, { status });

/** Mongo documents can't cross the server/client boundary with an ObjectId. */
export function serialize<T extends { _id: unknown }>(doc: T) {
  return { ...doc, _id: String(doc._id) };
}
