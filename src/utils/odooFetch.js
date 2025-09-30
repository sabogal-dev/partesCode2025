export default async function odooFetch() {
    const peticion = {
        modelo: "product.category",
        columna: ["name"]
    }
    const respuesta = await fetch("https://servicios.codeoptikal.com/apiOdoo", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(peticion)
    })
    const res = await respuesta.json()
    return { res }
}

//formato de la peticion ODOO

// modelo: "res.partner",
// filtro: [["name", "ilike", ""]],
// columna: ["id", "name", "vat"]
