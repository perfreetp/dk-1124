export interface AccountPersona {
  id: string;
  name: string;
  description: string;
  style: string;
  createdAt: string;
  updatedAt: string;
}

export interface ColumnDirection {
  id: string;
  name: string;
  description: string;
  frequency: string;
  createdAt: string;
}

export interface TargetAudience {
  id: string;
  ageRange: string;
  gender: string;
  interests: string[];
  description: string;
}

export interface AccountInfo {
  id: string;
  platform: string;
  accountName: string;
  persona: AccountPersona;
  columns: ColumnDirection[];
  audience: TargetAudience;
  createdAt: string;
  updatedAt: string;
}