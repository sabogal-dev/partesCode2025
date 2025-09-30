import { HStack, IconButton, NumberInput } from "@chakra-ui/react"
import { useEffect } from "react"
import { LuMinus, LuPlus } from "react-icons/lu"

export const InputNumber = ({ setValor }) => {

    useEffect(() => {
        setValor(0)
    }, [])
    
    return (
        <NumberInput.Root defaultValue="0" unstyled spinOnPress={false} min={0} onValueChange={(input) => { setValor(input.valueAsNumber) }}>
            <HStack gap="2">
                <NumberInput.DecrementTrigger asChild>
                    <IconButton variant="outline" size="sm">
                        <LuMinus />
                    </IconButton>
                </NumberInput.DecrementTrigger>
                <NumberInput.ValueText textAlign="center" fontSize="lg" minW="3ch" />
                <NumberInput.IncrementTrigger asChild>
                    <IconButton variant="outline" size="sm">
                        <LuPlus />
                    </IconButton>
                </NumberInput.IncrementTrigger>
            </HStack>
        </NumberInput.Root>
    )
}
