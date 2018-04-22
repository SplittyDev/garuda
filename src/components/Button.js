import React from 'react'
import styled from 'styled-components';

const buttonColors = {
    'positive': 'hsl(165, 83%, 37%)',
    'positive:hover': 'hsl(165, 80%, 35%)',
    'neutral': 'hsl(198, 63%, 37%)',
    'neutral:hover': 'hsl(198, 60%, 35%)',
    'negative': 'hsl(0, 63%, 40%)',
    'negative:hover': 'hsl(0, 60%, 38%)',
    'edit': 'hsl(0, 0%, 35%)',
    'edit:hover': 'hsl(0, 0%, 30%)',
    'image': 'transparent',
    'image:hover': 'transparent',
}

const Button = ({className, children, type, onClick}) => (
    <div tabIndex="0" className={className} onClick={onClick}>
        {children}
    </div>
)

export default styled(Button)`
    display: flex;
    justify-content: center;
    align-items: center;
    color: ${props => props.color || 'white'};
    cursor: pointer;
    background-color: ${props => buttonColors[props.type] || 'hsl(0,0%,25%)'};
    transition: 100ms ease-in-out;
    padding: ${props => props.type === 'image' ? 'none' : '.75rem 1rem'};
    flex-grow: ${props => props.grow ? 1 : 0};
    font-size: ${props => props.fontSize || '1rem'};
    outline: none;

    &:active, &:focus, &:hover {
        ${props => props.hoverColor ? `color: ${props.hoverColor};` : ''}
        background-color: ${props => buttonColors[`${props.type}:hover`] || 'hsl(0,0%,20%)'};
    }

    &:focus {
        transform: scale(1.025);
    }
`