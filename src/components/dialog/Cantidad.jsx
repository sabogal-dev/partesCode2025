import React, { useState } from 'react'
import { Button, CloseButton, Dialog, Input, Portal, Field, Heading, Stack } from '@chakra-ui/react'
import { InputNumber } from './InputNumber';
import { FaMinus, FaPlus } from "react-icons/fa";
import { updateCatindad } from '../../utils/updateCantidad';
import { Toaster, toaster } from "../../components/ui/toaster"

export const Cantidad = ({ tipo, montura, refrescarLista }) => {

    const [valor, setValor] = useState(0);
    const [cargando, setcargando] = useState(false)
    const [open, setOpen] = useState(false);

    const guardarCambioSupabase = async (valor, montura) => {
        setcargando(true)
        let total = 0;

        if (tipo == "suma") {
            total = parseInt(valor) + parseInt(montura.CANTIDAD)
        }
        else {
            total = parseInt(montura.CANTIDAD) - parseInt(valor)
        }
        try {
            const { parte } = await updateCatindad(parseInt(total), montura.id)

            toaster.create({
                description: `Montura : ${parte[0].REF} Actualizada = ${parte[0].CANTIDAD}`,
                type: "info",
            })
            setcargando(false)
            refrescarLista()
            setOpen(false)
        } catch (error) {
            toaster.create({
                description: `error : ${error}`,
                type: "info",
            })
            setcargando(false)
            refrescarLista()
            setOpen(false)
        }
        setcargando(false)
    }
    return (
        <Dialog.Root size="xs" open={open} onOpenChange={setOpen}>
            <Toaster />
            <Dialog.Trigger asChild>
                {tipo == "suma" ?
                    <Button mx={3} size="xs" variant="surface" colorPalette="green" onClick={() => setOpen(true)}>
                        <FaPlus></FaPlus>
                    </Button>
                    :
                    <Button mx={3} size="xs" variant="surface" colorPalette="red" onClick={() => setOpen(true)}>
                        <FaMinus></FaMinus>
                    </Button>
                }

            </Dialog.Trigger>
            <Portal>
                <Dialog.Backdrop />
                <Dialog.Positioner>
                    <Dialog.Content textAlign={"center"}>
                        <Dialog.Header>
                            <Dialog.Title>movimiento de {tipo}</Dialog.Title>
                        </Dialog.Header>
                        <Dialog.Body>
                            <Heading m={5}>Ref : {montura.REF}</Heading>
                            <Heading m={5}>actual = {montura.CANTIDAD}</Heading>
                            <form>
                                <Field.Root flexWrap={"wrap"} alignContent={"space-around"}>
                                    <Field.Label>ingrese la cantidad</Field.Label>
                                    <InputNumber setValor={setValor}></InputNumber>
                                </Field.Root>
                            </form>
                        </Dialog.Body>
                        <Dialog.Footer>
                            <Dialog.ActionTrigger asChild>
                                <Button variant="outline">Cancelar</Button>
                            </Dialog.ActionTrigger>
                            {cargando ?
                                <Button loading disabled>Guardando</Button>
                                :
                                <Button onClick={() => guardarCambioSupabase(valor, montura)}>Guardar</Button>
                            }
                        </Dialog.Footer>
                        <Dialog.CloseTrigger asChild>
                            <CloseButton size="sm" />
                        </Dialog.CloseTrigger>
                    </Dialog.Content>
                </Dialog.Positioner>
            </Portal>
        </Dialog.Root>
    )
}
