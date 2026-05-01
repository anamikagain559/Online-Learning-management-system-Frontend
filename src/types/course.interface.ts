export type CourseLevel = "BEGINNER" | "INTERMEDIATE" | "ADVANCED";

export interface ICourseFormData {
  category: string;
  startDate: string;
  endDate: string;
  priceRange: {
    min: number;
    max: number;
  };
  courseLevel: CourseLevel;
  description?: string;
  isPublic?: boolean;
  image?: string; 
}

export interface ICourse extends ICourseFormData {
  _id: string;
  user?: {
    _id: string;
    name: string;
    picture?: string;
    email?: string;
  } | null;
  createdAt: string;
  updatedAt: string;
}
