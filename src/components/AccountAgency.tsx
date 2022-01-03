import { useQuery } from "@apollo/client";
import classNames from "classnames";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import FIND_AGENTS from "../graphql/queries/findAgents";
import { handleError } from "../utility/ErrorUtils";
import Button from "./Button";
import Input from "./Input";
import Modal from "./Modal";
import Spinner from "./Spinner";

const addClass = classNames(
  "border-2 border-primary border-dashed hover:border-solid text-primary",
  "p-10 rounded-lg font-bold opacity-20 hover:opacity-100"
);

const AccountAgency: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [inviteOpen, setInviteOpen] = useState<boolean>(false);
  const [agentSearch, setAgentSearch] = useState<string>('');
  const { data: agentsData, error: agentsError, loading: agenstLoading } = useQuery(FIND_AGENTS, {
    variables: {
      searchPhrase: agentSearch
    },
    errorPolicy: 'all'
  });
  const agents = agentsData?.findAgents;

  console.log(agents);
  
  useEffect(() => {
    handleError(agentsError, dispatch);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [agentsError]);

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
          <div className="flex flex-col">

          </div>
        </div>
      </Modal>
      <div className='w-full h-full rounded-md shadow-md flex p-4 relative'>
        {agenstLoading ? 
        <Spinner className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" /> :
        <div>
          <div>
            <Button 
              type="link"
              onClick={() => setInviteOpen(true)}
              children={
                <div className={addClass}>
                  {t('account_agency.add_agents')}
                </div>
              }
            />
          </div>
        </div>}
      </div>
    </div>
  );
}

export default AccountAgency;