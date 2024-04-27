import React, { useContext } from 'react';
import AuthContext from '../../context/authcontext';
import User from '../Routes/User/User';
import Conductor from '../Routes/Conductor/Conductor';
function Main()
{
    const {isConductor} = useContext(AuthContext)

    return(
        <div>
            
            {isConductor}
             { isConductor === false && <> <User />
            </>}
             { isConductor === true && <> <Conductor />
            </>}
        </div>
    );
}
export default Main;