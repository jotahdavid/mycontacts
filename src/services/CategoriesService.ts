import HttpClient, { HttpClientResponse } from '@services/utils/HttpClient';
import APIError from '@errors/APIError';

export interface CategoryResponse {
  id: string;
  name: string;
}

function responseHasError(response: HttpClientResponse): asserts response {
  if (response.data?.error && !response.status.ok) {
    throw new APIError(response);
  }
}

function isValidCategory(value: any): value is CategoryResponse[] {
  if (!Array.isArray(value)) return false;
  return value.length > 0
    ? 'id' in value[0] && 'name' in value[0]
    : true;
}

class CategoriesService {
  private http = new HttpClient(import.meta.env.VITE_API_URL);

  async listCategories(): Promise<CategoryResponse[]> {
    const response = await this.http.get<CategoryResponse[]>('/categories');

    responseHasError(response);

    if (isValidCategory(response.data)) {
      return response.data;
    }

    if (!response.status.ok) {
      throw new APIError(response);
    }

    throw new TypeError('Response data is not Category type');
  }
}

export default new CategoriesService();
