import { ApolloError, useLazyQuery, useMutation, useSubscription } from "@apollo/client";
import { PaperAirplaneIcon } from "@heroicons/react/outline";
import classNames from "classnames";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { pushAlert } from "../actions/AlertsActions";
import { updateMessages } from "../actions/MessagesActions";
import Config from "../constants/Config";
import SEND_MESSAGE from "../graphql/mutations/sendMessage";
import FETCH_MESSAGES from "../graphql/queries/fetchMessages";
import MESSAGE_SENT from "../graphql/subscriptions/messageSent";
import { UserType } from "../interfaces/UserInterface";
import { getChatMessages } from "../selectors/MessageSelector";
import { Message } from "../types/MessageType";
import Button from "./Button";
import Input from "./Input";

interface ChatProps {
  chatUser: UserType | null,
  userId: number
}

const chatUserMesssage = classNames(
  'bg-gray-200',
);

const userMessage = classNames(
  'bg-primary',
  'justify-items-end'
);

const Chat: React.FC<ChatProps> = ({
  chatUser,
  userId
}) => {
  const { t } = useTranslation();
  const [messageValue, setMessageValue] = useState<string>('');
  const dispatch = useDispatch();
  const { data: newMessages, error: newMessagesError } = useSubscription(MESSAGE_SENT, {
    variables: {
      firstUser: parseInt(userId!.toString()),
      secondUser: parseInt(chatUser!.id.toString())
    }
  });
  const [ getMessages, { data: messagesData, loading: messagesLoading, error: messageError } ] = useLazyQuery(FETCH_MESSAGES, { errorPolicy: 'all' });
  const [ sendMessage, { data: sentData, error: sentError } ] = useMutation(SEND_MESSAGE, { errorPolicy: 'all' });
  const messages = useSelector<Message[], Message[]>(state => getChatMessages(state));

  useEffect(() => {
    if (chatUser) getMessages({
      variables: {
        firstUser: parseInt(userId!.toString()),
        secondUser: parseInt(chatUser!.id.toString())
      }
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chatUser]);

  useEffect(() => {
    if (messagesData?.getMessages) dispatch(updateMessages(messagesData.getMessages));
    if (newMessages?.messageSent) dispatch(updateMessages(newMessages?.messageSent));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messagesData, newMessages]);

  const handleError = (error: ApolloError | undefined) => {
    if(error) {
      dispatch(pushAlert({
        type: Config.ERROR_ALERT,
        message: new ApolloError(error).message
      }));
      console.log(JSON.stringify(error, null, 2));
    }
  }

  useEffect(() => {
    handleError(messageError);
    handleError(sentError);
    handleError(newMessagesError);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messageError, sentError, newMessagesError]);

  const handleKeyDown = (e: any) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  }

  const handleSendMessage = () => {
    sendMessage({
      variables: {
        toId: parseInt(chatUser!.id.toString()),
        fromId: parseInt(userId!.toString()),
        content: messageValue
      }
    });
    setMessageValue('');
  }

  return (
    <div className='w-full h-full flex flex-col justify-end max-w-6xl relative'>
      <div className='max-h-192 max-w-full px-6 flex flex-col overflow-y-auto'>
        {messages?.map((message: Message, index: number) =>               
          <div className={`w-full flex text-white ${message.fromId === userId ? 'justify-end pl-6' : 'pr-6'}`}>
            <div className='max-w-1/2'>
              <div className={`text-sm text-gray-300 flex ${message.fromId === userId ? 'justify-end' : ''}`}>
                {index === 0 && (message.fromId === userId ? t('contacts.you') : chatUser?.login)}
                {!!index && message.fromId !== messages[index - 1].fromId ? (message.fromId === userId ? t('contacts.you') : chatUser?.login) : null}
              </div>
              <div className={`rounded-xl break-words px-3 py-1 mt-0.5 text-xl  ${message.fromId === userId ? 'bg-primary' : 'bg-gray-400'}`}>
                {message.content}
              </div>
            </div>
          </div>
        )}
      </div>
      <div className={`p-6 flex ${!chatUser && 'opacity-20 pointer-events-none'}`}>
        <Input 
          type='text'
          value={messageValue}
          onChange={(e) => setMessageValue(e.target.value)}
          willDisplayError={false}
          className='border-opacity-100'
          onKeyDown={(e) => handleKeyDown(e)}
        />
        <Button 
          type='transparent'
          onClick={() => null}
          children={<PaperAirplaneIcon className='w-7 h-7 transform -rotate-90 text-primary' />}
          className='ml-4'
        />
      </div>
    </div>
  );
}

export default Chat;
