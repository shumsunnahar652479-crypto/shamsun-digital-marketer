import React, { createContext, useContext, useState, useEffect } from 'react';
import { SHAMSUN_DATA, Project, ServiceItem } from '../data/portfolioData';
import { db, auth } from '../firebase';
import { doc, getDoc, setDoc, onSnapshot } from 'firebase/firestore';

export interface StatItem {
  value: string;
  label: string;
}

export interface ToolItem {
  name: string;
  icon: string;
  category: string;
}

export interface ProcessItem {
  step: string;
  title: string;
  desc: string;
}

export interface PortfolioState {
  personal: typeof SHAMSUN_DATA.personal;
  stats: StatItem[];
  services: ServiceItem[];
  projects: Project[];
  toolkit: ToolItem[];
  workProcess: ProcessItem[];
}

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  };
}

export function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
      providerInfo: auth.currentUser?.providerData?.map(provider => ({
        providerId: provider.providerId,
        email: provider.email,
      })) || []
    },
    operationType,
    path
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

interface PortfolioContextType {
  data: PortfolioState;
  isAdminOpen: boolean;
  isFirebaseConnected: boolean;
  setIsAdminOpen: (open: boolean) => void;
  updatePersonal: (fields: Partial<typeof SHAMSUN_DATA.personal>) => void;
  updateStats: (stats: StatItem[]) => void;
  addService: (service: ServiceItem) => void;
  updateService: (index: number, service: ServiceItem) => void;
  deleteService: (index: number) => void;
  addProject: (project: Project) => void;
  updateProject: (index: number, project: Project) => void;
  deleteProject: (index: number) => void;
  addTool: (tool: ToolItem) => void;
  deleteTool: (index: number) => void;
  updateProcessSteps: (steps: ProcessItem[]) => void;
  resetToDefault: () => void;
  importConfig: (jsonData: string) => boolean;
}

const STORAGE_KEY = 'shamsun_portfolio_custom_data_v2';
const FIRESTORE_DOC_PATH = 'portfolio/settings';

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

