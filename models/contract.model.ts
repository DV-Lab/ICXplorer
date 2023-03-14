import mongoose, { model, Schema } from "mongoose";

const inputSchema = new Schema<IInput>(
  {
    name: { type: String, required: true },
    type: { type: String, required: true },
  },
  { _id: false }
);

const resourceSchema = new Schema<IResource>(
  {
    name: { type: String, required: true },
    link: { type: String, required: true },
  },
  { _id: false }
);

const functionsSchema = new Schema<IFunctions>(
  {
    writeMethods: [
      {
        name: { type: String, required: true },
        description: String,
        inputs: [inputSchema],
        returnType: { type: String, default: "void" },
        payable: { type: Boolean, default: false },
      },
    ],
    readMethods: [
      {
        name: { type: String, required: true },
        description: String,
        inputs: [inputSchema],
        returnType: { type: String, default: "void" },
        pure: { type: Boolean, default: false },
      },
    ],
  },
  { _id: false }
);

const eventSchema = new Schema<IEvent>(
  {
    name: { type: String, required: true },
    description: String,
    inputs: [inputSchema],
  },
  { _id: false }
);

const sourceSchema = new Schema<ISource>(
  {
    name: { type: String, required: true },
    code: { type: String, required: true },
  },
  { _id: false }
);

const contractSchema = new Schema<ISchemaContract>({
  name: { type: String, required: true },
  summary: { type: String, required: true },
  description: { type: String },
  version: { type: String, default: "v0.0.1" },
  icon: { type: String },
  useCases: { type: [String] },
  resources: { type: [resourceSchema] },
  functions: { type: functionsSchema },
  events: { type: [eventSchema] },
  sources: { type: [sourceSchema] },
});

contractSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (_doc, ret) {
    delete ret._id;
  },
});

export default mongoose.models.Contract ||
  model<ISchemaContract>("Contract", contractSchema);
