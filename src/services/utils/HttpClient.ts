import delay from '@utils/delay';

export interface HttpClientResponse<T = any> {
  status: {
    ok: boolean;
    code: number;
    message: string;
  };
  headers: Record<string, string>;
  data: T | null;
}

type RequestOptions = Omit<RequestInit, 'body'> & {
  body?: unknown
};

class HttpClient {
  constructor(
    private baseURL: string,
  ) {}

  private async makeRequest<DataType = any>(
    path: string,
    options: RequestOptions,
  ): Promise<HttpClientResponse<DataType>> {
    const headers = new Headers();

    if (options.body) {
      headers.append('Content-Type', 'application/json');
    }

    if (options.headers) {
      Object.entries(options.headers).forEach(([name, value]) => {
        headers.append(name, value);
      });
    }

    const response = await fetch(this.baseURL + path, {
      ...options,
      body: options.body ? JSON.stringify(options.body) : null,
      headers,
    });

    const responseHeaders = Object.fromEntries(response.headers.entries());
    const responseData = responseHeaders['content-type']?.includes('json')
      ? await response.json() as DataType
      : null;

    await delay(500);

    return {
      status: {
        ok: response.ok,
        code: response.status,
        message: response.statusText,
      },
      headers: responseHeaders,
      data: responseData,
    };
  }

  get<DataType>(path: string, options?: Omit<RequestOptions, 'body'>) {
    return this.makeRequest<DataType>(path, {
      method: 'GET',
      headers: options?.headers,
    });
  }

  post<DataType>(path: string, options: RequestOptions) {
    return this.makeRequest<DataType>(path, {
      method: 'POST',
      body: options?.body,
      headers: options?.headers,
    });
  }

  put<DataType>(path: string, options: RequestOptions) {
    return this.makeRequest<DataType>(path, {
      method: 'PUT',
      body: options?.body,
      headers: options?.headers,
    });
  }

  delete<DataType = any>(path: string, options?: Omit<RequestOptions, 'body'>) {
    return this.makeRequest<DataType>(path, {
      method: 'DELETE',
      headers: options?.headers,
    });
  }
}

export default HttpClient;
