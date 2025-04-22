/**
 * 실습 환경 스토어
 */
import { create } from 'zustand';
import {
  Stack,
  StackOutput,
  StackStatusSchema,
} from '../interfaces/stack.types';

interface StackState extends Stack {
  practiceId : string;
  setStack: (key: StackStateKeys, value: string | StackOutput[]) => void;
  clearStack: () => void;
}

const initialState = {
  practiceId: '',
  stackName: '',
  status: StackStatusSchema.Values.DOES_NOT_EXIST,
  statusReason: '',
  outputs: [],
};

type StackStateKeys = keyof typeof initialState;

const useStackStore = create<StackState>((set, get) => ({
  ...initialState,
  setStack: (key, value) => set({ [key]: value }),
  clearStack: () => {
    set(initialState);
  },
}));

export default useStackStore;
