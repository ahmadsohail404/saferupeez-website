// schemas/chapter.ts
import { defineType, defineField } from "sanity";

export default defineType({
  name: "chapter",
  title: "Chapter",
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Short description",
      type: "text",
    }),
    defineField({
      name: "duration",
      title: "Duration (e.g. 12 min)",
      type: "string",
    }),
    defineField({
      name: "videoId",
      title: "YouTube video ID",
      type: "string",
      description:
        "Only the ID (e.g. for https://youtube.com/watch?v=ABC123, enter ABC123)",
    }),
    defineField({
      name: "content",
      title: "Full content",
      type: "array",
      of: [{ type: "block" }], // rich text (Portable Text)
    }),
  ],
});
