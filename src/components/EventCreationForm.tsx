import { ApolloError, useMutation } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { pushAlert } from "../actions/AlertsActions";
import Config from "../constants/Config";
import CREATE_NEW_EVENT from "../graphql/mutations/createNewEvent";
import Button from "./Button";
import Spinner from "./Spinner";
import TextArea from "./TextArea";

interface EventCreationInterface {
  day: number,
  month: number,
  year: number,
  userId: string | undefined
}


const EventCreationForm: React.FC<EventCreationInterface> = ({
  day,
  month,
  year,
  userId
}) => {
  const { t } = useTranslation();
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const dispatch = useDispatch();
  const [ createEvent, { data: eventData, loading: eventLoading, error: eventError } ] = useMutation(CREATE_NEW_EVENT, { errorPolicy: 'all' });

  const handleClick = (): void => {
    if (!!title.length && !!description.length) {
      createEvent({
        variables: {
          eventName: title,
          eventDescription: description,
          ownerId: userId,
          eventOccurance: new Date(year, month, day + 1)
        }
      });
    }
  } 

  useEffect(() => {
    if (eventError) {
      dispatch(pushAlert({
      type: Config.ERROR_ALERT,
      message: new ApolloError(eventError).message
      }));
      console.log(JSON.stringify(eventError, null, 2));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [eventError]);

  return (
    <div className='relative'>
      {eventLoading && <Spinner className='absolute transform top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2'/>}
      <div className={`flex flex-col items-center ${eventLoading && 'opacity-20'}`}>
        <TextArea 
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          label={t('events.title')}
        />
        <TextArea 
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          label={t('events.description')}
        />
        <Button 
          type='primary'
          onClick={() => handleClick()}
          children={t('events.confirm_add_event')}
          className='my-2'
        />
      </div>
    </div>
  );
}

export default EventCreationForm;