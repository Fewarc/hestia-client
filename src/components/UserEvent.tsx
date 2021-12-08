/* eslint-disable react-hooks/exhaustive-deps */
import { ApolloError, useLazyQuery, useMutation, useQuery } from "@apollo/client";
import { BackspaceIcon, ChevronDownIcon, PlusCircleIcon, UserAddIcon } from "@heroicons/react/outline";
import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { pushAlert } from "../actions/AlertsActions";
import Config from "../constants/Config";
import DELETE_EVENT from "../graphql/mutations/deleteEvent";
import DELETE_NOTIFICATION from "../graphql/mutations/deleteNotification";
import INVITE_FOR_EVENT from "../graphql/mutations/inviteUsersForEvent";
import LEAVE_EVENT from "../graphql/mutations/leaveEvent";
import FIND_USERS from "../graphql/queries/findUsers";
import GET_PARTICIPANTS from "../graphql/queries/getEventParticipants";
import GET_EVENT_INVITES from "../graphql/queries/getPendingEventInvites";
import { UserType } from "../interfaces/UserInterface";
import { Event } from "../types/EventType";
import Button from "./Button";
import Checkbox from "./Checkbox";
import Input from "./Input";
import Spinner from "./Spinner";

interface EventInterface {
  event: Event,
  userId: string | undefined,
  username: string | undefined,
  onEventsUpdate: () => void
}

