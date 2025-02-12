import { TNullable } from '../../global/types/generic';

export interface IProfileCreate {
  uid: string;
  email: string;
  status_id: number;
}

export interface IProfile extends IProfileCreate {
  id: number;
  first_name?: TNullable<string>;
  last_name?: TNullable<string>;
  gender?: TNullable<string>;
  birth_date?: TNullable<Date>;
  country?: TNullable<string>;
  onboarded: boolean;
  created_at: string;
  updated_at: string;
}
