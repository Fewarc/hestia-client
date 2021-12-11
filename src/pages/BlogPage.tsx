import { ApolloError, useQuery } from "@apollo/client";
import { BackspaceIcon, PlusCircleIcon } from "@heroicons/react/outline";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { pushAlert } from "../actions/AlertsActions";
import Badge from "../components/Badge";
import BlogPostCard from "../components/BlogPostCard";
import Button from "../components/Button";
import Container from "../components/Container";
import Input from "../components/Input";
import Config from "../constants/Config";
import GET_BLOG_POSTS from "../graphql/queries/getBlogPosts";
import { getUserId } from "../selectors/UserSelector";
import { Post } from "../types/PostType";
import { extractTags } from "../utility/BlogUtils";

const BlogPage: React.FC = () => {
  const { t } = useTranslation();
  const history = useHistory();
  const dispatch = useDispatch();
  const userId = useSelector<number, number>(state => getUserId(state));
  const [searchValue, setSearchValue] = useState<string>('');
  const { data: postData, error: postError, loading: postLoading } = useQuery(GET_BLOG_POSTS, {
    variables: {
      userId: userId
    },
    errorPolicy: 'all'
  });

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
        <div className='text-6xl font-black text-center mb-10'>
          {t('blog.blog')}
        </div>
        <div className='px-16 '>
          <div>{t('blog.search_posts')}</div>
          <div className="w-full flex items-center">
            <Input 
              type='text'
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              willDisplayError={false}
              className="border-opacity-100"
            />
            <Button 
              type='transparent'
              onClick={() => setSearchValue('')}
              children={<BackspaceIcon className="w-10 h-10 text-primary ml-3" />}
            />
          </div>
        </div>
        <div>
          <div className='flex flex-col text-2xl font-black mt-20 mb-6'>
            {t('blog.most_recent')}
          </div>
          <div className='grid grid-cols-5 gap-2'>
          {postData?.getBlogPagePosts?.mostRecent?.map((post: Post) => 
              <BlogPostCard 
                title={post.title} 
                description={post.description}
                tags={extractTags(post.tags).map(tag => <Badge content={tag} />)}
                upvotes={post.upvotes}
                date={post.postedAt}
                id={post.id}
              />
            )}
          </div>
        </div>
        <div>
          <div className='flex flex-col text-2xl font-black mt-20 mb-6'>
            {t('blog.most_upvoted')}
          </div>
          <div className='grid grid-cols-5 gap-2 mb-16'>
          {postData?.getBlogPagePosts?.mostUpvoted?.map((post: Post) => 
              <BlogPostCard 
                title={post.title} 
                description={post.description}
                tags={extractTags(post.tags).map(tag => <Badge content={tag} />)}
                upvotes={post.upvotes}
                date={post.postedAt}
                id={post.id}
              />
            )}
          </div>
        </div>
        <div>
          <div className='flex flex-col text-2xl font-black mt-20 mb-6'>
            {t('blog.your_posts')}
          </div>
          <div className='grid grid-cols-5 gap-2 mb-16'>
            <Button 
              type='link'
              onClick={() => history.push('/new-post')}
              children={
                <div className="w-full flex flex-col justify-center items-center">
                  <div className="text-primary font-black text-2xl">{t('blog.add_post')}</div>
                  <PlusCircleIcon className="w-16 h-16 text-primary" />
                </div>
              }
              className='rounded-md border-4 border-primary border-dashed opacity-20 hover:opacity-100 hover:border-solid'
            />
            {postData?.getBlogPagePosts?.userPosts?.map((post: Post) => 
              <BlogPostCard 
                title={post.title} 
                description={post.description}
                tags={extractTags(post.tags).map(tag => <Badge content={tag} />)}
                upvotes={post.upvotes}
                date={post.postedAt}
                id={post.id}
              />
            )}
          </div>
        </div>
      </div>
    </Container>
  );
}

export default BlogPage;