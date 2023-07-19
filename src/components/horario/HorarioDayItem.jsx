

const DAYS = ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado' ]



function HorarioItem({horario, toggleHorarioDetailsOpen}){
    let pedidosCount = 0
    horario.pedidos.split('').map(item => pedidosCount += parseInt(item))
    const diffH = parseInt(horario.fin.diff(horario.inicio, 'minutes') / 60) < 10 ? `0${parseInt(horario.fin.diff(horario.inicio, 'minutes') / 60)}`: parseInt(horario.fin.diff(horario.inicio, 'minutes') / 60)
    const diffM = horario.fin.diff(horario.inicio, 'minutes')%60 < 10 ? `0${horario.fin.diff(horario.inicio, 'minutes')%60}` : horario.fin.diff(horario.inicio, 'minutes')%60
    return (
        <div className="horarioItem" onClick={() => toggleHorarioDetailsOpen(horario)}>
            <div><small>{horario.inicio.format("HH:mm")} - {horario.fin.format("HH:mm")}</small></div>
            <div><i>{horario.pedidos}</i></div>
            <div>{pedidosCount} <small>en</small> {diffH}:{diffM}<small>H</small></div>
        </div>
    )
}



const HorarioDayItem = ({day, toggleHorarioDetailsOpen}) => {

    const dia = DAYS[parseInt(day.day[0].inicio.day())] < 10 ? `0${DAYS[parseInt(day.day[0].inicio.day())]}` : DAYS[parseInt(day.day[0].inicio.day())]
    const horas = parseInt(day.cuenta/60) < 10 ? `0${parseInt(day.cuenta/60)}` : parseInt(day.cuenta/60) 
    const minutos = day.cuenta%60 < 10 ? `0${day.cuenta%60}` : day.cuenta%60
    
    return(
        <div className="horarioDay">
            <div className="horarioDayHeader">
                <div><i><small>{dia} </small> <b>{day.day[0].inicio.format("DD")}</b></i></div>
                <div><small>{horas}:{minutos}H</small> </div>
                
            </div>
            <div>
               {day.day.map(item => 
                    <HorarioItem toggleHorarioDetailsOpen={toggleHorarioDetailsOpen} key={crypto.getRandomValues} horario={item} /> 
                )}
            </div>
        </div>
    )
}

export default HorarioDayItem