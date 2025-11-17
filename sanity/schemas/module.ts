// schemas/module.ts
import { defineType, defineField } from "sanity";

export default defineType({
  name: "module",
  title: "Lyceum Module",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Module title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
    }),
    defineField({
      name: "description",
      title: "Short description",
      type: "text",
    }),
    defineField({
      name: "coverImage",
      title: "Cover image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "order",
      title: "Order (for sorting)",
      type: "number",
    }),
    defineField({
      name: "chapters",
      title: "Chapters",
      type: "array",
      of: [{ type: "chapter" }], // 👈 link chapter object here
    }),
  ],
});
