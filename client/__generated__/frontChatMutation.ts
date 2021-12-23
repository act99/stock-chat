export interface CreateChatDto {
  user: string;
  text: string;
}

export interface frontCreateChatMutation_createChat {
  __typename: "CreateChatDtoOutput";
  ok: boolean;
  error: string | null;
}

export interface frontCreateChatMutation {
  createChat: frontCreateChatMutation_createChat;
}

export interface frontCreateChatMutationVariables {
  createChatDto: CreateChatDto;
}
