import { ApolloError, useMutation } from '@apollo/client';
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { pushAlert } from '../actions/AlertsActions';
import Badge from '../components/Badge';
import BlogPostCard from '../components/BlogPostCard';
import Button from '../components/Button';
import Container from '../components/Container';
import Spinner from '../components/Spinner';
import TextArea from '../components/TextArea';
import Config from '../constants/Config';
import CREATE_POST from '../graphql/mutations/createPost';
import { getUserId } from '../selectors/UserSelector';
import { getTagValues, parseTags } from '../utility/BlogUtils';

const BlogCreationPage: React.FC = () => {
  const { t } = useTranslation();
  const location = useLocation<any>();
  const [title, setTitle] = useState<string>('Your posts title');
  const [description, setDescription] = useState<string>('Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.');
  const [addedTags, setAddedTags] = useState<string[]>([]);
  const dispatch = useDispatch();
  const history = useHistory();
  const tags = getTagValues(t);
  const userId = useSelector<number, number>(state => getUserId(state));
  const [ createPost, { data: createData, error: createError, loading: createLoading }] = useMutation(CREATE_POST, { errorPolicy: 'all' });

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
    handleError(createError);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [createError]);

  useEffect(() => {
    if (createData?.createPost) {
      dispatch(pushAlert({
        type: Config.INFO_ALERT,
        message: t('blog_creation.post_created')
      }));
      history.push('/blog');
    } 
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [createData]);

  return (
    <Container>
      <div className='pt-32'>
        <div className='text-5xl font-extrabold text-center w-full mb-8'>{t('blog_creation.create_new_post')}</div>
        <TextArea 
          label={t('blog_creation.title')}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className='border-opacity-100 mb-10'
        />
        <TextArea 
          label={t('blog_creation.description')}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <div className='mt-10 flex flex-col'>
          <div>{t('blog_creation.tags')}</div>
          <div className='flex mt-2 gap-4'>
            {tags.map(tag => 
            !addedTags.some(addedTag => addedTag === tag) && <Button 
              type='link'
              onClick={() => setAddedTags([ ...addedTags, tag ])}
              children={<Badge content={tag} />}
            />)}
          </div>
        </div>
        <div className='flex justify-center mt-16'>
          <div className='w-64'>
            <BlogPostCard 
              title={title}
              description={description}
              tags={addedTags.map(tag => 
                <Button 
                  type='link'
                  onClick={() => setAddedTags([ ...addedTags.filter(addedTag => addedTag !== tag ) ])}
                  children={<Badge content={tag} />}
                />)
              }
              upvotes={0}
              date={new Date()}
            />
          </div>
        </div>
        <div className='flex justify-center mt-20'>
          <Button 
            type='primary'
            onClick={() => createPost({
              variables: {
                userId: userId,
                content: description,
                title: title,
                tags: parseTags(addedTags),
                relatedOffer: location.state?.relatedOffer ? location.state.relatedOffer : null
              }
            })}
            children={
              <div className='group flex items-center gap-x-4'>
                {t('blog_creation.publish')}
                {createLoading && <Spinner dimensionsClass='w-5 h-5 group-hover:w-20' borderClass='group-hover:border-white'/>}
              </div>
            }
            className='mb-10'
          />
        </div>
      </div>
    </Container>
  );
}

export default BlogCreationPage;