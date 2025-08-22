// src/pages/PaymentPage.tsx
import React, { useState } from 'react';
import axios from 'axios';

const PaymentPage: React.FC = () => {
  const [method, setMethod] = useState<'cash' | 'card' | null>(null);
  const [appointmentId, setAppointmentId] = useState('');
  const [cardDetails, setCardDetails] = useState({ number: '', name: '', expiry: '', cvv: '' });

  const handlePayment = async () => {
    try {
      const res = await axios.post('http://localhost:5000/payments/create', {
        appointmentId,
        method,
        cardDetails: method === 'card' ? cardDetails : undefined,
      });
      alert(res.data.message);
    } catch (err) {
      alert('Payment failed');
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Pay for Your Appointment</h2>

        <input
          type="text"
          placeholder="Appointment ID"
          value={appointmentId}
          onChange={(e) => setAppointmentId(e.target.value)}
          style={styles.input}
        />

        <div style={styles.radioGroup}>
          <label>
            <input type="radio" name="method" value="cash" onChange={() => setMethod('cash')} />
            Cash
          </label>
          <label style={{ marginLeft: '20px' }}>
            <input type="radio" name="method" value="card" onChange={() => setMethod('card')} />
            Card
          </label>
        </div>

        {method === 'card' && (
          <div style={styles.cardSection}>
            <div style={styles.iconRow}>
              <img
                src="https://img.icons8.com/color/48/000000/visa.png"
                alt="Visa"
                style={styles.icon}
              />
              <img
                src="https://img.icons8.com/color/48/000000/mastercard.png"
                alt="MasterCard"
                style={styles.icon}
              />
            </div>

            <input
              placeholder="Card Number"
              onChange={(e) => setCardDetails({ ...cardDetails, number: e.target.value })}
              style={styles.input}
            />
            <input
              placeholder="Cardholder Name"
              onChange={(e) => setCardDetails({ ...cardDetails, name: e.target.value })}
              style={styles.input}
            />
            <input
              placeholder="MM/YY"
              onChange={(e) => setCardDetails({ ...cardDetails, expiry: e.target.value })}
              style={styles.input}
            />
            <input
              placeholder="CVV"
              onChange={(e) => setCardDetails({ ...cardDetails, cvv: e.target.value })}
              style={styles.input}
            />
          </div>
        )}

        <button onClick={handlePayment} style={styles.button}>Pay</button>
      </div>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '50px',
  },
  card: {
    padding: '30px',
    width: '400px',
    border: '1px solid #ccc',
    borderRadius: '12px',
    backgroundColor: '#f9f9f9',
    boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
  },
  title: {
    marginBottom: '20px',
    textAlign: 'center',
  },
  input: {
    width: '100%',
    padding: '10px',
    marginBottom: '12px',
    borderRadius: '6px',
    border: '1px solid #ccc',
  },
  radioGroup: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '16px',
  },
  cardSection: {
    marginBottom: '16px',
  },
  iconRow: {
    display: 'flex',
    justifyContent: 'center',
    gap: '16px',
    marginBottom: '16px',
  },
  icon: {
    width: '48px',
    height: '32px',
    objectFit: 'contain',
  },
  button: {
    width: '100%',
    padding: '12px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: 'bold',
  },
};

export default PaymentPage;
