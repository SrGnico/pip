import { defineType, defineField } from "sanity";

export default{
    name: 'cajas',
    type: 'document',
    title: 'Cajas',
    fields: [
        defineField({
            name: "fecha",
            type: "date",
            title: "Fecha",
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
            name: "cantidad-de-ventas",
            type: "number",
            title: "Cantidad De Ventas",
        }),
        defineField({
            name: "productos-venndidos",
            type: "number",
            title: "Productos vendidos",
        })
    ]
}