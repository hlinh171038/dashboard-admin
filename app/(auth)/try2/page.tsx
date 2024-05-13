"use client"
import React, { ReactHTMLElement, useRef } from 'react';
import emailjs from '@emailjs/browser';
import randomString from 'randomstring'

 const ContactUs = () => {

  const form = useRef<any>();

  const sendEmail = (e:any) => {
    e.preventDefault();

    emailjs
      .sendForm('service_6w0ws6q', 'template_e6vvpy6', form.current , {
        publicKey: 'TS-u5iOD3yffcZ1CJ',
      })
      .then(
        () => {
          console.log('SUCCESS!');
        },
        (error) => {
          console.log('FAILED...', error.text);
        },
      );
  };

  return (
    <form ref={form} onSubmit={sendEmail}>
  
      <label>Email</label>
      <input type="email" name="user_email" />
      
      <textarea name="code" defaultValue={randomString.generate(4)} className='hidden'/>
      <input type="submit" value="Send" />
    </form>
  );
};

export default ContactUs