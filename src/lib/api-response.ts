import type { ApiResponse } from "@/types";

export function jsonOk<T>(data: T, init?: ResponseInit) {
  const body: ApiResponse<T> = {
    success: true,
    data,
    timestamp: new Date().toISOString(),
  };
  return Response.json(body, { status: 200, ...init });
}

export function jsonErr(message: string, status = 400) {
  return Response.json(
    { success: false, error: message, timestamp: new Date().toISOString() },
    { status }
  );
}
