// Database-aligned types
export interface JobPosting {
  id: string;           // UUID from database
  job_code: string;     // e.g. JP-001
  job_title: string;
  department: string;
  location: string;
  status: 'published' | 'draft' | 'closed';
  applicants_count: number;
  posted_date: string;
  deadline: string;
  hired: string;
  description?: string;
  salary_range?: string;
  employment_type?: string;
  created_at?: string;
  updated_at?: string;
}

export interface Candidate {
  id: string;           // UUID from database
  candidate_code: string;
  name: string;
  email: string;
  phone: string;
  job_posting_id: string | null;
  position_applied: string;
  status: 'new' | 'screening' | 'interview' | 'offered' | 'hired' | 'rejected';
  applied_date: string;
  location: string;
  notes?: string;
  created_at?: string;
  updated_at?: string;
  // Joined data
  job_posting?: JobPosting;
}

export interface Employee {
  id: string;           // UUID from database
  employee_code: string;
  name: string;
  email: string;
  phone: string;
  department: string;
  position: string;
  status: 'active' | 'inactive';
  join_date: string;
  created_at?: string;
  updated_at?: string;
}

export const departments = ['IT', 'Design', 'Finance', 'Engineering', 'HR', 'Data', 'Marketing', 'Product'];
export const locations = ['Jakarta', 'Bandung', 'Surabaya', 'Remote'];
export const employmentTypes = ['Full-time', 'Part-time', 'Contract', 'Internship'];
