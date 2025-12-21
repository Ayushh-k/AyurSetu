import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../styles/PaymentPage.css';
import hospitalService from '../services/hospitalService';

const PaymentPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const appointment = location.state?.appointment;

  const [paymentMethod, setPaymentMethod] = useState('');
  const [cardDetails, setCardDetails] = useState({
    cardName: '',
    cardNumber: '',
    expiryMonth: '',
    expiryYear: '',
    cvv: '',
  });
  const [upiId, setUpiId] = useState('');
  const [walletType, setWalletType] = useState('');
  const [bankDetails, setBankDetails] = useState({
    bankName: '',
    accountNumber: '',
    ifscCode: '',
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState('');
  const [transactionId, setTransactionId] = useState('');
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (!appointment) {
      navigate('/dashboard');
    }
  }, [appointment, navigate]);

  const validateCardNumber = (number) => {
    return number.replace(/\s/g, '').length === 16 && /^\d+$/.test(number.replace(/\s/g, ''));
  };

  const validateUPI = (upi) => {
    return /^[a-zA-Z0-9._-]+@[a-zA-Z]{3,}$/.test(upi);
  };

  const validateCardForm = () => {
    const newErrors = {};
    if (!cardDetails.cardName.trim()) newErrors.cardName = 'Card holder name required';
    if (!validateCardNumber(cardDetails.cardNumber)) newErrors.cardNumber = 'Invalid card number (16 digits)';
    if (!cardDetails.expiryMonth) newErrors.expiryMonth = 'Expiry month required';
    if (!cardDetails.expiryYear) newErrors.expiryYear = 'Expiry year required';
    if (cardDetails.cvv.length !== 3) newErrors.cvv = 'CVV must be 3 digits';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateUPIForm = () => {
    const newErrors = {};
    if (!validateUPI(upiId)) newErrors.upiId = 'Invalid UPI format (e.g., user@bank)';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateBankForm = () => {
    const newErrors = {};
    if (!bankDetails.bankName.trim()) newErrors.bankName = 'Bank name required';
    if (!bankDetails.accountNumber.trim()) newErrors.accountNumber = 'Account number required';
    if (!bankDetails.ifscCode.trim()) newErrors.ifscCode = 'IFSC code required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const generateTransactionId = (prefix) => {
    return `${prefix}-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
  };

  const handleCardPayment = async () => {
    if (!validateCardForm()) return;

    setIsProcessing(true);
    try {
      const txnId = generateTransactionId('CARD');
      setTransactionId(txnId);

      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Save payment transaction
      await savePaymentTransaction({
        method: 'Credit/Debit Card',
        transactionId: txnId,
        amount: appointment.fee,
        cardLast4: cardDetails.cardNumber.slice(-4),
      });

      setPaymentStatus('success');
      setTimeout(() => {
        completeAppointmentBooking('Credit/Debit Card', txnId);
      }, 1500);
    } catch (error) {
      setPaymentStatus('failed');
      console.error('Card payment error:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleUPIPayment = async () => {
    if (!validateUPIForm()) return;

    setIsProcessing(true);
    try {
      const txnId = generateTransactionId('UPI');
      setTransactionId(txnId);

      // Simulate UPI processing
      await new Promise(resolve => setTimeout(resolve, 2000));

      await savePaymentTransaction({
        method: 'UPI',
        transactionId: txnId,
        amount: appointment.fee,
        upiId: upiId,
      });

      setPaymentStatus('success');
      setTimeout(() => {
        completeAppointmentBooking('UPI', txnId);
      }, 1500);
    } catch (error) {
      setPaymentStatus('failed');
      console.error('UPI payment error:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleWalletPayment = async () => {
    if (!walletType) {
      setErrors({ wallet: 'Please select a wallet type' });
      return;
    }

    setIsProcessing(true);
    try {
      const txnId = generateTransactionId('WALLET');
      setTransactionId(txnId);

      await new Promise(resolve => setTimeout(resolve, 1500));

      await savePaymentTransaction({
        method: 'Digital Wallet',
        transactionId: txnId,
        amount: appointment.fee,
        walletType: walletType,
      });

      setPaymentStatus('success');
      setTimeout(() => {
        completeAppointmentBooking('Digital Wallet', txnId);
      }, 1500);
    } catch (error) {
      setPaymentStatus('failed');
      console.error('Wallet payment error:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleBankTransfer = async () => {
    if (!validateBankForm()) return;

    setIsProcessing(true);
    try {
      const txnId = generateTransactionId('BANK');
      setTransactionId(txnId);

      await savePaymentTransaction({
        method: 'Bank Transfer',
        transactionId: txnId,
        amount: appointment.fee,
        bankName: bankDetails.bankName,
        accountNumber: bankDetails.accountNumber.slice(-4),
      });

      setPaymentStatus('pending');
    } catch (error) {
      setPaymentStatus('failed');
      console.error('Bank transfer error:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const handlePayAtCounter = async () => {
    setIsProcessing(true);
    try {
      const txnId = generateTransactionId('COUNTER');
      setTransactionId(txnId);

      await savePaymentTransaction({
        method: 'Pay at Counter',
        transactionId: txnId,
        amount: appointment.fee,
        status: 'Pending',
      });

      setPaymentStatus('pending');
    } catch (error) {
      setPaymentStatus('failed');
      console.error('Pay at counter error:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const savePaymentTransaction = async (paymentData) => {
    try {
      await hospitalService.savePayment({
        appointmentId: appointment.id,
        patientId: appointment.patientId,
        ...paymentData,
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      console.error('Error saving payment:', error);
      throw error;
    }
  };

  const completeAppointmentBooking = (method, txnId) => {
    // Call the appointment booking function from Dashboard
    navigate('/dashboard', {
      state: {
        appointmentBooked: true,
        paymentMethod: method,
        transactionId: txnId,
      },
    });
  };

  if (!appointment) {
    return <div className="payment-page"><p>Loading...</p></div>;
  }

  return (
    <div className="payment-page">
      <div className="payment-container">
        {/* Header */}
        <div className="payment-header">
          <h1>💳 Secure Payment Gateway</h1>
          <p>Complete your appointment booking with AyurSetu</p>
        </div>

        <div className="payment-content">
          {/* Left: Order Summary */}
          <div className="payment-summary-section">
            <div className="summary-card">
              <h2>Appointment Summary</h2>
              
              <div className="summary-details">
                <div className="detail-row">
                  <span className="label">Doctor</span>
                  <span className="value">{appointment.doctorName}</span>
                </div>
                <div className="detail-row">
                  <span className="label">Department</span>
                  <span className="value">{appointment.department}</span>
                </div>
                <div className="detail-row">
                  <span className="label">Date & Time</span>
                  <span className="value">{appointment.date} at {appointment.time}</span>
                </div>
                <div className="detail-row">
                  <span className="label">Reason</span>
                  <span className="value">{appointment.reason}</span>
                </div>
                {appointment.symptoms && (
                  <div className="detail-row">
                    <span className="label">Symptoms</span>
                    <span className="value">{appointment.symptoms}</span>
                  </div>
                )}

                <div className="divider"></div>

                <div className="detail-row total">
                  <span className="label">Consultation Fee</span>
                  <span className="value">₹{appointment.fee}</span>
                </div>
              </div>

              {/* Security Badge */}
              <div className="security-badge">
                <span>🔒 Secure & Encrypted</span>
              </div>
            </div>
          </div>

          {/* Right: Payment Methods */}
          <div className="payment-methods-section">
            {paymentStatus === 'success' && (
              <div className="payment-success">
                <div className="success-icon">✓</div>
                <h3>Payment Successful!</h3>
                <p>Transaction ID: <strong>{transactionId}</strong></p>
                <p>Redirecting to dashboard...</p>
              </div>
            )}

            {paymentStatus === 'pending' && (
              <div className="payment-pending">
                <div className="pending-icon">⏳</div>
                <h3>Payment Pending</h3>
                <p>Transaction ID: <strong>{transactionId}</strong></p>
                <p>Your appointment is being processed. You will receive confirmation shortly.</p>
                <button onClick={() => navigate('/dashboard')} className="btn-primary">
                  Back to Dashboard
                </button>
              </div>
            )}

            {paymentStatus === 'failed' && (
              <div className="payment-failed">
                <div className="failed-icon">✕</div>
                <h3>Payment Failed</h3>
                <p>Please try again or use a different payment method.</p>
                <button onClick={() => setPaymentStatus('')} className="btn-primary">
                  Try Again
                </button>
              </div>
            )}

            {!paymentStatus && (
              <>
                <h2>Select Payment Method</h2>

                {/* Tabs for different payment methods */}
                <div className="payment-tabs">
                  <button
                    className={`tab-btn ${paymentMethod === 'card' ? 'active' : ''}`}
                    onClick={() => { setPaymentMethod('card'); setErrors({}); }}
                  >
                    💳 Card
                  </button>
                  <button
                    className={`tab-btn ${paymentMethod === 'upi' ? 'active' : ''}`}
                    onClick={() => { setPaymentMethod('upi'); setErrors({}); }}
                  >
                    📱 UPI
                  </button>
                  <button
                    className={`tab-btn ${paymentMethod === 'wallet' ? 'active' : ''}`}
                    onClick={() => { setPaymentMethod('wallet'); setErrors({}); }}
                  >
                    🏦 Wallet
                  </button>
                  <button
                    className={`tab-btn ${paymentMethod === 'bank' ? 'active' : ''}`}
                    onClick={() => { setPaymentMethod('bank'); setErrors({}); }}
                  >
                    🏛️ Bank
                  </button>
                  <button
                    className={`tab-btn ${paymentMethod === 'counter' ? 'active' : ''}`}
                    onClick={() => { setPaymentMethod('counter'); setErrors({}); }}
                  >
                    💰 Counter
                  </button>
                </div>

                {/* Card Payment Form */}
                {paymentMethod === 'card' && (
                  <div className="payment-form card-form">
                    <h3>Credit/Debit Card Payment</h3>
                    
                    <div className="form-group">
                      <label>Cardholder Name</label>
                      <input
                        type="text"
                        placeholder="John Doe"
                        value={cardDetails.cardName}
                        onChange={(e) => setCardDetails({ ...cardDetails, cardName: e.target.value })}
                        className={errors.cardName ? 'input-error' : ''}
                      />
                      {errors.cardName && <span className="error-msg">{errors.cardName}</span>}
                    </div>

                    <div className="form-group">
                      <label>Card Number</label>
                      <input
                        type="text"
                        placeholder="1234 5678 9012 3456"
                        maxLength="19"
                        value={cardDetails.cardNumber}
                        onChange={(e) => {
                          let val = e.target.value.replace(/\s/g, '');
                          let formatted = val.match(/.{1,4}/g)?.join(' ') || val;
                          setCardDetails({ ...cardDetails, cardNumber: formatted });
                        }}
                        className={errors.cardNumber ? 'input-error' : ''}
                      />
                      {errors.cardNumber && <span className="error-msg">{errors.cardNumber}</span>}
                    </div>

                    <div className="form-row">
                      <div className="form-group">
                        <label>Expiry Month</label>
                        <select
                          value={cardDetails.expiryMonth}
                          onChange={(e) => setCardDetails({ ...cardDetails, expiryMonth: e.target.value })}
                          className={errors.expiryMonth ? 'input-error' : ''}
                        >
                          <option value="">Select Month</option>
                          {[...Array(12)].map((_, i) => (
                            <option key={i + 1} value={String(i + 1).padStart(2, '0')}>
                              {String(i + 1).padStart(2, '0')}
                            </option>
                          ))}
                        </select>
                        {errors.expiryMonth && <span className="error-msg">{errors.expiryMonth}</span>}
                      </div>

                      <div className="form-group">
                        <label>Expiry Year</label>
                        <select
                          value={cardDetails.expiryYear}
                          onChange={(e) => setCardDetails({ ...cardDetails, expiryYear: e.target.value })}
                          className={errors.expiryYear ? 'input-error' : ''}
                        >
                          <option value="">Select Year</option>
                          {[...Array(10)].map((_, i) => {
                            const year = new Date().getFullYear() + i;
                            return <option key={year} value={year}>{year}</option>;
                          })}
                        </select>
                        {errors.expiryYear && <span className="error-msg">{errors.expiryYear}</span>}
                      </div>

                      <div className="form-group">
                        <label>CVV</label>
                        <input
                          type="password"
                          placeholder="123"
                          maxLength="3"
                          value={cardDetails.cvv}
                          onChange={(e) => setCardDetails({ ...cardDetails, cvv: e.target.value.replace(/\D/g, '') })}
                          className={errors.cvv ? 'input-error' : ''}
                        />
                        {errors.cvv && <span className="error-msg">{errors.cvv}</span>}
                      </div>
                    </div>

                    <button
                      className="btn-pay"
                      onClick={handleCardPayment}
                      disabled={isProcessing}
                    >
                      {isProcessing ? 'Processing...' : `Pay ₹${appointment.fee}`}
                    </button>
                  </div>
                )}

                {/* UPI Payment Form */}
                {paymentMethod === 'upi' && (
                  <div className="payment-form upi-form">
                    <h3>UPI Payment</h3>
                    <p className="info-text">Enter your UPI ID to complete payment</p>
                    
                    <div className="form-group">
                      <label>UPI ID</label>
                      <input
                        type="text"
                        placeholder="yourname@upi"
                        value={upiId}
                        onChange={(e) => setUpiId(e.target.value)}
                        className={errors.upiId ? 'input-error' : ''}
                      />
                      {errors.upiId && <span className="error-msg">{errors.upiId}</span>}
                    </div>

                    <div className="popular-upi">
                      <p>Popular UPI Apps:</p>
                      <div className="upi-apps">
                        <button className="upi-app">Google Pay</button>
                        <button className="upi-app">PhonePe</button>
                        <button className="upi-app">Paytm</button>
                      </div>
                    </div>

                    <button
                      className="btn-pay"
                      onClick={handleUPIPayment}
                      disabled={isProcessing}
                    >
                      {isProcessing ? 'Processing...' : `Pay ₹${appointment.fee}`}
                    </button>
                  </div>
                )}

                {/* Wallet Payment Form */}
                {paymentMethod === 'wallet' && (
                  <div className="payment-form wallet-form">
                    <h3>Digital Wallet</h3>
                    <p className="info-text">Select your wallet provider</p>
                    
                    <div className="wallet-options">
                      <button
                        className={`wallet-option ${walletType === 'GooglePay' ? 'selected' : ''}`}
                        onClick={() => setWalletType('GooglePay')}
                      >
                        <span className="wallet-icon">📱</span>
                        <span>Google Pay</span>
                      </button>
                      <button
                        className={`wallet-option ${walletType === 'PhonePe' ? 'selected' : ''}`}
                        onClick={() => setWalletType('PhonePe')}
                      >
                        <span className="wallet-icon">💳</span>
                        <span>PhonePe</span>
                      </button>
                      <button
                        className={`wallet-option ${walletType === 'Paytm' ? 'selected' : ''}`}
                        onClick={() => setWalletType('Paytm')}
                      >
                        <span className="wallet-icon">🛍️</span>
                        <span>Paytm</span>
                      </button>
                      <button
                        className={`wallet-option ${walletType === 'AmazonPay' ? 'selected' : ''}`}
                        onClick={() => setWalletType('AmazonPay')}
                      >
                        <span className="wallet-icon">📦</span>
                        <span>Amazon Pay</span>
                      </button>
                    </div>
                    {errors.wallet && <span className="error-msg">{errors.wallet}</span>}

                    <button
                      className="btn-pay"
                      onClick={handleWalletPayment}
                      disabled={isProcessing || !walletType}
                    >
                      {isProcessing ? 'Processing...' : `Pay ₹${appointment.fee}`}
                    </button>
                  </div>
                )}

                {/* Bank Transfer Form */}
                {paymentMethod === 'bank' && (
                  <div className="payment-form bank-form">
                    <h3>Bank Transfer (NEFT/RTGS)</h3>
                    <p className="info-text">Complete your transfer and confirm below</p>
                    
                    <div className="bank-details-box">
                      <div className="bank-detail">
                        <label>Bank Name</label>
                        <strong>AyurSetu Healthcare</strong>
                      </div>
                      <div className="bank-detail">
                        <label>Account Number</label>
                        <strong>1234567890123456</strong>
                      </div>
                      <div className="bank-detail">
                        <label>IFSC Code</label>
                        <strong>AYBK0000001</strong>
                      </div>
                      <div className="bank-detail">
                        <label>Amount</label>
                        <strong>₹{appointment.fee}</strong>
                      </div>
                    </div>

                    <div className="form-group">
                      <label>Your Bank Name</label>
                      <input
                        type="text"
                        placeholder="State Bank of India"
                        value={bankDetails.bankName}
                        onChange={(e) => setBankDetails({ ...bankDetails, bankName: e.target.value })}
                        className={errors.bankName ? 'input-error' : ''}
                      />
                      {errors.bankName && <span className="error-msg">{errors.bankName}</span>}
                    </div>

                    <div className="form-group">
                      <label>Your Account Number</label>
                      <input
                        type="text"
                        placeholder="Your account number"
                        value={bankDetails.accountNumber}
                        onChange={(e) => setBankDetails({ ...bankDetails, accountNumber: e.target.value })}
                        className={errors.accountNumber ? 'input-error' : ''}
                      />
                      {errors.accountNumber && <span className="error-msg">{errors.accountNumber}</span>}
                    </div>

                    <div className="form-group">
                      <label>IFSC Code</label>
                      <input
                        type="text"
                        placeholder="SBIN0001234"
                        value={bankDetails.ifscCode}
                        onChange={(e) => setBankDetails({ ...bankDetails, ifscCode: e.target.value.toUpperCase() })}
                        className={errors.ifscCode ? 'input-error' : ''}
                      />
                      {errors.ifscCode && <span className="error-msg">{errors.ifscCode}</span>}
                    </div>

                    <button
                      className="btn-pay"
                      onClick={handleBankTransfer}
                      disabled={isProcessing}
                    >
                      {isProcessing ? 'Processing...' : 'Confirm Transfer'}
                    </button>
                  </div>
                )}

                {/* Pay at Counter */}
                {paymentMethod === 'counter' && (
                  <div className="payment-form counter-form">
                    <h3>Pay at Counter</h3>
                    <div className="counter-info">
                      <div className="info-card">
                        <span className="icon">📍</span>
                        <h4>Hospital Location</h4>
                        <p>AyurSetu Healthcare Center<br/>123 Medical Street<br/>Mumbai, India - 400001</p>
                      </div>
                      <div className="info-card">
                        <span className="icon">⏰</span>
                        <h4>Reception Hours</h4>
                        <p>Monday - Sunday<br/>8:00 AM - 8:00 PM<br/>24/7 Emergency Support</p>
                      </div>
                      <div className="info-card">
                        <span className="icon">📞</span>
                        <h4>Contact</h4>
                        <p>Phone: +91 XXXX-XXX-XXXX<br/>Email: pay@ayursetu.com</p>
                      </div>
                    </div>

                    <div className="amount-box">
                      <span>Amount to Pay:</span>
                      <span className="amount">₹{appointment.fee}</span>
                    </div>

                    <button
                      className="btn-pay"
                      onClick={handlePayAtCounter}
                      disabled={isProcessing}
                    >
                      {isProcessing ? 'Confirming...' : 'Confirm Payment at Counter'}
                    </button>
                  </div>
                )}

                {/* No method selected */}
                {!paymentMethod && (
                  <div className="no-method">
                    <p>👈 Select a payment method to continue</p>
                  </div>
                )}
              </>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="payment-footer">
          <p>🔒 Your payment is secure and encrypted | AyurSetu Healthcare</p>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
