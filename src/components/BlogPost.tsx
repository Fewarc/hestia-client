import { ApolloError, useQuery } from "@apollo/client";
import { ArrowUpIcon, ReplyIcon } from "@heroicons/react/outline";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useRouteMatch } from "react-router-dom";
import { pushAlert } from "../actions/AlertsActions";
import Config from "../constants/Config";
import GET_POST from "../graphql/queries/getPost";
import { Post } from "../types/PostType";
import Button from "./Button";
import Container from "./Container";
import Reply from "./Reply";
import Spinner from "./Spinner";
import Comment from "./Comment";

const BlogPost: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { params: { postId } = {} } = useRouteMatch<any>();
  const { data: postData, error: postError, loading: postLoading, refetch: refetchPost } = useQuery(GET_POST, {
    variables: {
      postId: parseInt(postId)
    },
    errorPolicy: 'all'
  });
  const [replyOpen, setReplyOpen] = useState<boolean>(false);
  const post: Post = postData?.getPost;
  const comments: Post[] = post?.comments;

  const handleError = (error: ApolloError | undefined) => {
    if(error) {
      dispatch(pushAlert({
        type: Config.ERROR_ALERT,
        message: new ApolloError(error).message
      }));
      console.log(JSON.stringify(error, null, 2));
    }
  }

  useEffect(() => {
    handleError(postError);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [postError]);

  console.log(postData);
  

  return (
    <Container>
      <div className="pt-32">
        {postLoading ?
          <Spinner className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" /> :
          (post && 
            <div className="flex flex-col">
              <div className="text-5xl font-bold">
                {post.title}
              </div>
              <div className="text-3xl mt-8">
                {post.description}
              </div>
              <div className="flex items-center gap-10 mt-8 font-bold">
                <div>
                  {`${t('post.posted_at')}${new Date(post.postedAt).getDate()}-${new Date(post.postedAt).getMonth()}-${new Date(post.postedAt).getFullYear()}`}
                </div>
                <div className="flex items-center gap-2">
                  <div>{post.upvotes}</div>
                  <Button 
                    type='transparent'
                    onClick={() => null}
                    children={<ArrowUpIcon className="w-7 h-7 text-primary mb-0.5" />}
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
              <div className="flex flex-col mt-10">
                {comments?.map(comment => 
                  <Comment 
                    postId={postId} 
                    onReplyPublish={() => refetchPost()}
                    comment={comment}
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