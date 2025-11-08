import { create } from 'zustand';

interface Message {
  text: string;
  isUser: boolean;
}

interface AIFeedbackState {
  messages: Message[];
  isTyping: boolean;
  addMessage: (message: Message) => void;
  setTyping: (isTyping: boolean) => void;
}

export const useAIFeedbackStore = create<AIFeedbackState>((set) => ({
  messages: [],
  isTyping: false,
  addMessage: (message) =>
    set((state) => ({ messages: [...state.messages, message] })),
  setTyping: (isTyping) => set({ isTyping }),
}));
