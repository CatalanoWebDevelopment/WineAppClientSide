import React from 'react'
import styled from 'styled-components'
import Grid from '@material-ui/core/Grid'
import Colors from './Styles/Colors'
import Styles from './Styles/Styles.css'

const Title = styled.h1`
    font-family: 'Roboto';
    color: white;
    padding: 10px;
    margin: 0;
    text-align: center;
`

const Anchor = styled.a`
    text-decoration: none;
    color: white;
    font-size: 32px;
`

const Header = () => {
    return(
        <Grid item xs={12}>
            <Title className="gradient"><Anchor href="/">WineMaster</Anchor></Title>
        </Grid>
    )
}

export default Header;