import React from 'react'
import './style.css';
import AppCard from '../../components/appCard';

interface IntentProps {
    // Define props if any
}

const appCardsData = [
    {
        appName: "VRF",
        description: "Function that generates random number",
        //   AppIcon: FunctionsIcon,
        Apps: 1,
    },
    {
        appName: "Finance",
        description: "Displays finances information",
        //   AppIcon: AttachMoneyTwoToneIcon,
        Apps: 1,
    },
    {
        appName: "Coming Soon",
        description: "Coming Soon",
        //   AppIcon: HourglassBottomTwoToneIcon,
        Apps: 0,
    },
    {
        appName: "Coming Soon",
        description: "Coming Soon",
        //   AppIcon: HourglassBottomTwoToneIcon,
        Apps: 0,
    },
    {
        appName: "Coming Soon",
        description: "Coming Soon",
        //   AppIcon: HourglassBottomTwoToneIcon,
        Apps: 0,
    },

];


const Intent: React.FC<IntentProps> = () => {
  

    return (
        <div className="app-cards-container">
            {appCardsData.map((card, index) => (
                <AppCard
                    key={index}
                    appName={card.appName}
                    description={card.description}
                    appCount={card.Apps}
                />
            ))}
        </div>
    )
}


export default Intent

