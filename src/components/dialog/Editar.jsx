import React from 'react'
import { Button, CloseButton, Dialog, Input, Portal, Field } from '@chakra-ui/react'

import { MdEdit } from "react-icons/md";


export const Editar = ({ montura }) => {
    return (
        <Dialog.Root >
            <Dialog.Trigger asChild>
                <Button mx={3} size="xs" disabled>
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
                                    <Field.Label>montura</Field.Label>
                                    <Input placeholder={`${montura.MARCA}`}></Input>
                                </Field.Root>

                                <Field.Root>
                                    <Field.Label>montura</Field.Label>
                                    <Input placeholder={`${montura.REF}`}></Input>
                                </Field.Root>

                                <Field.Root>
                                    <Field.Label>montura</Field.Label>
                                    <Input placeholder={`${montura.PARTE}`}></Input>
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
