import { Card, CardActionArea, CardActions, CardContent, CardHeader, Checkbox, Grid, IconButton, Typography } from "@mui/material";
import { entradaLista, listaReducerActions } from ".";

interface entradaProps  {
    id: entradaLista["id"],
    contenido: entradaLista["contenido"],
    seleccionada: entradaLista["seleccionada"],
    setLista: React.Dispatch<listaReducerActions>
}
export default function Entrada({ id, contenido, seleccionada, setLista }:entradaProps) {
    return (
        <Card>
            <CardHeader
                title={contenido}
            />
            <CardActions className="justify-content-end">
                <Checkbox checked={seleccionada} onChange={(e) => setLista({ type: "seleccionar", payload: { id, seleccionada: e.target.checked } })} />
            </CardActions>
        </Card>
    )
}