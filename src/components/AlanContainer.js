import alanBtn from '@alan-ai/alan-sdk-web';
import React, {useEffect, useRef} from "react";
import { useFormContext } from 'react-hook-form';
const AlanContainer = (props) => {
    const rootElRef = useRef(null);
    const methods = useFormContext();

    useEffect(() => {
        alanBtn({
            key: '26516bc7a448741ead2804a6795b09912e956eca572e1d8b807a3e2338fdd0dc/stage',
            onCommand: (commandData) => {
              if (commandData.command === 'go:back') {
                // Call the client code that will react to the received command
              }

              if(commandData.command === 'getAmount'){
                useEffect(() => {

                  alert(commandData.value);
                methods.setValue(document.getElementById('amount'), commandData.value);
                document.getElementById('amount').placeholder = commandData.value;
                }, []);
              }
            }
        });
      }, []);
    return (
        <div className='alan-btn-container'>
        <div ref={rootElRef}></div>       
            </div>
    )
}

export default AlanContainer;