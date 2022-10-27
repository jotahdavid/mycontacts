import { CategoryResponse } from '@services/CategoriesService';

class CategoryMapper {
  toDomain(persistenceCategory: CategoryResponse) {
    return {
      id: persistenceCategory.id,
      name: persistenceCategory.name,
    };
  }
}

export default new CategoryMapper();
