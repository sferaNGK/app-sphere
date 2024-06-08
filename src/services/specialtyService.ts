import { api } from '@/api';
import { Specialty } from '@/types';

class SpecialtyService {
  static async getSpecialties() {
    return (await api.get<Specialty[]>('/specialties')).data;
  }
}

export { SpecialtyService };
