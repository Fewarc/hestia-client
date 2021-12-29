import { useMutation, useQuery } from "@apollo/client";
import { UserAddIcon, UserRemoveIcon } from "@heroicons/react/outline";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import ADD_AS_CLIENT from "../graphql/mutations/addAsClient";
import REMOVE_CLIENT from "../graphql/mutations/removeClient";
import FIND_USER_CONTACTS from "../graphql/queries/findUserContacts";
import GET_USER_CLIENTS from "../graphql/queries/getUserClients";
import { UserType } from "../interfaces/UserInterface";
import { getUserData } from "../selectors/UserSelector";
import { handleError } from "../utility/ErrorUtils";
import Button from "./Button";
import Input from "./Input";
import SaleLevel from "./SaleLevel";
import Spinner from "./Spinner";

const AccountClients: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [filterClients, setFilterClients] = useState<string>('');
  const [filterContacts, setFilterContacts] = useState<string>('');
  const user = useSelector<UserType, UserType>(state => getUserData(state));
  const { data: contactsData, loading: contactsLoading, error: contactsError } = useQuery(FIND_USER_CONTACTS, {
    variables: {
      userId: user.id,
      searchValue: filterContacts
    },
    errorPolicy: 'all'
  });
  const [ addToClients, { data: addData, loading: addLoading, error: addError } ] = useMutation(ADD_AS_CLIENT, { errorPolicy: 'all' });
  const [ removeClient, { data: removeData, loading: removeLoading, error: removeError } ] = useMutation(REMOVE_CLIENT, { errorPolicy: 'all' });
  const { data: clientsData, loading: clientsLoading, error: clientsError, refetch: refetchClients } = useQuery(GET_USER_CLIENTS, {
    variables: {
      agentId: user.id
    }
  });
  const contacts = contactsData?.findUserContacts;  
  const clients = clientsData?.getUserClients;
  const [client, setClient] = useState<UserType | null>(null);

  useEffect(() => {
    handleError(contactsError, dispatch);
    handleError(addError, dispatch);
    handleError(clientsError, dispatch);
    handleError(removeError, dispatch);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contactsError, addError, clientsError, removeError])

  useEffect(() => {
    if (!!addData || !!removeData) {
      refetchClients();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [addData, removeData]);

  return (
    <div className='w-full h-full p-10 pt-24'>
      <div className='w-full h-full rounded-md shadow-md flex'>
        <div className='border-r border-gray-100 w-72 flex flex-col p-2 relative h-full'>
          <div className="flex-grow relative">
            <Input 
              type="text"
              label={t('account_clients.filter_clients')}
              value={filterClients}
              onChange={e => setFilterClients(e.target.value)}
              willDisplayError={false}
              className="mb-4"
            />
            {clientsLoading || removeLoading ?
              <Spinner className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2' /> :
              clients?.filter((client: UserType) => client.login.includes(filterClients))?.map((client: UserType) => 
              <div className="group cursor-pointer">
                <div className="flex justify-between">
                  <Button 
                    type="transparent"
                    onClick={() => setClient(client)}
                    children={`@${client.login}`}
                  />
                  <Button 
                    type="transparent"
                    onClick={() => removeClient({
                      variables: {
                        agentId: user.id,
                        clientId: parseInt(client.id.toString())
                      }
                    })}
                    children={<UserRemoveIcon className="w-5 h-5" />}
                    className="text-primary invisible group-hover:visible"
                  />
                </div>
              </div>
            )}
          </div>
          <div className="flex-grow relative">
            <Input 
              type="text"
              label={t('account_clients.filter_contacts')}
              value={filterContacts}
              onChange={e => setFilterContacts(e.target.value)}
              willDisplayError={false}
              className="mb-4"
            />
            {contactsLoading || addLoading ?
              <Spinner className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2' /> :
              contacts?.filter((contact: UserType) => !clients.some((singleContact: UserType) => singleContact.id === contact.id))?.map((contact: UserType) => 
                <div className="group cursor-pointer">
                  <div className="flex justify-between">
                    <div>
                      @{contact.login}
                    </div>
                    <Button 
                      type="transparent"
                      onClick={() => addToClients({
                        variables: {
                          agentId: user.id,
                          clientId: parseInt(contact.id.toString())
                        }
                      })}
                      children={<UserAddIcon className="w-5 h-5" />}
                      className="text-primary invisible group-hover:visible"
                    />
                  </div>
                </div>
              )
            }
          </div>
        </div>
        <div className='inline-block w-full'>
          {!!client && <SaleLevel />}
        </div>
      </div>
    </div>
  );
}

export default AccountClients;