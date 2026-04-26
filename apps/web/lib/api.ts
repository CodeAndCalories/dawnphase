const API_BASE =
  process.env.NEXT_PUBLIC_WORKER_URL ??
  "https://dawnphase-worker.axigamingclips.workers.dev";

async function request<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("dp_token") : null;

  const res = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({ message: "Request failed" }));
    throw new Error((error as { message?: string }).message ?? "Request failed");
  }

  return res.json() as Promise<T>;
}

export const api = {
  get: <T>(path: string) => request<T>(path),
  post: <T>(path: string, body: unknown) =>
    request<T>(path, { method: "POST", body: JSON.stringify(body) }),
  patch: <T>(path: string, body: unknown) =>
    request<T>(path, { method: "PATCH", body: JSON.stringify(body) }),
  delete: <T>(path: string) => request<T>(path, { method: "DELETE" }),
};

// Auth helpers
export async function login(email: string, password: string) {
  const res = await api.post<{ token: string; user: Record<string, unknown> }>(
    "/auth/login",
    { email, password }
  );
  if (typeof window !== "undefined") {
    localStorage.setItem("dp_token", res.token);
  }
  return res;
}

export async function signup(email: string, password: string, name: string) {
  const res = await api.post<{ token: string; user: Record<string, unknown> }>(
    "/auth/signup",
    { email, password, name }
  );
  if (typeof window !== "undefined") {
    localStorage.setItem("dp_token", res.token);
  }
  return res;
}

export function logout() {
  if (typeof window !== "undefined") {
    localStorage.removeItem("dp_token");
  }
}
