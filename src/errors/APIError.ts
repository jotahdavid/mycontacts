import type { HttpClientResponse } from '@services/utils/HttpClient';

class APIError<ResponseType extends HttpClientResponse> extends Error {
  public name = 'APIError';

  public response: ResponseType;

  constructor(response: ResponseType) {
    super();
    this.response = response;
    this.message = response.data?.error || `${response.status.code} - ${response.status.message}`;
  }
}

export default APIError;
