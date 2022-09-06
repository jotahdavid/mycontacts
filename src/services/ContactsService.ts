export interface Contact {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  category_id?: string;
  category_name?: string;
}

export type OrderBy = 'ASC' | 'DESC';

class ContactsService {
  async listContacts(orderBy: OrderBy = 'ASC'): Promise<Contact[]> {
    const response = await fetch(`http://localhost:3001/contacts?orderBy=${orderBy}`);
    return response.json();
  }
}

export default new ContactsService();
