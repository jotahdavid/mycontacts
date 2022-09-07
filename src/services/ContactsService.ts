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

function isDataNotNull<T extends { data: NonNullable<T['data']> | null }>(
  obj: T,
): obj is T & { data: NonNullable<T['data']> } {
  return obj.data !== null;
}

class ContactsService {
  private http = new HttpClient(import.meta.env.VITE_API_URL);

  async listContacts(orderBy: OrderBy = 'ASC') {
    const contacts = await this.http.get<ContactResponse[]>(`/contacts?orderBy=${orderBy}`);
    await delay(500);
    if (!isDataNotNull(contacts)) {
      contacts.data = [] as ContactResponse[];
      return contacts as HttpClientResponse<ContactResponse[]> & { data: ContactResponse[] };
    }
    return contacts;
  }
}

export default new ContactsService();
