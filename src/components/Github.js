import React from "react";
import "../styles/Github.css";

const Github = () => {
    return (
        <div className='developer'>
            <a
                href='https://jarjardinks.github.io/the-portfolio/'
                className='developer-link'
                target='_blank'
                rel='noreferrer'
            >
                <img
                    src={`${process.env.PUBLIC_URL}/assets/developer_icon.gif`}
                    alt='developer-icon'
                    className='developer-icon'
                />
            </a>
        </div>
    );
};

export default Github;
