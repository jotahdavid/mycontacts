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

  async get<T>(path: string, options?: RequestInit): Promise<HttpClientResponse<T>> {
    const response = await fetch(this.baseURL + path, options);
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
}

export default HttpClient;
