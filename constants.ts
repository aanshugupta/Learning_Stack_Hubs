
import React from 'react';
import { 
  BookOpen, Code, Database, Feather, TestTube2, User, Users, Award, 
  Bot, Newspaper, Shield, BrainCircuit, Cloud, Lock, Smartphone, BarChart, 
  Settings, Terminal, Cpu, Link, Box
} from 'lucide-react';
import type { Course, Page, CourseCategory, QuizQuestion, AdminViewUser, Topic, User as UserType } from './types';

export const NAV_LINKS: { name: Page; icon: React.ReactElement }[] = [
  { name: 'Dashboard', icon: React.createElement(BookOpen, { size: 20 }) },
  { name: 'Courses', icon: React.createElement(Code, { size: 20 }) },
  { name: 'Roadmap', icon: React.createElement(Feather, { size: 20 }) },
  { name: 'Daily News', icon: React.createElement(Newspaper, { size: 20 }) },
  { name: 'Quizzes', icon: React.createElement(TestTube2, { size: 20 }) },
  { name: 'Profile', icon: React.createElement(User, { size: 20 }) },
  { name: 'Certificates', icon: React.createElement(Award, { size: 20 }) },
  { name: 'Forum', icon: React.createElement(Users, { size: 20 }) },
];

export const COURSE_CATEGORIES: CourseCategory[] = [
  'AI / Machine Learning', 
  'Web Development', 
  'Data Science', 
  'Cloud Computing', 
  'Cybersecurity', 
  'Mobile App Development', 
  'Data Analytics & BI', 
  'DevOps & CI/CD', 
  'Robotics & IoT', 
  'Blockchain & Web3', 
  'Software Engineering'
];

const generateContent = (title: string, overview: string, concepts: {name: string, desc: string}[], analogy: string, relevance: string, summary: string[]) => `
  <div class="space-y-6">
    <section>
      <h2 class="text-3xl font-black text-white mb-4">${title}</h2>
      <p class="text-slate-300 leading-relaxed text-lg">${overview}</p>
    </section>
    
    <section class="bg-slate-800/40 p-6 rounded-2xl border border-slate-700/50">
      <h3 class="text-xl font-bold text-cyan-400 mb-4 flex items-center gap-2">
        <div class="w-2 h-6 bg-cyan-400 rounded-full"></div> Core Concepts
      </h3>
      <ul class="space-y-4">
        ${concepts.map(c => `
          <li>
            <strong class="text-slate-100 block text-lg">${c.name}</strong>
            <span class="text-slate-400">${c.desc}</span>
          </li>
        `).join('')}
      </ul>
    </section>

    <section>
      <h3 class="text-xl font-bold text-purple-400 mb-3">The Mental Model (Analogy)</h3>
      <div class="p-6 bg-purple-500/10 rounded-2xl border-l-4 border-purple-500 italic text-slate-300">
        "${analogy}"
      </div>
    </section>

    <section>
      <h3 class="text-xl font-bold text-white mb-3">Industry Relevance</h3>
      <p class="text-slate-300 leading-relaxed">${relevance}</p>
    </section>

    <section class="bg-slate-900 p-6 rounded-2xl">
      <h3 class="text-sm font-black text-slate-500 uppercase tracking-widest mb-4">Deep Dive Summary</h3>
      <ul class="grid grid-cols-1 md:grid-cols-2 gap-3">
        ${summary.map(s => `
          <li class="flex items-center gap-2 text-slate-300">
            <div class="w-1.5 h-1.5 bg-cyan-400 rounded-full"></div>
            ${s}
          </li>
        `).join('')}
      </ul>
    </section>
  </div>
`;

