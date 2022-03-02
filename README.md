# payment-page-with-react-using-razorpay

**Website:** https://mernstorelist.herokuapp.com/

Simple Payment Page with MERN dev using mongodb, react, express, node, razorpay, axios, API(Application Programming Interface), etc.

- [Overview](#overview)
- [Home Page](#home-page)
- [Try First](#try-first)
- [Scan QR Code](#scan-qr-code)
- [Payment Button](#payment-button)
- [Payment Page](#payment-page)
- [Payment Link](#payment-link)
- [Track Payment Details](#track-payment-details)
- [Mobile Test](#mobile-test)
- [API (Store-List)](#api-store-list)
- [Author](#author)

# Overview

> Process below ↓

> Payment

<img src="https://raw.githubusercontent.com/hirishu10/my-assets/main/payment-page/pay1.gif" width="100%" height="100%" />

> Tracking Details

<img src="https://raw.githubusercontent.com/hirishu10/my-assets/main/payment-page/pay2.gif" width="100%" height="100%" />

# Home Page

> Home screen of Payment page App ↓
> <img src="https://raw.githubusercontent.com/hirishu10/my-assets/main/payment-page/home.png" width="100%" height="100%" />

# Try First

##### Using Try First payment gateway you can track your details easily ↓

# Scan QR Code

> Pop up the QR-Code to pay directly the amount ↓

<img src="https://raw.githubusercontent.com/hirishu10/my-assets/main/payment-page/qr.png" width="100%" height="100%" />

# Payment Button

> Payment Button ↓

**Website:** https://razorpay.com/payment-button/pl_J096ecINoT34H7/view/?utm_source=payment_button&utm_medium=button&utm_campaign=payment_button

# Payment Page

> Custom Page provided by razorpay ↓

**Website:** https://pages.razorpay.com/pl_J07wMiDyh8IvPZ/view

# Payment Link

> Payment Link ↓

**Website:** https://razorpay.com/payment-link/plink_J07uBezezHpiQ6/test

# Track Payment Details

> Payment Details Page ↓

<img src="https://raw.githubusercontent.com/hirishu10/my-assets/main/payment-page/track_page.png" width="100%" height="100%" />

> Tracking id valid ↓

<img src="https://raw.githubusercontent.com/hirishu10/my-assets/main/payment-page/track_success.png" width="100%" height="100%" />

> Tracking id unvalid ↓

<img src="https://raw.githubusercontent.com/hirishu10/my-assets/main/payment-page/track_fail.png" width="100%" height="100%" />

# Mobile Test

|                                                                                                                                     |                                                                                                                                    |
| :---------------------------------------------------------------------------------------------------------------------------------: | :--------------------------------------------------------------------------------------------------------------------------------: |
|       <img src="https://raw.githubusercontent.com/hirishu10/my-assets/main/payment-page/phone/phone_home.jpeg" width="350" />       |  <img src="https://raw.githubusercontent.com/hirishu10/my-assets/main/payment-page/phone/phone_formvalidate.jpeg" width="350" />   |
|      <img src="https://raw.githubusercontent.com/hirishu10/my-assets/main/payment-page/phone/phone_submit.jpeg" width="350" />      | <img src="https://raw.githubusercontent.com/hirishu10/my-assets/main/payment-page/phone/phone_paymentgateway.jpeg" width="350" />  |
|       <img src="https://raw.githubusercontent.com/hirishu10/my-assets/main/payment-page/phone/phone_pay.jpeg" width="350" />        | <img src="https://raw.githubusercontent.com/hirishu10/my-assets/main/payment-page/phone/phone_payment_loading.jpeg" width="350" /> |
| <img src="https://raw.githubusercontent.com/hirishu10/my-assets/main/payment-page/phone/phone_success_failure.jpeg" width="350" />  |  <img src="https://raw.githubusercontent.com/hirishu10/my-assets/main/payment-page/phone/phone_payment_error.jpeg" width="350" />  |
| <img src="https://raw.githubusercontent.com/hirishu10/my-assets/main/payment-page/phone/phone_receivedtrackid.jpeg" width="350" />  |   <img src="https://raw.githubusercontent.com/hirishu10/my-assets/main/payment-page/phone/phone_trackingid.jpeg" width="350" />    |
| <img src="https://raw.githubusercontent.com/hirishu10/my-assets/main/payment-page/phone/phone_trackingnotmatch.jpeg" width="350" /> |                                                                                                                                    |

# API (Store-List)

> With the help of API we can push the data from server to the database collection ↓

> => API (Application Programming Interface):

- ![DocsPassing](https://img.shields.io/badge/POST-%2Fapi%2Fcreate%2Forder-blue) - /api/create/order => Create new order receive the order_id

- ![DocsPassing](https://img.shields.io/badge/POST-%2Fapi%2Fcreate%2Forder%2Fpaymentdetail%2FSave-blue) - /api/create/order/paymentdetail/Save => After successfully authorize the order the details may send for save into the server

- ![DocsPassing](https://img.shields.io/badge/GET-%2Fapi%2Ftrackpayment%2Fdetails%2F%3Aid-brightgreen) - /api/trackpayment/details/:id => Provide the tracking id for fetch all the related details for the payment

<!-- author  -->

# Author

#### Thank You All 🙏🏻

Made with 🖤 by

**Author** : [Rishu Chowdhary](https://github.com/hirishu10)

**Email** : hi.10rishu@gmail.com

<!-- author  -->
