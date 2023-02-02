import React, {useEffect, useRef, useState } from "react";
import "./App.scss";

export const App = () => {
    const [power, setPower] = useState('OFF');
    const [soundbank, setSoundBank] = useState('stock');
    const [volume, setVolume] = useState(100);

    const stockSounds =  [
        {
          name: 'heater1',
          text: "Q",
          src: "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3"
        },
        {
          name: 'heater2',
          text: "W",
          src: "https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3"
        },
        {
          name: 'heater3',
          text: "E",
          src: "https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3"
        },
        {
          name: 'heater4',
          text: "A",
          src: "https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3"
        },
        {
          name: 'clap',
          text: "S",
          src: "https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3"
        },
        {
          name: 'openHat',
          text: "D",
          src: "https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3"
        },
        {
          name: 'kick_and_hat',
          text: "Z",
          src: "https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3"
        },
        {
          name: 'kick',
          text: "X",
          src: "https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3"
        },
        {
          name: 'closedHat',
          text: "C",
          src: "https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3"
        }
      ];
      const bankSounds =  [
        {
          name: 'chord1',
          text: "Q",
          src: "https://s3.amazonaws.com/freecodecamp/drums/Chord_1.mp3"
        },
        {
          name: 'chord2',
          text: "W",
          src: "https://s3.amazonaws.com/freecodecamp/drums/Chord_2.mp3"
        },
        {
          name: 'chord3',
          text: "E",
          src: "https://s3.amazonaws.com/freecodecamp/drums/Chord_3.mp3"
        },
        {
          name: 'shaker',
          text: "A",
          src: "https://s3.amazonaws.com/freecodecamp/drums/Give_us_a_light.mp3"
        },
        {
          name: 'openHat2',
          text: "S",
          src: "https://s3.amazonaws.com/freecodecamp/drums/Dry_Ohh.mp3"
        },
        {
          name: 'closedHat2',
          text: "D",
          src: "https://s3.amazonaws.com/freecodecamp/drums/Bld_H1.mp3"
        },
        {
          name: 'punchyKick',
          text: "Z",
          src: "https://s3.amazonaws.com/freecodecamp/drums/punchy_kick_1.mp3"
        },
        {
          name: 'sideStick',
          text: "X",
          src: "https://s3.amazonaws.com/freecodecamp/drums/side_stick_1.mp3"
        },
        {
          name: 'snare',
          text: "C",
          src: "https://s3.amazonaws.com/freecodecamp/drums/Brk_Snr.mp3"
        }
      ];

    const powerButton = useRef();
    const soundBankButton = useRef();
    const drumPads = useRef();
    const display = useRef();

    useEffect(()=>{
        if (power === 'ON'){
            document.addEventListener('keydown', (e)=>{
                let element = document.getElementById(e.key.toUpperCase());
                if (element) {
                    element.parentElement.click();
                    element.parentElement.classList.add('active');
                }
            });
            document.addEventListener('keyup', (e)=>{
                let element = document.getElementById(e.key.toUpperCase());
                if (element) {
                    element.parentElement.click();
                    element.parentElement.classList.remove('active');
                }
            });
        }
    },[power]);

    const startMachine = () => {
        if (powerButton.current.checked) {            
            setPower('ON');
        }
        else {
            setPower('OFF');
        }
    };

    const playSample = (sample,name) => {
        display.current.innerHTML = name;
        document.getElementById(sample).play();
    };


    const toggleSoundBank = () => {
        if (soundBankButton.current.checked) {
            setSoundBank('loaded');
            display.current.innerHTML = 'Smooth Piano Kit';
        }
        else {
            setSoundBank('stock');
            display.current.innerHTML = 'Heater Kit';
        } 
    };

    const updateVolume = (e) => {
        let drums = drumPads.current.childNodes;
        let newVolume = e.target.value/100;
        drums.forEach(drum => {drum.childNodes[0].volume = newVolume});
        setVolume(e.target.value);
    };

    return (
        <div id="drum-machine">
            <h2>Drum machine</h2>
            <div className="rack">
                <div id="drum-pads" ref={drumPads}>
                    {
                        soundbank === 'stock' ?
                            stockSounds.map((sound,index,array)=>{
                                return (
                                    <div className="drum-pad" style={{pointerEvents: power === 'ON' ? 'auto' : 'none'}} id={sound.name} key={sound.name} onClick={()=>playSample(sound.text,sound.name)}>
                                        <audio id={sound.text} className="clip" src={sound.src}></audio>
                                        {sound.text}
                                    </div>
                                );
                            })
                        :
                            bankSounds.map((sound,index,array)=>{
                                return (
                                    <div className="drum-pad" style={{pointerEvents: power === 'ON' ? 'auto' : 'none'}} id={sound.name} key={sound.name} onClick={()=>playSample(sound.text,sound.name)}>
                                        <audio id={sound.text} className="clip" src={sound.src}></audio>
                                        {sound.text}
                                    </div>
                                );
                            })
                    }
                </div>
                <div className="controls">
                    <div className="power">
                        <div className="status">power: <span style={power === 'ON' ? {color: '#1DB954'} : {color: 'red'}}>{power}</span></div>
                        <input ref={powerButton} onClick={startMachine} id="chck" type="checkbox"/>
                        <label htmlFor="chck" className="check-trail">
                        <span className="check-handler"></span>
                        </label>
                    </div>
                    <div id="display" ref={display}>Heater Kit</div>
                    <div className="volume">
                        <p>Volume: {volume}</p>
                        <input type="range" min={0} max={100} step={1} value={volume} onChange={(e)=>updateVolume(e)}/>
                    </div>
                    <div className="soundbank">
                        <div className="status">bank: <span style={soundbank === 'loaded' ? {color: '#1DB954'} : {color: 'red'}}>{soundbank}</span></div>
                        <input ref={soundBankButton} onClick={toggleSoundBank} id="chck2" type="checkbox"/>
                        <label htmlFor="chck2" className="check-trail">
                        <span className="check-handler"></span>
                        </label>
                    </div>
                </div>
            </div>
        </div>
    );
};
