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
import ClientMeetings from "./ClientMeetings";
import Input from "./Input";
import Modal from "./Modal";
import SaleLevel from "./SaleLevel";
import Spinner from "./Spinner";
import { parseDate } from "../utility/DateUtils";
import GET_AGENCY_DETAILS from "../graphql/queries/getAgencyDetails";
import { getOfferCategories } from "../utility/NewOfferUtils";
import { renderBlankSpace, downloadPdf } from "../utility/pdfUtils";

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
  const { data: agencyData, error: agencyError } = useQuery(GET_AGENCY_DETAILS, {
    variables: {
      agencyId: user.agencyId
    },
    errorPolicy: 'all'
  });
  const agency: UserType = agencyData?.getAgencyDetails;
  const contacts = contactsData?.findUserContacts;  
  const clients = clientsData?.getUserClients;
  const [client, setClient] = useState<UserType | null>(null);
  const [contractOpen, setContractOpen] = useState<boolean>(false);

  useEffect(() => {
    handleError(contactsError, dispatch);
    handleError(addError, dispatch);
    handleError(clientsError, dispatch);
    handleError(removeError, dispatch);
    handleError(agencyError, dispatch);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contactsError, addError, clientsError, removeError, agencyError])

  useEffect(() => {
    if (!!addData || !!removeData) {
      refetchClients();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [addData, removeData]);

  return (
    <div className='w-full h-full p-10 pt-24'>
      <Modal open={contractOpen} onClickAway={() => setContractOpen(false)} capWidth={false}>
        <div className="p-10 flex flex-col justify-center items-center gap-10 max-h-screen overflow-y-auto">
          <div id='contract' 
            style={{
              width: '210mm',
              backgroundColor: 'white',
            }}
            className="border-t border-l border-r border-gray-200 px-12 py-4 mt-32"
          >
            <div className="w-full text-center text-xl font-bold mb-8 mt-8">{t('contract.title')}</div>
            <div><span className="font-bold">{t('contract.i')}</span> {t('contract.part_1')} {parseDate(new Date())} {t('contract.part_2')}</div>
            <div className="mt-4">
              {client?.firstName || renderBlankSpace(10)} {' '}
              {client?.lastName || renderBlankSpace(10)} {' '} {t('contract.part_3')} {' '}
              {client?.address || renderBlankSpace(25)} {t('contract.part_4')} {' '} 
              {client?.email || renderBlankSpace(15)} {t('contract.part_5')}
            </div>
            <div className="my-8 text-xl font-bold">{t('contract.and')}</div>
            <div>
              {user?.firstName || renderBlankSpace(10)} {' '}
              {user?.lastName || renderBlankSpace(10)} {' '} {t('contract.part_6')} {' '}
              {user?.address || renderBlankSpace(25)} {t('contract.part_7')} {' '} 
              {user?.email || renderBlankSpace(15)} {t('contract.part_8')} {' '}
              {agency?.firstName || renderBlankSpace(25)} {' '} {t('contract.based_at')} {' '}
              {agency?.address} {' '} {t('contract.part_9')}
            </div>
            <div className="mt-8 mb-4">
              <div><span className="font-bold">{t('contract.ii')}</span> {t('contract.part_10')}</div>
              <div className="flex flex-col mt-4">
                {getOfferCategories(t).map(category => 
                  <div className="flex items-center gap-4">
                    <div className="border-2 w-4 h-4 border-black"></div>
                    <div>{category}</div>
                  </div>
                )}
              </div>
            </div>
            <div>{t('contract.address')} {renderBlankSpace(70)}</div>
            <div>{t('contract.tax')} {renderBlankSpace(63)}</div>
            <div>{t('contract.other_desc')} {renderBlankSpace(67)}</div>
            <div className="mt-8"><span className="font-bold">{t('contract.iii')}</span> {t('contract.part_11')}</div>
            <div>{renderBlankSpace(87)}</div>
            <div>{renderBlankSpace(87)}</div>
            <div className="flex justify-around items-center pt-20">
              <div className="border-t-2 border-black pt-2">{t('contract.buyers_signature')}</div>
              <div className="border-t-2 border-black pt-2">{t('contract.sellers_signature')}</div>
              <div className="border-t-2 border-black pt-2">{t('contract.agents_signature')}</div>
            </div>
          </div>
          <div className="flex justify-center items-center mt-8 gap-20">
            <Button 
              type="primary"
              onClick={() => downloadPdf()}
              children={t('account_clients.download')}
            />
            <Button 
              type="filled"
              onClick={() => setContractOpen(false)}
              children={t('contract.back')}
            />
          </div>
        </div>
      </Modal>
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
                <div className="group cursor-pointer mb-1">
                  <div className="flex justify-between">
                    <Button 
                      type="transparent"
                      onClick={() => setClient(client)}
                      children={`@${client.login}`}
                    />
                    <Button 
                      type="transparent"
                      onClick={() => {
                        removeClient({
                          variables: {
                            agentId: user.id,
                            clientId: parseInt(client.id.toString())
                          }
                        });
                        setClient(null);
                      }}
                      children={<UserRemoveIcon className="w-5 h-5" />}
                      className="text-primary invisible group-hover:visible"
                    />
                  </div>
                </div>
              )
            }
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
              contacts?.filter((contact: UserType) => !clients?.some((singleContact: UserType) => singleContact.id === contact.id))?.map((contact: UserType) => 
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
        <div className='inline-block w-full h-full'>
          {!!client && 
            <div className="flex h-full">
              <SaleLevel client={client} agentId={user.id} generateContract={() => setContractOpen(true)}/>
              <ClientMeetings client={client} agentId={user.id} />
            </div>
          }
        </div>
      </div>
    </div>
  );
}

export default AccountClients;