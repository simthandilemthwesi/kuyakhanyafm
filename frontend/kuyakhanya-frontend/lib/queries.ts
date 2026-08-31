// DatoCMS GraphQL queries — Kuyakhanya FM v2

export const Q_VISION_MISSION = `
  query VisionMission { visionMission { vision missionItems } }
`;
export const Q_AIMS = `
  query Aims { aimsObjectives { title objectives } }
`;
export const Q_CONTACT = `
  query Contact { contactInfo { phone whatsapp email address facebook instagram youtube tiktok whatsappLink googleFormUrl } }
`;
export const Q_ABOUT = `
  query About { aboutUs { history { value } vision mission values impactMetrics futurePlans { value } heroImage { url alt } } }
`;
export const Q_PROGRAMMES = `
  query Programmes { allProgrammes(first: 50, orderBy: title_ASC) { id title slug description schedule isActive cover { url alt } presenters { id name slug showName } } }
`;
export const Q_PRESENTERS = `
  query Presenters { allPresenters(first: 100, orderBy: order_ASC) { id name slug bio showName order photo { url alt } programmes { id title slug } } }
`;
export const Q_MANAGEMENT = `
  query Management { allManagementTeamMembers(orderBy: order_ASC) { id name role bio order isActive photo { url alt } } }
`;
export const Q_TECHNICIANS = `
  query Technicians { allTechnicians { id name role bio isActive photo { url alt } } }
`;
export const Q_SERVICES = `
  query Services { allServices(first: 24, orderBy: order_ASC) { id title slug description order isActive image { url alt } longDescription { value } } }
`;
export const Q_NEWS = `
  query News { allNewsUpdates(first: 24, orderBy: date_DESC) { id title slug excerpt author date isFeatured coverImage { url alt responsiveImage(imgixParams: {auto: format, w: 800}) { src srcSet } } content { value } } }
`;
export const Q_NEWS_BY_SLUG = `
  query NewsBySlug($slug: String!) { newsUpdate(filter: {slug: {eq: $slug}}) { id title slug excerpt author date isFeatured coverImage { url alt } content { value } } }
`;
export const Q_HOME = `
  query Home {
    visionMission { vision missionItems }
    aimsObjectives { title objectives }
    contactInfo { phone whatsapp email facebook instagram youtube tiktok whatsappLink googleFormUrl }
    aboutUs { history { value } vision mission values impactMetrics futurePlans { value } heroImage { url } }
    allServices(first: 6, orderBy: order_ASC) { id title slug description image { url alt } }
    allNewsUpdates(first: 3, orderBy: date_DESC) { id title slug excerpt date coverImage { url alt } }
  }
`;
