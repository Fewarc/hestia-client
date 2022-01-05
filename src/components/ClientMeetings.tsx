import { useQuery } from "@apollo/client";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import GET_CLIENTS_EVENTS from "../graphql/queries/getClientsEvents";
import { UserType } from "../interfaces/UserInterface";
import { parseDate } from "../utility/DateUtils";
import { handleError } from "../utility/ErrorUtils";
import Button from "./Button";

interface ClientsMeetingsProps {
  client: UserType,
  agentId: number
}

const ClientMeetings: React.FC<ClientsMeetingsProps> = ({
  client,
  agentId
}) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const history = useHistory();
  const { data, error } = useQuery(GET_CLIENTS_EVENTS, {
    variables: {
      clientId: parseInt(client.id.toString()),
      agentId: agentId
    },
    errorPolicy: 'all'
  });
  const pastEvents = data?.getClientEvents?.pastEvents;
  const futureEvents = data?.getClientEvents?.futureEvents;

  useEffect(() => {
    handleError(error, dispatch);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error])

  return (
    <div className="w-72 border-l border-gray-100 p-3">
      <div className="flex flex-col">
        <div className="font-bold">
          {t('account_clients.past')}
        </div>
        {pastEvents?.map((pastEvent: any) => 
          <Button 
            type="transparent"
            onClick={() => history.push({
              pathname: '/account/notes',
              state: {
                meeting: pastEvent.eventName
              }
            })}
            children={
              <div className="flex flex-col items-start">
                <div>{pastEvent.eventName}</div>
                <div>{parseDate(pastEvent.eventOccuranceDate)}</div>
              </div>
            }
          />  
        )}
      </div>
      <div className="flex flex-col mt-2">
        <div className="font-bold">
          {t('account_clients.future')}
        </div>
        {futureEvents?.map((futureEvent: any, index: number) => 
          <Button 
            type="transparent"
            onClick={() => history.push({
              pathname: '/account/notes',
              state: {
                meeting: futureEvent.eventName
              }
            })}
            children={
              <div className="flex flex-col items-start">
                <div>{futureEvent.eventName}</div>
                <div>{parseDate(futureEvent.eventOccuranceDate)}</div>
              </div>
            }
            className={`py-1 ${!!index && 'border-t border-gray-100'}`}
          />  
        )}
      </div>
    </div>
  );
}

export default ClientMeetings;