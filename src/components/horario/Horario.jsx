import moment from "moment/moment";
import { useState } from "react";
import { useEffect } from "react";
import './horario.css'
import HorarioMonthItem from "./HorarioMonthItem";
import HorarioEntradaSalida from "./HorarioEntradaSalida";
import axios from "axios";
import { CONSTANT } from "../../utils/globals";
import HorarioDayItem from "./HorarioDayItem";
import HorarioDayOptionsWindow from "./HorarioDayOptionsWindow";

const MOMENT_PATTERN = "YYYYMMDDHHmm"
const DAYS = ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado' ]

const precioHora = 7.9

export default function Horario(){

    const [horario, setHorario] = useState()
    const [openItem, setOpenItem] = useState()
    const [horarioData, setHorarioData] = useState()
    const [horarioDetailsOpen, setHorarioDetailsOpen] = useState()

    useEffect(() => {
        fetch(CONSTANT.HORARIO_DB_URL+'/api/horario')
        .then(res => res.json())
        .then(data =>{
            settingHorario(data)
        })
    }, [])

    useEffect(() => {
        console.log('cambia la data', horarioData)
        if (horarioData) settingHorario(horarioData)
    }, [horarioData])

    function settingHorario(data){

        setHorarioData(data)
        let tmpHorario = []
        let openItem = false

        data.map((item, index) => {

            if(!item.fin) {  openItem = {item, index} }
            const id = item.id
        
            const inicio = moment(item.inicio, MOMENT_PATTERN)
            const fin = moment(item.fin, MOMENT_PATTERN)
            const pedidos = item.pedidos
            const diffM = fin.diff(inicio,'minutes')
            let countPedidos = 0
            pedidos.split('').map((item) => countPedidos += parseInt(item))
            if(inicio)
            tmpHorario.push({
                id, inicio, fin, pedidos, countPedidos, diffM, index
            })
        })

        setOpenItem(openItem)
        setHorario(tmpHorario)
    }


    function updateHorario(index){
        let tmpArray = horarioData
        let tmpItem = tmpArray[index]
        tmpItem.fin = moment().format("YYYYMMDDHHmm")
        tmpArray[index] = tmpItem
        console.log(tmpArray[index]) 
        
        setOpenItem(false)
        setHorarioData(tmpArray)
        settingHorario(tmpArray)
        updateHorarioToDb(tmpItem)
        return null
    }
    function addHorario(){
        let tmpArray = horarioData
        const item = {id:null, inicio: moment().format("YYYYMMDDHHmm"), fin:'', pedidos:''}
        tmpArray.push(item)
        setHorarioData(tmpArray)
        setOpenItem({item, index:tmpArray.length -1})
        settingHorario(tmpArray)
        addHorarioToDb(item)
        return {item, index:tmpArray.length -1}
    }

    function addPedidos(pedidos){
        let tmpArray = horarioData
        tmpArray[openItem.index].pedidos = tmpArray[openItem.index].pedidos + pedidos
        setHorarioData(tmpArray)
        setOpenItem({item: tmpArray[openItem.index], index: openItem.index})
        settingHorario(tmpArray)
        updateHorarioToDb(tmpArray[openItem.index])
        return null
    }

    function updateHorarioItem(item,index){
        let tmpArray = horarioData
        console.log(tmpArray)
        tmpArray[index] = item
        console.log(item)

        setHorarioData(tmpArray)
        setOpenItem({item: tmpArray[openItem.index], index: openItem.index})
        settingHorario(tmpArray)
        updateHorarioToDb(tmpArray[index])
    }

    function deleteHorarioItem(el){
        let tmpArray = horarioData
        let newArray = []
        tmpArray.map(item => {
            console.log(item.id ,el.id)
            if(item.id !== el.id && item.inicio) newArray.push(item)
        })
        deleteHorarioToDb(el.id)
        setHorarioData(newArray)
        if(openItem.index == index) setOpenItem(false)
        settingHorario(newArray)

    }

    const addHorarioToDb = async (item) => {
        axios.post(CONSTANT.HORARIO_DB_URL+'/api/insertHorario', item)
    }

    const updateHorarioToDb = async (item) => {
        axios.post(CONSTANT.HORARIO_DB_URL+'/api/updatehorario', item)
    }

    const deleteHorarioToDb = async (id) => {
        axios.post(CONSTANT.HORARIO_DB_URL+'/api/deleteHorario', {id: id}).then(
            data => console.log('eliminado',data)
            )
        .catch(console.log('no eliminado',error))
    }

    

    function RenderItems() {
        let tmpData = []
        let tmpWeek = []
        let tmpDays = []
        let tmpDay = []
        let tmpItem = false
        let cuentaDia = 0
        let cuentaSemana = 0
        let cuentaMes = 0
        horario.map((item, index) => {
            const inicioWeekDay = item.inicio.day() === 0 ? 10 : item.inicio.day()
            let inicioWeekPrevDay = 0
            if(tmpItem ){
                inicioWeekPrevDay = tmpItem.inicio.day() === 0 ? 10 : tmpItem.inicio.day()
            }
            if(!item.fin) {
                setOpenItem({item, index})
            }

            // INSERTA DIA
            if(tmpItem && tmpItem.inicio.format("DD") != item.inicio.format("DD")){
                tmpDay.length && tmpDays.push({cuenta: cuentaDia, day:tmpDay})
                cuentaDia = 0
                tmpDay = []
            }
            // INSERTA SEMANA
            if(tmpItem && inicioWeekPrevDay > inicioWeekDay){
                tmpDay .length && tmpDays.push({cuenta: cuentaDia, day:tmpDay})
                tmpWeek.push({week: 'week',cuenta: cuentaSemana, days: tmpDays})
                cuentaDia = 0
                cuentaSemana = 0
                tmpDay = []
                tmpDays = []
            }
            if(tmpItem && tmpItem.inicio.format("MM") != item.inicio.format("MM")){
                tmpDay.length && tmpDays.push({cuenta: cuentaDia, day:tmpDay})
                tmpWeek.push({week: 'week',cuenta: cuentaSemana, days: tmpDays})
                tmpData.push({month: tmpItem.inicio.format("MM"),cuenta: cuentaMes, weeks: tmpWeek})
                cuentaDia = 0
                cuentaSemana = 0
                cuentaMes = 0
                tmpDay = []
                tmpDays = []
                tmpWeek = []
            }
            
            tmpItem = item
            tmpDay.push(item)

            let suma = Number.isInteger(item.fin.day()) ? item.fin.diff(item.inicio, 'minutes') : 0
            cuentaDia += suma
            cuentaSemana += suma
            cuentaMes += suma
            
                 
        })

            tmpDay.length && tmpDays.push({cuenta: cuentaDia, day: tmpDay})
            tmpDays.length && tmpWeek.push({cuenta : cuentaSemana, week: 'week', days: tmpDays})
            tmpData.push({month: tmpItem.inicio.format("MM"),cuenta: cuentaMes, weeks: tmpWeek})

        
        tmpData = tmpData.reverse()
        return(
            <>
               {tmpData.map(item => <HorarioMonthItem toggleHorarioDetailsOpen={toggleHorarioDetailsOpen} key={crypto.randomUUID} month={item} />)}
            </>
        )
    }

    function NoItems (){
        return <h1>No hay na.... Que pasa</h1>
    }

    function toggleHorarioDetailsOpen(item = false){
        setHorarioDetailsOpen(item)
    }

    return (
        <div>
            <HorarioEntradaSalida item={openItem} addHorario={addHorario} updateHorario={updateHorario} addPedidos={addPedidos} />
            {horario ? <RenderItems /> : <NoItems />}
            <HorarioDayOptionsWindow updateHorarioItem={updateHorarioItem} eliminar={deleteHorarioItem} open={horarioDetailsOpen} toggleHorarioDetailsOpen={toggleHorarioDetailsOpen} />
        </div>
    )
}