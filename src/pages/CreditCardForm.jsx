import React, { useState } from 'react';
import Cards from 'react-credit-cards-2'; 
import 'react-credit-cards-2/dist/es/styles-compiled.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { createOrder } from '../services/ordersService';
import { useSelector } from 'react-redux';
import { selectUserId } from '../states/userSlice';

function CreditCardForm({ totalAmount }) {

  const [cardNumber, setCardNumber] = useState('');
  const [expirationDate, setExpirationDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [name, setName] = useState('');
  const [focus, setFocus] = useState('');
  const userId = useSelector(selectUserId);
  const navigate = useNavigate();

  console.log(userId);

  const handleCardNumberChange = (e) => {
    setCardNumber(e.target.value.replace(/[^\d]/g, '').replace(/(.{4})/g, '$1 ').trim());
  };
  const handleExpirationDateChange = (e) => {
    setExpirationDate(e.target.value.replace(/[^\d]/g, '').replace(/(\d{2})(\d{0,4})/, '$1/$2').trim());
  };
  const handleCvvChange = (e) => {
    setCvv(e.target.value.replace(/[^\d]/g, '').replace(/(.{3})/, '$1').trim());
  };

  const location = useLocation();

  const orderItems = location.state?.orderItems || [];

   console.log('orderItems:', orderItems);
   console.log('totalAmount:', totalAmount);

  const handleSubmit = async (event) => {
    event.preventDefault();  
    const orderData = {
      userId: userId,
      paymentStatus: true,
      totalAmount: totalAmount,
      orderItems: orderItems,
    };
  
    console.log('Order data before sending:', JSON.stringify(orderData, null, 2));
  
    try {
      const orderId = await createOrder(orderData);
      navigate('/thanks');
    } catch (error) {
      console.error('Error creating order:', error);
    }
  };
  
  return (
    <div className="credit-card-form">
      <Cards
        cvv={cvv}
        expiry={expirationDate}
        focused={focus}
        name={name}
        number={cardNumber}
      />
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="text"
            id="cardNumber"
            value={cardNumber}
            onChange={handleCardNumberChange}
            onFocus={() => setFocus('number')}
            onBlur={() => setFocus('')}
            maxLength="19"
            placeholder="1234 5678 9012 3456"
            required
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            id="expirationDate"
            value={expirationDate}
            onChange={handleExpirationDateChange}
            onFocus={() => setFocus('expiry')}
            onBlur={() => setFocus('')}
            maxLength="7"
            placeholder="MM/YY"
            required
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            id="cvv"
            value={cvv}
            onChange={handleCvvChange}
            onFocus={() => setFocus('cvv')}
            onBlur={() => setFocus('')}
            maxLength="3"
            placeholder="CVV"
            required
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value.toUpperCase())}
            onFocus={() => setFocus('name')}
            onBlur={() => setFocus('')}
            placeholder="Name on Card"
            required
          />
        </div>
        <button type="submit" id='checkoutButton'onClick={handleSubmit}>שלם</button>
      </form>
    </div>
  );
}

export default CreditCardForm;