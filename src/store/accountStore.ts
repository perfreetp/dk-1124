import { create } from 'zustand';
import { AccountInfo, AccountPersona, ColumnDirection, TargetAudience } from '../types';
import { mockAccountInfo } from '../data/accountMock';

interface AccountState {
  accountInfo: AccountInfo;
  updatePersona: (persona: AccountPersona) => void;
  addColumn: (column: ColumnDirection) => void;
  updateColumn: (column: ColumnDirection) => void;
  deleteColumn: (columnId: string) => void;
  updateAudience: (audience: TargetAudience) => void;
}

export const useAccountStore = create<AccountState>((set) => ({
  accountInfo: mockAccountInfo,
  updatePersona: (persona) =>
    set((state) => ({
      accountInfo: {
        ...state.accountInfo,
        persona,
        updatedAt: new Date().toISOString().split('T')[0]
      }
    })),
  addColumn: (column) =>
    set((state) => ({
      accountInfo: {
        ...state.accountInfo,
        columns: [...state.accountInfo.columns, column],
        updatedAt: new Date().toISOString().split('T')[0]
      }
    })),
  updateColumn: (column) =>
    set((state) => ({
      accountInfo: {
        ...state.accountInfo,
        columns: state.accountInfo.columns.map((c) =>
          c.id === column.id ? column : c
        ),
        updatedAt: new Date().toISOString().split('T')[0]
      }
    })),
  deleteColumn: (columnId) =>
    set((state) => ({
      accountInfo: {
        ...state.accountInfo,
        columns: state.accountInfo.columns.filter((c) => c.id !== columnId),
        updatedAt: new Date().toISOString().split('T')[0]
      }
    })),
  updateAudience: (audience) =>
    set((state) => ({
      accountInfo: {
        ...state.accountInfo,
        audience,
        updatedAt: new Date().toISOString().split('T')[0]
      }
    }))
}));