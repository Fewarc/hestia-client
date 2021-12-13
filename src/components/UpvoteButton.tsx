import { useMutation } from "@apollo/client";
import { ArrowDownIcon, ArrowUpIcon } from "@heroicons/react/outline";
import React, { useEffect } from "react";
import DOWNVOTE_POST from "../graphql/mutations/downvotePost";
import UPVOTE_POST from "../graphql/mutations/upvotePost";
import Button from "./Button";

interface UpvoteButtonProps {
  userUpvotes: number[],
  postId: number,
  userId: number,
  onClick: () => void
}

const UpvoteButton: React.FC<UpvoteButtonProps> = ({
  userUpvotes,
  postId,
  userId,
  onClick
}) => {
  const [ upvote, { data: upvoteData } ] = useMutation(UPVOTE_POST, { errorPolicy: 'all' });
  const [ downvote, { data: downvoteData } ] = useMutation(DOWNVOTE_POST, { errorPolicy: 'all' });

  const handleOnClick = (alreadyUpvoted: boolean) => {
    if (alreadyUpvoted) {
      downvote({
        variables: {
          userId: userId,
          postId: postId
        }
      });
    } else {
      upvote({
        variables: {
          userId: userId,
          postId: postId
        }
      });
    }
  }

  useEffect(() => {
    if (upvoteData?.upotePost || downvoteData?.downvotePost) {
      onClick();
    } 
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [upvoteData, downvoteData]);

  return (
    <div>
      {userUpvotes.find(upvote => upvote === postId) ?
        <Button 
          type='transparent'
          onClick={() => handleOnClick(true)}
          children={<ArrowDownIcon className="w-7 h-7 text-primary mb-0.5" />}
        /> :
        <Button 
          type='transparent'
          onClick={() => handleOnClick(false)}
          children={<ArrowUpIcon className="w-7 h-7 text-primary mb-0.5" />}
        />
      }
    </div>
  );
}

export default UpvoteButton;