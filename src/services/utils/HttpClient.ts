export interface HttpClientResponse<DataType = any> {
  status: number,
  headers: unknown,
  data: DataType | null;
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
      status: response.status,
      headers: responseHeaders,
      data,
    };
  }
}

export default HttpClient;
