import React, { useState } from 'react'
import { Button, CloseButton, Dialog, Portal, Heading, Stack } from '@chakra-ui/react'

import { MdDelete } from "react-icons/md";
import { supabase } from '../../supabase/supabase';
import { toaster, Toaster } from '../ui/toaster';

export const Eliminar = ({ montura, refrescarLista }) => {
    const [open, setOpen] = useState(false)
    const [eliminando, seteleminando] = useState(false)

    const eliminarProducto = async () => {
        seteleminando(true)
        try {
            const { data, error } = await supabase
                .from('partes')
                .delete()
                .eq('id', montura.id)

            if (error) throw error

            toaster.create({
                title: "Éxito",
                description: `Parte ${montura.REF} eliminada correctamente`,
                type: "success",
            })

            setOpen(false)
            refrescarLista()
        } catch (error) {
            toaster.create({
                title: "Error",
                description: error.message || "Error al eliminar el producto",
                type: "error",
            })
        } finally {
            seteleminando(false)
        }
    }

    return (
        <Dialog.Root open={open} onOpenChange={(e) => setOpen(e.open)}>
            <Toaster />
            <Dialog.Trigger asChild>
                <Button mx={3} size="xs" colorPalette="red">
                    <MdDelete></MdDelete>
                </Button>
            </Dialog.Trigger>
            <Portal>
                <Dialog.Backdrop />
                <Dialog.Positioner>
                    <Dialog.Content textAlign={"center"}>
                        <Dialog.Header>
                            <Dialog.Title>Confirmar eliminación</Dialog.Title>
                        </Dialog.Header>
                        <Dialog.Body>
                            <Stack gap={4}>
                                <Heading size="md">¿Está seguro de eliminar la parte?</Heading>
                                <Heading size="sm">REF: {montura.REF}</Heading>
                                <Heading size="sm">Marca: {montura.MARCA}</Heading>
                            </Stack>
                        </Dialog.Body>
                        <Dialog.Footer>
                            <Dialog.ActionTrigger asChild>
                                <Button variant="outline" disabled={eliminando}>Cancelar</Button>
                            </Dialog.ActionTrigger>
                            <Button 
                                colorPalette="red"
                                onClick={eliminarProducto}
                                loading={eliminando}
                                disabled={eliminando}
                            >
                                Eliminar
                            </Button>
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
