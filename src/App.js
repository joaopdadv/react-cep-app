import React, { useState } from "react";
import { IoSend } from 'react-icons/io5';
import api from "./services/api";


import "./css/styles.css";

function App(){

  const [input, setInput] = useState('');
  const [cep, setCep] = useState({});

  async function handleSearch(){
    if(input === ''){
      alert('Preencha o campo CEP!');
    }else{
      try{
        const response = await api.get(`${input}/json`);
        setCep(response.data);
      }catch(e){
        alert('Erro ao buscar cep');
      }
    }
  }

  return (
    <div className="container">
      <h1 className="title">Buscador de CEP</h1>

      <div className="containerInput">
        <input 
          type="number" 
          placeholder="Digite seu CEP..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button className="buttonSend" onClick={handleSearch}> 
          <IoSend size={25} color="#FFF"/>
        </button>
      </div>

      {Object.keys(cep).length > 0 && (
        <main className="main">
          <h2>CEP: {cep.cep}</h2>

          <p>Rua: {cep.logradouro}</p>
          <p>Bairro: {cep.bairro}</p>
          <p>Cidade: {cep.localidade}</p>
          <p>Estado: {cep.uf}</p>
        </main> 
      )}


    </div>
  ); 
}

export default App;