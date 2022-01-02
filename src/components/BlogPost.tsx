import { useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useRouteMatch } from "react-router-dom";
import GET_POST from "../graphql/queries/getPost";
import { Post } from "../types/PostType";
import Button from "./Button";
import Container from "./Container";
import Reply from "./Reply";
import Spinner from "./Spinner";
import Comment from "./Comment";
import { extractTags } from "../utility/BlogUtils";
import Badge from "./Badge";
import GET_USER_UPVOTES from "../graphql/queries/getUserUpvotes";
import { getUserId } from "../selectors/UserSelector";
import UpvoteButton from "./UpvoteButton";
import { ReplyIcon } from "@heroicons/react/outline";
import { handleError } from "../utility/ErrorUtils";
import { parseDate } from "../utility/DateUtils";

const BlogPost: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { params: { postId } = {} } = useRouteMatch<any>();
  const userId = useSelector<number, number>(state => getUserId(state));
  const { data: postData, error: postError, loading: postLoading, refetch: refetchPost } = useQuery(GET_POST, {
    variables: {
      postId: parseInt(postId)
    },
    errorPolicy: 'all'
  });
  const [replyOpen, setReplyOpen] = useState<boolean>(false);
  const { data: upvotesData, loading: upvotesLoading, refetch: refetchUpvotes } = useQuery(GET_USER_UPVOTES, {
    variables: {
      userId: userId
    },
    errorPolicy: 'all'
  });
  const userUpvotes: number[] = upvotesData?.getUserUpvotes;
  const post: Post = postData?.getPost;
  const comments: Post[] = post?.comments;

  const handleUpvote = () => {
    refetchUpvotes();
    refetchPost();
  }

  useEffect(() => {
    handleError(postError, dispatch);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [postError]);

  return (
    <Container>
      <div className="pt-32">
        {(postLoading || upvotesLoading) ?
          <Spinner className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" /> :
          (post && 
            <div className="flex flex-col">
              <div className="text-5xl font-bold">
                {post.title}
              </div>
              <div className="text-3xl mt-8">
                {post.description}
              </div>
              <div className="mt-4 flex gap-3">
                {extractTags(post.tags).map(tag => <Badge content={tag} />)}
              </div>
              <div className="flex items-center gap-10 mt-8 font-bold">
                <div className="flex gap-2">
                  <div>
                    {`${t('post.posted_at')}${parseDate(post.postedAt)}`}
                  </div>
                  <div>
                    {`${t('post.posted_by')}@${post.ownerUsername}`}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div>{post.upvotes}</div>
                  <UpvoteButton 
                    postId={parseInt(postId)}
                    userUpvotes={userUpvotes}
                    userId={parseInt(userId.toString())}
                    onClick={() => handleUpvote()}
                  />
                </div>
                <Button 
                  type='transparent'
                  onClick={() => setReplyOpen(true)}
                  children={<ReplyIcon className="w-7 h-7 text-primary mb-0.5" />}
                />
              </div>
              {replyOpen && 
                <Reply 
                  className="mt-10" 
                  postId={postId} 
                  onClose={() => setReplyOpen(false)}
                  onPublish={() => refetchPost()}
                  replyToId={postId}
                />
              }
              <div className="flex flex-col mt-10 mb-10">
                {comments?.filter(comment => comment.replyToId === parseInt(postId)).map(comment => 
                  <Comment 
                    postId={postId} 
                    userId={userId}
                    onReplyPublish={() => refetchPost()}
                    comment={comment}
                    allComments={comments}
                    userUpvotes={userUpvotes}
                    onUpvote={() => handleUpvote()}
                  />
                )}
              </div>
            </div>
          )
        }
      </div>
    </Container>
  );
}

export default BlogPost;