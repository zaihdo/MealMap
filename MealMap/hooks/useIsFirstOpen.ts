import * as React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function useIsFirstOpen() {
    const [isFirstTime, setIsFirsttime] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(true);

    React.useEffect(()=> {
       async function checkFirstTimeOpen() {
        try {
            const hasOpened = AsyncStorage.getItem("hasOpened");

            if (hasOpened === null){
                setIsFirsttime(true); //set it in async storage later after user approves permissions
            } else {
                setIsFirsttime(false);
            }
        }
        catch (e) {
            console.error(`Error in getting first time open indicator ${e}`)
        }
        finally {
            setIsLoading(false);
        }
       }
       checkFirstTimeOpen();
    }, [])

    return {isFirstTime, isLoading};
}


