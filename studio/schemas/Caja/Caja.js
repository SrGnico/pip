import { defineType, defineField } from "sanity";

export default{
    name: 'cajas',
    type: 'document',
    title: 'Cajas',
    fields: [
        defineField({
            name: "fecha",
            type: "string",
            title: "Fecha (25-05-2023)",
        }),
        defineField({
            name: "total",
            type: "number",
            title: "Total",
        }),
        defineField({
            name: "efectivo",
            type: "number",
            title: "Efectivo",
        }),
        defineField({
            name: "transferencia",
            type: "number",
            title: "Transferencia",
        }),
        defineField({
            name: "cantidadDeVentas",
            type: "number",
            title: "Cantidad De Ventas",
        }),
        defineField({
            name: "productosVendidos",
            type: "number",
            title: "Productos vendidos",
        })
    ],
    initialValue: {
        total: 0,
        efectivo: 0,
        transferencia: 0,
        cantidadDeVentas: 0,
        productosVendidos: 0
    }
}