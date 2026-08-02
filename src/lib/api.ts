import { NextResponse } from "next/server";

export const errorResponse = (message: string, status: number) =>
  NextResponse.json({ success: false, error: message }, { status });
