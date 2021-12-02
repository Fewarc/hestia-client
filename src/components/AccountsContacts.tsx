import { ApolloError, useLazyQuery, useMutation } from "@apollo/client";
import { PlusCircleIcon } from "@heroicons/react/outline";
import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { pushAlert } from "../actions/AlertsActions";
import Config from "../constants/Config";
import SEND_INVITE from "../graphql/mutations/sendContactInvite";
import FIND_USERS from "../graphql/queries/findUsers";
import Button from "./Button";
import Input from "./Input";
import Spinner from "./Spinner";

interface ContactsInterface {
  userId: number
}

const AccountContacts: React.FC<ContactsInterface> = ({
  userId
}) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const node = useRef<HTMLHeadingElement>(null);
  const [searchValue, setSearchValue] = useState<string>('');
  const [searchOpen, setSearchOpen] = useState<boolean>(false);
  const [userDidType, setUserDidType] = useState<boolean>(false);
  const [ findUsers, { data: searchData, loading: searchLoading, error: searchError } ] = useLazyQuery(FIND_USERS, { errorPolicy: 'all' });
  const [ sendInvite, { data: inviteData, loading: inviteLoading, error: inviteError } ] = useMutation(SEND_INVITE, { errorPolicy: 'all' });

  // TODO: add get contacts

  const handleClick = (e: any) => {
    if(!node.current) return;
    if(!node.current.contains(e.target)) {
      setSearchOpen(false);
      setUserDidType(false);
    };
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClick);

    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if(searchError) {
      dispatch(pushAlert({
      type: Config.ERROR_ALERT,
      message: new ApolloError(searchError).message
      }));
      console.log(JSON.stringify(searchError, null, 2));
    }
    if(inviteError) {
      dispatch(pushAlert({
      type: Config.ERROR_ALERT,
      message: new ApolloError(inviteError).message
      }));
      console.log(JSON.stringify(inviteError, null, 2));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchError, inviteError]);

  useEffect(() => {
    if (searchValue.length && !searchLoading) {
      setUserDidType(true);
      findUsers({
        variables: {
          searchValue: searchValue,
          userId: userId
        }
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchValue, searchLoading]);

  return (
    <div className='w-full h-full p-10 pt-24'>
      <div className='w-full h-full rounded-md shadow-md flex'>
        <div className='flex-grow'>
          {/* CHAT HERE */}
        </div>
        <div className='w-96 rounded-r-md border-2 border-gray-600 p-4 flex flex-col'>
          <div className='text-2xl font-extralight'>
            {t('contacts.your')}
          </div>
          <div className='flex-grow'>
            CONTACTS HERE
          </div>
          <div 
            className={`transition duration-500 ease-in-out flex flex-col ${((searchOpen && !!searchValue.length) || userDidType) && 'flex-grosdw'}`} // TODO: delete(?)
            ref={node} 
            onClick={() => setSearchOpen(true)}
          >
            <Input
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              type='text'
              placeholder={t('contacts.search_placeholder')}
              willDisplayError={false}
              className='border-opacity-100 mb-2'
              label={
                <div className='flex items-center'>
                  {t('contacts.search_label')}
                  {searchLoading && <Spinner dimensionsClass='w-3 h-3' borderClass='border' className='ml-2'/>}
                </div>
              }
            />
            {searchData && !!searchValue.length && 
              <div className='h-64 flex flex-col overflow-y-auto'>
                {searchData.findUsers?.map((user: any, index: number) => 
                  <div className={`flex items-center justify-between text-xl py-2 ${index && 'border-t border-gray-100'}`}>
                    <div>@{user.login}</div>
                    <div>
                      <Button 
                        type='transparent'
                        onClick={() => sendInvite({
                          variables: {
                            senderId: userId,
                            targetId: parseInt(user.id),
                            inviteContent: `Invite from ${userId} to ${user.id}`
                          }
                        })}
                        children={<PlusCircleIcon className='w-5 h-5 mr-4'/>}
                        className='text-primary'
                      />
                    </div>
                  </div>
                )}
              </div>
            }
          </div>
        </div>
      </div>
    </div>
  );
}

export default AccountContacts;