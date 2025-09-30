import React, { useState } from 'react'

//estilos
import { Input, Button, Group, InputGroup } from '@chakra-ui/react'
import { IoGlasses } from "react-icons/io5";


export const Filtro = ({ onReferencia, cargando }) => {

    const [referencia, setreferencia] = useState("")

    const handleSubmit = (event) => {
        event.preventDefault()
        if (referencia.length < 3) {
            return
        }
        onReferencia(referencia)
    }

    const handleForm = (e) => {
        setreferencia(e.target.value.toUpperCase())
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <Group>
                    <InputGroup startElement={<IoGlasses />}>
                        <Input placeholder='Referencia' name='inputReferencia' onChange={handleForm}></Input>
                    </InputGroup>
                    <Button type='submit' loading={cargando}>Buscar</Button>
                </Group>
            </form>
        </>
    )
}
