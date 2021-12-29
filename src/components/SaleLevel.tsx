import { useMutation, useQuery } from "@apollo/client";
import { ChevronLeftIcon } from "@heroicons/react/outline";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import UPDATE_SALE from "../graphql/mutations/updateSaleLevel";
import GET_SALE_LEVEL from "../graphql/queries/getSaleLevel";
import { UserType } from "../interfaces/UserInterface";
import { getBgColors, getBorderColors } from "../utility/ClientsUtils";
import { handleError } from "../utility/ErrorUtils";
import Button from "./Button";
import Spinner from "./Spinner";

interface SalesLevelProps {
  client: UserType,
  agentId: number
}

const borderColors = getBorderColors();
const bgColors = getBgColors();


const SaleLevel: React.FC<SalesLevelProps> = ({
  client,
  agentId
}) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { data, error, loading, refetch: refetchSaleLevel } = useQuery(GET_SALE_LEVEL, {
    variables: {
      clientId: parseInt(client.id.toString())
    }
  });
  const [ updateSale, { data: updateData, error: updateError, loading: updateLoading } ] = useMutation(UPDATE_SALE, { errorPolicy: 'all' });
  const saleLevel: number = data?.getSaleLevel;  
  const [updateSaleLevel, setUpdateSaleLevel] = useState<number>(saleLevel);

  useEffect(() => {
    setUpdateSaleLevel(saleLevel);
  }, [saleLevel]);

  useEffect(() => {
    handleError(error, dispatch);
    handleError(updateError, dispatch);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error, updateError])

  useEffect(() => {
    if (updateData?.updateSaleLevel) {
      refetchSaleLevel();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updateData]);

  return (
    <div className="relative h-full p-3 pb-8 w-full">
      {loading ? 
        <Spinner className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2' /> :  
        <div className="flex flex-col w-full h-full gap-4">
          <div className="text-2xl font-light mb-2">
            {t('account_clients.sale_level')}
          </div>
          {[ ...Array(6) ].map((_sale: any, index: number) => 
            <div className="flex items-center justify-between flex-grow">
              <Button 
                type='link'
                onClick={() => setUpdateSaleLevel(index)}
                children={t(`account_clients.sale.${index}`)}
                className={`rounded-lg border-4 text-center h-full w-full ${ updateSaleLevel === index ? 'text-3xl' : 'text-xl text-dark-gray text-opacity-10 hover:text-opacity-30'} transform duration-300 font-black ${borderColors[index]} ${bgColors[index]}`}
              />
              <div className="w-7/12">
                {updateSaleLevel === index && 
                  <div className="flex items-center justify-center">
                    <ChevronLeftIcon className="w-7 h-7" />
                    <div className="text-2xl font-black">
                      @{client.login}
                    </div>
                  </div>
                }
              </div>
            </div>
          )}
          <div className="flex justify-center mt-4">
            <Button 
              type="primary"
              onClick={() => updateSale({
                variables: {
                  agentId: agentId,
                  clientId: parseInt(client.id.toString()),
                  saleLevel: updateSaleLevel
                }
              })}
              children={t('account_clients.update')}
              disabled={saleLevel === updateSaleLevel}
            />
          </div>
        </div>
      }
    </div>
  );
}

export default SaleLevel;