import mongoose, { model, Schema } from "mongoose";

const constructorSchema = new Schema<IConstructorInput>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  type: { type: String, required: true },
});

const deploySchema = new Schema<ISchemaDeploy>({
  contractId: { type: Schema.Types.ObjectId, ref: "Contract", unique: true },
  content: { type: String },
  contentType: { type: String, default: "application/java" },
  constructors: [constructorSchema],
});

deploySchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (_doc, ret) {
    delete ret._id;
  },
});

export default mongoose.models.Deploy ||
  model<ISchemaDeploy>("Deploy", deploySchema);
