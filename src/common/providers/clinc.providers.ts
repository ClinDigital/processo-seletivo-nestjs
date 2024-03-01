import { Clinics } from '../entities';

export const ClinicsProviders = [
  {
    provide: 'CLINICS_REPOSITORY',
    useValue: Clinics,
  },
];