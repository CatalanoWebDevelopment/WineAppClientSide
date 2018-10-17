import React from 'react'
import styled from 'styled-components'
import Grid from '@material-ui/core/Grid'
import Styles from './Styles/Styles.css'

const CenteredP = styled.h3`
    text-align: center;
    font-family: 'Roboto';
    font-size: 16px;
    color: white;
    padding: 10px;
    margin: 0;
    clear: both;
`

const Footer = () => {
    return (
        <Grid item xs={12} className="NoPadding">
            <CenteredP className="gradient">&copy; Parker Catalano 2018</CenteredP>
        </Grid>
    )
}

export default Footer;