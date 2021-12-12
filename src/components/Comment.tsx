import { ArrowUpIcon, ReplyIcon } from "@heroicons/react/outline";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Post } from "../types/PostType";
import Button from "./Button";
import Reply from "./Reply";

interface CommentProps {
  postId: number,
  comment: Post,
  onReplyPublish: () => void
}

const Comment: React.FC<CommentProps> = ({
  postId,
  comment,
  onReplyPublish
}) => {
  const { t } = useTranslation();
  const [replyOpen, setReplyOpen] = useState<boolean>(false);

  return (
    <div className="w-full rounded-md shadow-md p-2 flex flex-col mt-2">
      <div>
        {comment.description}
      </div>
      <div className="flex items-center gap-6 mt-2 text-xs font-bold">
        <div>
          {`${t('post.posted_at')}${new Date(comment.postedAt).getDate()}-${new Date(comment.postedAt).getMonth()}-${new Date(comment.postedAt).getFullYear()}`}
        </div>
        <div className="flex items-center gap-2">
          <div>{comment.upvotes}</div>
          <Button 
            type='transparent'
            onClick={() => null}
            children={<ArrowUpIcon className="w-5 h-5 text-primary mb-0.5" />}
          />
        </div>
        <Button 
          type='transparent'
          onClick={() => setReplyOpen(true)}
          children={<ReplyIcon className="w-5 h-5 text-primary mb-0.5" />}
        />
      </div>
      {replyOpen &&
        <Reply 
          postId={postId}
          replyToId={comment.id}
          onPublish={() => onReplyPublish()}
          onClose={() => setReplyOpen(false)}
          className="mt-2"
        />
      }
    </div>
  );
}

export default Comment;