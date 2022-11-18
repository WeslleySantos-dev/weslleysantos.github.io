import './TopBar.css'

import img_insta from './assets/instagram.svg'
import img_fb from './assets/facebook.svg'
import img_Twitter from './assets/twitter.svg'

import React from 'react';

export function Topbar() {

    return (
        <div className='Topbar'>
            <nav className='nullspace'>

            </nav>
            <nav className='buttonstop'>
                <ul>
                    <li className='btnTopBar'>
                        <a href="/">Pagina Inicial</a>
                    </li>
                    <li className='btnTopBar'>
                        <a href="">Sobre</a>
                        <ul>
                            <li className='submenu'><a href="">Objetivo</a></li>
                            <li className='submenu'><a href="">Storytelling</a></li>
                            <li className='submenu'><a href="">Equipe</a></li>

                        </ul>
                    </li>

                    <li className='btnTopBar'>
                        <a href="">Nossos Serviços</a>
                    </li>
                    <li className='btnTopBar'>
                        <a href="/pets">Adote um Pet</a>
                    </li>
                    <li className='btnTopBar'>
                        <a href="">Perguntas Frequentes</a>
                    </li>
                    <li className='btnTopBar'>
                        <a href="">Blog</a>
                    </li>
                    <li className='btnTopBar' id='btnlogin'>
                        <a href="">Login</a>
                    </li>
                </ul>
            </nav>

            <nav className='SocialMidias'>
                <button className='ButtonsMidias'>
                    <a href="https://cantinhopetstop.wixsite.com/cantinhopetstop/pt" className='imgsocialmedia'>
                        <img src={img_insta} alt="Logo do Instagram" className='midiaslogo' />
                    </a>
                </button>

                <button className='ButtonsMidias'>
                    <a href="https://cantinhopetstop.wixsite.com/cantinhopetstop/pt" className='imgsocialmedia'>
                        <img src={img_fb} alt="Logo do Facebook" className='midiaslogo' />
                    </a>
                </button>

                <button className='ButtonsMidias'>
                    <a href="https://cantinhopetstop.wixsite.com/cantinhopetstop/pt" className='imgsocialmedia'>
                        <img src={img_Twitter} alt="Logo do Twitter" className='midiaslogo' />
                    </a>
                </button>
            </nav>

        </div>
    )
}
