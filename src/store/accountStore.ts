import { create } from 'zustand';
import { AccountInfo, AccountPersona, ColumnDirection, TargetAudience } from '../types';
import { mockAccountInfo } from '../data/accountMock';
import { storage, STORAGE_KEYS } from '../utils/storage';

interface AccountState {
  accountInfo: AccountInfo;
  updatePersona: (persona: AccountPersona) => void;
  addColumn: (column: ColumnDirection) => void;
  updateColumn: (column: ColumnDirection) => void;
  deleteColumn: (columnId: string) => void;
  updateAudience: (audience: TargetAudience) => void;
  refreshAccountInfo: () => void;
}

const loadAccountInfo = (): AccountInfo => {
  return storage.getItem<AccountInfo>(STORAGE_KEYS.ACCOUNT_INFO, mockAccountInfo);
};

const saveAccountInfo = (info: AccountInfo) => {
  storage.setItem(STORAGE_KEYS.ACCOUNT_INFO, info);
};

export const useAccountStore = create<AccountState>((set, get) => ({
  accountInfo: loadAccountInfo(),
  
  updatePersona: (persona) => {
    const newState = {
      accountInfo: {
        ...get().accountInfo,
        persona,
        updatedAt: new Date().toISOString().split('T')[0]
      }
    };
    set(newState);
    saveAccountInfo(newState.accountInfo);
  },
  
  addColumn: (column) => {
    const newState = {
      accountInfo: {
        ...get().accountInfo,
        columns: [...get().accountInfo.columns, column],
        updatedAt: new Date().toISOString().split('T')[0]
      }
    };
    set(newState);
    saveAccountInfo(newState.accountInfo);
  },
  
  updateColumn: (column) => {
    const newState = {
      accountInfo: {
        ...get().accountInfo,
        columns: get().accountInfo.columns.map((c) =>
          c.id === column.id ? column : c
        ),
        updatedAt: new Date().toISOString().split('T')[0]
      }
    };
    set(newState);
    saveAccountInfo(newState.accountInfo);
  },
  
  deleteColumn: (columnId) => {
    const newState = {
      accountInfo: {
        ...get().accountInfo,
        columns: get().accountInfo.columns.filter((c) => c.id !== columnId),
        updatedAt: new Date().toISOString().split('T')[0]
      }
    };
    set(newState);
    saveAccountInfo(newState.accountInfo);
  },
  
  updateAudience: (audience) => {
    const newState = {
      accountInfo: {
        ...get().accountInfo,
        audience,
        updatedAt: new Date().toISOString().split('T')[0]
      }
    };
    set(newState);
    saveAccountInfo(newState.accountInfo);
  },
  
  refreshAccountInfo: () => {
    set({ accountInfo: loadAccountInfo() });
  }
}));