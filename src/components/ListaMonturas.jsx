import React from 'react'
import { Table, Heading, Separator, Button } from '@chakra-ui/react'

import { Editar } from './dialog/Editar';
import { Cantidad } from './dialog/Cantidad';
export const ListaMonturas = ({ monturas, refrescarLista }) => {

    return (
        <>
            <Separator />
            <Heading>Lista de partes</Heading >
            <Table.Root variant="outline">
                <Table.Header>
                    <Table.Row>
                        <Table.ColumnHeader>Marca</Table.ColumnHeader>
                        <Table.ColumnHeader>Ref</Table.ColumnHeader>
                        <Table.ColumnHeader>Parte</Table.ColumnHeader>
                        <Table.ColumnHeader>Cantidad</Table.ColumnHeader>
                        <Table.ColumnHeader>Color</Table.ColumnHeader>
                        <Table.ColumnHeader textAlign="center">Editor</Table.ColumnHeader>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {monturas && monturas.map((montura) => (
                        <Table.Row key={montura.id}>
                            <Table.Cell>{montura.MARCA}</Table.Cell>
                            <Table.Cell>{montura.REF}</Table.Cell>
                            <Table.Cell>{montura.PARTE}</Table.Cell>
                            <Table.Cell>{montura.CANTIDAD}</Table.Cell>
                            <Table.Cell>{montura.COLOR}</Table.Cell>
                            <Table.Cell textAlign="center">
                                <Cantidad tipo={"suma"} montura={montura} refrescarLista={refrescarLista}></Cantidad>
                                <Cantidad tipo={"resta"} montura={montura} refrescarLista={refrescarLista}></Cantidad>
                                <Editar montura={montura}></Editar>
                            </Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table.Root>
        </>
    )
}
