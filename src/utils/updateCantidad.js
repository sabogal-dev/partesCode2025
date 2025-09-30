import { supabase } from "../supabase/supabase"

export async function updateCatindad(valor, montura) {    
    // console.log(valor, montura)
    let { data: parte, error } = await supabase
        .from('partes')
        .update({ CANTIDAD: valor })
        .eq('id', montura)
        .select()
    return {
        parte
    }
}