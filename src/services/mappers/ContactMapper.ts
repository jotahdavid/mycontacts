import { Contact, ContactResponse } from '@services/ContactsService';

class ContactMapper {
  toPersistence(domainContact: Contact) {
    return {
      name: domainContact.name,
      email: domainContact.email || null,
      phone: domainContact.phone || null,
      category_id: domainContact.categoryId || null,
    };
  }

  toDomain(persistenceContact: ContactResponse) {
    return {
      id: persistenceContact.id,
      name: persistenceContact.name,
      email: persistenceContact.email,
      phone: persistenceContact.phone,
      category: {
        id: persistenceContact.category_id,
        name: persistenceContact.category_name,
      },
    };
  }
}

export default new ContactMapper();
