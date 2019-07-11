import React from 'react'
import GoogleMap from '../components/GoogleMap/GoogleMap'
import { Container } from '@material-ui/core'
import AddCoordinates from '../components/AddCoordinates/AddCoordinates'
import { connect } from 'react-redux'
import { push } from 'connected-react-router'

export default connect(
    state => ({
        person: state.person,
    }),
    { push },
)(
    // Component
    props => {
        if (!props.person.data.name) {
            props.push('/')
            return null
        } else {
            return (
                <div className="location">
                    <Container style={{ minHeight: '50vh' }}>
                        <AddCoordinates />
                    </Container>
                    <div style={{ height: '50vh' }}>
                        <GoogleMap />
                    </div>
                </div>
            )
        }
    },
)
