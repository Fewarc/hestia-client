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
import { typeOfNotification } from "../interfaces/NotificationInterface";
import { UserType } from "../interfaces/UserInterface";
import { getUserData } from "../selectors/UserSelector";
import { handleError } from "../utility/ErrorUtils";
import AgentCard from "./AgentCard";
import Button from "./Button";
import Input from "./Input";
import Modal from "./Modal";
import Spinner from "./Spinner";

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

const AccountAgency: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const agency = useSelector<UserType, UserType>(state => getUserData(state));
  const [inviteOpen, setInviteOpen] = useState<boolean>(false);
  const [agentSearch, setAgentSearch] = useState<string>('');
  const { data: agencyAgentsData, error: agencyAgentsError, loading: agencyAgenstLoading } = useQuery(GET_AGENTS, {
    variables: {
      agencyId: parseInt(agency.id.toString())
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

  useEffect(() => {
    handleError(agentsError, dispatch);
    handleError(inviteError, dispatch);
    handleError(agencyAgentsError, dispatch);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [agentsError, inviteError, agencyAgentsError]);

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
                      senderId: parseInt(agency.id.toString()),
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
      <div className="flex flex-col w-full h-full rounded-md shadow-md p-4">
        <div className="mb-4 text-3xl font-thin">{t('agencies.your_employees')}</div>
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
              <div>
                <AgentCard agent={agent.agent} saleLevels={agent.saleLevels} totalClients={agent.totalClients} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AccountAgency;