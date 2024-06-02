import { api } from '@/api';
import { Specialty } from '@/types';

class SpecialtyService {
  static async getSpecialties() {
    return api.get<Specialty[]>('/specialties');
  }
}

export { SpecialtyService };
