import createNextIntlPlugin from "next-intl/plugin";

const withPlugin = createNextIntlPlugin();

const nextConfig = {
  images: {
    domains: ["res.cloudinary.com", "img.freepik.com"],
  },
};

export default withPlugin(nextConfig);
