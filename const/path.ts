export const ROUTE = {
  signIn: "/auth/signin",
  dashboard: "/home/dashboard",
  lectures: "/home/lectures",
  vocabularies: "/dashboard/vocabularies",
};
export const CLOUDINARY_CONFIG = {
  cloudiaryUrl: process.env.NEXT_PUBLIC_CLOUDINARY_URL || "",
  uploadPreset: process.env.NEXT_PUBLIC_UPLOAD_PRESET || "",
  cloudName: process.env.NEXT_PUBLIC_CLOUD_NAME || "",
};
