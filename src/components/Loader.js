import React , {useState} from 'react'
import HashLoader from "react-spinners/HashLoader";

function Loader() {

    let [loading, setLoading] = useState(true);
    let [color, setColor] = useState("#ffffff");

    return (
        <div className='text-center alignCenter'>
            <div className="sweet-loading filter m-1">
                <HashLoader
                    color='#000'
                    loading={loading}
                    size={80}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                />
            </div>
        </div>
    )
}

export default Loader
