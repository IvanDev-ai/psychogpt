
export interface Message {
    id: number;
    message: string;
  }
  
  export interface Chat {
    id: number;
    message: Message[];
  }
  