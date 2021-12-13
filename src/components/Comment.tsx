import { ReplyIcon } from "@heroicons/react/outline";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Post } from "../types/PostType";
import Button from "./Button";
import Reply from "./Reply";
import UpvoteButton from "./UpvoteButton";

interface CommentProps {
  postId: number,
  userId: number,
  comment: Post,
  onReplyPublish: () => void,
  onUpvote: () => void,
  userUpvotes: number[],
  allComments: Post[]
}

const Comment: React.FC<CommentProps> = ({
  postId,
  userId,
  comment,
  onReplyPublish,
  onUpvote,
  userUpvotes,
  allComments
}) => {
  const { t } = useTranslation();
  const [replyOpen, setReplyOpen] = useState<boolean>(false);
  const replies = allComments.filter(singleComment => singleComment.replyToId === parseInt(comment.id.toString()));

  return (
    <div className={`w-full ${(!!replies.length && comment.replyToId === parseInt(postId.toString())) && 'mb-8'}`}>
      <div className="rounded-md shadow-md p-2 flex flex-col mt-2">
        <div>
          {comment.description}
        </div>
        <div className="flex items-center gap-6 mt-2 text-xs font-font">
          <div>
            {`${t('post.posted_at')}${new Date(comment.postedAt).getDate()}-${new Date(comment.postedAt).getMonth()}-${new Date(comment.postedAt).getFullYear()}`}
          </div>
          <div className="flex items-center gap-2">
            <div>{comment.upvotes}</div>
            <UpvoteButton 
              postId={parseInt(comment.id.toString())}
              userUpvotes={userUpvotes}
              userId={parseInt(userId.toString())}
              onClick={() => onUpvote()}
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
      {!!replies.length && 
        <div className="w-full bg-red flex flex-row-reverse">
          <div className="w-full">
            {replies?.map(commentReply => 
              <Comment 
                postId={postId}
                userId={userId}
                comment={commentReply}
                allComments={allComments}
                onReplyPublish={() => onReplyPublish()}
                onUpvote={() => onUpvote()}
                userUpvotes={userUpvotes}
              />
            )}
          </div>
          <div className="flex w-1/20">
            <div className="flex-grow"></div>
            <div className="flex-grow mt-2 pr-1 border-l-2 border-gray-100"></div>
          </div>
        </div>
      }
    </div>
  );
}

export default Comment;