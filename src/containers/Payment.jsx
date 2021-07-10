import React, {useContext} from 'react'
import { useHistory } from 'react-router-dom'
import AppContext from '../context/AppContext'
import {PayPalButton} from 'react-paypal-button-v2'
import '../styles/components/Payment.css'

const Payment = () => {
    const {state, addNewOrder} = useContext(AppContext);
    const {cart} = state;
    const {buyer} = state;
    const history = useHistory()

    const paypalOptions = {
        clientId: 'AU313y8ZTUedMRC8QXkpUX50l9d3JDUAb1sVAO-RC65gndHV0rWPvdaZTRJ82IsDZiscYAvlZCDdG4Bd',
        intent: 'capture',
        currency: 'USD',

    }

    const buttonStyles = {
        layout:'vertical',
        shape:'rect',

    }

    const handlePaymentSuccess = (data) => {
        console.log(data)
        if(data.status === 'COMPLETED'){
            const newOrder = {
                buyer,
                product: cart,
                payment:data
            }
            addNewOrder(newOrder)
            history.push('/checkout/success')
        }
    }

    const handleTotal = () => {
        const reducer = (accumulator, currentValue) => accumulator + currentValue.price
        const sum = cart.reduce(reducer,0)
        return sum
    }

    return (
        <div className="Payment"> 
            <div className="Payment-content">
                <h3>Resumen del pedido:</h3>
                {cart.map((item) => (
                    <div className="Payment-item" key={item.title}>
                        <div className="Payment-element">
                            <h4>{item.title}</h4>
                            <span>$ {item.price}</span>
                        </div>
                    </div>
                ))}
                <div className="Payment-button">
                    <PayPalButton 
                    paypalOptions ={paypalOptions}
                    buttonStyles={buttonStyles}
                    amount={handleTotal()}
                    onPaymentStart={() => console.log('Start Payment')}
                    onSuccess={data =>handlePaymentSuccess(data)}
                    onError={error => console.log(error)}
                    onCancel={data => console.log(data)}
                    />
                </div>
            </div>
        </div>
    )
}

export default Payment
