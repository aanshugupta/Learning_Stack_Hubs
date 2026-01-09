
import React from 'react';

export type Page = 'Dashboard' | 'Courses' | 'Roadmap' | 'Quizzes' | 'Profile' | 'Certificates' | 'Forum' | 'Daily News';

export interface Topic {
  id: string;
  title: string;
  duration: string;
  content: string;
  codeExample: string;
  codingChallenge?: {
    task: string;
    initialCode: string;
    solutionPattern: string;
    explanation: string;
    hint: string;
  };
  miniQuiz?: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  };
}

export type CourseCategory = 'AI / Machine Learning' | 'Web Development' | 'Data Science' | 'Cloud Computing' | 'Cybersecurity' | 'Mobile App Development' | 'Data Analytics & BI' | 'DevOps & CI/CD' | 'Robotics & IoT' | 'Blockchain & Web3' | 'Software Engineering';
export type CourseDifficulty = 'Beginner' | 'Intermediate' | 'Advanced';

export interface Course {
  id: string;
  title: string;
  description: string;
  icon: React.ReactElement;
  topics: Topic[];
  category: CourseCategory;
  difficulty: CourseDifficulty;
  duration: string;
  isFree: boolean;
  price?: number;
}

export interface QuizQuestion {
    id: number;
    question: string;
    options: string[];
    answer: string;
    explanation: string;
}

export interface User {
  id?: string;
  name: string;
  email: string;
  avatar: string;
  role: string;
  level: string;
  joinDate: string;
  skills: {
    name: string;
    progress: number;
  }[];
  analytics: {
    studyTimeThisWeek: string;
    bestStudyDay: string;
    consistencyScore: number;
  };
}

export interface Certificate {
  courseName: string;
  userName: string;
  date: string;
}

export interface EnrolledCourse {
  courseId: string;
  progress: number;
}

export interface RoadmapMilestone {
  week: number;
  title: string;
  description: string;
  resources: string[];
}

export interface NewsItem {
  title: string;
  summary: string;
  category: string;
  sourceName: string;
  sourceUrl: string;
  publishedAt?: string;
}

export interface Comment {
  id: number;
  author: string;
  avatar: string;
  time: string;
  content: string;
}

export interface Post {
  id: number;
  author: string;
  avatar: string;
  time: string;
  content: string;
  likes: number;
  replies: Comment[];
}

export interface AdminViewUser {
  id: number;
  name: string;
  email: string;
  avatar: string;
  enrolledCourses: EnrolledCourse[];
}
