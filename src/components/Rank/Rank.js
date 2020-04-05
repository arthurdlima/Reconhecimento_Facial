import React from 'react';

const Rank = (props) => {

    const {name, entries} = props;
    /* entries props was sometimes a string ("12")
    or object (obj = Obj), so there was errors when
    updating the front end. Used object.values to
    always get the number even from within the object*/
    let entr = '';
    if(entries) {
        entr = Object.values(entries);
    }
    
    return(
        <div>
            <div className='white f3'>
                {`${name}, N.º de pesquisas...`}
            </div>
            <div className='white f1'>
                {entr}
            </div>
        </div>
    );
};

export default Rank;