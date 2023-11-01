import { useReducer, useState } from "react" 
import { Button, Card, CardContent, Grid, IconButton, TextField } from "@mui/material"
import { AddCircleOutline as AddCircleOutlineIcon } from "@mui/icons-material"
import Entrada from "./Entrada"

export interface entradaLista {
    id: number
    contenido: string
    seleccionada: boolean
}

//Reducer donde tenemos todas las mutaciones de la lista
export type listaReducerActions = 
    { type: "agregar", payload: { contenido: string } } | 
    { type: "seleccionar", payload: { id: entradaLista["id"], seleccionada: entradaLista["seleccionada"] } } | 
    { type: "borrar-seleccionados" } | 
    { type: "borrar-todos" } 
function listaReducer(lista:entradaLista[], action: listaReducerActions) {
    switch (action.type) {
        case "agregar": {
            const { contenido } = action.payload
            const nuevaLista = [ ...lista ]
            //Agregamos la entrada con sus valores predeterminados
            nuevaLista.push({ id: Date.now(), contenido, seleccionada: false })
            return nuevaLista
        }
        case "seleccionar": {
            const { id, seleccionada } = action.payload
            const nuevaLista = [ ...lista ]
            //Encontramos el index de la lista seleccionada para modificarla
            const indexEntradaSeleccionada = nuevaLista.findIndex( entrada => entrada.id === id )
            nuevaLista[indexEntradaSeleccionada].seleccionada = seleccionada
            return nuevaLista
        }   
        case "borrar-seleccionados": {
            return lista.filter( entrada => !entrada.seleccionada )
        }    
        case "borrar-todos": {
            return []
        }
    }
}

export default function Lista() {
    const [ lista, setLista ] = useReducer(listaReducer, [])
    const [ nuevaEntrada, setNuevaEntrada ] = useState("")
    const [ mensajeErrorInput, setMensajeErrorInput ] = useState(false)

    function agregarNuevaEntrada() {
        if ( !nuevaEntrada ) {
            setMensajeErrorInput(true)
            return
        }
        setLista({ type: "agregar", payload: { contenido: nuevaEntrada } })
        setNuevaEntrada("")
        //Si sucede que hay un error ya puesto, lo quitamos aqui
        setMensajeErrorInput(false)
    }



    return (
        <main>
            <Grid container spacing={4} justifyContent="center">
                <Grid item md={11}>
                    <TextField
                        fullWidth
                        label="Nueva entrada"
                        placeholder="Contenido..."
                        value={nuevaEntrada}
                        onChange={(e) => setNuevaEntrada(e.target.value)}
                        error={mensajeErrorInput}
                        
                    />
                </Grid>
                <Grid item md={1} textAlign="center">
                    <IconButton onClick={agregarNuevaEntrada}>
                        <AddCircleOutlineIcon fontSize="large"/>
                    </IconButton>
                </Grid>
                <Grid item sm={12} md={6}>
                    <Button fullWidth variant="contained" color="primary" onClick={() => setLista({ type: "borrar-seleccionados" })}>
                        Borrar seleccionados
                    </Button>
                </Grid>
                <Grid item sm={12} md={6}>
                    <Button fullWidth variant="contained" color="secondary" onClick={() => setLista({ type: "borrar-todos" })}>
                        Borrar todos
                    </Button>
                </Grid>
            </Grid>
            
            <Grid container spacing={3} marginTop={4}>
                {
                    lista.map( entrada => 
                        <Grid item sm={12} xs={12} lg={4} key={entrada.id}>
                            <Entrada setLista={setLista} {...entrada} />  
                        </Grid>
                    )
                }
            </Grid>

        </main>
    )
}