// Helper to create a comprehensive multi-topic curriculum for courses
const createCurriculum = (baseName: string): Topic[] => [
  { 
    id: `${baseName}-01`, title: 'The Genesis Phase', duration: '15 min',
    content: generateContent(`${baseName}: Foundations`, 'Understanding where it all began.', [{name: 'Origins', desc: 'The history and core definitions.'}], 'Like learning to balance before riding a bike.', 'Foundations define future success.', ['History', 'Terminology']),
    codeExample: '# Initialize project\nprint("Curriculum Phase 1 Activated")'
  },
  { 
    id: `${baseName}-02`, title: 'Syntax & Structure', duration: '25 min',
    content: generateContent(`${baseName}: Rules of the Game`, 'Deep dive into standard operations.', [{name: 'Semantics', desc: 'Logical flow of the system.'}], 'Grammar for code.', 'Clean structure prevents debt.', ['Grammar', 'Logic']),
    codeExample: 'def core_logic():\n  return "Stable System"'
  },
  { 
    id: `${baseName}-03`, title: 'Advanced Scalability', duration: '40 min',
    content: generateContent(`${baseName}: High Load`, 'How to build for millions.', [{name: 'Efficiency', desc: 'Optimization at scale.'}], 'Tuning a supercar engine.', 'Vital for enterprise production.', ['Scaling', 'Concurrency']),
    codeExample: 'async def process_data():\n  pass',
    codingChallenge: {
      task: "Optimize the return value to ensure high-priority execution.",
      initialCode: "def priority():\n  return False",
      solutionPattern: "return\\s+True",
      explanation: "Boolean flags often control system throughput.",
      hint: "Flip the switch."
    }
  },
  { 
    id: `${baseName}-04`, title: 'Architectural Patterns', duration: '30 min',
    content: generateContent(`${baseName}: Design`, 'Modern structural implementations.', [{name: 'Patterns', desc: 'Reusable solutions to common problems.'}], 'Blueprints for a mansion.', 'Saves development time significantly.', ['Design', 'Patterns']),
    codeExample: 'class Singleton: pass'
  },
  { 
    id: `${baseName}-05`, title: 'Edge Case Mastery', duration: '45 min',
    content: generateContent(`${baseName}: Defense`, 'Handling the unexpected.', [{name: 'Error Handling', desc: 'Graceful degradation.'}], 'A safety net for a trapeze artist.', 'Prevents system crashes in production.', ['Errors', 'Recovery']),
    codeExample: 'try:\n  critical_path()\nexcept Exception: recover()'
  },
  { 
    id: `${baseName}-06`, title: 'The Capstone Challenge', duration: '60 min',
    content: generateContent(`${baseName}: Final Proof`, 'Bringing it all together.', [{name: 'Synthesis', desc: 'Holistic system knowledge.'}], 'The final exam before graduation.', 'Validates your entire journey.', ['Capstone', 'Mastery']),
    codeExample: 'def main():\n  print("Mastery Achieved")'
  }
];

