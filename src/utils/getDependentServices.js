import { SERVICES } from "../constants/config";

export default serviceId => {
  const service = SERVICES[serviceId];
  if(!service)
    throw new Error(`Unknown service: ${serviceId}`);
  const deps = [];
  service.generatedClaims.forEach(claim => {
    if(!claim.honoredBy)
      return;
    claim.honoredBy.forEach(s => {
      if(s.id === serviceId)
        return;
      if(!deps.find(d => d.name === s.name)) {
        deps.push(s);
      }
    });
  });
  return deps;
};
