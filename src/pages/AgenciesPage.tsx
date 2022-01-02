import { useQuery } from "@apollo/client";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import AgencyCard from "../components/AgencyCard";
import Container from "../components/Container";
import GET_AGENCIES from "../graphql/queries/getAgencies";
import { UserType } from "../interfaces/UserInterface";
import { handleError } from "../utility/ErrorUtils";

const AgenciesPage: React.FC = () => {
  const dispatch = useDispatch();
  const { data: agenciesData, error: agenciesError, loading: agenciesLoading } = useQuery(GET_AGENCIES, { errorPolicy: 'all' });
  const agencies = agenciesData?.getAgencies;

  useEffect(() => {
    handleError(agenciesError, dispatch);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [agenciesError]);

  return (
    <Container>
      <div className="pt-24">
        {agenciesLoading ? 
          <div className='max-h-screen overflow-y-auto scrollbar-none animate-pulse'>
            {[ ...Array(6) ].map(() => 
              <div className='w-full h-36 mt-2 border-2 border-gray-100 rounded-md flex'>
                <div className='w-40 h-full bg-gray-100'></div>
                <div className='flex-grow flex flex-col justify-evenly px-2'>
                  <div className='h-6 w-64 rounded-full bg-gray-100'></div>
                  <div className='h-4 w-48 rounded-full bg-gray-100'></div>
                  <div className='h-4 w-52 rounded-full bg-gray-100'></div>
                  <div className='h-4 w-36 rounded-full bg-gray-100'></div>
                </div>
              </div>
            )}
          </div> :
        <div className="max-h-screen overflow-y-auto scrollbar-none">
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