export const PortfolioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [data, setData] = useState<PortfolioState>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return {
          personal: { ...SHAMSUN_DATA.personal, ...parsed.personal },
          stats: parsed.stats || SHAMSUN_DATA.stats,
          services: parsed.services || SHAMSUN_DATA.services,
          projects: parsed.projects || SHAMSUN_DATA.projects,
          toolkit: parsed.toolkit || SHAMSUN_DATA.toolkit,
          workProcess: parsed.workProcess || SHAMSUN_DATA.workProcess,
        };
      }
    } catch (e) {
      console.error('Failed to load saved portfolio data', e);
    }
    return {
      personal: SHAMSUN_DATA.personal,
      stats: SHAMSUN_DATA.stats,
      services: SHAMSUN_DATA.services,
      projects: SHAMSUN_DATA.projects,
      toolkit: SHAMSUN_DATA.toolkit,
      workProcess: SHAMSUN_DATA.workProcess,
    };
  });

  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isFirebaseConnected, setIsFirebaseConnected] = useState(false);

  // Sync with Firestore in real-time
  useEffect(() => {
    const docRef = doc(db, 'portfolio', 'settings');

    // Subscribe to Firestore updates
    const unsubscribe = onSnapshot(
      docRef,
      (snapshot) => {
        setIsFirebaseConnected(true);
        if (snapshot.exists()) {
          const remoteData = snapshot.data();
          if (remoteData) {
            setData((prev) => ({
              personal: { ...prev.personal, ...(remoteData.personal || {}) },
              stats: remoteData.stats || prev.stats,
              services: remoteData.services || prev.services,
              projects: remoteData.projects || prev.projects,
              toolkit: remoteData.toolkit || prev.toolkit,
              workProcess: remoteData.workProcess || prev.workProcess,
            }));
          }
        } else {
          // Document does not exist yet in Firestore, seed it with initial data
          setDoc(docRef, {
            personal: SHAMSUN_DATA.personal,
            stats: SHAMSUN_DATA.stats,
            services: SHAMSUN_DATA.services,
            projects: SHAMSUN_DATA.projects,
            toolkit: SHAMSUN_DATA.toolkit,
            workProcess: SHAMSUN_DATA.workProcess,
            updatedAt: new Date().toISOString(),
          }).catch((err) => {
            console.warn('Initial Firestore seed skipped', err);
          });
        }
      },
      (error) => {
        console.warn('Firestore snapshot listener note:', error.message);
      }
    );

    return () => unsubscribe();
  }, []);

  // Save changes to Firestore and localStorage
  const persistData = async (newData: PortfolioState) => {
    setData(newData);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newData));
    } catch (e) {
      console.error('Local storage save error', e);
    }

    try {
      const docRef = doc(db, 'portfolio', 'settings');
      await setDoc(docRef, {
        personal: newData.personal,
        stats: newData.stats,
        services: newData.services,
        projects: newData.projects,
        toolkit: newData.toolkit,
        workProcess: newData.workProcess,
        updatedAt: new Date().toISOString(),
      });
      setIsFirebaseConnected(true);
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, FIRESTORE_DOC_PATH);
    }
  };

  const updatePersonal = (fields: Partial<typeof SHAMSUN_DATA.personal>) => {
    const updated = {
      ...data,
      personal: { ...data.personal, ...fields },
    };
    persistData(updated);
  };

  const updateStats = (stats: StatItem[]) => {
    const updated = { ...data, stats };
    persistData(updated);
  };

  const addService = (service: ServiceItem) => {
    const updated = {
      ...data,
      services: [...data.services, service],
    };
    persistData(updated);
  };

  const updateService = (index: number, service: ServiceItem) => {
    const updatedServices = [...data.services];
    updatedServices[index] = service;
    const updated = { ...data, services: updatedServices };
    persistData(updated);
  };

  const deleteService = (index: number) => {
    const updated = {
      ...data,
      services: data.services.filter((_, i) => i !== index),
    };
    persistData(updated);
  };

  const addProject = (project: Project) => {
    const updated = {
      ...data,
      projects: [project, ...data.projects],
    };
    persistData(updated);
  };

  const updateProject = (index: number, project: Project) => {
    const updatedProjects = [...data.projects];
    updatedProjects[index] = project;
    const updated = { ...data, projects: updatedProjects };
    persistData(updated);
  };

  const deleteProject = (index: number) => {
    const updated = {
      ...data,
      projects: data.projects.filter((_, i) => i !== index),
    };
    persistData(updated);
  };

  const addTool = (tool: ToolItem) => {
    const updated = {
      ...data,
      toolkit: [...data.toolkit, tool],
    };
    persistData(updated);
  };

  const deleteTool = (index: number) => {
    const updated = {
      ...data,
      toolkit: data.toolkit.filter((_, i) => i !== index),
    };
    persistData(updated);
  };

  const updateProcessSteps = (steps: ProcessItem[]) => {
    const updated = {
      ...data,
      workProcess: steps,
    };
    persistData(updated);
  };

  const resetToDefault = () => {
    if (window.confirm('Are you sure you want to reset all website text, images, and services back to original defaults?')) {
      localStorage.removeItem(STORAGE_KEY);
      const defaultData = {
        personal: SHAMSUN_DATA.personal,
        stats: SHAMSUN_DATA.stats,
        services: SHAMSUN_DATA.services,
        projects: SHAMSUN_DATA.projects,
        toolkit: SHAMSUN_DATA.toolkit,
        workProcess: SHAMSUN_DATA.workProcess,
      };
      persistData(defaultData);
    }
  };

  const importConfig = (jsonData: string) => {
    try {
      const parsed = JSON.parse(jsonData);
      if (parsed.personal) {
        const imported = {
          personal: { ...SHAMSUN_DATA.personal, ...parsed.personal },
          stats: parsed.stats || SHAMSUN_DATA.stats,
          services: parsed.services || SHAMSUN_DATA.services,
          projects: parsed.projects || SHAMSUN_DATA.projects,
          toolkit: parsed.toolkit || SHAMSUN_DATA.toolkit,
          workProcess: parsed.workProcess || SHAMSUN_DATA.workProcess,
        };
        persistData(imported);
        return true;
      }
    } catch (e) {
      console.error('Import failed', e);
    }
    return false;
  };

  return (
    <PortfolioContext.Provider
      value={{
        data,
        isAdminOpen,
        isFirebaseConnected,
        setIsAdminOpen,
        updatePersonal,
        updateStats,
        addService,
        updateService,
        deleteService,
        addProject,
        updateProject,
        deleteProject,
        addTool,
        deleteTool,
        updateProcessSteps,
        resetToDefault,
        importConfig,
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
};
