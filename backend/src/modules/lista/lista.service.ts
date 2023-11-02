import { Injectable } from '@nestjs/common';
import { entradaLista } from './lista.module';

import firebase from "firebase-admin"
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ListaService {
    private firebaseApp:firebase.app.App 

    constructor (
        private ConfigService: ConfigService,
    ) { 
        //Inicializamos firebase y le agregamos las credenciales del .env
        this.firebaseApp = firebase.initializeApp({
            credential: firebase.credential.cert({
                ...JSON.parse(this.ConfigService.get<string>("FIREBASE_CONFIG_JSON"))
            })
        })
    }
    
    //Devolvemos todo el contenido de la colección "/lista"
    async verLista():Promise<entradaLista[]> {
        const firestore = this.firebaseApp.firestore()
        const listaRef = firestore.collection("/lista")
        const listaSnapshot = await listaRef.get()
        return listaSnapshot.docs.map(doc => doc.data() as entradaLista )
    }

    //Actualizamos todas las entradas, y si no existe, se crea.
    async actualizarLista(nuevaLista:entradaLista[]) {
        const firestore = this.firebaseApp.firestore()
        const listaRef = firestore.collection("/lista")
        
        await Promise.all(nuevaLista.map( async (entrada) => {
            const entradaRef = listaRef.doc(entrada.id.toString())
            await entradaRef.set(entrada, { merge: true })
        }))
    }
}
