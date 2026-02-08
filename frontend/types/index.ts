export interface StateHealthData {
  name: string;
  code: string; 
  status: 'Stable' | 'Critical' | 'Warning' | 'Improving';
  trend: 'up' | 'down' | 'flat';
  score: number;
  hospitalMargin: number; 
  uninsuredRate: number;
}