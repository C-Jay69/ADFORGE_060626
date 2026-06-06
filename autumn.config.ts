import { feature, plan, item } from "atmn";

export const videoMinutes = feature({
  id: "video_minutes",
  name: "Video Minutes",
  type: "metered",
  consumable: true,
});

export const free = plan({
  id: "free",
  name: "Free",
  is_default: true,
  prices: [],
  items: [
    item({
      featureId: videoMinutes.id,
      included: 3,
      reset: { interval: "month" },
    }),
  ],
});

export const starter = plan({
  id: "starter",
  name: "Starter",
  prices: [{ amount: 2900, interval: "month" }],
  items: [
    item({
      featureId: videoMinutes.id,
      included: 30,
      reset: { interval: "month" },
    }),
  ],
});

export const growth = plan({
  id: "growth",
  name: "Growth",
  prices: [{ amount: 7900, interval: "month" }],
  items: [
    item({
      featureId: videoMinutes.id,
      included: 90,
      reset: { interval: "month" },
    }),
  ],
});

export const agency = plan({
  id: "agency",
  name: "Agency",
  prices: [{ amount: 19900, interval: "month" }],
  items: [
    item({
      featureId: videoMinutes.id,
      included: 300,
      reset: { interval: "month" },
    }),
  ],
});
