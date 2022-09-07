import HttpClient, { HttpClientResponse } from '@services/utils/HttpClient';
import delay from '@utils/delay';

export interface ContactResponse {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  category_id?: string;
  category_name?: string;
}

export type OrderBy = 'ASC' | 'DESC';

function responseHasError(response: HttpClientResponse): asserts response {
  if (response.data?.error && !response.status.ok) {
    throw new Error(response.data.error);
  }
}

function isValidContact(value: any): value is ContactResponse[] {
  if (!Array.isArray(value)) return false;
  return value.length > 0
    ? 'id' in value[0] && 'name' in value[0]
    : true;
}

class ContactsService {
  private http = new HttpClient(import.meta.env.VITE_API_URL);

  async listContacts(orderBy: OrderBy = 'ASC'): Promise<ContactResponse[]> {
    const response = await this.http.get<ContactResponse[]>(`/contacts?orderBy=${orderBy}`);

    await delay(500);
    responseHasError(response);

    if (isValidContact(response.data)) {
      return response.data;
    }

    if (!response.status.ok) {
      throw new Error(`${response.status.code} - ${response.status.message}`);
    }

    throw new TypeError('Response data is not Contact type');
  }
}

export default new ContactsService();
