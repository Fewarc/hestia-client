import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import Button from "./Button";
import TextArea from "./TextArea";

interface EventCreationInterface {
  day: number,
  month: number,
  year: number,
}

const EventCreationForm: React.FC<EventCreationInterface> = ({
  day,
  month,
  year
}) => {
  const { t } = useTranslation();
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');

  return (
    <div className='flex flex-col items-center'>
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
        onClick={() => null}
        children={t('events.confirm_add_event')}
        className='my-2'
      />
    </div>
  );
}

export default EventCreationForm;