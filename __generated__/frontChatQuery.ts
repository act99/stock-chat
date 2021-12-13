export interface frontChatQuery_Chat {
  __typename: "Chat";
  id: number;
  createdAt: Date | undefined;
  updatedAt: Date | undefined;
  user: string;
  text: string;
}

export interface frontChatQuery {
  chats: frontChatQuery_Chat[];
}

export interface SubChats {
  subscriptionData: { data: { subChat: frontChatQuery_Chat } };
}
