export interface ShowResponseArrayType {
  question: string;
  answer: string;
}

export type ShowResponseArray = ShowResponseArrayType[] | null;
export type GlobalResponsesType = ShowResponseArrayType[][] | null;

export interface InitiapStateProps {
  prompt: string;
  globalResponses: GlobalResponsesType;
  indexOfChatExibition: number;
}
