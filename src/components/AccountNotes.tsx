import { ApolloError, useLazyQuery, useMutation, useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { pushAlert } from "../actions/AlertsActions";
import { updateEvents } from "../actions/EventsActions";
import Config from "../constants/Config";
import SAVE_NOTE from "../graphql/mutations/saveNote";
import GET_ALL_EVENTS from "../graphql/queries/getAllUserEvents";
import GET_NOTE from "../graphql/queries/getNote";
import { getUserEvents } from "../selectors/EventsSelector";
import { Event } from '../types/EventType';
import Button from "./Button";
import Spinner from "./Spinner";
import TextArea from "./TextArea";

interface NotesInterface {
  userId: number,
  username: string
}

const AccountNotes: React.FC<NotesInterface> = ({
  userId,
  username
}) => {
  const { data: eventsData, error: eventsError, loading: eventsLoading } = useQuery(GET_ALL_EVENTS, {
    variables: {
      userId: userId
    },
    errorPolicy: 'all'
  });
  const [ getNote, { data: noteData, loading: noteLoading, error: noteError } ] = useLazyQuery(GET_NOTE, { errorPolicy: 'all' });
  const [ saveNote, { data: saveData, loading: saveLoading, error: saveError } ] = useMutation(SAVE_NOTE, { errorPolicy: 'all' });
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [noteValue, setNotesValue] = useState<string>(''); 
  const [event, setEvent] = useState<Event | null>(null);
  const events = useSelector<Event[], Event[]>(state => getUserEvents(state));
  
  useEffect(() => {
    if (eventsData?.getAllUserEvents) {
      dispatch(updateEvents(eventsData?.getAllUserEvents));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [eventsData]);

  useEffect(() => {
    if(eventsError) {
      dispatch(pushAlert({
        type: Config.ERROR_ALERT,
        message: new ApolloError(eventsError).message
      }));
      console.log(JSON.stringify(eventsError, null, 2));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [eventsError]);

  useEffect(() => {
    if (event) {
      getNote({
        variables: {
          userId: userId,
          eventId: parseInt(event!.id!.toString())
        }
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [event]);
console.log(noteData);

  return (
    <div className='w-full h-full p-10 pt-24'>
      <div className='w-full h-full rounded-md shadow-md flex'>
        <div className='border-r border-gray-100 w-72 flex flex-col p-2 relative h-full'>
          {eventsLoading ? 
            <Spinner className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2' /> :
            events?.map((event: Event) => 
              <Button 
                type='transparent'
                onClick={() => setEvent(event)}
                children={event.eventName}
                className='w-full text-left mb-2'
              />
            )
          }
        </div>
        <div className='inline-block w-full'>
          {event && 
            <div className='p-4'>
              <div className='flex items-center mb-4'>
                <div className='text-xl font-black'>{event?.eventName}</div>
                <Button 
                  type='primary'
                  onClick={() => null}
                  children={
                  <div className='group flex items-center gap-x-4'>
                    {t('notes.save_note')}
                    {saveLoading && <Spinner dimensionsClass='w-5 h-5 group-hover:w-20' borderClass='group-hover:border-white'/>}
                  </div>}
                  className='ml-4'
                />
              </div>
              <TextArea 
                value={noteValue}
                onChange={(e) => setNotesValue(e.target.value)}
                className='w-full h-full inline-block'
              />
            </div>
          }
        </div>
      </div>
    </div>
  );
}

export default AccountNotes;