import React from 'react'

const itemStyle = {
    margin: '2em',
    padding: '2em',
    background: '#f3f3f3',
    boxShadow: '0 5px 10px rgba(135,135,151,0.14)',
    borderRadius: '5px',
    textAlign: 'center',
    width: '300px'
};

export default function Item( props ) {
    const { title, url } = props;

    return (
        <li style={itemStyle}>
            <h2>{title}</h2>
            <img src={url} alt="" width={200}/>
        </li>
    )
}
