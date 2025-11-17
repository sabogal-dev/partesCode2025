import React, { useEffect, useState, useRef } from 'react'
import { Button, CloseButton, Dialog, Input, Portal, Field, NativeSelect, NumberInput } from '@chakra-ui/react'

import { FiPlusSquare } from "react-icons/fi";
import odooFetch from '../../utils/odooFetch';
import { supabase } from '../../supabase/supabase';
import { toaster, Toaster } from '../ui/toaster';

export const CrearProducto = () => {

    const [marcas, setmarcas] = useState([])
    const [guardando, setguardando] = useState(false)
    const [open, setopen] = useState(false)
    const dialogRef = useRef()

    const [form, setform] = useState({
        referencia: "",
        marca: "",
        parte: "",
        cantidad: 0,
        genero: "",
        tipo: "",
        color: "",
        codigobarras: 0
    })

    const onChangeForm = (event) => {
        if (event.target.name == "cantidad" || event.target.name == "codigobarras") {
            setform({ ...form, [event.target.name]: parseInt(event.target.value) || 0 })
            return
        }
        setform({ ...form, [event.target.name]: event.target.value.toUpperCase() })
    }

    const limpiarFormulario = () => {
        setform({
            referencia: "",
            marca: "",
            parte: "",
            cantidad: 0,
            genero: "",
            tipo: "",
            color: "",
            codigobarras: 0
        })
    }

    const guardarProducto = async () => {
        // Validar campos obligatorios
        if (!form.referencia.trim() || !form.parte.trim() || form.cantidad < 0) {
            toaster.create({
                title: "Error",
                description: "Los campos REF, PARTE y CANTIDAD son obligatorios",
                type: "error",
            })
            return
        }

        setguardando(true)
        try {
            // Obtener el ID más alto
            const { data: maxIdData, error: maxIdError } = await supabase
                .from('partes')
                .select('id')
                .order('id', { ascending: false })
                .limit(1)

            if (maxIdError) throw maxIdError

            const maxId = maxIdData && maxIdData.length > 0 ? maxIdData[0].id : 0
            const newId = maxId + 1

            const { data, error } = await supabase
                .from('partes')
                .insert([
                    {
                        id: newId,
                        REF: form.referencia,
                        MARCA: form.marca,
                        PARTE: form.parte,
                        CANTIDAD: form.cantidad,
                        GENERO: form.genero,
                        TIPO: form.tipo,
                        COLOR: form.color,
                        BARRAS: form.codigobarras
                    }
                ])

            if (error) throw error

            toaster.create({
                title: "Éxito",
                description: "Producto creado correctamente",
                type: "success",
            })

            limpiarFormulario()
            setopen(false)
        } catch (error) {
            toaster.create({
                title: "Error",
                description: error.message || "Error al crear el producto",
                type: "error",
            })
        } finally {
            setguardando(false)
        }
    }

    useEffect(() => {
        apiOdooMarcas();
    }, [])

    const apiOdooMarcas = async () => {
        const { res } = await odooFetch();

        setmarcas(res)
    }

    return (
        <Dialog.Root open={open} onOpenChange={(e) => setopen(e.open)}>
            <Toaster />
            <Dialog.Trigger asChild>
                <Button mx={3} colorPalette={"teal"}>
                    <FiPlusSquare></FiPlusSquare>
                    Crear
                </Button>
            </Dialog.Trigger>
            <Portal >
                <Dialog.Backdrop />
                <Dialog.Positioner>
                    <Dialog.Content>
                        <Dialog.Header>
                            <Dialog.Title>Crear un producto</Dialog.Title>
                        </Dialog.Header>
                        <Dialog.Body>

                            <form>
                                <Field.Root required>
                                    <Field.Label>
                                        Referencia
                                        <Field.RequiredIndicator />
                                    </Field.Label>
                                    <Input onChange={onChangeForm} name='referencia' value={form.referencia}></Input>
                                </Field.Root>


                                <Field.Root required>
                                    <Field.Label>
                                        Marca
                                        <Field.RequiredIndicator />
                                    </Field.Label>

                                    <NativeSelect.Root size="sm" width="240px">
                                        <NativeSelect.Field placeholder="Seleccionar Marca" onChange={onChangeForm} name='marca'>
                                            {marcas && marcas.map((marca) => {
                                                return <option key={marca.id} value={marca.name}>{marca.name}</option>
                                            })}
                                        </NativeSelect.Field>
                                        <NativeSelect.Indicator />
                                    </NativeSelect.Root>
                                </Field.Root>


                                <Field.Root required>
                                    <Field.Label>
                                        Parte
                                        <Field.RequiredIndicator />
                                    </Field.Label>
                                    <Input onChange={onChangeForm} name='parte' value={form.parte}></Input>
                                </Field.Root>

                                <Field.Root required>
                                    <Field.Label>
                                        Cantidad
                                        <Field.RequiredIndicator />
                                    </Field.Label>

                                    <NumberInput.Root width="100%" defaultValue="0" min={0} name='cantidad' value={form.cantidad} onChange={onChangeForm}>
                                        {/* <NumberInput.Control name='cantidad' onChange={onChangeForm}/> */}
                                        <NumberInput.Input />
                                    </NumberInput.Root>
                                </Field.Root>

                                <Field.Root >
                                    <Field.Label>
                                        Color
                                        <Field.RequiredIndicator />
                                    </Field.Label>
                                    <Input onChange={onChangeForm} name='color'></Input>
                                </Field.Root>


                                <Field.Root>
                                    <Field.Label>Genero</Field.Label>
                                    <Input onChange={onChangeForm} name='genero'></Input>
                                </Field.Root>

                                <Field.Root>
                                    <Field.Label>Tipo / Forma</Field.Label>
                                    <Input onChange={onChangeForm} name='tipo'></Input>
                                </Field.Root>


                                <Field.Root>
                                    <Field.Label>codigo de barras</Field.Label>
                                    <Input onChange={onChangeForm} name='codigobarras'></Input>
                                </Field.Root>
                            </form>



                        </Dialog.Body>
                        <Dialog.Footer>
                            <Dialog.ActionTrigger asChild>
                                <Button variant="outline" disabled={guardando}>Cancelar</Button>
                            </Dialog.ActionTrigger>
                            <Button
                                colorPalette="teal"
                                onClick={guardarProducto}
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
