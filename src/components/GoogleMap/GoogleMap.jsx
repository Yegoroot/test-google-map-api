import React from 'react'
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps'
import { googleMapURL } from '../../utils/config'
import { connect } from 'react-redux'
import { getCenter, getDistance } from 'geolib'
import { setDistance } from '../../ducks/location'

const MapWithAMarker = connect(
    state => ({
        location: state.location,
    }),
    { setDistance },
)(
    // Component
    withScriptjs(
        withGoogleMap(props => {
            let places = props.location.places,
                p1 = places.places1,
                p2 = places.places2

            let center = { lat: 26.640628, lng: -81.87230840000001 }
            let position1 = null // { lat: -34.397, lng: 150.644 }
            let position2 = null // { lat: -34.397, lng: 150.644 }

            // ПОЗИЦИЯ ПЕРВОГО МАРКЕРА
            if (p1) {
                position1 = {
                    lat: p1.geometry.location.lat(),
                    lng: p1.geometry.location.lng(),
                }
            }

            // ПОЗИЦИЯ ВТОРОГО МАРКЕРА
            if (p2) {
                position2 = {
                    lat: p2.geometry.location.lat(),
                    lng: p2.geometry.location.lng(),
                }
            }

            // ВЫЧИСЛЕНИЕ ЦЕНТРА
            function getCenterCust(position1, position2) {
                let result
                let obj1 = {
                    latitude: position1.lat,
                    longitude: position1.lng,
                }
                let obj2 = {
                    latitude: position2.lat,
                    longitude: position2.lng,
                }
                result = getCenter([obj1, obj2])

                getDistanceCust(obj1, obj2) // вычисление расстояния между точками

                return {
                    lat: result.latitude,
                    lng: result.longitude,
                }
            }

            function setCenter() {
                if (position1) {
                    return position2 ? getCenterCust(position1, position2) : position1
                }
                if (position2) {
                    return position1 ? getCenterCust(position1, position2) : position2
                }
                return center
            }

            // ВЫЧИСЛЕНИЕ ДИСТАНЦИИ
            let tempDistance = props.location.distance
            function getDistanceCust(obj1, obj2) {
                let distance = getDistance(obj1, obj2) / 1000

                if (!distance) {
                    distance = 'Не вычеслено'
                }
                // чтоб не было циклической отправки, проверяем та ли переменная в redux
                if (tempDistance !== distance) {
                    props.setDistance(distance) // ОТПРАВЛЕНИЕ  В REDUX
                }

                return distance
            }

            return (
                <GoogleMap defaultZoom={8} defaultCenter={center} center={setCenter()}>
                    {position1 ? <Marker position={position1} /> : null}
                    {position2 ? <Marker position={position2} /> : null}
                </GoogleMap>
            )
        }),
    ),
)
export default () => (
    <MapWithAMarker
        googleMapURL={googleMapURL}
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `100%` }} />}
        mapElement={<div style={{ height: `100%` }} />}
    />
)
