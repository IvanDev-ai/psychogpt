
export interface Message {
    id: number;
    message: string;
  }
  
  export interface Chat {
    id: number;
    name: string;
    message: Message[];
  }
  