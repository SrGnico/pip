import { defineType, defineField } from "sanity";

export default {
    name: 'products',
    type: 'document',
    title: 'Products',
    fields: [
      defineField({
        name: "descripcion",
        type: "string",
        title: "Descripción",
      }),
      defineField({
        name: "codigo",
        type: "string",
        title: "Codigo",
      }),
      defineField({
        name: "categoria",
        type: "string",
        title: "Categoria",
        options: {
          list: [
            { "title": "Fiambre", "value": "fiambre"},
            { "title": "Almacen", "value": "almacen"},
            { "title": "Perfumeria", "value": "perfumeria"},
            { "title": "Limpieza", "value": "limpieza"},
            { "title": "Lacteos", "value": "lacteos"},
            { "title": "Panaderia", "value": "panaderia"},
            { "title": "Bebidas", "value": "bebidas"},
            { "title": "Promo", "value": "promo"},
            { "title": "Congelados", "value": "congelados"},
            { "title": "Sueltos", "value": "sueltos"},
            { "title": "Otros", "value": "otros"},
          ],
          layout: 'dropdown'
        }
      }),
      defineField({
        name: "stock",
        type: "number",
        title: "Stock",
      }),
      defineField({
        name: "precio",
        type: "number",
        title: "Precio (centavos poner con '.' despues de 3 cifras no poner nada ej: 1125.50)",
      }),
      defineField({
        name: "isEditing",
        type: "boolean",
        title: "IsEditing",
      }),
    ],
    initialValue: {
      isEditing: false,
    }
  }