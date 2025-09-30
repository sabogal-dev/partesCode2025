import { useEffect, useState } from "react"
import { Filtro } from "./components/Filtro"
import { fetchApi } from './utils/fetchApi'
import { ListaMonturas } from "./components/ListaMonturas"
import { Flex, Stack, Group } from "@chakra-ui/react"

import { CrearProducto } from "./components/dialog/CrearProducto"
export const Principal = () => {

  const [Ref, setRef] = useState("")
  const [monturas, setmonturas] = useState()
  const [cargando, setcargando] = useState(false)

  const handleReferencia = (Ref) => {
    setRef(Ref)
  }

  useEffect(() => {
    llamada()
  }, [Ref])

  async function llamada() {
    if (Ref < 3) { return }
    setcargando(true)
    const { partes } = await fetchApi(Ref)
    setmonturas(partes)
    setcargando(false)
  }

  return (
    <>
      <Stack m={10}>

        <Group>
          <CrearProducto></CrearProducto>
        </Group>
        <Flex justifyContent='center' m={10}>
          <Filtro onReferencia={handleReferencia} cargando={cargando}></Filtro>
        </Flex>

        <ListaMonturas monturas={monturas} refrescarLista={llamada}/>
      </Stack>

    </>
  )
}
