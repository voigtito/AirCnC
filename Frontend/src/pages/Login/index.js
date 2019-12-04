import React, {useState} from 'react';
import api from '../../services/api';

export default function Login( { history } ) {

    const [email, setEmail] = useState('')
    const [nome, setNome] = useState('')
  
    async function handleSubmit(event){
      event.preventDefault();
  
      const response = await api.post('/sessions', {
        name: nome,
        email: email,
      });
  
      const { _id } = response.data;
      const { name } = response.data;

      localStorage.setItem('user', _id);
      localStorage.setItem('name', name);

      history.push('/dashboard');
    }

    return (
        <>
            <p>
            Ofereça <strong>spots</strong> para programadores e enconte <strong>Talentos</strong> para sua empresa.
            </p>

            <form onSubmit={handleSubmit}>
            <label htmlFor="email">E-MAIL *</label>
            <input 
                type="name" 
                id="name" 
                placeholder="Digite seu nome" 
                value={nome}
                onChange={event => setNome(event.target.value)}
                />
            <input 
                type="email" 
                id="email" 
                placeholder="Seu melhor e-mail" 
                value={email}
                onChange={event => setEmail(event.target.value)}
                />

            <button className="btn" type="submit">Entrar</button>    
            </form>
        </>
    );
}