import React from 'react'

import { Grid, Container } from '@material-ui/core'

import { connect } from 'react-redux'
import AddDataPerson from '../components/AddDataPerson/AddDataPerson'

import Progress from '../components/LineProgress/LineProgress'

export default connect(state => ({
    person: state.person,
}))(
    /** Function Component */
    props => {
        console.log('props in addPerson Component', props)

        return (
            <Container fixed>
                <Grid
                    container
                    style={
                        {
                            // height: '100vh'
                        }
                    }
                    direction="column"
                    justify="center"
                    alignItems="center">
                    {props.person.isSend ? <Progress /> : null}

                    <AddDataPerson />
                </Grid>
            </Container>
        )
    },
)
