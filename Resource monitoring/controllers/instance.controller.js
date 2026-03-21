import { buildInstanceOverview } from "../services/Instance/overview.service.js";
import { getScopedToken } from "../../Keystone module/Services/Keystone.service.js";
import catchAsync from "../../Utils/Catch-async.js";

export const getInstanceOverview = catchAsync(async (req, res, next) => {
  const { instanceId, projectId } = req.params;
  const { username, password } = req.user;

  // 🔐 1️⃣ Obtenir token scopé projet
  const token = await getScopedToken(username, password, projectId);

  console.log("token in get instance: ", token);

  const overview = await buildInstanceOverview(instanceId, token);

  res.status(200).json({
    success: true,
    data: overview,
  });
});

export const getResourceOverview = catchAsync(async (req, res, next) => {
  const { projectId, instanceId } = req.params;
  console.log("get params: ", projectId, instanceId);
  const { username, password } = req.user;
  // const resourceType = req.query.resourceType;
  const { resourceType } = req.body;

  const token = await getScopedToken(username, password, projectId);

  switch (resourceType) {
    case "instance":
      console.log("token in get instance: ", token);
      const overview = await buildInstanceOverview(instanceId, token);

      res.status(200).json({
        success: true,
        message: "Instance overview retrieved successfully",
        overview,
      });
      break;
    case network:
      // Code to execute if expression === network
      break;
    case volume:
      // Code to execute if expression === volume
      break;
    default:
    // Code to execute if none of the cases match
  }
});
