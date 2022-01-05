import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { pushAlert } from "../actions/AlertsActions";
import { updateEvents } from "../actions/EventsActions";
import { updateNotes } from "../actions/NotesActions";
import Config from "../constants/Config";
import SAVE_NOTE from "../graphql/mutations/saveNote";
import GET_ALL_NOTES from "../graphql/queries/getAllNotes";
import GET_ALL_EVENTS from "../graphql/queries/getAllUserEvents";
import GET_PARTICIPANTS from "../graphql/queries/getEventParticipants";
import { UserType } from "../interfaces/UserInterface";
import { getUserEvents } from "../selectors/EventsSelector";
import { getUserNotes } from "../selectors/NotesSelector";
import { Event } from '../types/EventType';
import { Note } from "../types/NoteType";
import { handleError } from "../utility/ErrorUtils";
import Button from "./Button";
import Input from "./Input";
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
  const { data: notesData, error: notesError }= useQuery(GET_ALL_NOTES, {
    variables: {
      userId: userId
    },
    errorPolicy: 'all'
  });
  const [ saveNote, { data: saveData, loading: saveLoading, error: saveError } ] = useMutation(SAVE_NOTE, { errorPolicy: 'all' });
  const [getParticipants, { data: participantsData, error: participantsError, loading: participantsLoading } ] = useLazyQuery(GET_PARTICIPANTS, { errorPolicy: 'all' });
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const location = useLocation<any>();
  const [event, setEvent] = useState<Event | null>(null);
  const [noteValue, setNoteValue] = useState<string>(''); 
  const [filterValue, setFilterValue] = useState<string>(''); 
  const notes = useSelector<Note[], Note[]>(state => getUserNotes(state));
  const events = useSelector<Event[], Event[]>(state => getUserEvents(state));
  const participants = participantsData?.getEventParticipants;

  useEffect(() => {
    if (events && !!location.state.meeting) {
      setEvent(events.find((event: Event) => event.eventName === location.state.meeting) || null);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [events]);

  useEffect(() => {
    if (eventsData?.getAllUserEvents) {
      dispatch(updateEvents(eventsData?.getAllUserEvents));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [eventsData]);

  useEffect(() => {
    handleError(eventsError, dispatch);
    handleError(notesError, dispatch);
    handleError(saveError, dispatch);
    handleError(participantsError, dispatch);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [eventsError, notesError, saveError]);

  useEffect(() => {
    if (notesData?.getAllNotes) {
      dispatch(updateNotes(notesData.getAllNotes));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [notesData]);

  useEffect(() => {
    if (saveData?.saveNote) {
      dispatch(pushAlert({
        type: Config.INFO_ALERT,
        message: t('notes.note_saved')
      }));
      dispatch(updateNotes(saveData.saveNote))
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [saveData]);

  useEffect(() => {
    if (event?.id) {
      getParticipants({
        variables: {
          eventId: parseInt(event.id.toString())
        }
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [event]);

  return (
    <div className='w-full h-full p-10 pt-24'>
      <div className='w-full h-full rounded-md shadow-md flex'>
        <div className='border-r border-gray-100 w-72 flex flex-col p-2 relative h-full'>
          <Input 
            label={t('notes.filter_events')}
            type='text'
            value={filterValue}
            onChange={(e) => setFilterValue(e.target.value)}
            willDisplayError={false}
            className='mb-4'
          />
          {eventsLoading ? 
            <Spinner className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2' /> :
            events?.filter(event => event.eventName.includes(filterValue)).map((event: Event) => 
              <Button 
                type='transparent'
                onClick={() => {
                  setEvent(event);
                  setNoteValue(notes.find((note: Note) => note.eventId === parseInt(event!.id!.toString()))?.content || '')
                }}
                children={event.eventName}
                className='w-full text-left mb-2'
              />
            )
          }
        </div>
        <div className='inline-block w-full'>
          {event && !participantsLoading && !!participantsData && 
            <div className='p-4'>
              <div className='flex items-center mb-4'>
                <div className='text-xl font-black'>{event?.eventName}</div>
                <Button 
                  type='primary'
                  disabled={noteValue === notes.find((note: Note) => note.eventId === parseInt(event!.id!.toString()))?.content}
                  onClick={() => saveNote({
                    variables: {
                      userId: parseInt(userId.toString()),
                      eventId: parseInt(event!.id!.toString()),
                      content: noteValue
                    }
                  })}
                  children={
                  <div className='group flex items-center gap-x-4'>
                    {t('notes.save_note')}
                    {saveLoading && <Spinner dimensionsClass='w-5 h-5 group-hover:w-20' borderClass='group-hover:border-white'/>}
                  </div>}
                  className='ml-4'
                />
              </div>
              <div className="flex flex-col mb-4">
                <div className="mb-2">
                  {t('notes.event_desc')}
                </div>
                <div>
                  {event.eventDescription}
                </div>
                <div className="mb-2 mt-2">
                  {t('notes.event_part')}
                </div>
                <div className="flex gap-4">
                  {participants?.map((participant: UserType) => 
                    <div>
                      @{participant.login}
                    </div>
                  )}
                </div>
              </div>
              <TextArea 
                value={noteValue}
                onChange={(e) => setNoteValue(e.target.value)}
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