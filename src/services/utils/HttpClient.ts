export interface HttpClientResponse<D = any> {
  status: {
    ok: boolean;
    code: number;
    message: string;
  };
  headers: unknown;
  data: D | null;
}

class HttpClient {
  constructor(
    private baseURL: string,
  ) {}

  async get<T>(path: string): Promise<HttpClientResponse<T>> {
    const response = await fetch(this.baseURL + path);
    const responseHeaders = Object.fromEntries(response.headers.entries());
    const [contentType] = responseHeaders['content-type'].split(';');
    const data = contentType.toLowerCase().includes('json')
      ? await response.json() as T
      : null;

    return {
      status: {
        ok: response.ok,
        code: response.status,
        message: response.statusText,
      },
      headers: responseHeaders,
      data,
    };
  }

  async post(path: string, body: unknown): Promise<HttpClientResponse> {
    const headers = new Headers({
      'Content-Type': 'application/json',
    });
    const response = await fetch(this.baseURL + path, {
      method: 'POST',
      body: JSON.stringify(body),
      headers,
    });
    const responseHeaders = Object.fromEntries(response.headers.entries());
    const [contentType] = responseHeaders['content-type'].split(';');
    const data = contentType.toLowerCase().includes('json')
      ? await response.json()
      : null;

    return {
      status: {
        ok: response.ok,
        code: response.status,
        message: response.statusText,
      },
      headers: responseHeaders,
      data,
    };
  }
}

export default HttpClient;
