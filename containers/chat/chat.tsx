import React, { useEffect, useState } from "react";

import { useMutation, useSubscription } from "@apollo/client";
import { gql } from "@apollo/client";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  frontCreateChatMutation,
  frontCreateChatMutationVariables,
} from "../../__generated__/frontChatMutation";

type Props = {
  width: number | undefined;
  height: number | undefined;
};

type Inputs = {
  user: string;
  text: string;
};

const CREATE_CHAT = gql`
  mutation frontCreateChatMutation($createChatDto: CreateChatDto!) {
    createChat(input: $createChatDto) {
      ok
      error
    }
  }
`;

const GET_CHAT = gql`
  query {
    chat {
      id
      user
      text
      createdAt
      updatedAt
    }
  }
`;

const Chat: React.FC<Props> = ({ width, height }) => {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<Inputs>();
  const onCompleted = (data: frontCreateChatMutation) => {
    const {
      createChat: { ok },
    } = data;
    if (ok) {
      console.log("Okay! Chat!");
    }
  };
  const [createChatMutation, { data: createChatMutationResult, loading }] =
    useMutation<frontCreateChatMutation, frontCreateChatMutationVariables>(
      CREATE_CHAT,
      { onCompleted }
    );

  const onSubmit: SubmitHandler<Inputs> = () => {
    if (!loading) {
      const { user, text } = getValues();
      createChatMutation({ variables: { createChatDto: { user, text } } });
    }
  };

  return (
    <div
      style={{
        width: 300,
        height: height == undefined ? undefined : height * 0.9,
      }}
      className=" bg-black flex flex-col justify-center items-center"
    >
      <div className=" w-72 h-5/6  bg-chartGray-default"></div>
      <form className="flex flex-col my-5" onSubmit={handleSubmit(onSubmit)}>
        <input
          className=" bg-gray-300 mb-2"
          {...register("user", { required: true })}
        ></input>
        <input
          className=" bg-gray-300 mb-2"
          {...register("text", { required: true })}
        ></input>
        <button className=" bg-gray-400" type="submit">
          {loading ? "로딩중..." : "전송"}
        </button>
      </form>
    </div>
  );
};

// const Messages = (chats: Chats) => {
//   return <div></div>;
// };

export default Chat;