export const MOCK_COURSES: Course[] = [
  {
    id: 'intro-ai-ml',
    title: 'Intro to AI & ML',
    description: 'Master the foundations of Artificial Intelligence and Machine Learning.',
    icon: React.createElement(Bot, { size: 40, className: "text-[#00BCD4]" }),
    category: 'AI / Machine Learning',
    difficulty: 'Beginner',
    duration: '4 Weeks',
    isFree: true,
    topics: createCurriculum('ai-ml'),
  },
  {
    id: 'fullstack-web',
    title: 'Full Stack Excellence',
    description: 'Learn to build complete end-to-end applications using modern stacks.',
    icon: React.createElement(Code, { size: 40, className: "text-blue-500" }),
    category: 'Web Development',
    difficulty: 'Intermediate',
    duration: '6 Weeks',
    isFree: true,
    topics: createCurriculum('web-dev'),
  },
  {
    id: 'data-science-pro',
    title: 'Data Science 101',
    description: 'The complete guide to data analysis and visualization.',
    icon: React.createElement(Database, { size: 40, className: "text-green-500" }),
    category: 'Data Science',
    difficulty: 'Beginner',
    duration: '3 Weeks',
    isFree: true,
    topics: createCurriculum('data-sci'),
  },
  {
    id: 'cloud-aws',
    title: 'Cloud Architect: AWS',
    description: 'Master cloud infrastructure. (First 2 modules FREE)',
    icon: React.createElement(Cloud, { size: 40, className: "text-cyan-400" }),
    category: 'Cloud Computing',
    difficulty: 'Advanced',
    duration: '5 Weeks',
    isFree: false,
    price: 1500,
    topics: createCurriculum('cloud-aws'),
  },
  {
    id: 'cyber-defense',
    title: 'Cybersecurity Defense',
    description: 'Protect networks and systems from malicious attacks.',
    icon: React.createElement(Shield, { size: 40, className: "text-red-500" }),
    category: 'Cybersecurity',
    difficulty: 'Intermediate',
    duration: '4 Weeks',
    isFree: true,
    topics: createCurriculum('cyber'),
  },
  {
    id: 'mobile-flutter',
    title: 'Mobile Apps with Flutter',
    description: 'Build native apps from one codebase. (First 2 modules FREE)',
    icon: React.createElement(Smartphone, { size: 40, className: "text-blue-400" }),
    category: 'Mobile App Development',
    difficulty: 'Beginner',
    duration: '4 Weeks',
    isFree: false,
    price: 1200,
    topics: createCurriculum('mobile'),
  },
  {
    id: 'bi-power-bi',
    title: 'Power BI Mastery',
    description: 'Transform raw data into beautiful insights.',
    icon: React.createElement(BarChart, { size: 40, className: "text-yellow-500" }),
    category: 'Data Analytics & BI',
    difficulty: 'Intermediate',
    duration: '3 Weeks',
    isFree: true,
    topics: createCurriculum('bi'),
  },
  {
    id: 'devops-cicd',
    title: 'CI/CD & Kubernetes',
    description: 'Master the tools of modern automation. (Premium Content)',
    icon: React.createElement(Settings, { size: 40, className: "text-slate-400" }),
    category: 'DevOps & CI/CD',
    difficulty: 'Advanced',
    duration: '5 Weeks',
    isFree: false,
    price: 2500,
    topics: createCurriculum('devops'),
  },
  {
    id: 'robotics-iot',
    title: 'Robotics & Smart Systems',
    description: 'Build hardware and intelligent software.',
    icon: React.createElement(Cpu, { size: 40, className: "text-purple-500" }),
    category: 'Robotics & IoT',
    difficulty: 'Advanced',
    duration: '8 Weeks',
    isFree: true,
    topics: createCurriculum('robot'),
  },
  {
    id: 'web3-solidity',
    title: 'Blockchain & Solidity',
    description: 'Enter the world of smart contracts. (First 2 modules FREE)',
    icon: React.createElement(Link, { size: 40, className: "text-orange-400" }),
    category: 'Blockchain & Web3',
    difficulty: 'Intermediate',
    duration: '4 Weeks',
    isFree: false,
    price: 2000,
    topics: createCurriculum('blockchain'),
  },
  {
    id: 'software-eng',
    title: 'Mastering Software Design',
    description: 'Learn patterns, architecture, and clean code.',
    icon: React.createElement(Terminal, { size: 40, className: "text-pink-500" }),
    category: 'Software Engineering',
    difficulty: 'Intermediate',
    duration: '4 Weeks',
    isFree: true,
    topics: createCurriculum('soft-eng'),
  }
];

