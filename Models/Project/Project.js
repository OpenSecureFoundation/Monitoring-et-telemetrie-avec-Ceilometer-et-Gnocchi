import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
  projectId: { type: String, required: true, unique: true }, // UUID du projet dans Keystone
  projectname: { type: String, required: true }, // Nom du projet
  creatorId: { type: String, required: true }, // UUID de l'utilisateur qui a créé le projet
  createdAt: { type: Date, default: Date.now }, // Date de création
});

export default mongoose.model("Project", projectSchema);
