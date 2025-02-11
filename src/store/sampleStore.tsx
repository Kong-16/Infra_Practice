import { create } from 'zustand';

interface SampleState {
  sample: number;
  increase: () => void;
}

const useSampleStore = create<SampleState>((set) => ({
  sample: 0,
  increase: () => set((state) => ({ sample: state.sample + 1 })),
}));

export default useSampleStore;
