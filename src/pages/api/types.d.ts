type SubscribeResponse = {
  sessionId: string;
};

type FaunaUser = {
  ref: {
    id: "string";
  };
  data: {
    stripe_customer_id: string;
  };
};
