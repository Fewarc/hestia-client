import { useMutation, useQuery } from "@apollo/client";
import { UserAddIcon } from "@heroicons/react/outline";
import classNames from "classnames";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { pushAlert } from "../actions/AlertsActions";
import Config from "../constants/Config";
import CREATE_NOTIFICATION from "../graphql/mutations/createNotification";
import FIND_AGENTS from "../graphql/queries/findAgents";
import GET_AGENTS from "../graphql/queries/getAgencyAgents";
import GET_AGENCY_STATS from "../graphql/queries/getAgencyStats";
import { typeOfNotification } from "../interfaces/NotificationInterface";
import { UserType } from "../interfaces/UserInterface";
import { getUserData } from "../selectors/UserSelector";
import { handleError } from "../utility/ErrorUtils";
import AgentCard from "./AgentCard";
import Button from "./Button";
import Input from "./Input";
import Modal from "./Modal";
import Spinner from "./Spinner";
import { PieChart, Pie, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { getBgColors } from "../utility/ClientsUtils";
import { parseDate } from "../utility/DateUtils";
import { downloadPdf } from "../utility/pdfUtils";
import { normalizePath } from "../utility/PathUtils";

type AgentType = {
  agent: UserType,
  saleLevels: number[],
  totalClients: number
}

const addClass = classNames(
  "border-2 border-primary border-dashed hover:border-solid text-primary",
  "p-10 rounded-lg font-bold opacity-20 hover:opacity-100",
  "h-64 w-72 flex items-center justify-center text-xl"
);

const bgColors = getBgColors();
const COLORS = ['#ddd6fe', '#bbf7d0', '#a5f3fc', '#fbcfe8', '#fed7aa', '#fecaca'];

const AccountAgency: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const agency = useSelector<UserType, UserType>(state => getUserData(state));
  const [inviteOpen, setInviteOpen] = useState<boolean>(false);
  const [raportOpen, setRaportOpen] = useState<boolean>(false);
  const [agentSearch, setAgentSearch] = useState<string>('');
  const agencyId = parseInt(agency.id.toString());
  const { data: statsData, error: statsError } = useQuery(GET_AGENCY_STATS, {
    variables: {
      agencyId: agencyId
    },
    errorPolicy: 'all'
  });
  const { data: agencyAgentsData, error: agencyAgentsError, loading: agencyAgenstLoading } = useQuery(GET_AGENTS, {
    variables: {
      agencyId: agencyId
    }
  });
  const { data: agentsData, error: agentsError } = useQuery(FIND_AGENTS, {
    variables: {
      searchPhrase: agentSearch
    },
    errorPolicy: 'all'
  });
  const [ inviteAgent, { data: inviteData, error: inviteError } ] = useMutation(CREATE_NOTIFICATION, { errorPolicy: 'all' });
  const searchAgents = agentsData?.findAgents;
  const agents = agencyAgentsData?.getAgnecyAgents;
  const stats = statsData?.getAgencyStats;
  const data = stats?.saleLevels.map((level: number, index: number) => ({ name: t(`account_clients.sale.${index}`), value: level }));
  const categories = stats?.offerCategories.map((category: number, index: number) => ({ name: t(`account_agency.category.${index}`), value: category }));
  const agencyAlias = `${normalizePath(agency.firstName)}`;

  useEffect(() => {
    handleError(agentsError, dispatch);
    handleError(inviteError, dispatch);
    handleError(agencyAgentsError, dispatch);
    handleError(statsError, dispatch);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [agentsError, inviteError, agencyAgentsError, statsError]);

  useEffect(() => {
    if (inviteData) {
      dispatch(pushAlert({
        type: Config.INFO_ALERT,
        message: t('agencies.invited') + `(${inviteData?.createNotification?.targetId})`
      }))
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inviteData]);

  return (
    <div className='w-full h-full p-10 pt-24'>
      <Modal open={inviteOpen} onClickAway={() => setInviteOpen(false)}>
        <div className="w-full h-full p-10">
          <Input 
            label={t('account_agency.search_agents')}
            type="text"
            value={agentSearch}
            onChange={e => setAgentSearch(e.target.value)}
            willDisplayError={false}
          />
          {!!agentSearch.length && <div className="flex flex-col mt-2 gap-2">
            {searchAgents?.map((agent: UserType) => 
              <div className="flex justify-between p-2 px-4 hover:bg-gray-50 rounded-md">
                <div>{agent.login}</div>
                <Button 
                  type="transparent"
                  onClick={() => inviteAgent({
                    variables: {
                      senderId: agencyId,
                      targetId: parseInt(agent.id.toString()),
                      content: `${Config.AGENCY_INVITE_PREFIX}You have been invited to join ${agency.firstName}!`,
                      type: typeOfNotification.INVITE
                    }
                  })}
                  children={<UserAddIcon className="text-primary h-5 w-5" />}
                />
              </div>
            )}
          </div>}
        </div>
      </Modal>
      {stats && <Modal open={raportOpen} onClickAway={() => setRaportOpen(false)} capWidth={false}>
        <div className="p-10 flex flex-col justify-center items-center gap-10 max-h-screen overflow-y-auto">
          <div id={`${agencyAlias}`}
            style={{
              width: '210mm',
              backgroundColor: 'white',
            }}
            className="border-t border-l border-r border-gray-200 px-20 py-4 mt-32"
          >
            <div className="w-full text-center text-xl font-bold mb-8 mt-8">{agency.firstName} {t('raport.part_1')} {parseDate(new Date())}</div>
            <div>{t('account_agency.agents')}: {stats?.totalAgents}</div>
            <div>{t('account_agency.clients')}: {stats?.totalClients}</div>
            <div>{t('account_agency.offers')}: {stats?.agencyOffers}</div>
            <div>{t('account_agency.meetings')}: {stats?.agentsMeetings}</div>
            <div>{t('account_agency.messages')}: {stats?.messagesSentByAgents}</div>
            <div className="flex flex-col items-center mb-8">
              <div className="flex items-center gap-10">
                <div className="w-64 h-64 mt-4 font-bold">
                  <div className="font-normal">{t('account_agency.sale')}</div>
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart width={400} height={400}>
                      <Pie 
                        isAnimationActive={false}
                        data={data}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        innerRadius={40}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label
                      >
                        {data.map((entry: any, index: number) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex flex-col mt-16">
                  {data.map((sale: number, index: number) => 
                    <div className="flex items-center">
                      <div className={`w-4 h-4 ${bgColors[index]} mr-2`}></div>
                      <div>{t(`account_clients.sale.${index}`)}</div>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-10">
                <div className="w-64 h-64 mt-4 font-bold">
                  <div className="font-normal">{t('account_agency.offer_categories')}</div>
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart width={400} height={400}>
                        <Pie 
                          isAnimationActive={false}
                          data={categories}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          innerRadius={40}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                          label
                        >
                          {data.map((entry: any, index: number) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                </div>
                <div className="flex flex-col mt-16">
                  {data.map((sale: number, index: number) => 
                    <div className="flex items-center">
                      <div className={`w-4 h-4 ${bgColors[index]} mr-2`}></div>
                      <div>{t(`account_agency.category.${index}`)}</div>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="w-full text-center text-xl font-bold mb-8 mt-8">{t('raport.agents')}</div>
            {agents?.map((agent: AgentType) => 
              <div>
                {agent.agent.firstName} {!!agent.agent.lastName && `${agent.agent.lastName},`} @{agent.agent.login}, {t('raport.total_clients')} {agent.totalClients}
              </div>
            )}
          </div>
          <div className="flex justify-center items-center mt-8 gap-20">
            <Button 
              type="primary"
              onClick={() => downloadPdf(`${agencyAlias}`)}
              children={t('account_clients.download')}
            />
            <Button 
              type="filled"
              onClick={() => setRaportOpen(false)}
              children={t('contract.back')}
            />
          </div>
        </div>
      </Modal>}
      <div className="flex flex-col rounded-md shadow-md w-full h-full">
        {stats && 
          <div className="p-4">
            <div className="mb-4 text-3xl font-thin">{t('account_agency.statistics')}</div>

              <div className="flex justify-between">
                <div className="flex flex-col">
                  <div>{t('account_agency.agents')}</div>
                  <div className="font-black text-3xl">{stats.totalAgents}</div>
                </div>
                <div className="flex flex-col">
                  <div>{t('account_agency.clients')}</div>
                  <div className="font-black text-3xl">{stats.totalClients}</div>
                </div>
                <div className="flex flex-col">
                  <div>{t('account_agency.offers')}</div>
                  <div className="font-black text-3xl">{stats.agencyOffers}</div>
                </div>
                <div className="flex flex-col">
                  <div>{t('account_agency.meetings')}</div>
                  <div className="font-black text-3xl">{stats.agentsMeetings}</div>
                </div>
                <div className="flex flex-col">
                  <div>{t('account_agency.messages')}</div>
                  <div className="font-black text-3xl">{stats.messagesSentByAgents}</div>
                </div>
              </div>

              <div className="flex justify-evenly">
                <div className="flex items-center gap-10">
                  <div className="w-64 h-64 mt-4 font-bold">
                    <div className="font-normal">{t('account_agency.sale')}</div>
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart width={400} height={400}>
                        <Pie 
                          data={data}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          innerRadius={40}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                          label
                        >
                          {data.map((entry: any, index: number) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="flex flex-col mt-16">
                    {data.map((sale: number, index: number) => 
                      <div className="flex items-center">
                        <div className={`w-4 h-4 ${bgColors[index]} mr-2`}></div>
                        <div>{t(`account_clients.sale.${index}`)}</div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-10">
                  <div className="w-64 h-64 mt-4 font-bold">
                    <div className="font-normal">{t('account_agency.offer_categories')}</div>
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart width={400} height={400}>
                          <Pie 
                            data={categories}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            innerRadius={40}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                            label
                          >
                            {data.map((entry: any, index: number) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip />
                        </PieChart>
                      </ResponsiveContainer>
                  </div>
                  <div className="flex flex-col mt-16">
                    {data.map((sale: number, index: number) => 
                      <div className="flex items-center">
                        <div className={`w-4 h-4 ${bgColors[index]} mr-2`}></div>
                        <div>{t(`account_agency.category.${index}`)}</div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="w-full flex justify-center mt-10">
                <Button 
                  type="primary"
                  onClick={() => setRaportOpen(true)}
                  children={t('account_agency.raport')}
                />
              </div>
          </div>
        }
        <div className="flex flex-col p-4 flex-grow">
          {!agencyAgenstLoading && <div className="mb-4 text-3xl font-thin">{t('agencies.your_employees')}</div>}
          <div className='w-full h-full flex gap-4 relative'>
            {agencyAgenstLoading ? 
            <Spinner className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" /> :
            <div className="h-full">
              <Button 
                type="link"
                onClick={() => setInviteOpen(true)}
                children={
                  <div className={addClass}>
                    {t('account_agency.add_agents')}
                  </div>
                }
              />
            </div>}
            <div className="flex-grow flex">
              {agents?.map((agent: AgentType) => 
                <div className="mr-4">
                  <AgentCard agent={agent.agent} saleLevels={agent.saleLevels} totalClients={agent.totalClients} />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AccountAgency;