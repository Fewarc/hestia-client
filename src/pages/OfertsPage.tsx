import React, { useState } from "react";
import Container from "../components/Container";
import { ChevronLeftIcon } from "@heroicons/react/outline";
import classNames from "classnames";
import Button from "../components/Button";
import OfertsFilterMenu from "../components/OfertsFilterMenu";

const iconCLass = classNames(
  'w-10',
  'h-10',
  'transition',
  'dutaion-1000',
  'transform'
);

const OfertsPage: React.FC = () => {
  const [mapOpen, setMapOpen] = useState(false);

  return (
    <Container className=''>
      <div className='absolute mt-24'>
        <OfertsFilterMenu />
      </div>
      <div className='absolute right-0 flex items-center justify-evenly shadow-md h-full w-14'>
        <Button 
          type='transparent'
          onClick={() => setMapOpen(!mapOpen)}
          children={<ChevronLeftIcon className={`${iconCLass} ${mapOpen && 'rotate-180'} text-primary`}/>}
        />
        {/* GOOGLE MAP HERE IF OPEN */}
      </div>
    </Container>
  );
}

export default OfertsPage;