import moment from "moment"
import { useEffect } from "react"
import { useState } from "react"
import { CONSTANT, add0 } from "../../utils/globals"


export default function HorarioEntradaSalida({item, addHorario, updateHorario, addPedidos}){
    

    const [opened, setOpened] = useState()
    const [timer, setTimer] = useState('00:00')
    

    useEffect(() => {
        setOpened(item)
    }, [item])

    useEffect(() => {
        let intervall = null

        if(opened) {
            intervall = setInterval(buttonInterval, 1000)
        }else {
            clearInterval(intervall)
            setTimer('00:00')
        }
        return () => {
            clearInterval(intervall)
        }
    }, [opened])

    function buttonInterval(){
        const inicio = moment(opened.item.inicio, "YYYYMMDDHHmm")
        const ahora = moment(moment().format("YYYYMMDDHHmm"),'YYYYMMDDHHmm')
        
        const diff = ahora.diff(inicio, 'minutes')

        setTimer(`${add0(parseInt(diff/60))}:${add0(diff%60)}`)
    }

    function handleClick(){
        if(opened){
            console.log('opened' , opened)
            setOpened(updateHorario(opened.index))
            return
        }else{
            setOpened(addHorario())
        }
    }

    const OpenItemRender = () => {
        const inicio = opened ? moment(opened.item.inicio, CONSTANT.MOMENT_PATTERN).format("HH:mm"): '--:--'
        let pedidosCount = 0
        if(opened){
            opened.item.pedidos.split('').map(i => pedidosCount += parseInt(i))
        }
        return (
            <div className="horarioResOpened">
              <div>
                
                <small>Entrada:</small> {inicio}
            </div> 
               <div>
                    <small>Pedidos:</small> ({opened ? pedidosCount : '--'})</div><div>{opened ? opened.item.pedidos : ''}
               </div>
            </div>
        )
    }

    const BtnsPedidos = () =>{
        return(
            <div className="btnsPedidos">
                <button onClick={() => addPedidos(1)}>1</button>
                <button onClick={() => addPedidos(2)}>2</button>
                <button onClick={() => addPedidos(3)}>3</button>
                <button onClick={() => addPedidos(4)}>4</button>
            </div>
        )
    }

    return (
        <>
        <div className="btnEntradaSalidaContainer">
            <div onClick={handleClick} className={"btnEntradaSalida "+(opened ? 'working' : '')}>
            {opened ? 'Currando' : 'Descansando'}
                <div>{timer}h</div>
            </div>
            <OpenItemRender />
            
        </div>
        {opened && <BtnsPedidos />}

        </>
    )
}