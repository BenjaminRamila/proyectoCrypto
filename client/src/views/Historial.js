import React, { useState, useEffect } from "react";
import { useUser } from "../contexts/userContext";
import axios from "axios";
import moment from "moment";
import Loader from "react-loader-spinner";

const Historial = () => {
  const { user, setUser } = useUser();
  const [compras, setCompras] = useState();
  const [success,setSuccess] = useState(false);

  useEffect(() => {
    axios
      .get("/api/compras-by-user/" + user._id, { withCredentials: true })
      .then((res) => setCompras(res.data));
  }, [success]);

  const removeCompra = (id) =>{
    axios.delete("/api/compra/" + id, {withCredentials: true}).then((res) => {
        setSuccess(true);
        setTimeout(() => {
            setSuccess(false);
          }, 2000);

      });
  }

  const renderTable = () => {
    if (compras) {
        if(compras.length===0){
            return(<h5 className="dashboard">Aún no se han hecho compras</h5>)
        }else{
            return (
                <>
                  <div className="container-fluid">
                    <div className="row">
                      <div className="col-md-3"></div>
                      <div className="col-md-6">
        
                      <table className="table">
                              <thead>
                                <tr>
                                  <th scope="col">Fecha</th>
                                  <th scope="col">Tipo de Moneda</th>
                                  <th scope="col">Monto</th>
                                  <th scope="col">
                                    
                                  </th>
                                </tr>
                              </thead>
                              <tbody>
                                {compras.map((compra, index) => {
                                  let date = new Date(compra.createdAt);
                                  var formatted_date =
                                    moment(date).format("DD-MM-YYYY");
                                  return (
                                    <tr key={index}>
                                      <td>{formatted_date}</td>
                                      <td>{compra.moneda}</td>
                                      <td>{compra.monto}</td>
                                      <td>
                                        <button
                                          className="btn btn-danger"
                                          onClick={() => removeCompra(compra._id)}
                                        >
                                          Eliminar Compra
                                        </button>
                                      </td>
                                    </tr>
                                  );
                                })}
                              </tbody>
                            </table>
        
        
                      </div>
                      <div className="col-md-3"></div>
                    </div>
                  </div>
                </>
              );

        }
      
    } else {
        return (<>
        <Loader
            type="Puff"
            color="#00BFFF"
            height={100}
            width={100}
            timeout={10000} //3 secs
            className="dashboard"
          />
          <h3 className="dashboard">Cargando Compras</h3>
        </>)
    }
  };

  return <>
  <h2 className={`{theme} dashboard`}>HISTORIAL DE COMPRAS</h2>
          <hr className="title-separator"></hr>
  {success && <> 
    <div className="alert alert-success" role="alert">La compra ha sido eliminada con éxito</div>
  </>}
  {renderTable()}
  </>;
};

export default Historial;
