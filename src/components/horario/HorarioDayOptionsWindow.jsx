import { useEffect } from "react"
import { useState } from "react"
import { CONSTANT } from "../../utils/globals"
import { useRef } from "react"


export default function HorarioDayOptionsWindow(props) {


    const inicioYear = useRef("")
    const inicioMonth= useRef("")
    const inicioDay = useRef("")
    const inicioH = useRef("")
    const inicioM = useRef("")
    const finYear = useRef("")
    const finMonth= useRef("")
    const finDay = useRef("")
    const finH = useRef("")
    const finM = useRef("")
    const pedidos = useRef("")
    const id = useRef("")

    const [index, setIndex] = useState()

    useEffect(() => {
        id.current.value = props.open ? props.open.id: ""
        inicioYear.current.value = props.open ? props.open.inicio.format("YYYY") : ""
        finYear.current.value = props.open && props.open.fin.format("DD") !== 'Invalid date' ? props.open.fin.format("YYYY") : ""
        inicioMonth.current.value = props.open ? props.open.inicio.format("MM") : ""
        finMonth.current.value = props.open && props.open.fin.format("DD") !== 'Invalid date' ? props.open.fin.format("MM") : ""
        inicioDay.current.value = props.open ? props.open.inicio.format("DD") : ""
        finDay.current.value = props.open && props.open.fin.format("DD") !== 'Invalid date' ? props.open.fin.format("DD") : ""
        inicioH.current.value = props.open ? props.open.inicio.format("HH") : ""
        finH.current.value = props.open && props.open.fin.format("DD") !== 'Invalid date' ? props.open.fin.format("HH") : ""
        inicioM.current.value = props.open ? props.open.inicio.format("MM") : ""
        finM.current.value = props.open && props.open.fin.format("DD") !== 'Invalid date' ? props.open.fin.format("MM") : ""
        pedidos.current.value = props.open ? props.open.pedidos : ""
        setIndex(props.open ? props.open.index : '')
    }, [props])

    function handleSubmit(e) {
        e.preventDefault()

        let item = {
            id: props.open.id,
            inicio : inicioYear.current.value+inicioMonth.current.value+inicioDay.current.value+inicioH.current.value+inicioM.current.value,
            fin : finYear.current.value+finMonth.current.value+finDay.current.value+finH.current.value+finM.current.value,
            pedidos: pedidos.current.value
        }
        props.updateHorarioItem(item, index)
        props.toggleHorarioDetailsOpen(false)
    }

    function deleteItemHorario(){
        props.eliminar(props.open) 
        props.toggleHorarioDetailsOpen(false)
    }

    return (
        <div className={"windowsOptionsDay " + (props.open ? 'open' : '')}>
            <div className="closeWindow" onClick={() => props.toggleHorarioDetailsOpen(false)}>X</div>
            <form action="" onSubmit={(e) => handleSubmit(e)}>
                <div className="horarioInputsFecha">
                    <input type="text" placeholder="inicio" ref={inicioDay} /> / 
                    <input type="text" placeholder="inicio" ref={inicioMonth} /> / 
                    <input type="text" placeholder="Inicio" ref={inicioYear} /> 
                    <input type="text" placeholder="inicio" ref={inicioH} />:
                    <input type="text" placeholder="inicio" ref={inicioM} />
                </div>
                <div className="horarioInputsFecha">
                    <input type="text" placeholder="finDay" ref={finDay} /> / 
                    <input type="text" placeholder="finMonth" ref={finMonth} /> / 
                    <input type="text" placeholder="finYear" ref={finYear} />
                    <input type="text" placeholder="finH" ref={finH} />:
                    <input type="text" placeholder="finM" ref={finM} />
                </div>
                <div><input type="text" placeholder="pedidos" ref={pedidos} /></div>
                <input type="hidden" ref={id} />
                <div><button className="btnSaveItemHorario" type="submit" value="Guardar" >GUARDAR CAMBIOS</button></div>
            </form>
            <div>
                <button className="btnDeleteItemHorario" onClick={deleteItemHorario}>Eliminar</button></div>

        </div>
    )
}