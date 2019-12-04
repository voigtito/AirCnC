import React, { useState, useMemo } from 'react';
import api from '../../services/api';
import camera from '../../assets/camera.svg'
import './style.css'

export default function New( { history } ) {
    const [ thumb, setThumbe ] = useState(null);
    const [ company, setCompany ] = useState('');
    const [ techs, setTechs ] = useState('');
    const [ price, setPrice ] = useState('');

    const preview = useMemo( () => {
        return thumb ? URL.createObjectURL(thumb) : null;
        }, [thumb]
    )

    async function handleSubmit(event) {
        event.preventDefault();

        const user_id = localStorage.getItem('user');
        const data = new FormData();

        data.append( 'thumb', thumb );
        data.append( 'company', company );
        data.append( 'techs', techs );
        data.append( 'price', price );

        await api.post('/spots', data, {
            headers: { user_id }
        })

        history.push('/dashboard');
    }
    return (
        <form onSubmit={handleSubmit}>
            <label 
                id="thumb" 
                style={ { backgroundImage: `url(${preview})` } }
                className={thumb ? 'has-thumb' : ''}
            >
                <input type="file" onChange={event => setThumbe(event.target.files[0])}/>
                <img src={camera} alt="Selecione a imagem"/>
            </label>

            <label htmlFor="company" >Empresa *</label>
            <input 
                id="company" 
                placeholder="Digite o nome da sua empresa" 
                value={company}
                onChange={event => setCompany(event.target.value)}
                />

            <label htmlFor="techs" >Tecnologias * <span>(Separadas por vírgula)</span> </label>
            <input 
                id="techs" 
                placeholder="Informe suas tecnologias" 
                value={techs}
                onChange={event => setTechs(event.target.value)}
                />

            <label htmlFor="price" >Valor da diária * <span>(Em branco para GRATUITO)</span> </label>
            <input 
                id="price" 
                placeholder="Informe o valor sobrado por dia" 
                value={price}
                onChange={event => setPrice(event.target.value)}
                />

            <button type="submit" className="btn" >Cadastrar</button>
        </form>
    );
}