import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { loadStripe, Stripe } from '@stripe/stripe-js';

export interface PaymentMethod {
  id: number;
  payment_type: string;
  brand: string;
  last_four: string;
  exp_month: number;
  exp_year: number;
  is_default: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private apiUrl = 'http://localhost:5000/api';
  private stripePromise: Promise<Stripe | null>;
  
  // Replace with your actual publishable key
  private stripePublishableKey = 'pk_test_your_stripe_publishable_key';

  constructor(private http: HttpClient) {
    this.stripePromise = loadStripe(this.stripePublishableKey);
  }

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  async getStripe(): Promise<Stripe | null> {
    return await this.stripePromise;
  }

  createPaymentIntent(amount: number, currency: string = 'usd', metadata?: any): Observable<any> {
    const body = { amount, currency, metadata };
    return this.http.post(`${this.apiUrl}/payments/create-intent`, body, { headers: this.getHeaders() });
  }

  confirmPayment(paymentIntentId: string, paymentMethodId?: string): Observable<any> {
    const body: any = { payment_intent_id: paymentIntentId };
    if (paymentMethodId) body.payment_method_id = paymentMethodId;

    return this.http.post(`${this.apiUrl}/payments/confirm`, body, { headers: this.getHeaders() });
  }

  getPaymentMethods(): Observable<any> {
    return this.http.get(`${this.apiUrl}/payments/methods`, { headers: this.getHeaders() });
  }

  savePaymentMethod(paymentMethodId: string, setAsDefault: boolean = false): Observable<any> {
    const body = { payment_method_id: paymentMethodId, set_as_default: setAsDefault };
    return this.http.post(`${this.apiUrl}/payments/methods`, body, { headers: this.getHeaders() });
  }

  deletePaymentMethod(paymentMethodId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/payments/methods/${paymentMethodId}`, { headers: this.getHeaders() });
  }

  /**
   * Create a Stripe checkout session for immediate payment
   */
  async createCheckoutSession(amount: number, orderId?: number): Promise<any> {
    try {
      // First create payment intent via our API
      const intentResult = await this.createPaymentIntent(amount, 'usd', { order_id: orderId }).toPromise();
      
      if (!intentResult.success) {
        throw new Error(intentResult.message);
      }

      const stripe = await this.getStripe();
      if (!stripe) {
        throw new Error('Stripe not loaded');
      }

      // Create payment element
      const elements = stripe.elements({
        clientSecret: intentResult.data.client_secret
      });

      const paymentElement = elements.create('payment');

      return {
        stripe,
        elements,
        paymentElement,
        clientSecret: intentResult.data.client_secret,
        paymentIntentId: intentResult.data.payment_intent_id
      };

    } catch (error) {
      console.error('Error creating checkout session:', error);
      throw error;
    }
  }

  /**
   * Process payment using Stripe Elements
   */
  async processPayment(stripe: Stripe, elements: any, returnUrl: string): Promise<any> {
    try {
      const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: returnUrl
        }
      });

      if (error) {
        return { success: false, error: error.message };
      }

      return { 
        success: true, 
        paymentIntent,
        status: paymentIntent?.status 
      };

    } catch (error) {
      console.error('Payment processing error:', error);
      return { success: false, error: 'Payment processing failed' };
    }
  }

  /**
   * Format price for display
   */
  formatPrice(amount: number, currency: string = 'USD'): string {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
    }).format(amount);
  }
}