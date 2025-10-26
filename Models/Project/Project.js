import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
  project_id: { type: String, required: true, unique: true }, // UUID du projet dans Keystone
  name: { type: String, required: true }, // Nom du projet
  creator_id: { type: String, required: true }, // UUID de l'utilisateur qui a créé le projet
  created_at: { type: Date, default: Date.now }, // Date de création
});

export default mongoose.model("Project", projectSchema);
