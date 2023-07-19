import { useState } from "react"
import HorarioWeekItem from "./HorarioWeekItem"

const precioHora = 7.9

const MONTHS = ['','Enero','Febrero','Marzo','Abril','mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre',]

const HorarioMonthItem = ({month, toggleHorarioDetailsOpen}) => {

    const [open, setOpen] = useState(false)

    const handleMontyhClick = () => {
        setOpen(!open)
    }
    const monthName = MONTHS[parseInt(month.month)]
    const hours = parseInt(month.cuenta/60) < 10 ? `0${parseInt(month.cuenta/60)}` : parseInt(month.cuenta/60)
    const minutes = month.cuenta%60 < 10 ? `0${month.cuenta%60}` : month.cuenta%60
    const gananciasMes = ((month.cuenta/60) * precioHora ).toFixed(2)
    let reverseWeek = [...month.weeks].reverse()

    return (
        <div className={open ? 'horarioMonth open' : 'horarioMonth'}>
            <div className="horarioMonthHeader" onClick={handleMontyhClick}>
                <span className="flechita">{'>'}</span>
                <small style={{alignSelf: 'flex-start'}}><b><i>{monthName}</i></b> </small> {hours}:{minutes}<small>H =</small> {gananciasMes}<small>€</small>
            </div>
            {reverseWeek.map(item => <HorarioWeekItem toggleHorarioDetailsOpen={toggleHorarioDetailsOpen} key={crypto.getRandomValues} week={item} /> )}
        </div>
    )
}
export default HorarioMonthItem