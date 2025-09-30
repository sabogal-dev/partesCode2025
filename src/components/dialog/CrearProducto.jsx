import React, { useEffect, useState } from 'react'
import { Button, CloseButton, Dialog, Input, Portal, Field, NativeSelect, NumberInput } from '@chakra-ui/react'

import { FiPlusSquare } from "react-icons/fi";
import odooFetch from '../../utils/odooFetch';

export const CrearProducto = () => {

    const [marcas, setmarcas] = useState([])
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
            setform({ ...form, [event.target.name]: parseInt(event.target.value) })
            return
        }
        setform({ ...form, [event.target.name]: event.target.value.toUpperCase() })
    }


    useEffect(() => {
        apiOdooMarcas();
    }, [])

    const apiOdooMarcas = async () => {
        const { res } = await odooFetch();

        setmarcas(res)
    }

    return (
        <Dialog.Root >
            <Dialog.Trigger asChild>
                <Button mx={3}  colorPalette={"teal"} disabled>
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
                                    <Input onChange={onChangeForm} name='referencia'></Input>
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
                                    <Input onChange={onChangeForm} name='parte'></Input>
                                </Field.Root>

                                <Field.Root required>
                                    <Field.Label>
                                        Color
                                        <Field.RequiredIndicator />
                                    </Field.Label>
                                    <Input onChange={onChangeForm} name='color'></Input>
                                </Field.Root>

                                <Field.Root>
                                    <Field.Label>Cantidad</Field.Label>

                                    <NumberInput.Root width="100%" defaultValue="0" min={0} name='cantidad' onChange={onChangeForm}>
                                        {/* <NumberInput.Control name='cantidad' onChange={onChangeForm}/> */}
                                        <NumberInput.Input />
                                    </NumberInput.Root>
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
                                <Button variant="outline">Cancelar</Button>
                            </Dialog.ActionTrigger>
                            <Button>Guardar</Button>
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
