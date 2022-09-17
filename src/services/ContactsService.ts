import HttpClient, { HttpClientResponse } from '@services/utils/HttpClient';
import APIError from '@errors/APIError';

export interface Contact {
  name: string;
  email: string;
  phone: string;
  categoryId: string;
}

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
    throw new APIError(response);
  }
}

function isValidContact(value: any): value is ContactResponse {
  return 'id' in value && 'name' in value;
}

function isValidContactList(value: any): value is ContactResponse[] {
  if (!Array.isArray(value)) return false;
  return value.length > 0
    ? isValidContact(value[0])
    : true;
}

class ContactsService {
  private http = new HttpClient(import.meta.env.VITE_API_URL);

  async listContacts(orderBy: OrderBy = 'ASC'): Promise<ContactResponse[]> {
    const response = await this.http.get<ContactResponse[]>(`/contacts?orderBy=${orderBy}`);

    responseHasError(response);

    if (isValidContactList(response.data)) {
      return response.data;
    }

    if (!response.status.ok) {
      throw new APIError(response);
    }

    throw new TypeError('Response data is not Contact type');
  }

  async getContactById(id: string) {
    const response = await this.http.get<ContactResponse>(`/contacts/${id}`);

    responseHasError(response);

    if (isValidContact(response.data)) {
      return response.data;
    }

    if (!response.status.ok) {
      throw new APIError(response);
    }

    throw new TypeError('Response data is not Contact type');
  }

  async createContact(contact: Contact) {
    const newContact = {
      name: contact.name,
      email: contact.email || null,
      phone: contact.phone || null,
      category_id: contact.categoryId || null,
    };

    const response = await this.http.post<ContactResponse>('/contacts', {
      body: newContact,
    });

    if (!response.status.ok) {
      throw new APIError(response);
    }

    return response.data;
  }

  async updateContact(id: string, contact: Contact) {
    const updatedContact = {
      name: contact.name,
      email: contact.email || null,
      phone: contact.phone || null,
      category_id: contact.categoryId || null,
    };

    const response = await this.http.put<ContactResponse>(`/contacts/${id}`, { body: updatedContact });

    responseHasError(response);

    if (isValidContact(response.data)) {
      return response.data;
    }

    if (!response.status.ok) {
      throw new APIError(response);
    }

    throw new TypeError('Response data is not Contact type');
  }

  async deleteContact(id: string) {
    const response = await this.http.delete(`/contacts/${id}`);

    responseHasError(response);

    if (!response.status.ok) {
      throw new APIError(response);
    }

    return response.data;
  }
}

export default new ContactsService();
