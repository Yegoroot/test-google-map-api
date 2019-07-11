import React from 'react'
import { connect } from 'react-redux'

export default connect(state => ({
    person: state.person,
}))(
    // component
    props => {
        let person = props.person.data
        let fullName = person.name
            ? person.lastName
                ? person.name + ' - ' + person.lastName
                : 'Не заполнена фамилия'
            : 'не заполнено имя'
        return (
            <div className="userinfo">
                <div className="userinfo__item">
                    <b className="userinfo__firstColumn"> Имя, Фамилия: </b>
                    <span className="userinfo__secondColumn"> {fullName} </span>
                </div>
                <div className="userinfo__item">
                    <b className="userinfo__firstColumn"> Модель прав: </b>
                    <span className="userinfo__secondColumn"> {person.category} </span>
                </div>
                <div className="userinfo__item">
                    <b className="userinfo__firstColumn"> Авто: </b>
                    <span className="userinfo__secondColumn"> {person.model} </span>
                </div>
                <div className="userinfo__item">
                    <b className="userinfo__firstColumn"> Год: </b>
                    <span className="userinfo__secondColumn"> {person.year} </span>
                </div>
                <div className="userinfo__item">
                    <b className="userinfo__firstColumn"> Средняя скорость: </b>
                    <span className="userinfo__secondColumn"> {person.speed} </span>
                </div>
            </div>
        )
    },
)
