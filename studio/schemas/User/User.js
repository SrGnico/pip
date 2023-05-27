import { defineType, defineField } from "sanity";

export default{
    name: 'user',
    type: 'document',
    title: 'User',
    fields: [
        defineField({
            name: "user",
            type: "string",
            title: "User",
        }),
        defineField({
            name: "password",
            type: "string",
            title: "Password",
        })]}