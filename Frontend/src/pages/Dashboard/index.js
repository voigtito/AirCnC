import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';

import api from '../../services/api';
import './style.css';

export default function Dashboard() {
    const name = localStorage.getItem('name')
    const [spots, setSpot] = useState([]);

    useEffect(() => {
        async function loadSpots() {
            const user_id = localStorage.getItem('user')
            const response = await api.get('/dashboard', {
                headers: {user_id}
            });

            setSpot(response.data);
        }

        loadSpots();
    }, []);

    return (
        <>
            <h1>Bem vindo {name}!</h1>
            <ul className="spot-list">    
                {spots.map(spot => (
                    <li key={spot._id}>
                        <header style={{backgroundImage: `url(${spot.thumb_url})`}}/>
                        <strong>{spot.company}</strong>
                        <span>{spot.price ? `Diária de R$${spot.price}` : 'GRATUITO' }</span>
                    </li>
                ))}
            </ul>

            <Link to="/new" > 
                    <button className="btn" >Cadastrar Novo Spot</button>
            </Link>
        </>
    );
}