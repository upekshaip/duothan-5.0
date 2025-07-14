import { prisma } from "@/prisma";
import { auth } from "@/auth";

const CheckReqFields = async (data, requiredList) => {
  // check req fields
  if (!data) {
    throw new Error("missing fields");
  }
  requiredList.forEach((element) => {
    if (element === undefined) {
      throw new Error(`required field missing ${element}`);
    }
  });
};
export { CheckReqFields };
