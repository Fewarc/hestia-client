import { useMutation } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import CREATE_POST from "../graphql/mutations/createPost";
import { getUserId } from "../selectors/UserSelector";
import { handleError } from "../utility/ErrorUtils";
import Button from "./Button";
import TextArea from "./TextArea";

interface ReplyProps {
  postId: number,
  replyToId: number,
  className?: string,
  onPublish?: () => void
  onClose?: () => void
}

const Reply: React.FC<ReplyProps> = ({
  postId,
  replyToId,
  className,
  onPublish,
  onClose
}) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const userId = useSelector<number, number>(state => getUserId(state));
  const [replyValue, setReplyValue] = useState<string>('');
  const [ publishComment, { data, error, loading } ] = useMutation(CREATE_POST, { errorPolicy: 'all' });

  useEffect(() => {
    handleError(error, dispatch);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error]);

  const handlePublish = () => {
    if (!!replyValue.length) {
      publishComment({
        variables: {
          tags: '',
          title: '',
          userId: userId,
          content: replyValue,
          postId: parseInt(postId.toString()),
          replyToId: parseInt(replyToId.toString())
        }
      });
      onPublish && onPublish();
      onClose && onClose();
    }
  }

  console.log(data);
  

  return (
    <div className={`flex flex-col ${className} ${loading && 'pointer-events-none animate-pulse'}`}>
      <div className="text-sm mb-2">
        {t('post.your_reply')}
      </div>
      <TextArea 
        value={replyValue}
        onChange={(e) => setReplyValue(e.target.value)}
      />
      <div className="flex gap-2">
        <Button 
          type='primary'
          onClick={() => onClose && onClose()}
          children={t('post.close')}
        />
        <Button 
          type='primary'
          onClick={() => handlePublish()}
          children={t('post.publish')}
          disabled={!replyValue.length || !userId}
        />
      </div>
    </div>
  );
}

export default Reply;