export type UserRole = 'student' | 'trainer' | 'admin';

export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  photoURL?: string | null;
  role: UserRole;
  createdAt: string;
  assignedTrainerId?: string | null;
  phone?: string;
  goal?: string;
  heightCm?: number;
  weightKg?: number;
  targetWeightKg?: number;
  age?: number;
}
