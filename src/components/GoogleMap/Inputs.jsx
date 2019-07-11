import React from 'react'
import TextField from '@material-ui/core/TextField'
import { Grid } from '@material-ui/core'
import { googleMapURL } from '../../utils/config'
import { connect } from 'react-redux'
import { changePlaces } from '../../ducks/location'

const { compose, withProps, lifecycle } = require('recompose')
const { withScriptjs } = require('react-google-maps')
const { StandaloneSearchBox } = require('react-google-maps/lib/components/places/StandaloneSearchBox')

const PlacesWithStandaloneSearchBox = compose(
    withProps({
        googleMapURL,
        loadingElement: <div style={{ height: `100%` }} />,
        containerElement: <div style={{ height: `400px` }} />,
    }),
    lifecycle({
        componentWillMount() {
            const refs = {}

            // const { location } = this.props

            this.setState({
                places1: [], // приходят массивом
                places2: [],
                onSearchBoxMounted1: ref => {
                    refs.searchBox1 = ref
                },
                onSearchBoxMounted2: ref => {
                    refs.searchBox2 = ref
                },

                onPlacesChanged: () => {
                    const places1 = refs.searchBox1.getPlaces()
                    const places2 = refs.searchBox2.getPlaces()
                    // console.log(places1, places2)
                    this.setState({
                        places1,
                        places2,
                    })
                    // console.log(this.props)
                    let toReduxPlaces1 = places1 ? places1[0] : null
                    let toReduxPlaces2 = places2 ? places2[0] : null
                    this.props.changePlaces({
                        places1: toReduxPlaces1,
                        places2: toReduxPlaces2,
                    })
                },
            })
        },
    }),
    withScriptjs,
)(props => (
    // <div data-standalone-searchbox="">
    <Grid container spacing={4} direction="row" justify="center" alignItems="center">
        <Grid item xs={6} style={{ textAlign: 'center' }}>
            <StandaloneSearchBox
                ref={props.onSearchBoxMounted1}
                bounds={props.bounds}
                onPlacesChanged={props.onPlacesChanged}>
                <TextField
                    style={{ width: '100%' }}
                    label="Адрес 1"
                    placeholder="Введите название населённого пункта"
                    margin="normal"
                />
            </StandaloneSearchBox>
        </Grid>

        <Grid item xs={6} style={{ textAlign: 'center' }}>
            <StandaloneSearchBox
                ref={props.onSearchBoxMounted2}
                bounds={props.bounds}
                onPlacesChanged={props.onPlacesChanged}>
                <TextField
                    style={{ width: '100%' }}
                    label="Адрес 2"
                    placeholder="Введите название населённого пункта"
                    margin="normal"
                />
            </StandaloneSearchBox>
        </Grid>
    </Grid>

    // </div>
))

export default connect(
    // state => ({
    //     location: state.location,
    // }),
    null,
    { changePlaces },
)(PlacesWithStandaloneSearchBox)
