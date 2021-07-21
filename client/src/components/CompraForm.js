import React, { useState, useEffect } from 'react';
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { BrowserRouter as Router, Switch, Route, Link,useHistory,Redirect } from "react-router-dom";
import { ThemeContext } from "../contexts/ThemeContext";

const CompraForm = (props) => {
    
  const [theme, setTheme] = useState('');
  const { toggle, toggleFunction } = React.useContext(ThemeContext);

  useEffect(() => {
    var temp = "";
    if (toggle) {
      temp = "dark-mode";
    } else {
      temp = "";
    }
    setTheme(temp);
  }, [toggle]);

    const {onSubmitProp}=props;


    return (
        <div >
          <Formik 
          initialValues={{
          moneda:'BTC',
          monto:1
        }}
        validationSchema={Yup.object().shape({
            moneda: Yup.string(),
            monto: Yup.number(),
        })}

        onSubmit={(values, {setSubmitting}) =>{
            const timeOut = setTimeout(( )=>{
                console.log(values);
                onSubmitProp(values);
                setSubmitting(false);
                clearTimeout(timeOut);
            }, 1000);
        }}
        >
            {({
                values,
                errors,
                touched,
                handleSubmit,
                //isSubmitting,
                //validating,
                valid,
            }) =>{
        return (
            <div>
                <Form className= "contact" method= "post" onSubmit={handleSubmit}>

                        <label htmlFor="moneda" >¿Qué Moneda deseas comprar?</label>
                         <Field  id='moneda' type="text" as='select' placeholder="Contenido Reseña" className={`form-select ${theme}`} name='moneda'>
                            <option value="BTC">Bitcoin</option>
                            <option value="ETH">Ethereum</option>
                            <option value="LTC">Litecoin</option>
                         </Field>
                         

                         <label htmlFor="monto" >Monto</label>
                         <Field id='monto' type="number" className={`form-control ${theme}`} name='monto'></Field>
                         {errors.monto && touched.monto && <p>{errors.monto}</p>}
                         
                <br></br>
                        <button className="btn btn-primary" type="submit" disabled={Object.values(errors).length > 0}>Comprar</button>
                </Form>
                </div>
        );
        }}
        </Formik>
        </div>
    );
}

export default CompraForm;
