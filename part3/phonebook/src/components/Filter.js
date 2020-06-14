import React from 'react';

const Filter = (props) => {
    const { searchName,
            handleInputSearchName
    } = props

    return (
        <div>
            search by name: <input
                                value={searchName}
                                onChange={handleInputSearchName} />
        </div>
    )
}

export default Filter
