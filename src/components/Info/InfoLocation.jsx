import React from 'react'
import { connect } from 'react-redux'

export default connect(state => ({
    location: state.location,
}))(
    // component
    props => {
        let places = props.location.places,
            p1 = places.places1,
            p2 = places.places2

        // ПЕРВЫЙ АДРЕС (используемые во view переменные по умолчанию)
        let address1 = 'Не определено '
        let geometry1 = {
            lat: '', // широта
            lng: '', // долгота
        }
        let coord1 = ''

        // ВТОРОЙ АДРЕС
        let address2 = 'Не определено'
        let geometry2 = {
            lat: '',
            lng: '',
        }
        let coord2 = ''

        if (p1) {
            address1 = p1.formatted_address
            geometry1 = {
                lat: p1.geometry.location.lat(),
                lng: p1.geometry.location.lng(),
            }
            coord1 = (
                <span>
                    lat, lng: <b>{geometry1.lat}</b>, <b>{geometry1.lng}</b>
                </span>
            )
        }
        if (p2) {
            address2 = p2.formatted_address
            geometry2 = {
                lat: p2.geometry.location.lat(),
                lng: p2.geometry.location.lng(),
            }
            coord2 = (
                <span>
                    lat, lng: <b>{geometry2.lat}</b>, <b>{geometry2.lng}</b>
                </span>
            )
        }

        return (
            <div className="userinfo">
                <div className="userinfo__block">
                    <div className="userinfo__item">
                        <b className="userinfo__firstColumn"> Адрес 1: </b>
                        <span className="userinfo__secondColumn">{address1}</span>
                    </div>
                    <div className="userinfo__geometry"> {coord1} </div>
                </div>
                <div className="userinfo__block">
                    <div className="userinfo__item">
                        <b className="userinfo__firstColumn"> Адрес 2: </b>
                        <span className="userinfo__secondColumn"> {address2} </span>
                    </div>
                    <div className="userinfo__geometry"> {coord2} </div>
                </div>
                {props.location.distance ? (
                    <div className="userinfo__block">
                        <b> Расстояние между адресами </b>
                        <span className="userinfo__secondColumn">{props.location.distance}</span>
                    </div>
                ) : null}
            </div>
        )
    },
)
