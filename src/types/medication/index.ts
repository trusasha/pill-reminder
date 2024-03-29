export interface Medication {
  id: string;
  name: string;
  initialCount: number;
  destinationCount: number;
  currentCount: number;
  createdAt: string;
  updatedAt: string;
  description?: string;
}
