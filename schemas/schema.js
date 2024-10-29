import blogPost from "./blogPost";

export default createSchema({
  name: "default",
  types: schemaTypes.concat([
    blogPost,
    // ...other document types
  ]),
});
