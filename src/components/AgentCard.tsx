import React from "react";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import { UserType } from "../interfaces/UserInterface";
import { getBgColors, getBorderColors } from "../utility/ClientsUtils";
import { parseDate } from "../utility/DateUtils";
import Button from "./Button";

interface AgentCardProps {
  agent: UserType,
  saleLevels: number[],
  totalClients: number
}

const borderColors = getBorderColors();
const bgColors = getBgColors();

const AgentCard: React.FC<AgentCardProps> = ({
  agent,
  saleLevels,
  totalClients
}) => {
  const { t } = useTranslation();
  const history = useHistory();

  return (
    <div className="p-4 rounded-md shadow-md flex gap-10 h-64 items-center">
      <div className="h-full">
        <div className="flex flex-col">
          <Button
            type="transparent"
            onClick={() => history.push('/account/contacts')}
            children={
              <div className="text-xl font-black text-left">
                @{agent.login}
              </div>
            }
          />
          <div className="flex gap-2 my-2 text-lg">
            <div>{agent.firstName}</div>
            <div>{agent.lastName}</div>
          </div>
        </div>
        <div className="flex gap-2">
          <div>{t('agencies.total_clients')}</div>
          <div>{totalClients}</div>
        </div>
        <div className="flex flex-col gap-2 mt-2">
          <div>{t('agencies.last_log_in')}</div>
          <div>{`${parseDate(agent.lastLogIn)} ${new Date(agent.lastLogIn).getHours()}:${new Date(agent.lastLogIn).getMinutes()}`}</div>
        </div>
      </div>
      <div className="flex flex-col gap-1">
        <div>{t('agencies.agent_sales')}</div>
        {saleLevels.map((level: number, index: number) => 
          <div key={index + ''} className={`border rounded-md text-center font-bold ${borderColors[index]} ${bgColors[index]}`}>
            {level}
          </div>
        )}
      </div>
    </div>
  );
}

export default AgentCard;