import { supabase } from "../supabase/supabase"

export async function fetchApi(referencia) {    
    
    if (referencia.length < 1) { return }

    let { data: partes, error } = await supabase
        .from('partes')
        .select('*')
        .ilike('REF', `${referencia}%`)
    return {
        partes
    }
}