import { Fragment } from "react";

const Rank = ({ name, entries }) => {
    return (
        <Fragment>
            <div className="black f3">
                {`${name}, your current rank is...`}
            </div>
            <div className="black f3">
                {entries}
            </div>
        </Fragment>
    )
}

export default Rank;