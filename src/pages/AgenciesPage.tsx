import { useQuery } from "@apollo/client";
import { BackspaceIcon } from "@heroicons/react/outline";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import AgencyCard from "../components/AgencyCard";
import Button from "../components/Button";
import Container from "../components/Container";
import Input from "../components/Input";
import GET_AGENCIES from "../graphql/queries/getAgencies";
import { UserType } from "../interfaces/UserInterface";
import { handleError } from "../utility/ErrorUtils";

const AgenciesPage: React.FC = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [searchPhrase, setSearchPhrase] = useState<string>('');
  const { data: agenciesData, error: agenciesError, loading: agenciesLoading } = useQuery(GET_AGENCIES, {
    variables: {
      searchPhrase: searchPhrase
    },
    errorPolicy: 'all'
  });
  const agencies = agenciesData?.getAgencies;

  useEffect(() => {
    handleError(agenciesError, dispatch);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [agenciesError]);

  return (
    <Container>
      <div className="pt-24">
        <div className="px-16">
          <div>{t('agencies.filter')}</div>
          <div className="w-full flex items-center">
            <Input 
              type="text"
              value={searchPhrase}
              onChange={e => setSearchPhrase(e.target.value)}
              willDisplayError={false}
              className="border-opacity-100"
            />
            <Button 
              type='transparent'
              onClick={() => setSearchPhrase('')}
              children={<BackspaceIcon className="w-10 h-10 text-primary ml-3" />}
            />
          </div>
        </div>
        {agenciesLoading ? 
          <div className='max-h-screen overflow-y-auto scrollbar-none animate-pulse mt-8'>
            {[ ...Array(5) ].map(() => 
              <div className='w-full h-44 mt-2 border-2 border-gray-100 rounded-md flex'>
                <div className='w-44 h-full bg-gray-100'></div>
                <div className='flex-grow flex flex-col justify-evenly px-2'>
                  <div className='h-6 w-64 rounded-full bg-gray-100'></div>
                  <div className='h-4 w-48 rounded-full bg-gray-100'></div>
                  <div className='h-4 w-52 rounded-full bg-gray-100'></div>
                  <div className='h-4 w-36 rounded-full bg-gray-100'></div>
                </div>
              </div>
            )}
          </div> :
          <div className="max-h-screen overflow-y-auto scrollbar-none mt-8">
            {agencies?.map((agency: UserType) => 
              <AgencyCard agency={agency} />
            )}
          </div>
      }
      </div>
    </Container>
  );
}

export default AgenciesPage;