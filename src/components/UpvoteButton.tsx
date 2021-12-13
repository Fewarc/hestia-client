import { useMutation } from "@apollo/client";
import { ArrowDownIcon, ArrowUpIcon } from "@heroicons/react/outline";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import DOWNVOTE_POST from "../graphql/mutations/downvotePost";
import UPVOTE_POST from "../graphql/mutations/upvotePost";
import { handleError } from "../utility/ErrorUtils";
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
  const dispatch = useDispatch();
  const [ upvote, { data: upvoteData, error: upvoteError, loading: upvoteLoading } ] = useMutation(UPVOTE_POST, { errorPolicy: 'all' });
  const [ downvote, { data: downvoteData, error: downvoteError, loading: downvoteLoading } ] = useMutation(DOWNVOTE_POST, { errorPolicy: 'all' });

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
    handleError(upvoteError, dispatch);
    handleError(downvoteError, dispatch);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [upvoteError, downvoteError]);

  useEffect(() => {
    if (upvoteData?.upvotePost || downvoteData?.downvotePost) {
      onClick();
    } 
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [upvoteData, downvoteData]);

  return (
    <div className={`${(upvoteLoading || downvoteLoading) && 'pointer-events-none animate-pulse'}`}>
      {userUpvotes.find(upvote => upvote === postId) ?
        <Button 
          type='transparent'
          onClick={() => handleOnClick(true)}
          children={<ArrowDownIcon className="w-7 h-7 text-primary mt-0.5" />}
        /> :
        <Button 
          type='transparent'
          onClick={() => handleOnClick(false)}
          children={<ArrowUpIcon className="w-7 h-7 text-primary mt-0.5" />}
        />
      }
    </div>
  );
}

export default UpvoteButton;