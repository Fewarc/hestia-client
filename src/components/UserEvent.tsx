import { ApolloError, useLazyQuery } from "@apollo/client";
import { ChevronDownIcon, PlusCircleIcon } from "@heroicons/react/outline";
import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { pushAlert } from "../actions/AlertsActions";
import Config from "../constants/Config";
import GET_PARTICIPANTS from "../graphql/queries/getEventParticipants";
import { UserType } from "../interfaces/UserInterface";
import { Event } from "../types/EventType";
import Button from "./Button";
import Spinner from "./Spinner";

interface EventInterface {
  event: Event,
  userId: string | undefined
}

const UserEvent: React.FC<EventInterface> = ({
  event,
  userId
}) => {
  const node = useRef<HTMLHeadingElement>(null);
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [participantsOpen, setParticipantsOpen] = useState<boolean>(false);
  const [ getParticipants, { data, loading, error } ] = useLazyQuery(GET_PARTICIPANTS, { errorPolicy: 'all' });

  const handleClick = (e: any): void => {
    if(!node.current) return;
    if(!node.current.contains(e.target)) setParticipantsOpen(false);
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClick);

    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if(error) {
      dispatch(pushAlert({
      type: Config.ERROR_ALERT,
      message: new ApolloError(error).message
      }));
      console.log(JSON.stringify(error, null, 2));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error]);

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
    <div>
      <div className='flex group items-center rounded-md hover:bg-gray-100 hover:bg-opacity-50 p-2' ref={node} onClick={() => handleEventClick()}>
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
                            onClick={() => null}
                            children={
                              <div className='rounded-full text-primary border-2 border-primary font-bold text-xs px-1'>
                                {t('events.delete_event')}
                              </div>}
                          /> :
                          null) : // TODO: implement and test !!!!!!!!!!!!!!
                          <PlusCircleIcon className='w-5 h-5'/>
                        }
                        </div>
                      </div>
                    }
                    className='w-full text-left'
                  />
                </div>
              </div>
            )}
          </div>
        }
      </div>
    </div>
  );
}

export default UserEvent;