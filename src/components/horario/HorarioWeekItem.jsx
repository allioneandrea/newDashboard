import HorarioDayItem from "./HorarioDayItem"

const precioHora = 7.9
const HorarioWeekItem = ({week, toggleHorarioDetailsOpen}) => {

    const diaInicio = parseInt(week.days[0].day[0].inicio.format("D")) < 10 ? `0${week.days[0].day[0].inicio.format("D")}` : week.days[0].day[0].inicio.format("D")
    const diaFin = parseInt(week.days[week.days.length - 1].day[0].inicio.format("D")) < 10 ? `0${week.days[week.days.length - 1].day[0].inicio.format("D")}`: week.days[week.days.length - 1].day[0].inicio.format("D")
    const cuentaH = parseInt(week.cuenta/60) < 10 ? `0${parseInt(week.cuenta/60)}` : parseInt(week.cuenta/60)
    const cuentaM = week.cuenta%60 < 10 ? `0${week.cuenta%60}` : week.cuenta%60

    let reverseDays = [...week.days].reverse()
    
    return (
        <div className="horarioWeek">
        <div><small>Del:</small> {diaInicio} <small>al</small> {diaFin} {cuentaH}:{cuentaM}H {((week.cuenta/60) * precioHora ).toFixed(2)}€</div>
        {reverseDays.map(item => <HorarioDayItem  toggleHorarioDetailsOpen={toggleHorarioDetailsOpen} key={crypto.getRandomValues} day={item} />)}
        </div>
    )
}

export default HorarioWeekItem