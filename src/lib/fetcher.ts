import { toast } from "sonner";

/**
 * Calls one of this app's JSON API routes and returns its `data` payload,
 * throwing the server's own error message when the call fails.
 */
export async function apiRequest<T>(
  url: string,
  init: RequestInit | undefined,
  fallback: string
): Promise<T> {
  const res = await fetch(url, init);
  const json = await res.json();
  if (!res.ok || !json.success) throw new Error(json.error || fallback);
  return json.data as T;
}

/** POST/PUT helper — same as apiRequest, with the JSON body boilerplate. */
export function apiSend<T>(
  url: string,
  method: "POST" | "PUT",
  body: unknown,
  fallback: string
): Promise<T> {
  return apiRequest<T>(
    url,
    { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) },
    fallback
  );
}

/** Surfaces a thrown error to the user, falling back when it isn't an Error. */
export function toastError(error: unknown, fallback: string) {
  toast.error(error instanceof Error ? error.message : fallback);
}
