import React from "react";
import './Form.css'

const Form = () => {

   const [country, setCountry] = useState('');
   const [street, setStreet] = useState('');
   const [subject, setSubject] = useState('physical');

   const onChangeCountry = (e) => {
      setCountry(e.target.value)
   }

   const onChangeStreet = (e) => {
      setStreet(e.target.value)
   }

   const onChangeSubject = (e) => {
      setSubject(e.target.value)
   }


   return(
      <div className={'form'}>
         <h3>Введите ваши данные</h3>
         <input className={'input'} 
                type="text"
                placeholder={'страна'}
         />
         <input className={'input'}
                type="text"
                placeholder={'улица'}
         />
         <select className={'select'}>
            <option value={'physical'}>Физ.лицо</option>
            <option value={'legal'}>Юр.лицо</option>
         </select>
      </div>
   );
};

export default Form;