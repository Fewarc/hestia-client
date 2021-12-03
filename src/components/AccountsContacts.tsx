import { ApolloError, useLazyQuery, useMutation, useQuery } from "@apollo/client";
import { BackspaceIcon, MinusCircleIcon, PlusCircleIcon } from "@heroicons/react/outline";
import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { pushAlert } from "../actions/AlertsActions";
import Config from "../constants/Config";
import DELETE_NOTIFICATION from "../graphql/mutations/deleteNotification";
import REMOVE_CONTACT from "../graphql/mutations/removeContact";
import SEND_INVITE from "../graphql/mutations/sendContactInvite";
import FIND_USERS from "../graphql/queries/findUsers";
import GET_CONTACTS from "../graphql/queries/getContacts";
import GET_PENDING_INVITES from "../graphql/queries/getPendingInvites";
import { UserType } from "../interfaces/UserInterface";
import Button from "./Button";
import Input from "./Input";
import Spinner from "./Spinner";

interface ContactsInterface {
  userId: number,
  username: string
}

const AccountContacts: React.FC<ContactsInterface> = ({
  userId,
  username
}) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const node = useRef<HTMLHeadingElement>(null);
  const [searchValue, setSearchValue] = useState<string>('');
  const [searchOpen, setSearchOpen] = useState<boolean>(false);
  const [userDidType, setUserDidType] = useState<boolean>(false);
  const [chatUser, setChatUser] = useState<UserType | null>(null);
  const [ findUsers, { data: searchData, loading: searchLoading, error: searchError } ] = useLazyQuery(FIND_USERS, { errorPolicy: 'all' });
  const [ sendInvite, { data: inviteData, error: inviteError } ] = useMutation(SEND_INVITE, { errorPolicy: 'all' });
  const [ removeContact, { data: removeData, error: removeError, loading: removeLoading } ] = useMutation(REMOVE_CONTACT, { errorPolicy: 'all' });
  const [ deleteNotification, { error: deleteError, data: deleteData } ] = useMutation(DELETE_NOTIFICATION, { errorPolicy: 'all' });
  const { data: pendingData, refetch: refetchPending } = useQuery(GET_PENDING_INVITES, {
    variables: { userId: userId },
    errorPolicy: 'all'
  });
  const { data: contactsData, loading: contactsLoading, error: contactsError, refetch: refetchContacts } = useQuery(GET_CONTACTS, {
    variables: { userId: userId },
    errorPolicy: 'all'
  });

  const handleClick = (e: any): void => {
    if(!node.current) return;
    if(!node.current.contains(e.target)) {
      setSearchOpen(false);
      setUserDidType(false);
    };
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClick);

    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    refetchContacts();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [removeData]);

  useEffect(() => {
    refetchPending();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deleteData, inviteData]);

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
    handleError(searchError);
    handleError(inviteError);
    handleError(deleteError);
    handleError(contactsError);
    handleError(searchError);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchError, inviteError, deleteError, contactsError]);


  useEffect(() => {
    if (searchValue.length && !searchLoading) {
      setUserDidType(true);
      findUsers({
        variables: {
          searchValue: searchValue,
          userId: userId
        }
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchValue, searchLoading]);

  return (
    <div className='w-full h-full p-10 pt-24'>
      <div className='w-full h-full rounded-md shadow-md flex'>
        <div className='flex-grow'>
          {/* CHAT HERE */}
          {`chat with: ${chatUser?.login}`}
        </div>
        <div className='w-96 rounded-r-md border-l border-gray-100 p-4 flex flex-col'>
          <div className='text-2xl font-extralight px-1'>
            <div className='flex items-center'>
              <div>{t('contacts.your')}</div>
              {contactsLoading && <Spinner dimensionsClass='w-5 h-5' borderClass='border' className='ml-2'/>}
            </div>
          </div>
          <div className='flex-grow flex flex-col items-start'>
            {contactsData?.getContacts?.map((contact: UserType) => 
              <Button 
                type='link'
                onClick={() => setChatUser(contact)}
                children={
                  <div className='rounded-md hover:bg-gray-50 p-2 flex items-center justify-between group'> 
                    @{contact.login}
                    <Button 
                      type='transparent'
                      onClick={() => removeContact({
                        variables: {
                          userId: userId,
                          contactId: contact.id
                        }
                      })}
                      children={<MinusCircleIcon className='w-5 h-5' />}
                      className='text-primary invisible group-hover:visible'
                    />
                  </div>
                }
                className='w-full text-left'
              />
            )}
          </div>
          <div 
            className={`transition duration-500 ease-in-out flex flex-col ${((searchOpen && !!searchValue.length) || userDidType) && 'flex-grosdw'}`} // TODO: delete(?)
            ref={node} 
            onClick={() => setSearchOpen(true)}
          >
            <div className='flex items-center text-sm mb-0.5'>
              {t('contacts.search_label')}
              {searchLoading && <Spinner dimensionsClass='w-3 h-3' borderClass='border' className='ml-2'/>}
            </div>
            <div className='flex items-center mb-2'>
              <Input
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                type='text'
                placeholder={t('contacts.search_placeholder')}
                willDisplayError={false}
                className='border-opacity-100sad'
              />
              <Button 
                type='transparent'
                onClick={() => setSearchValue('')}
                children={<BackspaceIcon className='w-8 h-8' />}
                className={`text-primary ml-2 opacity-20 ${searchValue.length && 'opacity-100'}`}
              />
            </div>
            {searchData && !!searchValue.length && 
              <div className='h-64 flex flex-col overflow-y-auto'>
                {searchData.findUsers?.map((user: any, index: number) => 
                  <div className={`flex items-center justify-between text-xl py-2 ${index && 'border-t border-gray-100'}`}>
                    <div>@{user.login}</div>
                    <div>
                      {pendingData?.getPendingInvites?.some((data: any) => data.targetId === parseInt(user.id)) ?
                      <Button 
                        type='transparent'
                        onClick={() => {
                          const invite = pendingData.getPendingInvites.find((data: any) => data.targetId === parseInt(user.id));
                          deleteNotification({variables: {
                            deleteNotificationId: parseInt(invite.id),
                            content: invite.content,
                            userId: invite.senderId
                          }});
                        }}
                        children={
                          <div className='text-primary text-xs mr-4 w-16 rounded-full border-2 border-primary font-medium'>
                            {t('contacts.cancel_invitation')}
                          </div>
                        }
                      /> :
                      <Button 
                        type='transparent'
                        onClick={() => {
                          sendInvite({
                          variables: {
                            senderId: userId,
                            targetId: parseInt(user.id),
                            inviteContent: `You have got new contacts invite from @${username}!`
                          }});
                        }}
                        children={<PlusCircleIcon className='w-5 h-5 mr-4'/>}
                        className='text-primary'
                      />}
                    </div>
                  </div>
                )}
              </div>
            }
          </div>
        </div>
      </div>
    </div>
  );
}

export default AccountContacts;