const UserEvent: React.FC<EventInterface> = ({
  event,
  userId,
  username,
  onEventsUpdate
}) => {
  const inviteNode = useRef<HTMLHeadingElement>(null);
  const deleteNode = useRef<HTMLHeadingElement>(null);
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [participantsOpen, setParticipantsOpen] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string>('');
  const [ getParticipants, { data, loading, error } ] = useLazyQuery(GET_PARTICIPANTS, { errorPolicy: 'all' });
  const [ findUsers, { data: searchData, loading: searchLoading, error: searchError } ] = useLazyQuery(FIND_USERS, { errorPolicy: 'all' });
  const [ deleteNotification, { error: deleteError, data: deleteData } ] = useMutation(DELETE_NOTIFICATION, { errorPolicy: 'all' });
  const [ inviteForEvent, { data: inviteData, error: inviteError } ] = useMutation(INVITE_FOR_EVENT, { errorPolicy: 'all' });
  const [ leaveEvent, { data: leaveData, error: leaveError } ] = useMutation(LEAVE_EVENT, { errorPolicy: 'all' });
  const [ deleteEvent, { data: deleteEventData, error: deleteEventError } ] = useMutation(DELETE_EVENT, { errorPolicy: 'all' });
  const { data: pendingData, refetch: refetchPending } = useQuery(GET_EVENT_INVITES, {
    variables: { eventId: event.id },
    errorPolicy: 'all'
  });
  const [usersToInvite, setUsersToInvite] = useState<number[]>([]);
  const [inviteModalOpen, setInviteModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const handleClick = (e: any): void => {
    if(!inviteNode.current || !deleteNode.current) return;
    if(!inviteNode?.current.contains(e.target)) {
      setParticipantsOpen(false)
      setInviteModalOpen(false);
    };
    if(!deleteNode?.current.contains(e.target)) {
      setDeleteModalOpen(false);
    };
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClick);

    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, []);

  useEffect(() => {
    refetchPending();
  }, [deleteData]);

  useEffect(() => {
    if(inviteData?.inviteUsersForEvent) {
      dispatch(pushAlert({
        type: Config.INFO_ALERT,
        message: t('events.invites_sent')
      }));
    }
  }, [inviteData]);

  useEffect(() => {
    if (deleteEventData?.deleteEvent || leaveData?.leaveEvent) {
      onEventsUpdate()
    }
  }, [deleteEventData, leaveData]);

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
    if(inviteError) {
      dispatch(pushAlert({
        type: Config.WARNING_ALERT,
        message: new ApolloError(inviteError).message
      }));
    }
  }, [inviteError]);

  useEffect(() => {
    handleError(searchError);
    handleError(deleteError);
    handleError(error);
    handleError(deleteEventError);
    handleError(leaveError);
  }, [searchError, deleteError, error, deleteEventError, leaveError]);

  useEffect(() => {
    if (searchValue.length && !searchLoading) {
      findUsers({
        variables: {
          searchValue: searchValue,
          userId: userId
        }
      });
    }
  }, [searchValue, searchLoading]);

  const handleEventClick = (): void => {
    if (participantsOpen) {
      setParticipantsOpen(false);
    } else {
      setParticipantsOpen(true);
      getParticipants({
        variables: {
          eventId: parseInt(event.id!.toString())
        }
      });
    }
  }

  return (
    <div ref={inviteNode}>
      {inviteModalOpen && 
        <div className='absolute w-96 bg-white rounded-md shadow-xl -ml-6 p-2 z-50'>
          <div className='flex flex-col pt-3'>
            <div className='flex items-center text-sm mb-0.5'>
              {t('events.search_for')}
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
                      <Checkbox 
                        value={usersToInvite.some(toInvite => toInvite === parseInt(user.id))}
                        onClick={() => {
                          if (usersToInvite.some(toInvite => toInvite === parseInt(user.id))) {
                            setUsersToInvite([ ...usersToInvite.filter(userId => userId !== parseInt(user.id)) ]);
                          } else {
                            setUsersToInvite([ ...usersToInvite, parseInt(user.id) ]);
                          }
                        }
                        }
                        className='w-3 h-3 mr-4'
                      />
                      }
                    </div>
                  </div>
                )}
              </div>
            }
          </div>
          <Button 
            type='transparent'
            onClick={() => {
              inviteForEvent({
              variables: {
                userIds: usersToInvite,
                eventId: parseInt(event.id!.toString()),
                content: `${Config.EVENT_INVITE_PREFIX}@${username} has invited you to participate in event: ${event.eventName} at ${event.day - 1}-${event.month + 1}-${event.year}`
              }});
              setInviteModalOpen(false);
            }}
            children={
              <div className='flex items-center justify-center'>
                <div>{t('events.send_invites')}</div>
                <div><PlusCircleIcon className='w-5 h-5 ml-2 text-primary'/></div>
              </div>
            }
            className='w-full'
          />
        </div>
      }
      {deleteModalOpen && 
        <div className='absolute w-96 bg-white rounded-md shadow-xl -ml-6 p-6 text-center z-50' ref={deleteNode}>
          {t('events.sure_delete')}
          <div className='flex justify-evenly mt-4'>
            <Button 
              type='primary'
              onClick={() => setDeleteModalOpen(false)}
              children={t('events.no_back')}
            />
            <Button 
              type='filled'
              onClick={() => {
                deleteEvent({
                variables: {
                  eventId: parseInt(event.id!.toString())
                }});
                setDeleteModalOpen(false);
              }}
              children={t('events.yes_delete')}
            />
          </div>
        </div>
      }
      <div className='flex group items-center rounded-md hover:bg-gray-100 hover:bg-opacity-50 p-2' onClick={() => handleEventClick()}>
        <div className='flex flex-col flex-grow'>
          <div>
            {event.eventName}
          </div>
          <div className='text-gray-300 text-sm'>
            {event.eventDescription}
          </div>
        </div>
        <div className={`${participantsOpen && 'transform duration-200 rotate-180'}`}>
          {loading ? <Spinner dimensionsClass='w-7 h-7' borderClass='border'/> : <ChevronDownIcon className='w-7 h-7 text-primary'/>}
        </div>
      </div>
      <div className='px-2'>
        {participantsOpen && !loading &&
          <div>
            {data?.getEventParticipants?.map((participant: UserType) => 
              <div className='flex'>
                <div className='w-4'>
                  <div className='w-full h-1/2 border-b-2 border-l-2 border-gray-200'></div>
                </div>
                <div className='flex-grow pl-2'>
                  <Button
                    type='transparent'
                    onClick={() => null}
                    children={
                      <div className='flex justify-between items-center'>
                        <div>{participant.login}{parseInt(participant.id.toString()) === parseInt(userId!) && ` ( ${t('events.you')} )`}</div>
                        <div>{parseInt(participant.id.toString()) === parseInt(userId!) ?
                          (event.ownerId === parseInt(userId!) ?
                          <Button 
                            type='link'
                            onClick={() => setDeleteModalOpen(true)}
                            children={
                              <div className='rounded-full text-primary border-2 border-primary font-bold text-xs px-1'>
                                {t('events.delete_event')}
                              </div>}
                          /> :
                          <Button 
                            type='link'
                            onClick={() => leaveEvent({
                              variables: {
                                userId: userId,
                                eventId: parseInt(event.id!.toString())
                              }
                            })}
                            children={
                              <div className='rounded-full text-primary border-2 border-primary font-bold text-xs px-1'>
                                {t('events.leave_event')}
                              </div>}
                          />) :
                          null
                        }
                        </div>
                      </div>
                    }
                    className='w-full text-left'
                  />
                </div>
              </div>
            )}
            {userId === event.ownerId && 
              <Button 
              type='transparent'
              onClick={() => setInviteModalOpen(true)}
              children={
                <div className='flex justify-center items-center'>
                  <div>{t('events.invite_participants')}</div>
                  <div><UserAddIcon className='w-5 h-5 text-primary ml-2' /></div>
                </div>
              }
              className='w-full mt-4'
            />}
          </div>
        }
      </div>
    </div>
  );
}

export default UserEvent;