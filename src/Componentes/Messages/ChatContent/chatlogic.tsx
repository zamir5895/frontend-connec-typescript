
interface Message {
    mensajeId: string;
    contenido: string;
    fecha: string;
    userId: number;
    fullName: string;
    leido: boolean;
    likeCount: number;
    fechaMensaje: string;
    multimediaUrl: multimediaMensaje[];
  }
interface multimediaMensaje {
    mensajeId: number;
    url: string;
  }
  
  interface User {
    id: number;
    fullName: string;
  }
  
  export const isSameSenderMargin = (
    messages: Message[],
    m: Message,
    i: number,
    userId: number
  ): number | string => {
    if (
      i < messages.length - 1 &&
      messages[i + 1].userId === m.userId &&
      messages[i].userId !== userId
    ) {
      return 33;
    } else if (
      (i < messages.length - 1 &&
        messages[i + 1].userId !== m.userId &&
        messages[i].userId !== userId) ||
      (i === messages.length - 1 && messages[i].userId !== userId)
    ) {
      return 0;
    } else {
      return "auto";
    }
  };
  
  export const isSameSender = (
    messages: Message[],
    m: Message,
    i: number,
    userId: number
  ): boolean => {
    return (
      i < messages.length - 1 &&
      (messages[i + 1].userId !== m.userId ||
        messages[i + 1].userId === undefined) &&
      messages[i].userId !== userId
    );
  };
  
  export const isLastMessage = (
    messages: Message[],
    i: number,
    userId: number
  ): boolean => {
    return (
      i === messages.length - 1 &&
      messages[messages.length - 1].userId !== userId &&
      Boolean(messages[messages.length - 1].userId)
    );
  };
  
  export const isSameUser = (
    messages: Message[],
    m: Message,
    i: number
  ): boolean => {
    return i > 0 && messages[i - 1].userId === m.userId;
  };
  
  export const getSender = (loggedUser: User, users: User[]): string => {
    return users[0]?.id === loggedUser?.id ? users[1].fullName : users[0].fullName;
  };
  
  export const getSenderFull = (loggedUser: User, users: User[]): User => {
    return users[0].id === loggedUser.id ? users[1] : users[0];
  };
  