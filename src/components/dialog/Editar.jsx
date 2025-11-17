import React, { useState } from 'react'
import { Button, CloseButton, Dialog, Input, Portal, Field } from '@chakra-ui/react'

import { MdEdit } from "react-icons/md";
import { supabase } from '../../supabase/supabase';
import { toaster, Toaster } from '../ui/toaster';

export const Editar = ({ montura, refrescarLista }) => {
    const [open, setOpen] = useState(false)
    const [guardando, setguardando] = useState(false)
    const [form, setform] = useState({
        marca: montura.MARCA || "",
        ref: montura.REF || "",
        parte: montura.PARTE || "",
        color: montura.COLOR || "",
        genero: montura.GENERO || "",
        tipo: montura.TIPO || ""
    })

    const handleChange = (event) => {
        const { name, value } = event.target
        setform({ ...form, [name]: value.toUpperCase() })
    }

    const guardarCambios = async () => {
        if (!form.ref.trim() || !form.parte.trim()) {
            toaster.create({
                title: "Error",
                description: "Los campos REF y PARTE son obligatorios",
                type: "error",
            })
            return
        }

        setguardando(true)
        try {
            const { data, error } = await supabase
                .from('partes')
                .update({
                    MARCA: form.marca,
                    REF: form.ref,
                    PARTE: form.parte,
                    COLOR: form.color,
                    GENERO: form.genero,
                    TIPO: form.tipo
                })
                .eq('id', montura.id)
                .select()

            if (error) throw error

            toaster.create({
                title: "Éxito",
                description: "Producto actualizado correctamente",
                type: "success",
            })

            setOpen(false)
            refrescarLista()
        } catch (error) {
            toaster.create({
                title: "Error",
                description: error.message || "Error al actualizar el producto",
                type: "error",
            })
        } finally {
            setguardando(false)
        }
    }

    return (
        <Dialog.Root open={open} onOpenChange={(e) => setOpen(e.open)}>
            <Toaster />
            <Dialog.Trigger asChild>
                <Button mx={3} size="xs">
                    <MdEdit></MdEdit>
                </Button>
            </Dialog.Trigger>
            <Portal >
                <Dialog.Backdrop />
                <Dialog.Positioner>
                    <Dialog.Content>
                        <Dialog.Header>
                            <Dialog.Title>Editar {montura.REF}</Dialog.Title>
                        </Dialog.Header>
                        <Dialog.Body>

                            <form>
                                <Field.Root>
                                    <Field.Label>Marca</Field.Label>
                                    <Input 
                                        name="marca" 
                                        value={form.marca}
                                        onChange={handleChange}
                                    ></Input>
                                </Field.Root>

                                <Field.Root>
                                    <Field.Label>REF</Field.Label>
                                    <Input 
                                        name="ref" 
                                        value={form.ref}
                                        onChange={handleChange}
                                    ></Input>
                                </Field.Root>

                                <Field.Root>
                                    <Field.Label>Parte</Field.Label>
                                    <Input 
                                        name="parte" 
                                        value={form.parte}
                                        onChange={handleChange}
                                    ></Input>
                                </Field.Root>

                                <Field.Root>
                                    <Field.Label>Color</Field.Label>
                                    <Input 
                                        name="color" 
                                        value={form.color}
                                        onChange={handleChange}
                                    ></Input>
                                </Field.Root>

                                <Field.Root>
                                    <Field.Label>Género</Field.Label>
                                    <Input 
                                        name="genero" 
                                        value={form.genero}
                                        onChange={handleChange}
                                    ></Input>
                                </Field.Root>

                                <Field.Root>
                                    <Field.Label>Tipo / Forma</Field.Label>
                                    <Input 
                                        name="tipo" 
                                        value={form.tipo}
                                        onChange={handleChange}
                                    ></Input>
                                </Field.Root>
                            </form>

                        </Dialog.Body>
                        <Dialog.Footer>
                            <Dialog.ActionTrigger asChild>
                                <Button variant="outline" disabled={guardando}>Cancelar</Button>
                            </Dialog.ActionTrigger>
                            <Button 
                                colorPalette="teal"
                                onClick={guardarCambios}
                                loading={guardando}
                                disabled={guardando}
                            >
                                Guardar
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
