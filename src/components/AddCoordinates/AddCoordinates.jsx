import React from 'react'
import { Grid } from '@material-ui/core'
import Inputs from '../GoogleMap/Inputs'
import TabsInfo from '../TabsInfo/TabsInfo'

export default () => {
    return (
        <>
            <h1>Управление маршрутизацией</h1>

            <Grid spacing={4} container direction="row" justify="center" alignItems="center">
                <Grid xs={12} md={5} item>
                    <Inputs />
                </Grid>
                <Grid xs={12} md={7} item>
                    <TabsInfo />
                </Grid>
            </Grid>
        </>
    )
}
