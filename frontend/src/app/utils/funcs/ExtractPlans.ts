export type TPlan = {
  title: string;
  price: string;
  planNumber: number;
  features: string[];
};

export const ExtractPlans = (t: (key: string) => string): TPlan[] => {
  const plans = [
    {
      title: t("plans.freeTitle"),
      price: t("plans.freePrice"),
      planNumber: +t("plans.freeNumber"),
      features: [
        t("plans.freeFeature1"),
        t("plans.freeFeature2"),
        t("plans.freeFeature3"),
        t("plans.freeFeature4"),
      ],
    },
    {
      title: t("plans.premiumTitle"),
      price: t("plans.premiumPrice"),
      planNumber: +t("plans.premiumNumber"),
      features: [
        t("plans.premiumFeature1"),
        t("plans.premiumFeature2"),
        t("plans.premiumFeature3"),
        t("plans.premiumFeature4"),
      ],
    },
    {
      title: t("plans.startupTitle"),
      price: t("plans.startupPrice"),
      planNumber: +t("plans.startupNumber"),
      features: [
        t("plans.startupFeature1"),
        t("plans.startupFeature2"),
        t("plans.startupFeature3"),
        t("plans.startupFeature4"),
      ],
    },
  ];

  return plans;
};
