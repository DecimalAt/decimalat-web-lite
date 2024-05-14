import React from 'react'
import './style.css';
import { useParams } from 'react-router-dom';
import Vrf from '../vrf';
import Finance from '../finance';
import NotFound from '../404';
import ComingSoon from '../comingSoon';

// Define props interface if needed

interface CreateAppProps {
    // Define props if any
  }


const  CreateApp: React.FC<CreateAppProps> =() => {

  let { appName } = useParams<{ appName: string }>();

  const formattedAppName = appName?.toLowerCase().replace(/\s/g, '');
 
  switch (formattedAppName) {
    case 'vrf':
      return <Vrf />;
    case 'finance':
      return <Finance />;
    case 'comingsoon':
      return <ComingSoon/>
    default:
      return <NotFound/>;
  }
}


export default CreateApp

