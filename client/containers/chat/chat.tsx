import React, { useEffect, useMemo, useState } from "react";

import {
  resetCaches,
  useMutation,
  useQuery,
  useSubscription,
} from "@apollo/client";
import { gql } from "@apollo/client";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  frontCreateChatMutation,
  frontCreateChatMutationVariables,
} from "../../__generated__/frontChatMutation";
import { frontChatQuery } from "../../__generated__/frontChatQuery";
import { client } from "../../apollo";

// type Props = {
//   width: number | undefined;
//   height: number | undefined;
// };

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

export const getChatProps = async () => {
  const { data } = await client.query({
    query: gql`
      query frontChatQuery {
        chats {
          id
          createdAt
          updatedAt
          user
          text
        }
      }
    `,
  });
  return {
    props: {
      chats: data.chats,
    },
  };
};

const GET_CHAT = gql`
  query frontChatQuery {
    chats {
      id
      createdAt
      updatedAt
      user
      text
    }
  }
`;

const Chat: React.FC = () => {
  const [nickname, setNickname] = useState("따끈한 메밀호빵");
  const { data } = useQuery<frontChatQuery>(GET_CHAT, {
    variables: {},
    pollInterval: 500,
  });

  const { register, handleSubmit, getValues, formState, reset } =
    useForm<Inputs>({
      defaultValues: { user: nickname },
    });
  const onCompleted = (data: frontCreateChatMutation) => {
    const {
      createChat: { ok },
    } = data;
    if (ok) {
      console.log(data);
      console.log("Okay! Chat!");
    }
  };

  const [createChatMutation, { data: createChatMutationResult, loading }] =
    useMutation<frontCreateChatMutation, frontCreateChatMutationVariables>(
      CREATE_CHAT,
      {
        onCompleted,
        // refetchQueries: [
        //   {
        //     query: GET_CHAT,
        //   },
        // ],
      }
    );

  const onSubmit: SubmitHandler<Inputs> = () => {
    if (!loading) {
      const { user, text } = getValues();
      createChatMutation({ variables: { createChatDto: { user, text } } });
      setNickname(user);
    }
  };
  useEffect(() => {
    if (formState.isSubmitSuccessful) {
      reset({ user: nickname, text: "" });
    }
  }, [formState, reset]);

  return (
    <div
      style={{
        width: 300,
        height: 800,
      }}
      className=" bg-black flex flex-col justify-center items-center"
    >
      <div className=" w-72 h-5/6  bg-chartGray-default overflow-y-scroll">
        (
        <ul>
          {data?.chats.map((item: any, index: number) => {
            return (
              <li key={index} className="flex flex-row">
                <h3 className=" mx-2 text-white">{item.user}: </h3>
                <h3 className=" text-white">{item.text}</h3>
              </li>
            );
          })}
          <li></li>
        </ul>
        )
      </div>
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

export default Chat;