export const MOCK_QUIZZES_BY_CATEGORY: Record<string, QuizQuestion[]> = {
  'AI / Machine Learning': [
    { id: 1, question: "Which algorithm is commonly used for image classification?", options: ["Linear Regression", "Convolutional Neural Networks", "K-Means Clustering", "A* Search"], answer: "Convolutional Neural Networks", explanation: "CNNs are specifically designed to process pixel data and identify spatial patterns in images." },
    { id: 2, question: "What is 'Overfitting' in Machine Learning?", options: ["Model is too simple", "Model learns noise as patterns", "Model is not trained enough", "Data is too clean"], answer: "Model learns noise as patterns", explanation: "Overfitting occurs when a model is so complex that it starts memorizing the training data, including noise, rather than generalizing patterns." },
    { id: 3, question: "Which language is most used for AI?", options: ["C++", "Python", "Java", "Ruby"], answer: "Python", explanation: "Python is favored due to its extensive ecosystem of AI libraries like PyTorch, TensorFlow, and Scikit-learn." },
    { id: 4, question: "What is the purpose of an Activation Function?", options: ["To speed up training", "To introduce non-linearity", "To store data", "To define the goal"], answer: "To introduce non-linearity", explanation: "Activation functions like ReLU or Sigmoid allow neural networks to learn complex, non-linear relationships in data." },
    { id: 5, question: "What does 'NLP' stand for?", options: ["Natural Learning Process", "Native Language Processing", "Natural Language Processing", "Neural Logic Path"], answer: "Natural Language Processing", explanation: "NLP is the field of AI focused on the interaction between computers and human language." }
  ],
  'Web Development': [
    { id: 6, question: "What does HTML stand for?", options: ["Hyperlinks and Text Markup Language", "Hyper Text Markup Language", "Home Tool Markup Language", "Hyper Text Main Language"], answer: "Hyper Text Markup Language", explanation: "HTML is the standard markup language for creating web pages." },
    { id: 7, question: "Which hook is used to handle side effects in React?", options: ["useState", "useEffect", "useContext", "useReducer"], answer: "useEffect", explanation: "useEffect allows you to perform side effects in functional components, such as data fetching or subscriptions." },
    { id: 8, question: "What is the 'Virtual DOM'?", options: ["A direct copy of the browser DOM", "A lightweight JavaScript representation of the DOM", "A browser feature for faster loading", "A server-side rendering technique"], answer: "A lightweight JavaScript representation of the DOM", explanation: "React uses the Virtual DOM to efficiently determine which parts of the real DOM need to be updated." },
    { id: 9, question: "Which CSS property is used to change the text color?", options: ["text-color", "color", "fg-color", "font-color"], answer: "color", explanation: "The 'color' property sets the color of text in CSS." },
    { id: 10, question: "What does 'API' stand for?", options: ["Advanced Program Interface", "Application Programming Interface", "Automated Peripheral Integration", "Applied Protocol Index"], answer: "Application Programming Interface", explanation: "An API is a set of rules that allow different software applications to communicate with each other." }
  ],
  'Data Science': [
    { id: 11, question: "What is the primary library for data manipulation in Python?", options: ["NumPy", "Pandas", "Matplotlib", "Seaborn"], answer: "Pandas", explanation: "Pandas provides high-performance, easy-to-use data structures like DataFrames for data analysis." },
    { id: 12, question: "What is a 'Box Plot' used for?", options: ["Showing correlation", "Visualizing data distribution and outliers", "Displaying time series", "Comparing frequencies"], answer: "Visualizing data distribution and outliers", explanation: "Box plots summarize data through five numbers: minimum, first quartile, median, third quartile, and maximum." },
    { id: 13, question: "What is 'Data Cleaning'?", options: ["Deleting all data", "Fixing errors and inconsistencies in raw data", "Moving data to a cloud server", "Encrypting sensitive data"], answer: "Fixing errors and inconsistencies in raw data", explanation: "Data cleaning (scrubbing) ensures the quality and accuracy of the data before analysis." },
    { id: 14, question: "Which type of learning uses labeled data?", options: ["Unsupervised Learning", "Supervised Learning", "Reinforcement Learning", "Clustering"], answer: "Supervised Learning", explanation: "Supervised learning algorithms are trained using datasets that include both inputs and the correct desired outputs (labels)." },
    { id: 15, question: "What is 'R-squared'?", options: ["The root of the data", "A measure of how well a regression model fits data", "The square of the residuals", "A type of dataset"], answer: "A measure of how well a regression model fits data", explanation: "R-squared represents the proportion of variance for a dependent variable that's explained by an independent variable in a regression model." }
  ]
};

export const INITIAL_USER: UserType = {
  name: 'Learner',
  email: 'learner@learnstackhub.ai',
  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Learn',
  role: 'Tech Enthusiast',
  level: 'Novice',
  joinDate: 'Feb 2024',
  skills: [
    { name: 'Foundations', progress: 10 }
  ],
  analytics: {
    studyTimeThisWeek: '12 Hours',
    bestStudyDay: 'Wednesday',
    consistencyScore: 85
  }
};

export const MOCK_USERS_DATA: AdminViewUser[] = [
  {
    id: 1,
    name: 'Learner',
    email: 'learner@learnstackhub.ai',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Learn',
    enrolledCourses: [
      { courseId: 'intro-ai-ml', progress: 45 },
    ],
  }
];
